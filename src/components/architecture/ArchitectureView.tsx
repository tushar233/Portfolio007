import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  FileText, Compass, Cloud, Cable, Database, Activity,
  CheckCircle, Search, PenTool, Code, Zap, Layout, Receipt,
  Shield, Rocket, TrendingUp, type LucideIcon,
} from 'lucide-react';
import { specializations } from '../../data/expertise';
import type { Specialization } from '../../data/expertise';
import { fadeInUp, staggerContainer } from '../../hooks/useAnimations';
import SectionReveal from '../ui/SectionReveal';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const layers = [
  {
    id: 0, tag: 'Layer 01',
    title: 'Business Requirements', icon: FileText,
    description: 'Understanding enterprise stakeholder needs, mapping complex business processes, defining success criteria, and translating business goals into robust technical specifications.',
    technologies: ['Requirements Analysis', 'Process Mapping', 'User Stories', 'Acceptance Criteria', 'Governance Board Alignment'],
  },
  {
    id: 1, tag: 'Layer 02',
    title: 'Solution Architecture', icon: Compass,
    description: 'Designing scalable Salesforce solutions — entity-relationship data models, sharing & security architecture, integration patterns, and multi-cloud strategies.',
    technologies: ['Data Modeling', 'ERD Design', 'Security Architecture', 'Governor Limit Strategy', 'Multi-Cloud Patterns'],
  },
  {
    id: 2, tag: 'Layer 03',
    title: 'Salesforce Platform Engine', icon: Cloud,
    description: 'Building core platform solutions with clean Apex, enterprise trigger frameworks, responsive Lightning Web Components, and high-performance Flow automations.',
    technologies: ['Apex Classes', 'Trigger Frameworks', 'LWC', 'Async Batch & Queueable', 'Flow Orchestrator', 'Platform Events'],
  },
  {
    id: 3, tag: 'Layer 04',
    title: 'Integration Layer', icon: Cable,
    description: 'Connecting Salesforce to external ERP, payment, and data systems through REST/SOAP APIs, Named Credentials, OAuth2.0, and event-driven architectures.',
    technologies: ['REST APIs', 'SOAP APIs', 'Named Credentials', 'Platform Events', 'Change Data Capture', 'Middleware Sync'],
  },
  {
    id: 4, tag: 'Layer 05',
    title: 'Data & External Systems', icon: Database,
    description: 'Managing enterprise data architectures, high-volume data strategies, external objects, Data Cloud ingestion, and automated data synchronisation.',
    technologies: ['Data Cloud', 'Large Data Volumes (LDV)', 'External Objects', 'Bulk API 2.0', 'ETL Data Pipelines'],
  },
  {
    id: 5, tag: 'Layer 06',
    title: 'DevOps & Monitoring', icon: Activity,
    description: 'Automated CI/CD pipelines, Git-based version control, scratch org provisioning, static code analysis (PMD), and production health monitoring.',
    technologies: ['Git & GitHub Actions', 'Salesforce CLI', 'Scratch Orgs', 'Apex Unit Testing', 'PMD Static Analysis', 'Event Monitoring'],
  },
];

const methodologySteps = [
  { id: '01', title: 'Discover',  icon: Search,     desc: 'Deep-dive into business requirements, stakeholder goals, legacy systems, and pain points before making any technical decisions.' },
  { id: '02', title: 'Design',    icon: PenTool,    desc: 'Create scalable solution architecture — data models, security frameworks, integration patterns, and governor-limit compliance strategy.' },
  { id: '03', title: 'Build',     icon: Code,       desc: 'Develop with clean bulkified Apex, reusable LWC components, and structured automations built for long-term maintainability.' },
  { id: '04', title: 'Validate',  icon: Shield,     desc: 'Rigorous testing — unit tests (90%+ coverage), integration test suites, UAT, and governor limit load testing.' },
  { id: '05', title: 'Deploy',    icon: Rocket,     desc: 'Controlled releases through Git CI/CD pipelines, automated deployments, and sandbox validation for zero-downtime releases.' },
  { id: '06', title: 'Optimise',  icon: TrendingUp, desc: 'Post-launch performance monitoring, SOQL query tuning, technical debt reduction, and continuous platform improvement.' },
];

