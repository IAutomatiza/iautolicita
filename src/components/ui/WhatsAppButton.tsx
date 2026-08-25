import { ArrowUpRight } from "lucide-react";
import { buildWAUrl, MSG_PRUEBA } from "../../lib/whatsapp";

type Variant = "primary" | "ghost" | "huge";

interface Props {
  label?: string;
  message?: string;
  variant?: Variant;
  className?: string;
}

/**
 * Salix-style CTA with breathing aureola behind:
 *  - A blurred clone of the button color sits behind, animated with
 *    `halo-pulse` (opacity 0.45 → 0.85, scale 1 → 1.08, 3s loop).
 *  - The button itself stays crisp solid blue with white text.
 *  - On hover the halo intensifies and the button lifts 1px.
 */
export default function WhatsAppButton({
  label = "Agendar demo",
  message = MSG_PRUEBA,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 font-sans font-medium select-none whitespace-nowrap transition-all duration-200 ease-out";

  // Solid blue with white text + inset highlight + ambient drop shadow
  const filledCore =
    "bg-amber-400 text-white rounded-full " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(10,10,10,0.10),0_1px_2px_rgba(10,10,10,0.06),0_6px_18px_-4px_rgba(0,100,224,0.40)] " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(10,10,10,0.12),0_2px_4px_rgba(10,10,10,0.08),0_14px_36px_-6px_rgba(0,100,224,0.55)] " +
    "hover:-translate-y-[1px] " +
    "active:translate-y-0 active:shadow-[inset_0_1px_0_rgba(255,255,255,0.20),inset_0_-1px_0_rgba(10,10,10,0.10),0_1px_2px_rgba(10,10,10,0.06)]";

  const ghostStyle =
    "bg-white text-cream-50 border border-[var(--hairline-strong)] rounded-full " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(10,10,10,0.04)] " +
    "hover:border-amber-400/40 hover:text-amber-400 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(0,100,224,0.20)] " +
    "hover:-translate-y-[1px] active:translate-y-0";

  const styles: Record<Variant, string> = {
    primary: `h-10 px-5 text-[14px] tracking-[-0.005em] ${filledCore}`,
    ghost: `h-10 px-5 text-[14px] tracking-[-0.005em] ${ghostStyle}`,
    huge: `h-14 px-7 text-[15px] tracking-[-0.005em] ${filledCore}`,
  };

  const isFilled = variant === "primary" || variant === "huge";

  return (
    <span className="relative inline-flex">
      {/* Aureola — breathing blue halo behind the filled variants */}
      {isFilled && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-amber-400 blur-2xl opacity-50 animate-halo-pulse pointer-events-none"
        />
      )}
      <a
        href={buildWAUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} por WhatsApp`}
        className={`${base} ${styles[variant]} ${className}`}
      >
        <span>{label}</span>
        <ArrowUpRight
          className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </a>
    </span>
  );
}
