import { useRef, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * Aceternity / Magic-UI style "Spotlight Card":
 * a soft radial gradient that follows the cursor inside the card.
 * Pure CSS variables + onMouseMove (no JS lib).
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(91, 255, 183, 0.18)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative overflow-hidden ${className}`}
      style={
        {
          "--spot-color": spotlightColor,
        } as React.CSSProperties
      }
    >
      {/* The spotlight layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), var(--spot-color), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
