import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  useTypewriter,
  useParticleCanvas,
  fadeInUp,
  staggerContainer,
} from '../../hooks/useAnimations';
import { projects } from '../../data/projects';
import { HERO_VALUE_PROPOSITION, TYPEWRITER_PHRASES } from '../../data/metrics';
import {
  ArrowRight, Rocket, Database, ShieldCheck, ExternalLink,
  Award, Mail, FileText, Radio,
} from 'lucide-react';
import CloudOrbit from './CloudOrbit';
import CertTicker from './CertTicker';
import HeroMetricsRibbon from './HeroMetricsRibbon';
import SectionReveal from '../ui/SectionReveal';
import ProjectCardVisual from '../projects/ProjectCardVisual';

interface HomeOverviewProps {
  setActiveTab: (tab: string) => void;
}

const vp = { once: true, margin: '-50px' };

const competencyStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};
const competencyCardVariant = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const COMPETENCY_HIGHLIGHTS = [
  {
    icon: Rocket,
    accentColor: 'var(--brand-primary)',
    title: '23+ automated deployments shipped',
  },
  {
    icon: Database,
    accentColor: 'var(--brand-secondary)',
    title: 'Scalable data model design',
  },
  {
    icon: ShieldCheck,
    accentColor: 'var(--brand-emerald)',
    title: 'Security & sharing model expert',
  },
  {
    icon: Award,
    accentColor: 'var(--brand-purple)',
    title: 'Harmonize once, activate everywhere',
  },
  {
    icon: FileText,
    accentColor: 'var(--brand-amber)',
    title: 'Documentation-first delivery',
  },
  {
    icon: Radio,
    accentColor: 'var(--brand-pink)',
    title: 'Event-driven integration design',
  },
] as const;

