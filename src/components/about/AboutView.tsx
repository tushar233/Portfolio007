import { motion } from 'framer-motion';
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  useAnimatedCounter,
} from '../../hooks/useAnimations';
import { certifications } from '../../data/expertise';
import { Award, Users, Shield, HeartHandshake, CheckCircle } from 'lucide-react';

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

export default function AboutView() {
  const { count: yrs, ref: yrsRef } = useAnimatedCounter(7);
  const { count: cls, ref: clsRef } = useAnimatedCounter(6);
  const { count: prs, ref: prsRef } = useAnimatedCounter(20);

  return (
    <div className="page-top sections-gap">

      {/* ── PAGE HEADER ── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-3xl"
      >
        <motion.span variants={fadeInUp} className="section-label">
          About Me &amp; My Background
        </motion.span>
        <motion.h1 variants={fadeInUp} className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          The Engineer Behind the Architecture
        </motion.h1>
        <motion.p variants={fadeInUp} className="section-subtitle">
          Over 7+ years of engineering robust Salesforce multi-cloud platforms, bridging enterprise
          business requirements with deep technical execution.
        </motion.p>
      </motion.header>

      {/* ── STORY + STATS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

        {/* Story — no card wrapper, just clean text on the page canvas */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={slideInLeft}
          className="lg:col-span-3 flex flex-col gap-6"
        >
          <h2 className="text-h3" style={{ color: 'var(--text-primary)' }}>
            My Salesforce Engineering Journey
          </h2>

          <div className="space-y-5">
            {[
              <>
                Over seven years ago, I began my journey in the Salesforce ecosystem — not just learning
                standard declarative tools, but deeply understanding how enterprise businesses operate,
                where data bottlenecks occur, and how robust architecture solves operational chaos.
              </>,
              <>
                Today, as a{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Lead Salesforce Developer</span>,
                I architect and build solutions across{' '}
                <span style={{ color: 'var(--brand-secondary)', fontWeight: 500 }}>
                  Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, CPQ, and Experience Cloud
                </span>
                . My work spans custom Apex frameworks, responsive Lightning Web Components, multi-system
                REST integrations, and event-driven architectures.
              </>,
              <>
                I approach every project with an{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>architecture-first mindset</span>{' '}
                — understanding data models, governor limits, security permissions, and edge cases before
                writing a single line of code.
              </>,
            ].map((para, i) => (
              <p
                key={i}
                className="text-body leading-[1.85]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Engineering principles — plain checklist, no pills/borders */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={staggerKids}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
          >
            {principles.map((t) => (
              <motion.div
                key={t}
                variants={kid}
                className="flex items-center gap-2.5 text-body-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                <CheckCircle size={13} style={{ color: 'var(--brand-emerald)', flexShrink: 0 }} aria-hidden="true" />
                <span>{t}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats — numbers on the canvas, no card borders */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={slideInRight}
          className="lg:col-span-2 grid grid-cols-2 gap-x-8 gap-y-10"
        >
          {[
            { refEl: yrsRef, val: yrs, sfx: '+', lbl: 'Years Salesforce Experience',   accent: 'var(--text-primary)'     },
            { refEl: clsRef, val: cls, sfx: '+', lbl: 'Salesforce Clouds Mastered',    accent: 'var(--brand-secondary)'  },
            { refEl: prsRef, val: prs, sfx: '+', lbl: 'Enterprise Projects Delivered', accent: 'var(--brand-emerald)'    },
          ].map(({ refEl, val, sfx, lbl, accent }) => (
            <div key={lbl} ref={refEl}>
              <div
                className="text-5xl font-black leading-none mb-2"
                style={{ color: accent, letterSpacing: '-0.03em' }}
              >
                {val}{sfx}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  lineHeight: 1.4,
                }}
              >
                {lbl}
              </div>
            </div>
          ))}

          <div>
            <div
              className="text-3xl font-black leading-none mb-2"
              style={{ color: 'var(--brand-purple)', letterSpacing: '-0.02em' }}
            >
              End-to-End
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                lineHeight: 1.4,
              }}
            >
              Full CRM Lifecycle Architecture
            </div>
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
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={kid}
              className="flex items-start gap-4"
              style={{
                padding: '1.25rem 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {/* Badge icon — gradient colour, no outer card */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cert.badgeColor} flex items-center justify-center text-white shrink-0`}
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
