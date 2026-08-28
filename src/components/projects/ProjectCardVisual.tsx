import type { ReactNode } from 'react';

interface ProjectCardVisualProps {
  projectId: string;
  className?: string;
}

/** Domain-specific abstract technology visuals — unique per case study. */
export default function ProjectCardVisual({ projectId, className = '' }: ProjectCardVisualProps) {
  const accent = 'var(--brand-primary)';
  const accent2 = 'var(--brand-secondary)';
  const muted = 'color-mix(in srgb, var(--brand-primary) 18%, transparent)';

  const visuals: Record<string, ReactNode> = {
    'enterprise-crm': (
      <svg viewBox="0 0 320 140" className="project-visual-svg" aria-hidden="true">
        <defs>
          <radialGradient id="crm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="140" fill="url(#crm-glow)" />
        <circle cx="160" cy="70" r="22" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx="160" cy="70" r="8" fill={accent} opacity="0.35" />
        {[[80,45],[240,45],[80,95],[240,95]].map(([x,y], i) => (
          <g key={i}>
            <line x1="160" y1="70" x2={x} y2={y} stroke={accent2} strokeWidth="1" opacity="0.25" className="project-visual-line" />
            <circle cx={x} cy={y} r="10" fill={muted} stroke={accent} strokeWidth="1" opacity="0.7" />
          </g>
        ))}
      </svg>
    ),
    'loan-origination': (
      <svg viewBox="0 0 320 140" className="project-visual-svg" aria-hidden="true">
        {[40,120,200,280].map((x, i) => (
          <g key={i}>
            <rect x={x - 18} y={50} width="36" height="40" rx="4" fill={muted} stroke={accent} strokeWidth="1" opacity="0.6" />
            {i < 3 && (
              <path d={`M${x + 18} 70 H${[120,200,280][i] - 18}`} fill="none" stroke={accent2} strokeWidth="1.5" opacity="0.35" markerEnd="url(#arrow)" />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill={accent2} opacity="0.5" />
          </marker>
        </defs>
      </svg>
    ),
    'cpq-revenue': (
      <svg viewBox="0 0 320 140" className="project-visual-svg" aria-hidden="true">
        <path d="M40 100 Q80 60 120 80 T200 55 T280 40" fill="none" stroke={accent} strokeWidth="2" opacity="0.4" />
        {[[40,100],[120,80],[200,55],[280,40]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r={6 + i * 2} fill={muted} stroke={accent} strokeWidth="1" />
        ))}
        <rect x="250" y="90" width="50" height="30" rx="3" fill={muted} stroke={accent2} strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    'experience-portal': (
      <svg viewBox="0 0 320 140" className="project-visual-svg" aria-hidden="true">
        <rect x="100" y="25" width="120" height="90" rx="6" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.45" />
        <rect x="110" y="38" width="100" height="8" rx="2" fill={muted} />
        <rect x="110" y="55" width="70" height="6" rx="2" fill={muted} opacity="0.6" />
        <rect x="110" y="68" width="85" height="6" rx="2" fill={muted} opacity="0.4" />
        <circle cx="60" cy="70" r="14" fill={muted} stroke={accent2} strokeWidth="1" />
        <circle cx="260" cy="70" r="14" fill={muted} stroke={accent2} strokeWidth="1" />
        <line x1="74" y1="70" x2="100" y2="70" stroke={accent2} strokeWidth="1" opacity="0.3" />
        <line x1="220" y1="70" x2="246" y2="70" stroke={accent2} strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    'crm-analytics': (
      <svg viewBox="0 0 320 140" className="project-visual-svg" aria-hidden="true">
        {[55,95,135,175,215].map((x, i) => (
          <rect key={i} x={x} y={110 - i * 14 - 10} width="28" height={i * 14 + 10} rx="2" fill={muted} stroke={accent} strokeWidth="1" opacity={0.5 + i * 0.08} />
        ))}
        <path d="M55 50 Q120 30 160 45 T265 35" fill="none" stroke={accent2} strokeWidth="1.5" opacity="0.45" strokeDasharray="4 3" />
        <circle cx="265" cy="35" r="5" fill={accent} opacity="0.5" />
      </svg>
    ),
    'devops-cicd': (
      <svg viewBox="0 0 320 140" className="project-visual-svg" aria-hidden="true">
        {[50,130,210,290].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="70" r="16" fill={muted} stroke={accent} strokeWidth="1.5" opacity="0.65" />
            <text x={x} y="74" textAnchor="middle" fontSize="9" fill={accent} opacity="0.7" fontFamily="var(--font-mono)">{i + 1}</text>
            {i < 3 && (
              <line x1={x + 16} y1="70" x2={[130,210,290][i] - 16} y2="70" stroke={accent2} strokeWidth="1.5" opacity="0.3" strokeDasharray="3 4" className="project-visual-line" />
            )}
          </g>
        ))}
      </svg>
    ),
  };

  return (
    <div className={`project-card-visual ${className}`} aria-hidden="true">
      {visuals[projectId] ?? visuals['enterprise-crm']}
    </div>
  );
}
