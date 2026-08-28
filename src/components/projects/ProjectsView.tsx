import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Building2, Landmark, Receipt, Globe, BarChart3, GitBranch,
  X, CheckCircle2, ArrowRight, Layers, Tag,
} from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { fadeInUp, staggerContainer } from '../../hooks/useAnimations';

/* ─────────────────────────────────────────────
   Icon map
───────────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  Building2, Landmark, Receipt, Globe, BarChart3, GitBranch,
};

/* ─────────────────────────────────────────────
   Category filter system — uses real categories
   not individual project IDs so multi-project
   filtering works correctly as content grows.
───────────────────────────────────────────── */
type CategoryId =
  | 'all'
  | 'multi-cloud'
  | 'financial'
  | 'cpq'
  | 'experience'
  | 'analytics'
  | 'devops';

interface Category {
  id: CategoryId;
  label: string;
  projectIds: string[];
}

const CATEGORIES: Category[] = [
  { id: 'all',        label: 'All Projects',       projectIds: [] },
  { id: 'multi-cloud',label: 'Multi-Cloud CRM',    projectIds: ['enterprise-crm'] },
  { id: 'financial',  label: 'Financial Services', projectIds: ['loan-origination'] },
  { id: 'cpq',        label: 'CPQ & Revenue',       projectIds: ['cpq-revenue'] },
  { id: 'experience', label: 'Experience Cloud',   projectIds: ['experience-portal'] },
  { id: 'analytics',  label: 'CRM Analytics',      projectIds: ['crm-analytics'] },
  { id: 'devops',     label: 'DevOps & CI/CD',     projectIds: ['devops-cicd'] },
];

/* ─────────────────────────────────────────────
   Modal focus trap hook
───────────────────────────────────────────── */
function useModalFocusTrap(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    // Move focus into modal
    const firstFocusable = container.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, containerRef, onClose]);
}

/* ─────────────────────────────────────────────
   Card animation variant
───────────────────────────────────────────── */
const cardVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  exit:    { opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.18 } },
};

