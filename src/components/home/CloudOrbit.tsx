import { useState, useCallback, useMemo, useEffect } from 'react';
import { orbitDegrees } from '../../data/metrics';

/* ── Geometry ── */
const SIZE = 760;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_HUB = 76;
const R_INNER_RING = 162;
const R_OUTER_RING = 328;

const SIGNAL_DUR = '3.2s';
const SIGNAL_CYCLE = 40;
const SIGNAL_INDICES = [0, 3, 6, 9];

/** Meaningful cloud → technology relationships (Center → Cloud → Tech) */
const CLOUD_TECH_MAP: Record<string, string[]> = {
  sales:      ['apex', 'triggers'],
  service:    ['flows', 'events'],
  revenue:    ['rest', 'integr'],
  data:       ['soql', 'einstein'],
  experience: ['lwc'],
  analytics:  ['devops', 'security'],
};

/** Perimeter order — grouped by cloud to minimise line crossing */
const TECH_ORDER = [
  'apex', 'triggers', 'flows', 'events', 'rest', 'integr',
  'soql', 'einstein', 'lwc', 'devops', 'security',
] as const;

interface NodeDef {
  id: string;
  label: string;
  tooltip: string;
  color: string;
  deg: number;
}

const INNER_CLOUDS = [
  { id: 'sales',      label: 'Sales Cloud',      color: '#3b82f6', tooltip: 'Sales Cloud: Pipeline, forecasting & revenue operations' },
  { id: 'service',    label: 'Service Cloud',    color: '#8b5cf6', tooltip: 'Service Cloud: Case management, omni-channel & field service' },
  { id: 'revenue',    label: 'Revenue Cloud',    color: '#f59e0b', tooltip: 'Revenue Cloud & CPQ: Quote-to-cash automation' },
  { id: 'data',       label: 'Data Cloud',       color: '#10b981', tooltip: 'Data Cloud: Unified profiles & real-time ingestion' },
  { id: 'experience', label: 'Experience Cloud', color: '#06b6d4', tooltip: 'Experience Cloud: Branded portals & communities' },
  { id: 'analytics',  label: 'CRM Analytics',    color: '#ec4899', tooltip: 'CRM Analytics: Executive dashboards & predictive insights' },
];

const OUTER_TECH = [
  { id: 'apex',     label: 'Apex',            color: '#3b82f6', tooltip: 'Apex: Enterprise trigger frameworks & async processing' },
  { id: 'lwc',      label: 'LWC',             color: '#06b6d4', tooltip: 'Lightning Web Components: Reactive enterprise UI' },
  { id: 'soql',     label: 'SOQL',            color: '#8b5cf6', tooltip: 'SOQL/SOSL: Optimized queries for large data volumes' },
  { id: 'flows',    label: 'Flows',           color: '#10b981', tooltip: 'Flows & Orchestrator: Declarative automation at scale' },
  { id: 'rest',     label: 'REST API',        color: '#f59e0b', tooltip: 'REST/SOAP APIs: Secure external system integrations' },
  { id: 'events',   label: 'Platform Events', color: '#ec4899', tooltip: 'Platform Events: Event-driven architecture patterns' },
  { id: 'devops',   label: 'DevOps',          color: '#6366f1', tooltip: 'DevOps: Git, CI/CD, scratch orgs & Salesforce CLI' },
  { id: 'einstein', label: 'Einstein AI',     color: '#14b8a6', tooltip: 'Einstein AI: Predictive scoring & intelligent automation' },
  { id: 'integr',   label: 'Integration',     color: '#a855f7', tooltip: 'Integration: Middleware, OAuth2 & named credentials' },
  { id: 'triggers', label: 'Triggers',        color: '#0ea5e9', tooltip: 'Triggers: Bulkified handler frameworks & governor limits' },
  { id: 'security', label: 'Security Model',  color: '#64748b', tooltip: 'Security: Profiles, permission sets & sharing architecture' },
];

const TECH_BY_ID = Object.fromEntries(OUTER_TECH.map((t) => [t.id, t]));

