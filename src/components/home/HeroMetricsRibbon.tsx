import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimations';
import { HERO_RIBBON_METRICS } from '../../data/metrics';

const ACCENT: Record<string, string> = {
  experience: 'var(--text-primary)',
  clouds:     'var(--brand-primary)',
  projects:   'var(--brand-emerald)',
  retention:  'var(--brand-purple)',
  certifications: 'var(--brand-amber)',
};

const itemVariant: Variants = {
  hidden:  { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const sepVariant: Variants = {
  hidden:  { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const flowVariant: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

function MetricItem({
  id,
  value,
  suffix,
  label,
  subtext,
}: {
  id: string;
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}) {
  const { count, ref } = useAnimatedCounter(value);
  const display = `${count}${suffix}`;
  const accent = ACCENT[id] ?? 'var(--text-primary)';

  return (
    <motion.div ref={ref} variants={itemVariant} className="hero-metric-item">
      <motion.span
        className="hero-metric-value"
        style={{ color: accent }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {display}
      </motion.span>
      <span className="hero-metric-label">{label}</span>
      <span className="hero-metric-subtext">{subtext}</span>
    </motion.div>
  );
}

export default function HeroMetricsRibbon() {
  return (
    <motion.div
      className="hero-metrics-flow"
      aria-label="Key career metrics"
      variants={flowVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {HERO_RIBBON_METRICS.map((m, index) => (
        <div key={m.id} className="hero-metric-group">
          <MetricItem
            id={m.id}
            value={m.value}
            suffix={m.suffix}
            label={m.label}
            subtext={m.subtext}
          />
          {index < HERO_RIBBON_METRICS.length - 1 && (
            <motion.span
              className="hero-metric-sep"
              variants={sepVariant}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