const skillGroups = [
  { title: 'Salesforce Clouds', color: 'var(--brand-primary)',   skills: ['Sales Cloud','Service Cloud','Marketing Cloud','Data Cloud','CPQ & Revenue','Experience Cloud'] },
  { title: 'Apex & Backend',    color: 'var(--brand-secondary)', skills: ['Apex Classes','Trigger Frameworks','Batch Apex','Queueable Apex','Future Methods','Schedulable Apex','SOQL/SOSL'] },
  { title: 'Frontend & LWC',    color: 'var(--brand-purple)',    skills: ['Lightning Web Components','Aura Components','SLDS','Lightning Data Service','Lightning Message Service'] },
  { title: 'Integration & APIs',color: 'var(--brand-emerald)',   skills: ['REST APIs','SOAP APIs','Platform Events','Named Credentials','External Services','Change Data Capture'] },
  { title: 'Data & Security',   color: 'var(--brand-amber)',     skills: ['Data Modeling','Custom Objects','Security Model','Sharing Rules','Field-Level Security','Large Data Volumes'] },
  { title: 'Automation',        color: 'var(--brand-danger)',    skills: ['Flows','Flow Orchestrator','Approval Processes','Validation Rules','Assignment Rules','Escalation Rules'] },
  { title: 'DevOps & Tooling',  color: 'var(--brand-pink)',      skills: ['Git','GitHub Actions','Salesforce CLI','Scratch Orgs','Change Sets','Jest Unit Tests','PMD Analysis'] },
];

const panelVariant: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.20, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.14 } },
};

const specPanelVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

const specCardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const specProblemVariant: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.24, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

const SPEC_META: Record<string, { icon: LucideIcon; accent: string }> = {
  'apex-triggers':    { icon: Code,     accent: 'var(--brand-primary)' },
  'async-apex':       { icon: Zap,      accent: 'var(--brand-secondary)' },
  'lwc':              { icon: Layout,   accent: 'var(--brand-purple)' },
  'integrations':     { icon: Cable,    accent: 'var(--brand-emerald)' },
  'sf-clouds':        { icon: Cloud,    accent: 'var(--brand-primary)' },
  'cpq':              { icon: Receipt,  accent: 'var(--brand-amber)' },
  'data-architecture':{ icon: Database, accent: 'var(--brand-pink)' },
};

