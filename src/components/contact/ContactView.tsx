import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, CheckCircle, Clock,
  ShieldCheck, Send, MessageSquare, ChevronDown, AlertCircle,
} from 'lucide-react';
import { fadeInUp } from '../../hooks/useAnimations';

/* ─────────────────────────────────────────────
   Form types
───────────────────────────────────────────── */
type FormData = {
  name: string;
  company: string;
  email: string;
  requirement: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = { name: '', company: '', email: '', requirement: '', message: '' };

/* ─────────────────────────────────────────────
   Validation
───────────────────────────────────────────── */
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim())    errors.name    = 'Your name is required.';
  if (!data.email.trim())   errors.email   = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
                            errors.email   = 'Please enter a valid email address.';
  if (!data.message.trim()) errors.message = 'Please describe your project or requirement.';
  return errors;
}

/* ─────────────────────────────────────────────
   FieldError — accessible inline error message
───────────────────────────────────────────── */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-[12px] mt-1.5"
      style={{ color: 'var(--brand-danger)' }}
    >
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

/* ─────────────────────────────────────────────
   ContactView
───────────────────────────────────────────── */
export default function ContactView() {
  const formId = useId();
  const [formData, setFormData]     = useState<FormData>(INITIAL);
  const [errors,   setErrors]       = useState<FormErrors>({});
  const [touched,  setTouched]      = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status,   setStatus]       = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  /* Field IDs */
  const ids = {
    name:        `${formId}-name`,
    company:     `${formId}-company`,
    email:       `${formId}-email`,
    requirement: `${formId}-requirement`,
    message:     `${formId}-message`,
    nameErr:     `${formId}-name-err`,
    emailErr:    `${formId}-email-err`,
    messageErr:  `${formId}-message-err`,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    // Re-validate touched field on change
    if (touched[name as keyof FormData]) {
      const updated = { ...formData, [name]: value };
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormData] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormData] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all required fields as touched
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');

    /**
     * INTEGRATION NOTE:
     * ─────────────────────────────────────────────────────────────
     * This form is ready for a real backend. Replace the simulated
     * delay below with one of:
     *
     *  1. Formspree (https://formspree.io):
     *     await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *       method: 'POST',
     *       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
     *       body: JSON.stringify(formData),
     *     })
     *
     *  2. EmailJS (https://emailjs.com):
     *     await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData, 'PUBLIC_KEY')
     *
     *  3. Netlify Forms — add name="contact" and data-netlify="true" to <form>.
     *
     *  4. Custom API endpoint.
     *
     * Until configured, the form shows a success state to demonstrate the UX flow.
     * ─────────────────────────────────────────────────────────────
     */
    try {
      await new Promise((res) => setTimeout(res, 900)); // ← replace with real call
      setStatus('success');
      // Auto-reset after 8 seconds
      setTimeout(() => { setStatus('idle'); setFormData(INITIAL); setTouched({}); }, 8000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  /* Shared input style helper */
  const getInputStyle = (field: keyof FormData) => ({
    borderColor: touched[field] && errors[field]
      ? 'var(--brand-danger)'
      : 'var(--border-default)',
  });

  const vp = { once: true, margin: '-50px' };

  return (
    <div className="page-top sections-gap">

      {/* ── HEADER ── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-2xl"
      >
        <span className="section-label">Get In Touch</span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          Let's Build Something Exceptional
        </h1>
        <p className="section-subtitle">
          Have an upcoming Salesforce program, integration requirement, or multi-cloud architecture
          challenge? Let's discuss how we can partner to deliver it.
        </p>
      </motion.header>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

        {/* ── LEFT: Contact info ── */}
        <div className="space-y-5">

          {/* Direct contact card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeInUp}
            className="card rounded-2xl p-6 sm:p-8 space-y-6"
          >
            <div>
              <h2 className="text-h3 mb-2" style={{ color: 'var(--text-primary)' }}>
                Direct Contact
              </h2>
              <p className="text-body-sm leading-[1.75]" style={{ color: 'var(--text-tertiary)' }}>
                Reach out via email or phone for Salesforce technical leadership, consulting, or
                contract enquiries.
              </p>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:devtushar211@gmail.com"
                className="flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: 'var(--interactive-default)',
                  borderColor: 'var(--border-default)',
                  outlineColor: 'var(--border-focus)',
                }}
                aria-label="Send email to devtushar211@gmail.com"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary-border)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--brand-primary-tint)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-default)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                  style={{ backgroundColor: 'var(--brand-primary-tint)', color: 'var(--brand-primary)' }}
                >
                  <Mail size={18} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-label" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Email</div>
                  <div
                    className="text-[14px] font-semibold truncate transition-colors duration-200"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    devtushar211@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919116312426"
                className="flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: 'var(--interactive-default)',
                  borderColor: 'var(--border-default)',
                  outlineColor: 'var(--border-focus)',
                }}
                aria-label="Call +91 9116312426"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--brand-secondary-tint)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-default)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0"
                  style={{ backgroundColor: 'var(--brand-secondary-tint)', color: 'var(--brand-secondary)' }}
                >
                  <Phone size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-label" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                    Phone / WhatsApp
                  </div>
                  <div className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                    +91 9116312426
                  </div>
                </div>
              </a>

              {/* Location */}
              <div
                className="flex items-center gap-4 p-3.5 rounded-xl border"
                style={{
                  backgroundColor: 'var(--interactive-default)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--brand-purple-tint)', color: 'var(--brand-purple)' }}
                >
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-label" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>Location</div>
                  <div className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                    India · Remote &amp; Worldwide Consulting
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Availability card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fadeInUp}
            className="card rounded-2xl p-6 sm:p-7 space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: 'var(--brand-emerald)' }}
                aria-hidden="true"
              />
              <h3 className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>
                Availability &amp; Response
              </h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: Clock,
                  color: 'var(--brand-secondary)',
                  text: <>Typical response time: <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>under 24 hours</strong></>,
                },
                {
                  icon: ShieldCheck,
                  color: 'var(--brand-emerald)',
                  text: 'NDA & Confidentiality friendly',
                },
                {
                  icon: CheckCircle,
                  color: 'var(--brand-emerald)',
                  text: 'Open to freelance, contract & full-time engagements',
                },
              ].map(({ icon: Icon, color, text }, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                  <Icon size={15} style={{ color, flexShrink: 0 }} aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Contact form ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeInUp}
          className="card rounded-2xl p-7 sm:p-9 lg:p-10"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {/* ── Success state ── */}
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="min-h-[420px] flex flex-col items-center justify-center text-center py-12 space-y-5"
            >
              <div
                className="w-20 h-20 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--brand-emerald-tint)',
                  borderColor: 'rgba(16,185,129,0.30)',
                  color: 'var(--brand-emerald)',
                  boxShadow: '0 0 24px rgba(16,185,129,0.15)',
                }}
              >
                <CheckCircle size={38} aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>
                  Message Sent!
                </h3>
                <p className="text-body-sm max-w-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll review your requirement and respond within 24 hours.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Form ── */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
              aria-label="Contact form"
            >
              {/* Form heading */}
              <div className="mb-7">
                <h2
                  className="text-h3 flex items-center gap-2 mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <MessageSquare size={20} style={{ color: 'var(--brand-primary)' }} aria-hidden="true" />
                  Start a Project Conversation
                </h2>
                <p className="text-caption leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  Fill out the form below — I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Error summary for screen readers */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl p-4 border text-[13px]"
                  style={{
                    backgroundColor: 'var(--brand-danger-tint)',
                    borderColor: 'rgba(220,38,38,0.25)',
                    color: 'var(--brand-danger)',
                  }}
                >
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              {/* Row 1: Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor={ids.name}
                    className="block text-label"
                    style={{ color: 'var(--text-secondary)', fontSize: '11px' }}
                  >
                    Your Name{' '}
                    <span style={{ color: 'var(--brand-primary)' }} aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id={ids.name}
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-describedby={errors.name ? ids.nameErr : undefined}
                    aria-invalid={touched.name && !!errors.name}
                    className="input-field"
                    style={getInputStyle('name')}
                    placeholder="Sarah Jenkins"
                  />
                  <FieldError id={ids.nameErr} message={touched.name ? errors.name : undefined} />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor={ids.company}
                    className="block text-label"
                    style={{ color: 'var(--text-secondary)', fontSize: '11px' }}
                  >
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    id={ids.company}
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enterprise Inc."
                  />
                </div>
              </div>

              {/* Row 2: Email + Project Focus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor={ids.email}
                    className="block text-label"
                    style={{ color: 'var(--text-secondary)', fontSize: '11px' }}
                  >
                    Work Email{' '}
                    <span style={{ color: 'var(--brand-primary)' }} aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id={ids.email}
                    name="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-describedby={errors.email ? ids.emailErr : undefined}
                    aria-invalid={touched.email && !!errors.email}
                    className="input-field"
                    style={getInputStyle('email')}
                    placeholder="sarah@company.com"
                  />
                  <FieldError id={ids.emailErr} message={touched.email ? errors.email : undefined} />
                </div>

                {/* Select with custom chevron */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={ids.requirement}
                    className="block text-label"
                    style={{ color: 'var(--text-secondary)', fontSize: '11px' }}
                  >
                    Project Focus
                  </label>
                  <div className="relative">
                    <select
                      id={ids.requirement}
                      name="requirement"
                      value={formData.requirement}
                      onChange={handleChange}
                      className="input-field appearance-none cursor-pointer pr-10"
                      style={{ color: formData.requirement ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      <option value="" disabled style={{ color: 'var(--text-muted)' }}>
                        Select a focus area…
                      </option>
                      <option value="Multi-Cloud CRM">Multi-Cloud CRM</option>
                      <option value="CPQ & Revenue Cloud">CPQ &amp; Revenue Cloud</option>
                      <option value="Apex & LWC Development">Apex &amp; LWC Development</option>
                      <option value="REST API Integration">REST API Integration</option>
                      <option value="DevOps & CI/CD">DevOps &amp; CI/CD</option>
                      <option value="CRM Analytics">CRM Analytics</option>
                      <option value="Other">Other</option>
                    </select>
                    {/* Custom dropdown chevron */}
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: 'var(--text-muted)' }}
                      aria-hidden="true"
                    >
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor={ids.message}
                  className="block text-label"
                  style={{ color: 'var(--text-secondary)', fontSize: '11px' }}
                >
                  Project Details &amp; Scope{' '}
                  <span style={{ color: 'var(--brand-primary)' }} aria-hidden="true">*</span>
                </label>
                <textarea
                  id={ids.message}
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-describedby={errors.message ? ids.messageErr : undefined}
                  aria-invalid={touched.message && !!errors.message}
                  className="input-field resize-none"
                  style={getInputStyle('message')}
                  placeholder="Share a brief overview of your business requirements, timeline, or technical challenges…"
                />
                <FieldError id={ids.messageErr} message={touched.message ? errors.message : undefined} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full"
                aria-busy={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} aria-hidden="true" />
                  </>
                )}
              </button>

              <p
                className="text-[11px] text-center"
                style={{ color: 'var(--text-muted)' }}
              >
                Fields marked <span style={{ color: 'var(--brand-primary)' }}>*</span> are required.
                Your information is kept strictly confidential.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
