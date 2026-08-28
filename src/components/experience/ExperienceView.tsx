import { motion } from 'framer-motion';
import {
  Briefcase, Workflow, Users, Link, Zap, Globe, Eye,
} from 'lucide-react';
import { experienceItems } from '../../data/expertise';
import { fadeInUp, staggerContainer } from '../../hooks/useAnimations';

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

export default function ExperienceView() {
  return (
    <div className="page-top sections-gap">

      {/* ── HEADER ── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-3xl"
      >
        <span className="section-label">Career Timeline &amp; Leadership</span>
        <h1 className="text-h1 mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>
          7+ Years of Engineering Evolution
        </h1>
        <p className="section-subtitle">
          A track record of progressive technical leadership, delivering enterprise multi-cloud
          platforms from initial discovery through enterprise production go-live.
        </p>
      </motion.header>

      {/* ══════════════════════════════════════════
          CAREER TIMELINE
          No outer card wrapper — timeline lives on the page canvas.
          Individual entries remain as meaningful cards.
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={fadeInUp}
        aria-label="Career Timeline"
      >
        <div className="section-heading-block">
          <span className="section-label" style={{ color: 'var(--brand-secondary)' }}>
            Professional Journey
          </span>
          <h2 className="text-h2 mt-1" style={{ color: 'var(--text-primary)' }}>
            Experience &amp; Growth Timeline
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">

          {/* Vertical line */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--timeline-line) 12%, var(--timeline-line) 88%, transparent)`,
            }}
            aria-hidden="true"
          />

          <ol className="space-y-10" aria-label="Work history">
            {experienceItems.map((item, index) => {
              const isLeft    = index % 2 === 0;
              const isCurrent = index === 0;

              return (
                <li
                  key={item.id}
                  className={`relative flex flex-col md:flex-row md:items-start ${isLeft ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot — desktop */}
                  <span
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-7 w-3 h-3 rounded-full z-10"
                    style={{
                      backgroundColor: isCurrent ? 'var(--brand-primary)' : 'var(--timeline-dot)',
                      border: '2.5px solid var(--bg-page)',
                      boxShadow: isCurrent ? 'var(--glow-brand)' : 'none',
                    }}
                    aria-hidden="true"
                  />
                  {/* Dot — mobile */}
                  <span
                    className="md:hidden absolute left-5 -translate-x-1/2 mt-7 w-2.5 h-2.5 rounded-full z-10"
                    style={{
                      backgroundColor: 'var(--timeline-dot)',
                      border: '2px solid var(--bg-page)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Year — desktop badge beside dot, plain text style */}
                  <div
                    className={`hidden md:block absolute top-6 ${isLeft ? 'left-1/2 ml-7' : 'right-1/2 mr-7'}`}
                    aria-hidden="true"
                  >
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}
                  >
                    <div
                      className="rounded-xl transition-all duration-200 relative"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        boxShadow: 'var(--shadow-sm)',
                        padding: '1.5rem',
                        /* Current role: subtle left border accent */
                        borderLeft: isCurrent ? '2px solid var(--brand-primary)' : '2px solid transparent',
                      }}
                    >
                      {/* CURRENT badge — inline text, no pill */}
                      {isCurrent && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <span
                            className="w-[7px] h-[7px] rounded-full animate-pulse"
                            style={{ backgroundColor: 'var(--brand-emerald)' }}
                            aria-hidden="true"
                          />
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.10em',
                              textTransform: 'uppercase',
                              color: 'var(--brand-emerald)',
                            }}
                          >
                            Current
                          </span>
                        </div>
                      )}

                      {/* Mobile year */}
                      <div className="md:hidden mb-2">
                        <span className="text-[11px] font-semibold" style={{ color: 'var(--brand-primary)' }}>
                          {item.year}
                        </span>
                      </div>

                      {/* Role header — icon is just an accent, no border box */}
                      <div className="flex items-start gap-3 mb-4">
                        <Briefcase
                          size={16}
                          className="shrink-0 mt-[3px]"
                          style={{ color: 'var(--brand-primary)' }}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <h3
                            className="text-[15px] sm:text-[16px] font-bold leading-snug"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.role}
                          </h3>
                          <p
                            className="text-[13px] mt-0.5"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {item.company} · {item.duration}
                          </p>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <ul className="space-y-2.5 mb-5" aria-label="Key responsibilities">
                        {item.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-[13px] leading-[1.72] flex items-start gap-2.5"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <span
                              style={{ color: 'var(--brand-primary)', fontSize: '9px', marginTop: '5px', flexShrink: 0 }}
                              aria-hidden="true"
                            >
                              ▹
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies — plain text inline */}
                      {item.technologies.length > 0 && (
                        <p
                          className="text-[12px] leading-[1.7]"
                          style={{
                            color: 'var(--text-muted)',
                            paddingTop: '0.875rem',
                            borderTop: '1px solid var(--border-subtle)',
                          }}
                        >
                          {item.technologies.join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════
          BUSINESS VALUE DELIVERED
          Cards kept — each is a distinct contained topic.
          Icon: no border box, just tinted background.
      ══════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        variants={staggerContainer}
        aria-label="Business Value Delivered"
        className="space-y-8"
      >
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
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fadeInUp}
              transition={{ delay: i * 0.065 }}
              className="flex flex-col gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: tint, color: accent }}
              >
                <Icon size={19} aria-hidden="true" />
              </div>
              <div>
                <h3
                  className="text-[15px] font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {title}
                </h3>
                <p className="text-body-sm leading-[1.75]" style={{ color: 'var(--text-secondary)' }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
