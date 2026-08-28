import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  FileText, Compass, Cloud, Cable, Database, Activity,
  CheckCircle, Search, PenTool, Code,
  Shield, Rocket, TrendingUp,
} from 'lucide-react';
import { specializations } from '../../data/expertise';
import { fadeInUp, staggerContainer } from '../../hooks/useAnimations';

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

const vp = { once: true, margin: '-50px' };

export default function ArchitectureView() {
  const [activeLayer,   setActiveLayer]   = useState(2);
  const [activeSpecTab, setActiveSpecTab] = useState(specializations[0]?.id || 'apex-triggers');

  const currentSpec = specializations.find((s) => s.id === activeSpecTab) ?? specializations[0];

  const getPanelId = (id: number) => `arch-layer-panel-${id}`;
  const getTabId   = (id: number) => `arch-layer-tab-${id}`;

  return (
    <div className="page-top sections-gap">

      {/* ── HEADER ── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-3xl"
      >
        <span className="section-label">Technical Depth &amp; Architecture</span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          Enterprise Salesforce Solution Architecture
        </h1>
        <p className="section-subtitle">
          From business requirements down to CI/CD pipelines — an interactive breakdown of my
          technical execution and architecture patterns.
        </p>
      </motion.header>

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-3 lg:gap-10 items-start">

          {/* ── Left: layer list — no individual card borders, use spacing + active state ── */}
          <div
            role="tablist"
            aria-label="Architecture layers"
            className="flex flex-col"
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
                  className="group w-full flex items-center gap-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-xl"
                  style={{
                    padding: '0.875rem 1rem',
                    outlineColor: 'var(--border-focus)',
                    /* Active: subtle left accent bar via box-shadow trick */
                    boxShadow: isActive ? 'inset 3px 0 0 var(--brand-primary)' : 'none',
                    backgroundColor: isActive ? 'var(--brand-primary-tint)' : 'transparent',
                    borderRadius: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-default)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Icon — coloured when active, muted when not */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--interactive-default)',
                      color: isActive ? '#fff' : 'var(--text-tertiary)',
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
                        className="rounded-xl"
                        style={{
                          backgroundColor: 'var(--bg-elevated)',
                          padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                        }}
                      >
                        {/* Layer tag + heading */}
                        <p
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--brand-primary)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {layer.tag} Overview
                        </p>
                        <h3
                          className="text-h3 mb-5"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {layer.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-body leading-[1.82] mb-8"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {layer.description}
                        </p>

                        {/* Technologies — plain text with dot separators, no pills */}
                        <div>
                          <p
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--text-muted)',
                              marginBottom: '0.875rem',
                            }}
                          >
                            Key Technologies &amp; Patterns
                          </p>
                          <div className="flex flex-wrap gap-x-1 gap-y-2">
                            {layer.technologies.map((tech, idx) => (
                              <span key={idx} className="flex items-center gap-1">
                                <span
                                  className="text-[13px] font-medium"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  {tech}
                                </span>
                                {idx < layer.technologies.length - 1 && (
                                  <span
                                    aria-hidden="true"
                                    style={{
                                      color: 'var(--text-muted)',
                                      fontSize: '10px',
                                      lineHeight: 1,
                                    }}
                                  >
                                    ·
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
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
          Tab bar only. Content panel — no inner box.
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeInUp}
        aria-label="Development Specializations"
      >
        <div className="section-heading-block">
          <span className="section-label" style={{ color: 'var(--brand-purple)' }}>
            Deep-Dive Domains
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Salesforce Development Specializations
          </h2>
        </div>

        {/* Tab bar — underline only, no container */}
        <div
          className="flex overflow-x-auto gap-0 pb-0 scrollbar-hide border-b mb-8"
          role="tablist"
          aria-label="Specialization areas"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {specializations.map((spec) => {
            const isActive = activeSpecTab === spec.id;
            return (
              <button
                key={spec.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`spec-panel-${spec.id}`}
                id={`spec-tab-${spec.id}`}
                onClick={() => setActiveSpecTab(spec.id)}
                className="px-4 py-3 text-[12px] font-semibold border-b-[1.5px] whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-1"
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  borderBottomColor: isActive ? 'var(--brand-primary)' : 'transparent',
                  outlineColor: 'var(--border-focus)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                }}
              >
                {spec.title}
              </button>
            );
          })}
        </div>

        {/* Spec panels — content lives on the page, no wrapper box */}
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
                {isActive && currentSpec && (
                  <motion.div
                    key={spec.id}
                    variants={panelVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
                  >
                    {/* Left */}
                    <div className="space-y-8">
                      <div>
                        <p
                          className="mb-3"
                          style={{
                            fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: 'var(--brand-primary)',
                          }}
                        >
                          What I Work On
                        </p>
                        <p className="text-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {currentSpec.whatIWorkOn}
                        </p>
                      </div>
                      <div>
                        <p
                          className="mb-4"
                          style={{
                            fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: 'var(--brand-primary)',
                          }}
                        >
                          Key Technologies &amp; Tools
                        </p>
                        {/* Plain inline text — no chips/borders */}
                        <p className="text-body-sm leading-[1.9]" style={{ color: 'var(--text-primary)' }}>
                          {currentSpec.technologies.join('  ·  ')}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-8">
                      <div>
                        <p
                          className="mb-4"
                          style={{
                            fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: 'var(--brand-emerald)',
                          }}
                        >
                          Typical Problems Solved
                        </p>
                        <ul className="space-y-3.5">
                          {currentSpec.problemsSolved.map((prob, i) => (
                            <li key={i} className="flex items-start gap-3 text-body-sm" style={{ color: 'var(--text-secondary)' }}>
                              <CheckCircle
                                size={14}
                                className="shrink-0 mt-[3px]"
                                style={{ color: 'var(--brand-emerald)' }}
                                aria-hidden="true"
                              />
                              <span>{prob}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p
                          className="mb-3"
                          style={{
                            fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                            textTransform: 'uppercase', color: 'var(--brand-primary)',
                          }}
                        >
                          Engineering Approach
                        </p>
                        <p className="text-body-sm leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                          {currentSpec.approach}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {methodologySteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                variants={fadeInUp}
                transition={{ delay: i * 0.065 }}
                className="group relative overflow-hidden"
                style={{
                  padding: '1.75rem',
                  borderRadius: '0.875rem',
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Step number — large background watermark */}
                <span
                  className="absolute top-3 right-4 text-6xl font-black pointer-events-none select-none leading-none"
                  style={{ color: 'var(--border-subtle)', opacity: 0.7 }}
                  aria-hidden="true"
                >
                  {step.id}
                </span>

                {/* Icon — tinted, no box */}
                <div
                  className="mb-5 group-hover:scale-105 transition-transform duration-200"
                  style={{ color: 'var(--brand-primary)', width: '32px' }}
                >
                  <Icon size={26} aria-hidden="true" />
                </div>

                <h3
                  className="text-[15px] font-bold mb-3 uppercase tracking-wide"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>
                <p className="text-body-sm leading-[1.75]" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>

                {/* Accent bar on hover */}
                <div
                  className="h-[2px] w-8 mt-5 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: 'linear-gradient(to right, var(--brand-primary), transparent)' }}
                  aria-hidden="true"
                />
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
