interface Props {
  size?: number; // px
  color?: string; // tailwind color class for solid dot, e.g. "bg-amber-400"
  ringColor?: string; // tailwind for the expanding ring
  className?: string;
}

/**
 * Classic "live indicator" LED:
 * - Solid centered dot (always visible)
 * - Outer ring that expands and fades (animate-ping)
 * - Subtle inner pulse for the "turning on/off" feel
 *
 * Compose three layers so the effect reads from any distance.
 */
export default function LiveDot({
  size = 8,
  color = "bg-amber-400",
  ringColor = "bg-amber-400",
  className = "",
}: Props) {
  return (
    <span
      className={`relative inline-flex flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer expanding ring (the "ping") */}
      <span
        className={`absolute inset-0 rounded-full ${ringColor} opacity-75 animate-ping`}
      />
      {/* Mid pulse — softer second wave for richer feel */}
      <span
        className={`absolute inset-0 rounded-full ${ringColor} opacity-40 animate-pulse-soft`}
      />
      {/* Solid core */}
      <span
        className={`relative inline-flex rounded-full ${color}`}
        style={{ width: size, height: size }}
      />
    </span>
  );
}