function SpecPanel({ spec }: { spec: Specialization }) {
  const meta = SPEC_META[spec.id] ?? { icon: Code, accent: 'var(--brand-primary)' };
  const Icon = meta.icon;

  return (
    <motion.div
      variants={specPanelVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="arch-spec-panel"
      style={{ '--spec-accent': meta.accent } as React.CSSProperties}
    >
      <motion.div variants={specCardVariant} className="arch-spec-panel-header">
        <div className="arch-spec-panel-icon" aria-hidden="true">
          <Icon size={22} />
        </div>
        <div className="arch-spec-panel-heading">
          <h3 className="arch-spec-panel-title">{spec.title}</h3>
        </div>
      </motion.div>

      <div className="arch-spec-cards">
        <motion.div variants={specCardVariant} className="arch-spec-card">
          <p className="arch-spec-card-label">What I Work On</p>
          <p className="arch-spec-card-body">{spec.whatIWorkOn}</p>
        </motion.div>

        <motion.div variants={specCardVariant} className="arch-spec-card arch-spec-card-problems">
          <p className="arch-spec-card-label arch-spec-card-label-emerald">Typical Problems Solved</p>
          <ul className="arch-spec-problems-list">
            {spec.problemsSolved.map((prob, i) => (
              <motion.li
                key={prob}
                custom={i}
                variants={specProblemVariant}
                className="arch-spec-problem-item"
              >
                <CheckCircle size={15} className="arch-spec-problem-icon" aria-hidden="true" />
                <span>{prob}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={specCardVariant} className="arch-spec-card">
          <p className="arch-spec-card-label">Key Technologies &amp; Tools</p>
          <div className="arch-spec-tech-grid">
            {spec.technologies.map((tech) => (
              <span key={tech} className="arch-spec-tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={specCardVariant} className="arch-spec-card arch-spec-card-approach">
          <p className="arch-spec-card-label">Engineering Approach</p>
          <p className="arch-spec-card-body">{spec.approach}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

const vp = { once: true, margin: '-50px' };

export default function ArchitectureView() {
  const [activeLayer,   setActiveLayer]   = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState(specializations[0]?.id || 'apex-triggers');

  const getPanelId = (id: number) => `arch-layer-panel-${id}`;
  const getTabId   = (id: number) => `arch-layer-tab-${id}`;

  return (
    <div className="page-top sections-gap">

      {/* ── HEADER ── */}
      <SectionReveal as="header" animation="fadeDown" className="page-section-header">
        <span className="section-label">Technical Depth &amp; Architecture</span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          Enterprise Salesforce Solution Architecture
        </h1>
        <p className="section-subtitle">
          From business requirements down to CI/CD pipelines — an interactive breakdown of my
          technical execution and architecture patterns.
        </p>
      </SectionReveal>

      {/* ══════════════════════════════════════════
          6-LAYER ARCHITECTURE STACK
          No outer card wrapper — layout lives on the page canvas.
          Left: clean list. Right: generous detail area.
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeInUp}
        aria-label="Layered Salesforce Solution Blueprint"
      >
        <div className="section-heading-block">
          <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
            Interactive System Stack
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Layered Salesforce Solution Blueprint
          </h2>
          <p className="section-subtitle mt-2">
            Select any layer to inspect the architecture and technologies used.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Left: refined layer navigation ── */}
          <div
            role="tablist"
            aria-label="Architecture layers"
            className="flex flex-col gap-0.5"
          >
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  id={getTabId(layer.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={getPanelId(layer.id)}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`group w-full flex items-center gap-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md ${isActive ? 'surface-row-active' : 'surface-row'}`}
                  style={{
                    padding: '1rem 1.125rem',
                    outlineColor: 'var(--border-focus)',
                  }}
                >
                  {/* Icon — accent when active, quiet when not */}
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--brand-primary)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                    }}
                  >
                    <Icon size={15} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span
                      className="block leading-none mb-0.5"
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--brand-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {layer.tag}
                    </span>
                    <span
                      className="text-[14px] font-semibold block transition-colors duration-200"
                      style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {layer.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Right: detail panel — generous padding, no nested boxes ── */}
          <div>
            {layers.map((layer) => {
              const isActive = activeLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  id={getPanelId(layer.id)}
                  role="tabpanel"
                  aria-labelledby={getTabId(layer.id)}
                  hidden={!isActive}
                >
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={layer.id}
                        variants={panelVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="surface-panel"
                      >
                        {/* Layer tag + heading */}
                        <p
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--brand-primary)',
                            marginBottom: '0.625rem',
                          }}
                        >
                          {layer.tag} Overview
                        </p>
                        <h3
                          className="text-h3 mb-6"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {layer.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-body leading-[1.88] mb-10"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {layer.description}
                        </p>

                        {/* Technologies — inline dot-separated */}
                        <div>
                          <p
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--text-muted)',
                              marginBottom: '1rem',
                            }}
                          >
                            Key Technologies &amp; Patterns
                          </p>
                          <p className="meta-inline text-[13px] leading-[2]">
                            {layer.technologies.join('  ·  ')}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════
          SPECIALIZATIONS DEEP-DIVE
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeInUp}
        aria-label="Development Specializations"
        className="arch-spec-section"
      >
        <div className="section-heading-block">
          <span className="section-label" style={{ color: 'var(--brand-purple)' }}>
            Deep-Dive Domains
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Salesforce Development Specializations
          </h2>
          <p className="section-subtitle mt-2">
            Explore each domain — capabilities, tooling, problems solved, and how I engineer solutions.
          </p>
        </div>

        <div className="arch-spec-shell">
          <div
            className="arch-spec-tabs scrollbar-hide"
            role="tablist"
            aria-label="Specialization areas"
          >
            {specializations.map((spec) => {
              const isActive = activeSpecTab === spec.id;
              const accent = SPEC_META[spec.id]?.accent ?? 'var(--brand-primary)';
              return (
                <button
                  key={spec.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`spec-panel-${spec.id}`}
                  id={`spec-tab-${spec.id}`}
                  onClick={() => setActiveSpecTab(spec.id)}
                  className={`arch-spec-tab focus-visible:outline-2 focus-visible:outline-offset-1${isActive ? ' arch-spec-tab-active' : ''}`}
                  style={{
                    outlineColor: 'var(--border-focus)',
                    ...(isActive ? { '--spec-accent': accent } : {}),
                  } as React.CSSProperties}
                >
                  {spec.title}
                  {isActive && (
                    <motion.span
                      layoutId="archSpecTabIndicator"
                      className="arch-spec-tab-indicator"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="arch-spec-layout">
            {specializations.map((spec) => {
              const isActive = activeSpecTab === spec.id;
              return (
                <div
                  key={spec.id}
                  id={`spec-panel-${spec.id}`}
                  role="tabpanel"
                  aria-labelledby={`spec-tab-${spec.id}`}
                  hidden={!isActive}
                >
                  <AnimatePresence mode="wait">
                    {isActive && <SpecPanel key={spec.id} spec={spec} />}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════
          6-STEP METHODOLOGY
          Cards kept — they are meaningful self-contained items.
          Reduced internal nesting (icon box: no border, no bg-elevated).
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={staggerContainer}
        aria-label="Project Delivery Methodology"
        className="space-y-8"
      >
        <motion.div variants={fadeInUp}>
          <span className="section-label" style={{ color: 'var(--brand-emerald)' }}>
            Delivery Lifecycle
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            How I Approach Every Enterprise Project
          </h2>
        </motion.div>

        <div className="methodology-flow">
          {methodologySteps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === methodologySteps.length - 1;
            return (
              <motion.div
                key={step.id}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                variants={fadeInUp}
                transition={{ delay: i * 0.065 }}
                className="methodology-step group"
              >
                <div className="methodology-step-rail" aria-hidden="true">
                  <span className="methodology-step-number">{step.id}</span>
                  {!isLast && <span className="methodology-step-connector" />}
                </div>

                <div className="methodology-step-body">
                  <div className="methodology-step-icon" style={{ color: 'var(--brand-primary)' }}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="methodology-step-title">{step.title}</h3>
                  <p className="methodology-step-desc">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════
          TECHNICAL SKILLS MATRIX
          No outer card. Groups: accent color dot + title + inline plain text.
          No bordered skill chips.
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeInUp}
        aria-label="Technical Skills Matrix"
      >
        <div className="section-heading-block">
          <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
            Complete Stack
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Core Technical Skills &amp; Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
          {skillGroups.map((group) => (
            <div key={group.title}>
              {/* Group header — colour dot + title, no box */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: group.color }}
                  aria-hidden="true"
                />
                <h3
                  className="text-[13px] font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {group.title}
                </h3>
              </div>

              {/* Skills — plain text with subtle separator */}
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-[13px]"
                    style={{ color: 'var(--text-tertiary)', lineHeight: 1.5 }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
