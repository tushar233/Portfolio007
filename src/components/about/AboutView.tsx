import { motion } from 'framer-motion';
import {
  fadeInUp,
  slideInLeft,
} from '../../hooks/useAnimations';
import SectionReveal from '../ui/SectionReveal';
import { getOrderedCertifications } from '../../data/expertise';
import {
  Award, Users, Shield, HeartHandshake, CheckCircle,
  Radio, Eye, Compass, RefreshCw, TrendingUp, Bug,
  type LucideIcon,
} from 'lucide-react';

const vp = { once: true, margin: '-50px' };

const staggerKids = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
};
const kid = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const mascots = [
  {
    name: 'Codey',
    role: 'Developer Bear',
    desc: 'Apex, LWC, trigger architecture, and asynchronous processing — the backbone of custom Salesforce development.',
    accent: 'var(--brand-primary)',
  },
  {
    name: 'Einstein',
    role: 'AI & Data Genius',
    desc: 'Powering predictive scoring, CRM Analytics, and intelligent workflow automations across the platform.',
    accent: 'var(--brand-purple)',
  },
  {
    name: 'Appy',
    role: 'App Builder & Flow Lead',
    desc: 'Declarative excellence — Flows, Orchestrators, Lightning Pages, and seamless AppExchange integrations.',
    accent: 'var(--brand-emerald)',
  },
  {
    name: 'Ruth',
    role: 'Admin & Governance Pro',
    desc: 'Enterprise security models, role hierarchies, sharing rules, and audit-compliant data models at scale.',
    accent: 'var(--brand-amber)',
  },
];

const leadership = [
  {
    icon: Users,
    accent: 'var(--brand-primary)',
    tint: 'var(--brand-primary-tint)',
    title: 'Technical Leadership',
    desc: 'Leading engineering sprints, mentoring developers in Apex/LWC best practices, and conducting architectural code reviews across multi-cloud programs.',
  },
  {
    icon: Shield,
    accent: 'var(--brand-secondary)',
    tint: 'var(--brand-secondary-tint)',
    title: 'Architecture Governance',
    desc: 'Ensuring governor limit compliance, strict security models, unit test coverage standards, and zero technical debt across the platform.',
  },
  {
    icon: HeartHandshake,
    accent: 'var(--brand-emerald)',
    tint: 'var(--brand-emerald-tint)',
    title: 'Stakeholder Partnership',
    desc: 'Translating complex business processes into clear Salesforce solution designs that product owners and C-level executives understand and act on.',
  },
];

const principles = [
  'Architecture-first approach',
  'Governor limit mastery',
  '90%+ test coverage standard',
  'Zero technical debt philosophy',
];

const VALUE_PROPOSITIONS: { title: string; icon: LucideIcon; accent: string }[] = [
  {
    title: 'Systems that talk to each other, automatically',
    icon: Radio,
    accent: 'var(--brand-primary)',
  },
  {
    title: 'One customer view, every channel',
    icon: Eye,
    accent: 'var(--brand-secondary)',
  },
  {
    title: 'Clear plan before a single line of code',
    icon: Compass,
    accent: 'var(--brand-purple)',
  },
  {
    title: 'No costly rework down the line',
    icon: RefreshCw,
    accent: 'var(--brand-emerald)',
  },
  {
    title: 'Built to scale with your business',
    icon: TrendingUp,
    accent: 'var(--brand-amber)',
  },
  {
    title: 'Fewer bugs, fewer fire-drills',
    icon: Bug,
    accent: 'var(--brand-pink)',
  },
];

