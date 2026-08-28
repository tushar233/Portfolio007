import { useMemo } from 'react';

interface ArchitectureEcosystemProps {
  activeSpecId: string;
}

const NODES = [
  { id: 'sf-clouds',       label: 'Clouds',     angle: -90,  r: 0    },
  { id: 'apex-triggers',   label: 'Apex',       angle: -30,  r: 118  },
  { id: 'async-apex',      label: 'Async',      angle: 30,   r: 118  },
  { id: 'lwc',             label: 'LWC',        angle: 90,   r: 118  },
  { id: 'integrations',    label: 'APIs',       angle: 150,  r: 118  },
  { id: 'data-architecture', label: 'Data',     angle: 210,  r: 118  },
] as const;

const CX = 200;
const CY = 200;
const HUB_R = 36;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

export default function ArchitectureEcosystem({ activeSpecId }: ArchitectureEcosystemProps) {
  const outerNodes = useMemo(
    () => NODES.filter((n) => n.r > 0).map((n) => ({ ...n, ...polar(n.angle, n.r) })),
    [],
  );

  return (
    <div
      className="arch-ecosystem"
      role="img"
      aria-label="Salesforce platform ecosystem diagram"
    >
      <svg viewBox="0 0 400 400" className="arch-ecosystem-svg" aria-hidden="true">
        <defs>
          <radialGradient id="arch-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="arch-node-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r="160" fill="url(#arch-hub-glow)" className="arch-ecosystem-ambient" />

        {outerNodes.map((node) => {
          const isActive = activeSpecId === node.id;
          const highlighted = isActive;
          return (
            <g key={node.id}>
              <line
                x1={CX}
                y1={CY}
                x2={node.x}
                y2={node.y}
                className={`arch-ecosystem-link${highlighted ? ' arch-ecosystem-link-active' : ''}`}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 22 : 18}
                className={`arch-ecosystem-node${isActive ? ' arch-ecosystem-node-active' : ''}`}
                filter={isActive ? 'url(#arch-node-glow)' : undefined}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                className={`arch-ecosystem-label${isActive ? ' arch-ecosystem-label-active' : ''}`}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={HUB_R} className="arch-ecosystem-hub" />
        <text x={CX} y={CY + 5} textAnchor="middle" className="arch-ecosystem-hub-label">
          Platform
        </text>
      </svg>
    </div>
  );
}
