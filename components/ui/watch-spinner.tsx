/**
 * Branded loading spinner shaped like a watch: the hour and minute hands spin
 * at different speeds for a premium "timepiece" feel. Inherits the current text
 * color via `currentColor`, so it matches whatever button/context it sits in.
 * Animated with SMIL (deterministic, no hydration mismatch, no client hooks).
 */
export function WatchSpinner({
  className,
  label = "Cargando",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="status"
      aria-label={label}
      fill="none"
    >
      {/* Bezel */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      {/* Minute hand (fast) */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </line>
      {/* Hour hand (slow) */}
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="7.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </line>
      {/* Center cap */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