function polarXY(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: radius * Math.cos(rad), y: radius * Math.sin(rad) };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function buildEcosystem() {
  const techDegs = orbitDegrees(TECH_ORDER.length);
  const techNodes: NodeDef[] = TECH_ORDER.map((id, i) => ({
    ...TECH_BY_ID[id],
    deg: techDegs[i],
  }));

  /* Clouds evenly on inner ring circumference */
  const innerCloudDegs = orbitDegrees(INNER_CLOUDS.length);
  const cloudNodes: NodeDef[] = INNER_CLOUDS.map((cloud, i) => ({
    ...cloud,
    deg: innerCloudDegs[i],
  }));

  type Chain = {
    techId: string;
    cloudId: string;
    cloudDeg: number;
    techDeg: number;
    color: string;
    hubCloudPath: string;
    cloudTechPath: string;
    fullPath: string;
  };

  const chains: Chain[] = [];
  const hubCloudPaths: { id: string; d: string; color: string; cloudId: string }[] = [];
  const seenHubCloud = new Set<string>();

  techNodes.forEach((tech) => {
    const cloudId = Object.entries(CLOUD_TECH_MAP).find(([, ids]) => ids.includes(tech.id))?.[0];
    if (!cloudId) return;
    const cloud = cloudNodes.find((c) => c.id === cloudId)!;
    const hub = polarXY(cloud.deg, R_HUB);
    const cloudPt = polarXY(cloud.deg, R_INNER_RING);
    const techPt = polarXY(tech.deg, R_OUTER_RING);

    const hubCloudPath = `M ${hub.x} ${hub.y} L ${cloudPt.x} ${cloudPt.y}`;
    const cloudTechPath = `M ${cloudPt.x} ${cloudPt.y} L ${techPt.x} ${techPt.y}`;
    const fullPath = `${hubCloudPath} L ${techPt.x} ${techPt.y}`;

    if (!seenHubCloud.has(cloudId)) {
      seenHubCloud.add(cloudId);
      hubCloudPaths.push({ id: `hub-${cloudId}`, d: hubCloudPath, color: cloud.color, cloudId });
    }

    chains.push({
      techId: tech.id,
      cloudId,
      cloudDeg: cloud.deg,
      techDeg: tech.deg,
      color: tech.color,
      hubCloudPath,
      cloudTechPath,
      fullPath,
    });
  });

  return { cloudNodes, techNodes, chains, hubCloudPaths };
}

const ECOSYSTEM = buildEcosystem();

/* ── Label components ── */
function CloudLabel({
  item, radius, isHovered, isLit, onHover, onLeave,
}: {
  item: NodeDef; radius: number; isHovered: boolean; isLit: boolean;
  onHover: (id: string) => void; onLeave: () => void;
}) {
  return (
    <div
      className="orbit-label-slot orbit-label-slot-cloud"
      style={{ '--orbit-deg': `${item.deg}deg`, '--orbit-r': radius } as React.CSSProperties}
    >
      <div
        className="orbit-cloud-at-intersection"
        style={{ transform: `rotate(${-item.deg}deg)` }}
      >
        <button
          type="button"
          className={`orbit-cloud-chip${isHovered ? ' orbit-label-active' : ''}${isLit ? ' orbit-node-lit' : ''}`}
          style={{ '--label-color': item.color } as React.CSSProperties}
          onMouseEnter={() => onHover(item.id)}
          onMouseLeave={onLeave}
          onFocus={() => onHover(item.id)}
          onBlur={onLeave}
          aria-label={item.tooltip}
        >
          <span className="orbit-cloud-dot" aria-hidden="true" />
          <span className="orbit-cloud-text">{item.label}</span>
          {isHovered && <span className="orbit-badge-tooltip" role="tooltip">{item.tooltip}</span>}
        </button>
      </div>
    </div>
  );
}