export default function AboutView() {
  const orderedCerts = getOrderedCertifications();

  return (
    <div className="page-top sections-gap">

      {/* ── PAGE HEADER ── */}
      <SectionReveal as="header" animation="fadeDown" className="page-section-header">
        <span className="section-label">About Me &amp; My Background</span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          The Engineer Behind the Architecture
        </h1>
        <p className="section-subtitle">
          Over 7+ years of engineering robust Salesforce multi-cloud platforms, bridging enterprise
          business requirements with deep technical execution.
        </p>
      </SectionReveal>

      {/* ── STORY + STATS ── */}
      <div className="about-story-layout">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={slideInLeft}
          className="about-story-panel"
        >
          <h2 className="about-story-heading">My Salesforce Engineering Journey</h2>

          <div className="about-story-body">
            {[
              <>
                Over seven years ago, I began my journey in the Salesforce ecosystem — not just learning
                standard declarative tools, but deeply understanding how enterprise businesses operate,
                where data bottlenecks occur, and how robust architecture solves operational chaos.
              </>,
              <>
                Today, as a{' '}
                <span className="about-story-emphasis">Lead Salesforce Developer</span>,
                I architect and build solutions across{' '}
                <span className="about-story-highlight">
                  Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, CPQ, and Experience Cloud
                </span>
                . My work spans custom Apex frameworks, responsive Lightning Web Components, multi-system
                REST integrations, and event-driven architectures.
              </>,
              <>
                I approach every project with an{' '}
                <span className="about-story-emphasis">architecture-first mindset</span>{' '}
                — understanding data models, governor limits, security permissions, and edge cases before
                writing a single line of code.
              </>,
            ].map((para, i) => (
              <p key={i} className="about-story-paragraph">{para}</p>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={staggerKids}
            className="about-principles-grid"
          >
            {principles.map((t) => (
              <motion.div key={t} variants={kid} className="about-principle-item">
                <CheckCircle size={15} className="about-principle-icon" aria-hidden="true" />
                <span>{t}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerKids}
          className="about-value-panel"
        >
          <h2 className="about-value-heading">What Clients Get</h2>
          <p className="about-value-lead">
            Outcomes I design for on every engagement — not just features shipped.
          </p>
          <div className="about-value-grid">
            {VALUE_PROPOSITIONS.map(({ title, icon: Icon, accent }) => (
              <motion.article
                key={title}
                variants={kid}
                className="about-value-card group"
                style={{ '--value-accent': accent } as React.CSSProperties}
              >
                <div className="about-value-icon" aria-hidden="true">
                  <Icon size={18} />
                </div>
                <p className="about-value-text">{title}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <section aria-label="Salesforce Certifications">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeInUp}
          className="section-heading-block flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
        >
          <div>
            <span className="section-label flex items-center gap-1.5" style={{ color: 'var(--brand-emerald)' }}>
              <Award size={12} aria-hidden="true" /> Official Certifications
            </span>
            <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
              Salesforce Credentials &amp; Badges
            </h2>
          </div>
          {/* Status — plain text, no pill border */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pb-1">
            <span
              className="w-[7px] h-[7px] rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--brand-emerald)' }}
              aria-hidden="true"
            />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
              Verified Salesforce Trailblazer
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerKids}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {orderedCerts.map((cert) => (
            <motion.div
              key={cert.title}
              variants={kid}
              className="flex items-start gap-4 py-4"
            >
              {/* Badge icon — gradient colour, no outer card */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cert.badgeColor} flex items-center justify-center text-on-brand shrink-0`}
              >
                <Award size={16} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                {/* Category — plain text, no pill */}
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-primary)',
                    marginBottom: '0.375rem',
                  }}
                >
                  {cert.category}
                </p>
                <h3
                  className="text-[14px] font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {cert.title}
                </h3>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Issued by {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PLATFORM FOUNDATIONS ── */}
      <section aria-label="Salesforce Platform Foundations">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeInUp}
          className="section-heading-block"
        >
          <span className="section-label" style={{ color: 'var(--brand-purple)' }}>
            Ecosystem Passion
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Salesforce Platform Foundations
          </h2>
        </motion.div>

        {/* Mascots — no tinted bordered boxes; left accent bar does the work */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerKids}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mascots.map((m) => (
            <motion.div
              key={m.name}
              variants={kid}
              style={{
                paddingLeft: '1.125rem',
                borderLeft: '2px solid',
                borderLeftColor: m.accent,
              }}
            >
              <h3
                className="text-[16px] font-black mb-0.5"
                style={{ color: m.accent }}
              >
                {m.name}
              </h3>
              <p
                className="mb-3"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.11em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                {m.role}
              </p>
              <p className="text-body-sm leading-[1.75]" style={{ color: 'var(--text-secondary)' }}>
                {m.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section aria-label="Leadership and Collaboration">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeInUp}
          className="section-heading-block"
        >
          <span className="section-label">How I Work</span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Leadership &amp; Collaboration
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={staggerKids}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {leadership.map(({ icon: Icon, accent, tint, title, desc }) => (
            <motion.div
              key={title}
              variants={kid}
              className="flex flex-col gap-4"
            >
              {/* Icon without a box — just the tinted colour */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: tint, color: accent }}
              >
                <Icon size={20} aria-hidden="true" />
              </div>
              <div>
                <h3
                  className="text-[16px] font-bold mb-2.5"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-body-sm leading-[1.82]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  );
}
