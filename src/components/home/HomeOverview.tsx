import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  useTypewriter,
  useParticleCanvas,
  useAnimatedCounter,
  fadeInUp,
  staggerContainer,
} from '../../hooks/useAnimations';
import { projects } from '../../data/projects';
import { certifications } from '../../data/expertise';
import {
  ArrowRight, Cloud, Code2, ShieldCheck, ExternalLink,
  Award, Sparkles, Zap, Building2, Landmark, Receipt,
  Globe, BarChart3, GitBranch, Mail,
} from 'lucide-react';
import CloudOrbit from './CloudOrbit';

const iconMap: Record<string, React.ElementType> = {
  Building2, Landmark, Receipt, Globe, BarChart3, GitBranch,
};

interface HomeOverviewProps {
  setActiveTab: (tab: string) => void;
}

const vp = { once: true, margin: '-50px' };

export default function HomeOverview({ setActiveTab }: HomeOverviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  const typewriterText = useTypewriter(
    [
      'Designing scalable enterprise Salesforce architectures.',
      'Building intelligent multi-cloud CRM ecosystems.',
      'Engineering Apex, LWC, and REST integrations.',
      'Transforming complex workflows into clean automation.',
    ],
    58, 30, 2400,
  );

  const { count: expCount,      ref: expRef      } = useAnimatedCounter(7);
  const { count: cloudsCount,   ref: cloudsRef   } = useAnimatedCounter(6);
  const { count: projectsCount, ref: projectsRef } = useAnimatedCounter(20);

  return (
    <div className="page-top sections-gap">

      {/* ════════════════════════════════════════════
          HERO
          Two-column: text left, CloudOrbit right.
          min-h accounts for 72px navbar.
      ════════════════════════════════════════════ */}
      <section
        aria-label="Hero introduction"
        className="relative w-full flex items-center overflow-visible"
        style={{ minHeight: 'calc(100svh - 72px)', paddingTop: '2rem', paddingBottom: '3rem' }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none w-full h-full"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-8 items-center">

          {/* ── LEFT ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp}>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase"
                style={{
                  borderColor: 'var(--brand-primary-border)',
                  backgroundColor: 'var(--brand-primary-tint)',
                  color: 'var(--brand-primary)',
                  letterSpacing: '0.10em',
                }}
              >
                <span
                  className="w-[7px] h-[7px] rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: 'var(--brand-emerald)' }}
                  aria-hidden="true"
                />
                Lead Salesforce Developer &amp; Architect
              </span>
            </motion.div>

            {/* Main headline — refined scale */}
            <motion.div variants={fadeInUp}>
              <h1
                className="text-display"
                style={{ color: 'var(--text-primary)', lineHeight: 1.00 }}
              >
                Architecting<br />
                <span className="gradient-text-wide">Enterprise</span><br />
                Salesforce
              </h1>
            </motion.div>

            {/* Typewriter line */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center min-h-[1.5rem]"
              style={{ color: 'var(--text-tertiary)', fontSize: '1rem', fontWeight: 450 }}
              aria-live="polite"
              aria-atomic="true"
            >
              <span>{typewriterText}</span>
              <span className="typewriter-cursor" aria-hidden="true" />
            </motion.div>

            {/* Narrative */}
            <motion.p
              variants={fadeInUp}
              className="text-body-lg leading-[1.82]"
              style={{ color: 'var(--text-secondary)', maxWidth: '38ch' }}
            >
              Building mission-critical solutions across{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                Sales Cloud, Service Cloud, Data Cloud, CPQ
              </span>{' '}
              and custom{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                Apex &amp; LWC
              </span>{' '}
              — 7+ years, enterprise scale, zero shortcuts.
            </motion.p>

            {/* Stats strip */}
            <motion.div
              variants={fadeInUp}
              className="flex items-stretch gap-0 pt-1"
            >
              {[
                { refEl: expRef,      value: expCount,      suffix: '+', label: 'Years Exp.',  color: 'var(--text-primary)'   },
                { refEl: cloudsRef,   value: cloudsCount,   suffix: '+', label: 'SF Clouds',   color: 'var(--brand-secondary)'},
                { refEl: projectsRef, value: projectsCount, suffix: '+', label: 'Projects',    color: 'var(--brand-emerald)'  },
              ].map(({ refEl, value, suffix, label, color }, i) => (
                <div
                  key={label}
                  ref={refEl}
                  className={`flex flex-col gap-1 ${i > 0 ? 'pl-7 sm:pl-9 border-l' : 'pr-7 sm:pr-9'}`}
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <span
                    className="text-4xl sm:text-5xl font-black leading-none tabular-nums"
                    style={{ color, letterSpacing: '-0.03em' }}
                  >
                    {value}{suffix}
                  </span>
                  <span
                    style={{
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => setActiveTab('contact')}
                className="btn-primary"
              >
                Get In Touch
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className="btn-ghost"
              >
                View My Work
              </button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: CloudOrbit ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.70, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
            className="hidden lg:flex items-center justify-center"
            style={{ width: 'min(480px, 45vw)' }}
            aria-hidden="true"
          >
            <CloudOrbit />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CORE COMPETENCIES
      ════════════════════════════════════════════ */}
      <section aria-label="Core Salesforce Competencies">
        <div className="section-heading-block">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="section-label" style={{ color: 'var(--brand-primary)' }}>
                Expertise Overview
              </span>
              <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                Core Salesforce Competencies
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('architecture')}
              className="flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:opacity-70 shrink-0 pb-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
              style={{ color: 'var(--brand-secondary)', outlineColor: 'var(--border-focus)' }}
            >
              All Skills &amp; Architecture <ArrowRight size={13} aria-hidden="true" />
            </button>
          </div>
          <p className="section-subtitle mt-3">
            Deep expertise across the complete Salesforce platform — from cloud configuration and Apex
            engineering to integration architecture and DevOps delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            {
              icon: Cloud,
              accentColor: 'var(--brand-primary)',
              tint: 'var(--brand-primary-tint)',
              hoverBorder: 'var(--brand-primary-border)',
              title: 'Multi-Cloud Strategy',
              desc: 'Cross-cloud architectures across Sales Cloud, Service Cloud, Data Cloud, Experience Cloud, and CPQ.',
            },
            {
              icon: Code2,
              accentColor: 'var(--brand-secondary)',
              tint: 'var(--brand-secondary-tint)',
              hoverBorder: 'rgba(3,105,161,0.22)',
              title: 'Apex & LWC Engineering',
              desc: 'Enterprise trigger frameworks, high-volume async processing, and reactive Lightning Web Component UIs.',
            },
            {
              icon: Zap,
              accentColor: 'var(--brand-purple)',
              tint: 'var(--brand-purple-tint)',
              hoverBorder: 'rgba(109,40,217,0.20)',
              title: 'REST API & Event Sync',
              desc: 'Secure REST/SOAP endpoints, Platform Events, OAuth2 Named Credentials, and bidirectional ERP syncs.',
            },
            {
              icon: ShieldCheck,
              accentColor: 'var(--brand-emerald)',
              tint: 'var(--brand-emerald-tint)',
              hoverBorder: 'rgba(4,120,87,0.20)',
              title: 'DevOps & Governance',
              desc: 'Scratch org CI/CD workflows, automated unit testing, PMD static code analysis, and release management.',
            },
          ].map(({ icon: Icon, accentColor, tint, hoverBorder, title, desc }) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fadeInUp}
              className="card p-6 group cursor-default"
              style={{ transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = hoverBorder;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0 group-hover:scale-105 transition-transform duration-200"
                style={{ backgroundColor: tint, color: accentColor }}
              >
                <Icon size={19} aria-hidden="true" />
              </div>
              <h3 className="text-h4 mb-2.5" style={{ color: 'var(--text-primary)' }}>
                {title}
              </h3>
              <p className="text-body-sm leading-[1.72]" style={{ color: 'var(--text-tertiary)' }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURED CASE STUDIES
      ════════════════════════════════════════════ */}
      <section aria-label="Featured Case Studies">
        <div className="section-heading-block">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
                Verified Deliveries
              </span>
              <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                Featured Enterprise Case Studies
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-[12px] font-medium transition-all duration-200 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: 'var(--border-default)',
                backgroundColor: 'var(--interactive-default)',
                color: 'var(--text-secondary)',
                outlineColor: 'var(--border-focus)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-default)'; }}
            >
              All 6 Case Studies <ExternalLink size={12} aria-hidden="true" />
            </button>
          </div>
          <p className="section-subtitle mt-3">
            Real-world enterprise deliveries spanning multi-cloud CRM, CPQ quote-to-cash, loan origination,
            Experience Cloud portals, and CI/CD modernisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((project, i) => {
            const Icon = iconMap[project.icon] || Building2;
            return (
              <motion.button
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                variants={fadeInUp}
                transition={{ delay: i * 0.09 }}
                onClick={() => setActiveTab('projects')}
                className="card group overflow-hidden flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  outlineColor: 'var(--border-focus)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary-border)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {/* Banner */}
                <div
                  className={`h-28 w-full bg-gradient-to-br ${project.gradient} relative flex items-center justify-center shrink-0`}
                >
                  <Icon
                    className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: 'rgba(255,255,255,0.32)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide font-semibold backdrop-blur-sm border"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.45)',
                      color: 'rgba(255,255,255,0.88)',
                      borderColor: 'rgba(255,255,255,0.12)',
                    }}
                  >
                    {project.industry.split('&')[0].trim()}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-grow gap-3">
                  <div>
                    <h3
                      className="text-[14px] font-semibold leading-snug line-clamp-2 transition-colors duration-150"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-[13px] mt-2 line-clamp-2 leading-[1.68]"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {project.challenge}
                    </p>
                  </div>

                  <div
                    className="mt-auto pt-3 border-t flex items-center justify-between gap-2"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                      {project.technologies.slice(0, 2).join(' · ')}
                    </p>
                    <span
                      className="text-[12px] font-medium flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      Details <ArrowRight size={11} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CERTIFICATIONS
      ════════════════════════════════════════════ */}
      <section aria-label="Salesforce Certifications">
        <div className="section-heading-block flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <span
              className="section-label flex items-center gap-1.5"
              style={{ color: 'var(--brand-emerald)' }}
            >
              <Award size={12} aria-hidden="true" /> Verified Credentials
            </span>
            <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
              Salesforce Certifications
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('about')}
            className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70 shrink-0 pb-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
            style={{ color: 'var(--brand-secondary)', outlineColor: 'var(--border-focus)' }}
          >
            View Details <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fadeInUp}
              transition={{ delay: i * 0.055 }}
              className="text-center cursor-default"
            >
              <div
                className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr ${cert.badgeColor} flex items-center justify-center text-white mb-3`}
              >
                <Sparkles size={14} aria-hidden="true" />
              </div>
              <div
                className="text-[12px] font-semibold line-clamp-2 leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {cert.title}
              </div>
              <div
                className="mt-1"
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                {cert.category}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeInUp}
        aria-label="Call to action"
        className="rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden border"
        style={{
          background: 'var(--gradient-cta-surface)',
          borderColor: 'var(--brand-primary-border)',
          marginBottom: '0.5rem',
        }}
      >
        {/* Very subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(var(--border-subtle) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.9,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-xl mx-auto space-y-5">
          <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
            Have an Enterprise Salesforce Requirement?
          </h2>
          <p
            className="text-body-lg leading-[1.78]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Let's discuss how multi-cloud architecture, custom Apex/LWC development, and CPQ automation
            can deliver measurable business value.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-1">
            <button
              onClick={() => setActiveTab('contact')}
              className="btn-primary"
            >
              Start a Conversation
            </button>
            <a
              href="mailto:devtushar211@gmail.com"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <Mail size={14} aria-hidden="true" /> Email Directly
            </a>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
