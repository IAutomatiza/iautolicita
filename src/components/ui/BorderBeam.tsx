interface Props {
  duration?: number;
  size?: number;
  colorFrom?: string;
  colorTo?: string;
}

/**
 * Magic-UI style animated border beam.
 * A gradient that travels around the card edge using CSS conic gradients
 * and a mask. Lives inside a relative parent.
 */
export default function BorderBeam({
  duration = 8,
  size = 220,
  colorFrom = "#5BFFB7",
  colorTo = "rgba(91, 255, 183, 0)",
}: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(black,black)]"
      style={
        {
          "--bb-size": `${size}px`,
          "--bb-from": colorFrom,
          "--bb-to": colorTo,
          "--bb-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute aspect-square w-[var(--bb-size)] animate-[border-beam_var(--bb-duration)_linear_infinite] [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_var(--bb-size))]"
        style={{
          background:
            "linear-gradient(to left, var(--bb-from), var(--bb-to) 60%, transparent 80%)",
        }}
      />
    </div>
  );
}