/* ─────────────────────────────────────────────
   ProjectsView
───────────────────────────────────────────── */
export default function ProjectsView() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null); // card that opened modal

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) =>
          CATEGORIES.find((c) => c.id === activeCategory)?.projectIds.includes(p.id),
        );

  const openProject = useCallback((project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    // Return focus to the card that opened the modal
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <div className="page-top sections-gap">

      {/* ── HEADER ── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-3xl"
      >
        <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
          Enterprise Portfolio
        </span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          Featured Salesforce Case Studies
        </h1>
        <p className="section-subtitle">
          Six deep-dive case studies spanning enterprise multi-cloud CRM, CPQ quote-to-cash, loan
          origination engines, Experience Cloud portals, and CI/CD modernisation.
        </p>
      </motion.header>

      {/* ── FILTER PILLS ── */}
      <div
        className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide"
        role="group"
        aria-label="Filter projects by category"
      >
        {CATEGORIES.map(({ id, label }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              aria-pressed={isActive}
              className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--interactive-default)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                borderColor: isActive ? 'transparent' : 'var(--border-default)',
                boxShadow: isActive ? 'var(--shadow-brand)' : 'none',
                outlineColor: 'var(--border-focus)',
                minHeight: '36px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-hover)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--interactive-default)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── PROJECT GRID ── */}
      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const Icon = iconMap[project.icon] || Building2;
            return (
              <motion.div
                layout
                key={project.id}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary-border)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {/* Gradient banner */}
                <div
                  className={`h-36 w-full bg-gradient-to-br ${project.gradient} relative flex items-center justify-center p-6 shrink-0`}
                >
                  <Icon
                    className="w-14 h-14 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: 'rgba(255,255,255,0.32)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold backdrop-blur-sm border"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.50)',
                      color: 'var(--brand-secondary)',
                      borderColor: 'rgba(255,255,255,0.10)',
                    }}
                  >
                    {project.industry.length > 22
                      ? project.industry.split('&')[0].trim()
                      : project.industry}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow gap-4">
                  <div className="space-y-2">
                    <h2
                      className="text-[15px] font-bold leading-snug group-hover:text-[var(--brand-primary)] transition-colors duration-200"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h2>
                    <p
                      className="text-[13px] leading-[1.75] line-clamp-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {project.challenge}
                    </p>
                  </div>

                  {/* Tech + CTA */}
                  <div
                    className="mt-auto pt-3 border-t flex items-center justify-between gap-2"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                      {project.technologies.slice(0, 3).join(' · ')}
                    </p>
                    <button
                      ref={(el) => {
                        if (el) el.dataset.projectId = project.id;
                      }}
                      onClick={(e) => openProject(project, e.currentTarget as HTMLButtonElement)}
                      className="flex items-center gap-1 text-[12px] font-semibold shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 rounded group/btn"
                      style={{ color: 'var(--brand-primary)', outlineColor: 'var(--border-focus)' }}
                    >
                      Case Study
                      <ArrowRight
                        size={13}
                        className="group-hover/btn:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── CASE STUDY MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal project={selectedProject} onClose={closeProject} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CaseStudyModal — separate component with its
   own focus trap hook and ref.
───────────────────────────────────────────── */
function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useModalFocusTrap(true, panelRef, onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.24, ease: [0.21, 0.47, 0.32, 0.98] as const }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl z-10 scrollbar-hide"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-default)',
            color: 'var(--text-secondary)',
            outlineColor: 'var(--border-focus)',
          }}
          aria-label="Close case study"
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <X size={16} aria-hidden="true" />
        </button>

        {/* Top banner */}
        <div
          className={`h-28 sm:h-32 w-full bg-gradient-to-br ${project.gradient} relative flex items-end p-6 sm:p-8 border-b shrink-0`}
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="space-y-1">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full backdrop-blur-sm"
              style={{ color: 'rgba(255,255,255,0.85)', backgroundColor: 'rgba(0,0,0,0.35)' }}
            >
              {project.industry}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6 sm:p-8 space-y-7">

          {/* Challenge + Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { label: 'The Business Challenge', color: 'var(--brand-primary)', text: project.challenge },
              { label: 'My Technical Role',       color: 'var(--brand-secondary)', text: project.role },
            ].map(({ label, color, text }) => (
              <div key={label}>
                <p
                  className="mb-3"
                  style={{
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color,
                  }}
                >
                  {label}
                </p>
                <p className="text-body-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Architecture approach */}
          <div>
            <p
              className="flex items-center gap-2 mb-3"
              style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--brand-purple)',
              }}
            >
              <Layers size={13} aria-hidden="true" />
              Solution Architecture &amp; Approach
            </p>
            <p className="text-body-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {project.approach}
            </p>
          </div>

          {/* Features + Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                heading: 'Key Implementation Features',
                color: 'var(--brand-primary)',
                items: project.features,
              },
              {
                heading: 'Measurable Business Impact',
                color: 'var(--brand-emerald)',
                items: project.impact,
              },
            ].map(({ heading, color, items }) => (
              <div key={heading}>
                <p
                  className="mb-4"
                  style={{
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color,
                  }}
                >
                  {heading}
                </p>
                <ul className="space-y-2.5">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13px]">
                      <CheckCircle2
                        size={13}
                        className="shrink-0 mt-[3px]"
                        style={{ color }}
                        aria-hidden="true"
                      />
                      <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tech stack — plain inline text */}
          <div
            className="pt-6 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <p
              className="flex items-center gap-1.5 mb-3"
              style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
              }}
            >
              <Tag size={11} aria-hidden="true" />
              Salesforce &amp; Technical Stack
            </p>
            <p className="text-[13px] leading-[1.9]" style={{ color: 'var(--text-secondary)' }}>
              {project.technologies.join('  ·  ')}
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
