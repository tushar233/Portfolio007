import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Briefcase, Workflow, Users, Link, Zap, Globe, Eye,
} from 'lucide-react';
import { experienceItems, type ExperienceItem } from '../../data/expertise';
import { fadeInUp } from '../../hooks/useAnimations';
import SectionReveal from '../ui/SectionReveal';

const vp = { once: true, margin: '-50px' };

const impacts = [
  {
    icon: Workflow,
    accent: 'var(--brand-emerald)',
    tint: 'var(--brand-emerald-tint)',
    title: 'Streamlining Business Workflows',
    description: 'Replacing manual multi-step processes with automated Salesforce flows and Apex triggers that reduce errors and accelerate cycle times.',
  },
  {
    icon: Users,
    accent: 'var(--brand-primary)',
    tint: 'var(--brand-primary-tint)',
    title: 'Unified CRM & Customer 360',
    description: 'Designing CRM architectures that give sales, service, and executive teams a unified real-time view of every account and opportunity.',
  },
  {
    icon: Link,
    accent: 'var(--brand-secondary)',
    tint: 'var(--brand-secondary-tint)',
    title: 'Connecting Disconnected Systems',
    description: 'Building robust integration bridges between Salesforce and external platforms — ERP, billing, analytics, and marketing tools.',
  },
  {
    icon: Zap,
    accent: 'var(--brand-amber)',
    tint: 'var(--brand-amber-tint)',
    title: 'Automating High-Volume Operations',
    description: 'Identifying and automating high-volume manual tasks using asynchronous Batch Apex, Queueable jobs, and Flow Orchestrators.',
  },
  {
    icon: Globe,
    accent: 'var(--brand-purple)',
    tint: 'var(--brand-purple-tint)',
    title: 'Scalable Customer Portals',
    description: 'Building branded Experience Cloud portals and customer-facing solutions that handle millions of interactions with bank-grade security.',
  },
  {
    icon: Eye,
    accent: 'var(--brand-pink)',
    tint: 'var(--brand-pink-tint)',
    title: 'Executive Data Visibility',
    description: 'Creating CRM Analytics dashboards and real-time reporting solutions that turn raw operational data into actionable revenue signals.',
  },
];

function TimelineDateBadge({ year, isCurrent }: { year: string; isCurrent: boolean }) {
  return (
    <div className={`exp-date-badge${isCurrent ? ' exp-date-badge-current' : ''}`}>
      {isCurrent && <span className="exp-date-pulse-ring" aria-hidden="true" />}
      <span className="exp-date-text">{year}</span>
    </div>
  );
}

function TimelineContentCard({ item, isCurrent }: { item: ExperienceItem; isCurrent: boolean }) {
  return (
    <article className={`exp-timeline-card${isCurrent ? ' exp-timeline-card-current' : ''}`}>
      {isCurrent && (
        <div className="exp-current-label">
          <span className="exp-current-dot" aria-hidden="true" />
          <span>Current Role</span>
        </div>
      )}

      <div className="exp-card-header">
        <Briefcase size={16} className="exp-card-icon" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="exp-card-role">{item.role}</h3>
          <p className="exp-card-company">
            {item.company} · {item.duration}
          </p>
        </div>
      </div>

      <ul className="exp-card-list" aria-label="Key responsibilities">
        {item.responsibilities.map((resp, idx) => (
          <li key={idx} className="exp-card-list-item">
            <span className="exp-card-bullet" aria-hidden="true">▹</span>
            <span>{resp}</span>
          </li>
        ))}
      </ul>

      {item.technologies.length > 0 && (
        <p className="exp-card-tech meta-inline">
          {item.technologies.join(' · ')}
        </p>
      )}
    </article>
  );
}

export default function ExperienceView() {
  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 25%'],
  });
  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="page-top sections-gap">

      <SectionReveal as="header" animation="fadeDown" className="page-section-header">
        <span className="section-label">Career Timeline &amp; Leadership</span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          7+ Years of Engineering Evolution
        </h1>
        <p className="section-subtitle">
          A track record of progressive technical leadership, delivering enterprise multi-cloud
          platforms from initial discovery through enterprise production go-live.
        </p>
      </SectionReveal>

      <section
        ref={timelineRef}
        aria-label="Career Timeline"
        className="page-section exp-timeline-section"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={fadeInUp}
          className="section-heading-block"
        >
          <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
            Professional Journey
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Experience &amp; Growth Timeline
          </h2>
        </motion.div>

        <div className="exp-timeline relative w-full">

          <svg
            className="exp-timeline-spine exp-timeline-spine-desktop"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="expSpineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-primary)" />
                <stop offset="100%" stopColor="var(--brand-secondary)" />
              </linearGradient>
            </defs>
            <line x1="50%" y1="0" x2="50%" y2="100%" className="exp-timeline-spine-track" />
            <motion.g style={{ scaleY: spineScaleY, transformOrigin: '50% 0', transformBox: 'fill-box' }}>
              <line x1="50%" y1="0" x2="50%" y2="100%" className="exp-timeline-spine-fill" />
            </motion.g>
          </svg>

          <div className="exp-timeline-rail exp-timeline-rail-mobile" aria-hidden="true">
            <motion.div className="exp-timeline-rail-fill origin-top" style={{ scaleY: spineScaleY }} />
          </div>

          <ol className="exp-timeline-list" aria-label="Work history">
            {experienceItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = index === 0;

              return (
                <motion.li
                  key={item.id}
                  className={`exp-timeline-item ${isEven ? 'exp-timeline-item-even' : 'exp-timeline-item-odd'}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.52,
                    delay: index * 0.07,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <span
                    className={`exp-timeline-node${isCurrent ? ' exp-timeline-node-current' : ''}`}
                    aria-hidden="true"
                  />

                  <div className="exp-timeline-date">
                    <TimelineDateBadge year={item.year} isCurrent={isCurrent} />
                  </div>

                  <div className="exp-timeline-content">
                    <TimelineContentCard item={item} isCurrent={isCurrent} />
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      <SectionReveal animation="stagger" ariaLabel="Business Value Delivered" className="space-y-8">
        <motion.div variants={fadeInUp}>
          <span className="section-label" style={{ color: 'var(--brand-emerald)' }}>
            Qualitative Outcomes
          </span>
          <h2 className="text-h2 mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>
            Business Value Delivered
          </h2>
          <p className="text-body-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            Measurable organisational impact achieved across enterprise CRM implementations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map(({ icon: Icon, accent, tint, title, description }, i) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              transition={{ delay: i * 0.065 }}
              className="impact-card group"
            >
              <div
                className="impact-card-icon"
                style={{ backgroundColor: tint, color: accent }}
              >
                <Icon size={19} aria-hidden="true" />
              </div>
              <div>
                <h3 className="impact-card-title">{title}</h3>
                <p className="impact-card-desc">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionReveal>

    </div>
  );
}
