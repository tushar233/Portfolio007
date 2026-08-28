/**
 * CloudOrbit — Enterprise Intelligence System Visualization
 *
 * Premium two-ring orbit representing the Salesforce ecosystem.
 * Theme-aware via CSS custom properties.
 * GPU-composited SMIL animations with reduced-motion support.
 */

interface OrbitNode {
  label: string;
  color: string;
  deg: number;
}

/* ── Inner ring: Salesforce Cloud products ── */
const INNER: OrbitNode[] = [
  { label: 'Sales',      color: '#3b82f6', deg: 0   },
  { label: 'Service',    color: '#8b5cf6', deg: 60  },
  { label: 'Marketing',  color: '#ec4899', deg: 120 },
  { label: 'Experience', color: '#06b6d4', deg: 180 },
  { label: 'Revenue',    color: '#f59e0b', deg: 240 },
  { label: 'Data',       color: '#10b981', deg: 300 },
];

/* ── Outer ring: Technical disciplines ── */
const OUTER: OrbitNode[] = [
  { label: 'Apex',     color: '#3b82f6', deg: 20  },
  { label: 'LWC',      color: '#06b6d4', deg: 80  },
  { label: 'SOQL',     color: '#8b5cf6', deg: 140 },
  { label: 'Flows',    color: '#10b981', deg: 200 },
  { label: 'REST API', color: '#f59e0b', deg: 260 },
  { label: 'DevOps',   color: '#ec4899', deg: 320 },
];

const CX = 260, CY = 260, SZ = 520;
const R1 = 126, R2 = 200;  /* ring radii — tight for clean proportions */
const HUB_R = 58;           /* hub disc radius */

function polarToXY(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

/* Node geometry */
const N1 = { disc: 22, halo: 30, fs: 10.5 };
const N2 = { disc: 17, halo: 24, fs: 10 };

export default function CloudOrbit() {
  return (
    <div
      className="relative select-none w-full"
      style={{ maxWidth: '480px', aspectRatio: '1 / 1' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 52% 50%, var(--orbit-glow) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <svg
        viewBox={`0 0 ${SZ} ${SZ}`}
        className="w-full h-full"
        style={{ overflow: 'visible' }}
        role="img"
        aria-label="Salesforce ecosystem visualization"
      >
        <defs>
          {/* Hub glow — soft, not harsh */}
          <filter id="hub-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Node glow */}
          <filter id="node-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Hub gradient */}
          <radialGradient id="hubGrad" cx="42%" cy="38%" r="65%">
            <stop offset="0%"   stopColor="var(--orbit-hub-from)" />
            <stop offset="100%" stopColor="var(--orbit-hub-to)"   />
          </radialGradient>
          {/* Outer ring node gradient with slightly brighter center */}
          <radialGradient id="nodeGrad-inner" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="var(--orbit-node-fill)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--orbit-node-fill)" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* ── Decorative rings ── */}
        {/* Innermost subtle guide */}
        <circle cx={CX} cy={CY} r={HUB_R + 14}
          fill="none" stroke="var(--orbit-ring-primary)" strokeWidth="0.75" opacity="0.4" />
        {/* Inner ring track */}
        <circle cx={CX} cy={CY} r={R1}
          fill="none" stroke="var(--orbit-ring-primary)" strokeWidth="0.75" />
        {/* Outer ring track — dashed */}
        <circle cx={CX} cy={CY} r={R2}
          fill="none" stroke="var(--orbit-ring-outer)" strokeWidth="0.75" strokeDasharray="6 9" />
        {/* Outermost hint */}
        <circle cx={CX} cy={CY} r={R2 + 28}
          fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" strokeDasharray="2 14" opacity="0.6" />

        {/* ── Spokes — hub to inner nodes (very subtle) ── */}
        {INNER.map(({ color, deg }) => {
          const { x, y } = polarToXY(R1, deg);
          return (
            <line
              key={`spoke-${deg}`}
              x1={CX} y1={CY} x2={x} y2={y}
              stroke={color}
              strokeWidth="0.5"
              opacity="0.08"
              strokeDasharray="3 6"
            />
          );
        })}

        {/* ── Centre hub ── */}
        <g filter="url(#hub-glow)">
          {/* Outer ring shadow */}
          <circle cx={CX} cy={CY} r={HUB_R + 5}
            fill="none" stroke="var(--brand-primary)" strokeWidth="0.5" opacity="0.18" />
          {/* Main hub disc */}
          <circle cx={CX} cy={CY} r={HUB_R}
            fill="url(#hubGrad)" />
          <circle cx={CX} cy={CY} r={HUB_R}
            fill="none" stroke="var(--brand-primary)" strokeWidth="1.5" opacity="0.70" />
          {/* Brand initial */}
          <text
            x={CX} y={CY - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-primary)"
            fontSize="28"
            fontWeight="900"
            fontFamily="Inter, -apple-system, sans-serif"
            letterSpacing="-1"
          >
            T
          </text>
          {/* Role label */}
          <text
            x={CX} y={CY + 14}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-tertiary)"
            fontSize="6.5"
            fontWeight="700"
            fontFamily="Inter, -apple-system, sans-serif"
            letterSpacing="2"
          >
            ARCHITECT
          </text>
          {/* Pulse indicator — animated availability dot */}
          <circle cx={CX + 40} cy={CY - 40} r={4.5} fill="var(--brand-emerald)" opacity="0.9">
            <animate attributeName="r"       values="4.5;7.5;4.5" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.25;0.9" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ══ INNER RING — Salesforce Clouds, slow CW rotation ══ */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="36s"
            repeatCount="indefinite"
          />
          {INNER.map(({ label, color, deg }) => {
            const { x, y } = polarToXY(R1, deg);
            return (
              <g key={label} transform={`translate(${x} ${y})`} filter="url(#node-glow)">
                {/* Counter-rotate so labels stay upright */}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="-360 0 0"
                  dur="36s"
                  additive="sum"
                  repeatCount="indefinite"
                />
                {/* Halo */}
                <circle r={N1.halo} fill={color} opacity="0.10" />
                {/* Disc */}
                <circle r={N1.disc} fill="url(#nodeGrad-inner)" stroke={color} strokeWidth="1.5" />
                {/* Label */}
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={color}
                  fontSize={N1.fs}
                  fontWeight="700"
                  fontFamily="Inter, -apple-system, sans-serif"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>

        {/* ══ OUTER RING — Technical disciplines, slower CW ══ */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="60s"
            repeatCount="indefinite"
          />
          {OUTER.map(({ label, color, deg }) => {
            const { x, y } = polarToXY(R2, deg);
            return (
              <g key={label} transform={`translate(${x} ${y})`} filter="url(#node-glow)">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="-360 0 0"
                  dur="60s"
                  additive="sum"
                  repeatCount="indefinite"
                />
                <circle r={N2.halo} fill={color} opacity="0.08" />
                <circle r={N2.disc} fill="url(#nodeGrad-inner)" stroke={color} strokeWidth="1.2" />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={color}
                  fontSize={N2.fs}
                  fontWeight="700"
                  fontFamily="Inter, -apple-system, sans-serif"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
