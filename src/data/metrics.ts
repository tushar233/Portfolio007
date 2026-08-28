/** Canonical portfolio metrics — single source of truth across all views */
export const GLOBAL_METRICS = {
  experience: {
    value: 7,
    suffix: '+',
    label: 'Years Experience',
    shortLabel: 'Years Exp.',
  },
  clouds: {
    value: 6,
    suffix: '+',
    label: 'Multi-Cloud',
    shortLabel: 'SF Clouds',
  },
  certifications: {
    value: 10,
    suffix: '+',
    label: 'Certifications',
    shortLabel: 'Certs',
  },
  projects: {
    value: 20,
    suffix: '+',
    label: 'Enterprise Engagements',
    shortLabel: 'Projects',
  },
  retention: {
    value: 90,
    suffix: '%',
    label: 'Client Retention',
    shortLabel: 'Retention',
  },
} as const;

/** Hero ribbon — Pic:2 layout with Salesforce data (3 core + retention from reference) */
export const HERO_RIBBON_METRICS = [
  {
    id: 'projects',
    value: GLOBAL_METRICS.projects.value,
    suffix: GLOBAL_METRICS.projects.suffix,
    label: 'Enterprise Engagements',
    subtext: 'MULTI-CLOUD CRM DELIVERY',
  },
  {
    id: 'experience',
    value: GLOBAL_METRICS.experience.value,
    suffix: GLOBAL_METRICS.experience.suffix,
    label: 'Years Experience',
    subtext: 'PROFESSIONAL ARCHITECTURE',
  },
  {
    id: 'certifications',
    value: GLOBAL_METRICS.certifications.value,
    suffix: GLOBAL_METRICS.certifications.suffix,
    label: 'Certifications',
    subtext: 'SALESFORCE TRAILBLAZER CREDENTIALS',
  },
  {
    id: 'retention',
    value: GLOBAL_METRICS.retention.value,
    suffix: GLOBAL_METRICS.retention.suffix,
    label: 'Client Retention',
    subtext: 'LONG-TERM PARTNERSHIPS',
  },
] as const;

export const HERO_VALUE_PROPOSITION =
  'Architecting mission-critical, enterprise-grade multi-cloud CRM ecosystems with zero technical debt.';

export const TYPEWRITER_PHRASES = [
  'Designing scalable enterprise Salesforce architectures.',
  'Engineering Apex, LWC, and REST integrations at scale.',
  'Transforming complex workflows into clean automation.',
  'Delivering governor-limit-safe multi-cloud CRM platforms.',
] as const;

/** Evenly space `count` badges around a circle starting at top (-90° offset) */
export function orbitDegrees(count: number, startOffset = -90): number[] {
  return Array.from({ length: count }, (_, i) => startOffset + (360 / count) * i);
}