function TechLabel({
  item, radius, isHovered, isLit, onHover, onLeave,
}: {
  item: NodeDef; radius: number; isHovered: boolean; isLit: boolean;
  onHover: (id: string) => void; onLeave: () => void;
}) {
  const isWide = item.label.length > 12;
  return (
    <div
      className="orbit-label-slot orbit-label-slot-tech"
      style={{ '--orbit-deg': `${item.deg}deg`, '--orbit-r': radius } as React.CSSProperties}
    >
      <div className="orbit-label-upright orbit-label-anchor-ring" style={{ transform: `rotate(${-item.deg}deg)` }}>
        <button
          type="button"
          className={`orbit-tech-chip${isHovered ? ' orbit-label-active' : ''}${isLit ? ' orbit-node-lit' : ''}${isWide ? ' orbit-tech-chip-wide' : ''}`}
          style={{ '--label-color': item.color } as React.CSSProperties}
          onMouseEnter={() => onHover(item.id)}
          onMouseLeave={onLeave}
          onFocus={() => onHover(item.id)}
          onBlur={onLeave}
          aria-label={item.tooltip}
        >
          <span className="orbit-tech-dot" aria-hidden="true" />
          <span className="orbit-tech-text">{item.label}</span>
          {isHovered && <span className="orbit-badge-tooltip" role="tooltip">{item.tooltip}</span>}
        </button>
      </div>
    </div>
  );
}

