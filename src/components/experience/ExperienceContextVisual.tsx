/** Subtle contextual visual for experience timeline — supports content without competing. */
export default function ExperienceContextVisual() {
  return (
    <div
      className="exp-context-visual"
      role="img"
      aria-label="Abstract cloud architecture visualization"
    >
      <svg viewBox="0 0 360 480" className="exp-context-svg" aria-hidden="true">
        <defs>
          <radialGradient id="exp-ctx-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="360" height="480" fill="url(#exp-ctx-glow)" />

        {/* Central spine echo */}
        <line x1="180" y1="40" x2="180" y2="440" className="exp-ctx-spine" />

        {/* Floating nodes */}
        {[
          [100, 80], [260, 120], [90, 200], [270, 240],
          [110, 320], [250, 360], [180, 420],
        ].map(([x, y], i) => (
          <g key={i} className="exp-ctx-node-group" style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx={x} cy={y} r="12" className="exp-ctx-node" />
            {i < 6 && (
              <line
                x1={x}
                y1={y}
                x2={[[260,120],[90,200],[270,240],[110,320],[250,360],[180,420]][i % 6][0]}
                y2={[[260,120],[90,200],[270,240],[110,320],[250,360],[180,420]][i % 6][1]}
                className="exp-ctx-link"
              />
            )}
          </g>
        ))}

        {/* Data flow pulses */}
        <circle cx="180" cy="180" r="40" fill="none" className="exp-ctx-ring exp-ctx-ring-1" />
        <circle cx="180" cy="180" r="65" fill="none" className="exp-ctx-ring exp-ctx-ring-2" />
      </svg>
    </div>
  );
}