export default function HomeOverview({ setActiveTab }: HomeOverviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);

  const typewriterText = useTypewriter([...TYPEWRITER_PHRASES], 58, 30, 2400);

  return (
    <div className="page-top sections-gap">

      {/* ════════════════════════════════════════════
          HERO
          Two-column: text left, CloudOrbit right.
          min-h accounts for 72px navbar.
      ════════════════════════════════════════════ */}
      <section
        aria-label="Hero introduction"
        className="hero-section relative w-full overflow-visible"
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none w-full h-full"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col flex-1 w-full min-h-0">
        <div className="hero-section-main">
          <div className="hero-section-grid">
            {/* ── LEFT: Copy ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hero-copy-col flex flex-col w-full mx-auto lg:mx-0"
            >
              <motion.div variants={fadeInUp} className="hero-eyebrow-block">
                <span className="eyebrow-label">
                  <span
                    className="w-[7px] h-[7px] rounded-full shrink-0 animate-pulse"
                    style={{ backgroundColor: 'var(--brand-emerald)' }}
                    aria-hidden="true"
                  />
                  Lead Salesforce Developer &amp; Architect
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} className="hero-headline-block">
                <h1 className="text-display hero-headline-gradient">
                  Architecting<br />
                  Enterprise<br />
                  Salesforce
                </h1>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-body-lg leading-[1.82] hero-value-prop"
                style={{ color: 'var(--text-secondary)' }}
              >
                {HERO_VALUE_PROPOSITION}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="hero-typewriter flex items-center min-h-[1.75rem]"
                style={{ color: 'var(--text-tertiary)', fontSize: '0.9375rem', fontWeight: 450 }}
                aria-live="polite"
                aria-atomic="true"
              >
                <span>{typewriterText}</span>
                <span className="typewriter-cursor" aria-hidden="true" />
              </motion.div>

              <motion.div variants={fadeInUp} className="hero-cta-stack">
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className="btn-primary"
                >
                  Get In Touch
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('projects')}
                  className="btn-ghost hero-cta-secondary"
                >
                  View My Work <ArrowRight size={14} aria-hidden="true" />
                </button>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Orbit ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.70, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
              className="hidden lg:flex items-center justify-center hero-orbit-col"
            >
              <CloudOrbit />
            </motion.div>
          </div>
        </div>

        {/* Full-width metrics ribbon — pinned to bottom of first viewport */}
        <div className="hero-metrics-row">
          <HeroMetricsRibbon />
        </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CORE COMPETENCIES
      ════════════════════════════════════════════ */}
      <SectionReveal animation="blurUp" ariaLabel="Core Salesforce Competencies">
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
            Proven delivery strengths across architecture, integration, security, and enterprise DevOps —
            built for scale, clarity, and long-term platform health.
          </p>
        </div>

        <motion.div
          className="competency-grid competency-grid-six"
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={competencyStagger}
        >
          {COMPETENCY_HIGHLIGHTS.map(({ icon: Icon, accentColor, title }) => (
            <motion.article
              key={title}
              variants={competencyCardVariant}
              className="competency-card competency-card-highlight group"
              style={{ '--competency-accent': accentColor } as React.CSSProperties}
            >
              <div className="competency-card-icon" aria-hidden="true">
                <Icon size={20} />
              </div>
              <h3 className="competency-card-title">{title}</h3>
            </motion.article>
          ))}
        </motion.div>
      </SectionReveal>

      {/* ════════════════════════════════════════════
          FEATURED CASE STUDIES
      ════════════════════════════════════════════ */}
      <SectionReveal animation="slideLeft" ariaLabel="Featured Case Studies" className="case-studies-section">
        <div className="section-heading-block case-studies-heading">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
            <div>
              <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
                Verified Deliveries
              </span>
              <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
                Featured Enterprise Case Studies
              </h2>
              <p className="section-subtitle mt-3 mb-0">
                Real-world enterprise deliveries spanning multi-cloud CRM, CPQ quote-to-cash, loan origination,
                Experience Cloud portals, and CI/CD modernisation.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="case-studies-link flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:opacity-70 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
              style={{ color: 'var(--brand-secondary)', outlineColor: 'var(--border-focus)' }}
            >
              All 6 Case Studies <ExternalLink size={13} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="case-studies-grid">
          {projects.slice(0, 3).map((project, i) => {
            return (
              <motion.button
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                variants={fadeInUp}
                transition={{ delay: i * 0.09 }}
                onClick={() => setActiveTab('projects')}
                className="case-study-card group overflow-hidden flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: 'var(--border-focus)' }}
              >
                <div className="case-study-visual-wrap relative shrink-0 overflow-hidden">
                  <ProjectCardVisual projectId={project.id} />
                  <span className="case-study-industry">
                    {project.industry.split('&')[0].trim()}
                  </span>
                </div>

                <div className="case-study-body">
                  <h3 className="case-study-title">
                    {project.title}
                  </h3>
                  <p className="case-study-desc">
                    {project.challenge}
                  </p>

                  <div className="case-study-footer">
                    <p className="meta-inline case-study-tech">
                      {project.technologies.slice(0, 2).join(' · ')}
                    </p>
                    <span className="case-study-details">
                      Details <ArrowRight size={11} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </SectionReveal>

      {/* ════════════════════════════════════════════
          CERTIFICATIONS
      ════════════════════════════════════════════ */}
      <SectionReveal animation="fadeUp" ariaLabel="Salesforce Certifications">
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
            View All Credentials <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>

        <CertTicker />
      </SectionReveal>

      {/* ════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════ */}
      <SectionReveal animation="fadeUp" ariaLabel="Call to action">
      <div
        className="cta-banner rounded-xl text-center relative overflow-hidden"
        style={{
          background: 'var(--gradient-cta-surface)',
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
        <div className="cta-banner-inner relative z-10">
          <h2 className="text-h2" style={{ color: 'var(--text-primary)' }}>
            Have an Enterprise Salesforce Requirement?
          </h2>
          <p
            className="text-body leading-[1.78]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Let's discuss how multi-cloud architecture, custom Apex/LWC development, and CPQ automation
            can deliver measurable business value.
          </p>
          <div className="cta-banner-actions">
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
      </div>
      </SectionReveal>

    </div>
  );
}