export default function CloudOrbit() {
  const reducedMotion = usePrefersReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [litChain, setLitChain] = useState<string | null>(null);

  const handleHover = useCallback((id: string) => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);

  /* Gentle living-network cycle — one chain at a time, no rAF loop */
  useEffect(() => {
    if (reducedMotion) return;
    let idx = 0;
    const tick = () => {
      setLitChain(ECOSYSTEM.chains[idx % ECOSYSTEM.chains.length].techId);
      idx += 1;
    };
    tick();
    const id = window.setInterval(tick, 3600);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const litCloudIds = useMemo(() => {
    if (!litChain) return new Set<string>();
    const chain = ECOSYSTEM.chains.find((c) => c.techId === litChain);
    return chain ? new Set([chain.cloudId]) : new Set<string>();
  }, [litChain]);

  return (
    <div
      className="orbit-system orbit-ecosystem"
      style={{ '--orbit-size': SIZE } as React.CSSProperties}
      role="img"
      aria-label="Salesforce clouds and technology orbital map"
    >
      <div className="orbit-ambient-glow" aria-hidden="true" />

      <svg className="orbit-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <defs>
          <radialGradient id="orbitHubGrad" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="var(--orbit-hub-from)" />
            <stop offset="100%" stopColor="var(--orbit-hub-to)" />
          </radialGradient>
          <filter id="orbitTrackGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
            <feComponentTransfer in="blur" result="softGlow">
              <feFuncA type="linear" slope="0.45" intercept="0" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="orbitLinkGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feComponentTransfer in="blur" result="softGlow">
              <feFuncA type="linear" slope="0.55" intercept="0" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="orbitNodeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${CX}, ${CY})`}>
          {/* Dashed orbital rings — glow on dashes only (same dash pattern on both layers) */}
          <circle cx={0} cy={0} r={R_INNER_RING} className="orbit-track orbit-track-glow orbit-track-glow-inner" filter="url(#orbitTrackGlow)" />
          <circle cx={0} cy={0} r={R_OUTER_RING} className="orbit-track orbit-track-glow orbit-track-glow-outer" filter="url(#orbitTrackGlow)" />
          <circle cx={0} cy={0} r={R_INNER_RING} className="orbit-track orbit-track-inner" />
          <circle cx={0} cy={0} r={R_OUTER_RING} className="orbit-track orbit-track-outer" />

          {/* Hub → Cloud connections */}
          {ECOSYSTEM.hubCloudPaths.map((link) => (
            <path
              key={link.id}
              d={link.d}
              filter="url(#orbitLinkGlow)"
              className={`orbit-link orbit-link-hub-cloud${
                litCloudIds.has(link.cloudId) ? ' orbit-link-live' : ''
              }`}
              stroke={link.color}
            />
          ))}

          {/* Cloud → Technology connections */}
          {ECOSYSTEM.chains.map((chain) => (
            <path
              key={`ct-${chain.techId}`}
              id={`orbit-chain-${chain.techId}`}
              d={chain.cloudTechPath}
              filter="url(#orbitLinkGlow)"
              className={`orbit-link orbit-link-cloud-tech${
                litChain === chain.techId ? ' orbit-link-live' : ''
              }`}
              stroke={chain.color}
            />
          ))}

          {/* Cloud nodes — always at ring ∩ spoke intersection */}
          {ECOSYSTEM.cloudNodes.map((cloud) => {
            const pt = polarXY(cloud.deg, R_INNER_RING);
            return (
              <circle
                key={`cn-${cloud.id}`}
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill={cloud.color}
                fillOpacity="0.18"
                className={`orbit-node orbit-node-cloud orbit-node-cloud-intersection${litCloudIds.has(cloud.id) ? ' orbit-node-live' : ''}`}
                stroke={cloud.color}
                strokeWidth="2"
                filter="url(#orbitNodeGlow)"
              />
            );
          })}
          {ECOSYSTEM.techNodes.map((tech) => {
            const pt = polarXY(tech.deg, R_OUTER_RING);
            return (
              <circle
                key={`tn-${tech.id}`}
                cx={pt.x}
                cy={pt.y}
                r="4"
                className={`orbit-node orbit-node-tech${litChain === tech.id ? ' orbit-node-live' : ''}`}
                stroke={tech.color}
                strokeWidth="1.75"
                filter="url(#orbitNodeGlow)"
              />
            );
          })}

          {/* Traveling signal dots — staggered, max 4 */}
          {!reducedMotion &&
            ECOSYSTEM.chains.map((chain, i) =>
              SIGNAL_INDICES.includes(i) ? (
                <g key={`sig-${chain.techId}`}>
                  <circle r="2.5" className="orbit-signal" fill={chain.color}>
                    <animateMotion
                      dur={SIGNAL_DUR}
                      begin={`${(i / ECOSYSTEM.chains.length) * SIGNAL_CYCLE}s;${(i / ECOSYSTEM.chains.length) * SIGNAL_CYCLE + SIGNAL_CYCLE}s`}
                      repeatCount="indefinite"
                      path={chain.fullPath}
                      rotate="auto"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.9;0.9;0"
                      keyTimes="0;0.12;0.88;1"
                      dur={SIGNAL_DUR}
                      repeatCount="indefinite"
                      begin={`${(i / ECOSYSTEM.chains.length) * SIGNAL_CYCLE}s;${(i / ECOSYSTEM.chains.length) * SIGNAL_CYCLE + SIGNAL_CYCLE}s`}
                    />
                  </circle>
                </g>
              ) : null,
            )}

          {/* STATIC center hub — no animation */}
          <g className="orbit-hub-static">
            <circle
              cx={0}
              cy={0}
              r={R_HUB}
              fill="url(#orbitHubGrad)"
              stroke="var(--brand-primary)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text
              x={0}
              y={-8}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="28"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              T
            </text>
            <text
              x={0}
              y={15}
              textAnchor="middle"
              fill="var(--text-tertiary)"
              fontSize="7"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
              letterSpacing="2.2"
            >
              ARCHITECT
            </text>
          </g>
        </g>
      </svg>

      <div className="orbit-labels-layer">
        {ECOSYSTEM.cloudNodes.map((cloud) => (
          <CloudLabel
            key={cloud.id}
            item={cloud}
            radius={R_INNER_RING}
            isHovered={hoveredId === cloud.id}
            isLit={litCloudIds.has(cloud.id)}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
        {ECOSYSTEM.techNodes.map((tech) => (
          <TechLabel
            key={tech.id}
            item={tech}
            radius={R_OUTER_RING}
            isHovered={hoveredId === tech.id}
            isLit={litChain === tech.id}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        ))}
      </div>
    </div>
  );
}
