/**
 * Reusable ambient background — CSS-only layers, GPU-friendly.
 * Sits behind all page content; respects prefers-reduced-motion.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg-orb ambient-bg-orb-1" />
      <div className="ambient-bg-orb ambient-bg-orb-2" />
      <div className="ambient-bg-orb ambient-bg-orb-3" />
      <div className="ambient-bg-grid" />
      <div className="ambient-bg-grain" />
    </div>
  );
}
