import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  X, CheckCircle2, ArrowRight, Layers, Tag,
} from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { staggerContainer } from '../../hooks/useAnimations';
import SectionReveal from '../ui/SectionReveal';
import ProjectCardVisual from './ProjectCardVisual';

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
   Animation variants
───────────────────────────────────────────── */
const cardVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  exit:    { opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.18 } },
};

const modalSectionVariant: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const modalStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
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
      <SectionReveal as="header" animation="fadeDown" className="page-section-header">
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
      </SectionReveal>

      <SectionReveal animation="stagger" ariaLabel="Project listings">
      {/* ── FILTER TABS — underline style, not pills ── */}
      <div
        className="filter-tabs scrollbar-hide"
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
              className={`filter-tab focus-visible:outline-2 focus-visible:outline-offset-2 ${isActive ? 'filter-tab-active' : ''}`}
              style={{ outlineColor: 'var(--border-focus)' }}
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            return (
              <motion.div
                layout
                key={project.id}
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="project-card group overflow-hidden flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: 'var(--border-focus)' }}
              >
                <div className="project-card-visual-wrap relative shrink-0 overflow-hidden">
                  <ProjectCardVisual projectId={project.id} />
                  <span className="project-card-industry">
                    {project.industry.length > 22
                      ? project.industry.split('&')[0].trim()
                      : project.industry}
                  </span>
                </div>

                <div className="project-card-body">
                  <h2 className="project-card-title">
                    {project.title}
                  </h2>
                  <p className="project-card-desc">
                    {project.challenge}
                  </p>

                  <div className="project-card-footer">
                    <p className="meta-inline project-card-tech">
                      {project.technologies.slice(0, 3).join(' · ')}
                    </p>
                    <button
                      ref={(el) => {
                        if (el) el.dataset.projectId = project.id;
                      }}
                      onClick={(e) => openProject(project, e.currentTarget as HTMLButtonElement)}
                      className="project-card-cta focus-visible:outline-2 focus-visible:outline-offset-2 rounded group/btn"
                      style={{ outlineColor: 'var(--border-focus)' }}
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
      </SectionReveal>

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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div
      className="project-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="project-modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] as const }}
        className="project-modal-panel"
      >
        <div className="project-modal-chrome">
          <span className="project-modal-chrome-label">Case Study</span>
          <button
            type="button"
            onClick={onClose}
            className="project-modal-close focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ outlineColor: 'var(--border-focus)' }}
            aria-label="Close case study"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <header className="project-modal-header">
          <ProjectCardVisual projectId={project.id} className="project-modal-header-bg" />
          <div className="project-modal-header-shade" aria-hidden="true" />

          <div className="project-modal-header-content">
            <span className="project-modal-industry">{project.industry}</span>
            <h2 className="project-modal-title">{project.title}</h2>
          </div>
        </header>

        <motion.div
          className="project-modal-body scrollbar-hide"
          variants={modalStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={modalSectionVariant} className="project-modal-section">
            <div className="project-modal-grid">
              {[
                { label: 'The Business Challenge', color: 'var(--brand-primary)', text: project.challenge },
                { label: 'My Technical Role', color: 'var(--brand-secondary)', text: project.role },
              ].map(({ label, color, text }) => (
                <div key={label}>
                  <p className="project-modal-section-label" style={{ color }}>
                    {label}
                  </p>
                  <p className="project-modal-text">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={modalSectionVariant} className="project-modal-section">
            <p
              className="project-modal-section-label flex items-center gap-2"
              style={{ color: 'var(--brand-purple)' }}
            >
              <Layers size={13} aria-hidden="true" />
              Solution Architecture &amp; Approach
            </p>
            <p className="project-modal-text">{project.approach}</p>
          </motion.div>

          <motion.div variants={modalSectionVariant} className="project-modal-section">
            <div className="project-modal-grid">
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
                  <p className="project-modal-section-label" style={{ color }}>
                    {heading}
                  </p>
                  <ul className="project-modal-list">
                    {items.map((item, idx) => (
                      <li key={idx} className="project-modal-list-item">
                        <CheckCircle2
                          size={14}
                          className="shrink-0 mt-[2px]"
                          style={{ color }}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={modalSectionVariant} className="project-modal-section project-modal-stack">
            <p
              className="project-modal-section-label flex items-center gap-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <Tag size={11} aria-hidden="true" />
              Salesforce &amp; Technical Stack
            </p>
            <p className="project-modal-tech">
              {project.technologies.join('  ·  ')}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>,
    document.body,
  );
}
