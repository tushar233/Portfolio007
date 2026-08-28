import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, CheckCircle, Clock,
  ShieldCheck, Send, MessageSquare, ChevronDown, AlertCircle,
} from 'lucide-react';
import { fadeInUp } from '../../hooks/useAnimations';

type FormData = {
  name: string;
  company: string;
  email: string;
  requirement: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = { name: '', company: '', email: '', requirement: '', message: '' };

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim())    errors.name    = 'Your name is required.';
  if (!data.email.trim())   errors.email   = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
                            errors.email   = 'Please enter a valid email address.';
  if (!data.message.trim()) errors.message = 'Please describe your project or requirement.';
  return errors;
}

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

export default function ContactView() {
  const formId = useId();
  const [formData, setFormData]     = useState<FormData>(INITIAL);
  const [errors,   setErrors]       = useState<FormErrors>({});
  const [touched,  setTouched]      = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status,   setStatus]       = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');
    try {
      await new Promise((res) => setTimeout(res, 900));
      setStatus('success');
      setTimeout(() => { setStatus('idle'); setFormData(INITIAL); setTouched({}); }, 8000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const getInputStyle = (field: keyof FormData) => ({
    borderColor: touched[field] && errors[field]
      ? 'var(--brand-danger)'
      : 'var(--border-default)',
  });

  return (
    <div className="page-top page-contact">
      <div className="contact-page-shell">

        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="contact-page-header"
        >
          <span className="section-label">Contact</span>
          <h1 className="text-h1 mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>
            Let's Build Something Exceptional
          </h1>
          <p className="section-subtitle mx-auto">
            Share your Salesforce program, integration, or architecture requirement — I'll respond
            within 24 hours.
          </p>
        </motion.header>

        <div className="contact-page-grid">

          {/* Left — form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeInUp}
            className="contact-form-panel"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="contact-success"
              >
                <div className="contact-success-icon">
                  <CheckCircle size={38} aria-hidden="true" />
                </div>
                <h3 className="text-h3" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                <p className="text-body-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll review your requirement and respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form" aria-label="Contact form">
                <div className="contact-form-head">
                  <h2 className="contact-form-title">
                    <MessageSquare size={20} aria-hidden="true" />
                    Start a Project Conversation
                  </h2>
                  <p className="contact-form-subtitle">
                    Fill out the form below — all required fields are marked with *.
                  </p>
                </div>

                {status === 'error' && (
                  <div role="alert" className="contact-form-error">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <div className="contact-form-grid-2">
                  <div className="contact-field">
                    <label htmlFor={ids.name} className="contact-field-label">
                      Your Name <span aria-hidden="true">*</span>
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

                  <div className="contact-field">
                    <label htmlFor={ids.company} className="contact-field-label">
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

                <div className="contact-form-grid-2">
                  <div className="contact-field">
                    <label htmlFor={ids.email} className="contact-field-label">
                      Work Email <span aria-hidden="true">*</span>
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

                  <div className="contact-field">
                    <label htmlFor={ids.requirement} className="contact-field-label">
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
                        <option value="" disabled>Select a focus area…</option>
                        <option value="Multi-Cloud CRM">Multi-Cloud CRM</option>
                        <option value="CPQ & Revenue Cloud">CPQ &amp; Revenue Cloud</option>
                        <option value="Apex & LWC Development">Apex &amp; LWC Development</option>
                        <option value="REST API Integration">REST API Integration</option>
                        <option value="DevOps & CI/CD">DevOps &amp; CI/CD</option>
                        <option value="CRM Analytics">CRM Analytics</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown size={16} className="contact-select-chevron" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor={ids.message} className="contact-field-label">
                    Project Details &amp; Scope <span aria-hidden="true">*</span>
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

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full"
                  aria-busy={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

                <p className="contact-form-footnote">
                  Your information is kept strictly confidential.
                </p>
              </form>
            )}
          </motion.div>

          {/* Right — direct contact */}
          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
            className="contact-info-panel"
            aria-label="Direct contact information"
          >
            <h2 className="contact-info-title">Direct Contact</h2>
            <p className="contact-info-desc">
              Reach out for Salesforce technical leadership, consulting, or contract enquiries.
            </p>

            <ul className="contact-info-list">
              <li>
                <a href="mailto:devtushar211@gmail.com" className="contact-info-row" aria-label="Email devtushar211@gmail.com">
                  <span className="contact-info-icon contact-info-icon-primary">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  <span className="contact-info-text">
                    <span className="contact-info-label">Email</span>
                    <span className="contact-info-value">devtushar211@gmail.com</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+919116312426" className="contact-info-row" aria-label="Call +91 9116312426">
                  <span className="contact-info-icon contact-info-icon-secondary">
                    <Phone size={16} aria-hidden="true" />
                  </span>
                  <span className="contact-info-text">
                    <span className="contact-info-label">Phone / WhatsApp</span>
                    <span className="contact-info-value">+91 9116312426</span>
                  </span>
                </a>
              </li>
              <li>
                <div className="contact-info-row contact-info-row-static">
                  <span className="contact-info-icon contact-info-icon-purple">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span className="contact-info-text">
                    <span className="contact-info-label">Location</span>
                    <span className="contact-info-value">India · Remote &amp; Worldwide</span>
                  </span>
                </div>
              </li>
            </ul>

            <div className="contact-availability">
              <div className="contact-availability-head">
                <span className="contact-status-dot" aria-hidden="true" />
                <h3>Availability &amp; Response</h3>
              </div>
              <ul className="contact-availability-list">
                <li>
                  <Clock size={15} aria-hidden="true" />
                  <span>Typical response time: <strong>under 24 hours</strong></span>
                </li>
                <li>
                  <ShieldCheck size={15} aria-hidden="true" />
                  <span>NDA &amp; Confidentiality friendly</span>
                </li>
                <li>
                  <CheckCircle size={15} aria-hidden="true" />
                  <span>Open to freelance, contract &amp; full-time engagements</span>
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
