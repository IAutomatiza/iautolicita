import { useState } from "react";
import { Sparkles } from "lucide-react";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Salix Core Features — closest possible replica
   - Panel #181818 with 100px border-radius (Salix exact)
   - 6 SVG icons extracted directly from salix HTML
   - Stroke-draw animation (Salix's icon motion technique)
   - 1201px max-width (extracted from Salix CSS bundle)
   - Horizontal sweeping light beam through the section interior
═══════════════════════════════════════════════════════════════ */

const PINK = "#0064E0"; // brand blue (was #F83D69 Salix pink)
const PANEL_RADIUS = 32;
const PANEL_MAX_W = 1920; // near full viewport — only thin margin from page edges

interface SalixIconSpec {
  d: string;
  dashLen: number;
  gap: number;
  strokeWidth: number;
  transform: string;
}

const SALIX_ICONS: Record<string, SalixIconSpec> = {
  award: {
    d: "M 7.125 9.75 L 4.875 7.5 M 7.125 9.75 C 8.173 9.352 9.178 8.849 10.125 8.25 M 7.125 9.75 L 7.125 13.5 C 7.125 13.5 9.398 13.088 10.125 12 C 10.935 10.785 10.125 8.25 10.125 8.25 M 4.875 7.5 C 5.274 6.465 5.777 5.472 6.375 4.538 C 7.249 3.14 8.466 1.99 9.91 1.196 C 11.354 0.402 12.977 -0.01 14.625 0 C 14.625 2.04 14.04 5.625 10.125 8.25 M 4.875 7.5 L 1.125 7.5 C 1.125 7.5 1.538 5.228 2.625 4.5 C 3.84 3.69 6.375 4.5 6.375 4.5 M 1.5 10.875 C 0.375 11.82 0 14.625 0 14.625 C 0 14.625 2.805 14.25 3.75 13.125 C 4.282 12.495 4.275 11.528 3.683 10.943 C 3.391 10.664 3.007 10.504 2.604 10.491 C 2.201 10.479 1.808 10.615 1.5 10.875 Z",
    dashLen: 64.568, gap: 12.914, strokeWidth: 1.5, transform: "translate(1.875 1.5)",
  },
  chip: {
    d: "M 5.654 0 L 5.654 1.615 M 10.5 0 L 10.5 1.615 M 5.654 14.538 L 5.654 16.154 M 10.5 14.538 L 10.5 16.154 M 14.538 5.654 L 16.154 5.654 M 14.538 9.692 L 16.154 9.692 M 0 5.654 L 1.615 5.654 M 0 9.692 L 1.615 9.692 M 5.492 14.538 L 10.662 14.538 C 12.019 14.538 12.697 14.538 13.215 14.274 C 13.671 14.042 14.042 13.671 14.274 13.215 C 14.538 12.697 14.538 12.019 14.538 10.662 L 14.538 5.492 C 14.538 4.135 14.538 3.457 14.274 2.938 C 14.042 2.482 13.671 2.112 13.215 1.879 C 12.697 1.615 12.019 1.615 10.662 1.615 L 5.492 1.615 C 4.135 1.615 3.457 1.615 2.938 1.879 C 2.482 2.112 2.112 2.482 1.879 2.938 C 1.615 3.457 1.615 4.135 1.615 5.492 L 1.615 10.662 C 1.615 12.019 1.615 12.697 1.879 13.215 C 2.112 13.671 2.482 14.042 2.938 14.274 C 3.457 14.538 4.135 14.538 5.492 14.538 Z M 6.946 10.5 L 9.208 10.5 C 9.66 10.5 9.886 10.5 10.059 10.412 C 10.211 10.335 10.335 10.211 10.412 10.059 C 10.5 9.886 10.5 9.66 10.5 9.208 L 10.5 6.946 C 10.5 6.494 10.5 6.268 10.412 6.095 C 10.335 5.943 10.211 5.819 10.059 5.742 C 9.886 5.654 9.66 5.654 9.208 5.654 L 6.946 5.654 C 6.494 5.654 6.268 5.654 6.095 5.742 C 5.943 5.819 5.819 5.943 5.742 6.095 C 5.654 6.268 5.654 6.494 5.654 6.946 L 5.654 9.208 C 5.654 9.66 5.654 9.886 5.742 10.059 C 5.819 10.211 5.943 10.335 6.095 10.412 C 6.268 10.5 6.494 10.5 6.946 10.5 Z",
    dashLen: 78.377, gap: 15.675, strokeWidth: 1.21, transform: "translate(0.923 0.922)",
  },
  refresh: {
    d: "M 3.231 3.231 L 4.846 1.615 M 4.846 1.615 L 3.231 0 M 4.846 1.615 L 3.231 1.615 C 1.446 1.615 0 3.062 0 4.846 M 12.923 12.923 L 11.308 14.538 M 11.308 14.538 L 12.923 16.154 M 11.308 14.538 L 12.923 14.538 C 14.707 14.538 16.154 13.092 16.154 11.308 M 9.222 9.222 C 9.853 9.523 10.561 9.692 11.308 9.692 C 13.984 9.692 16.154 7.523 16.154 4.846 C 16.154 2.17 13.984 0 11.308 0 C 8.631 0 6.462 2.17 6.462 4.846 C 6.462 5.593 6.63 6.3 6.932 6.932 M 9.692 11.308 C 9.692 13.984 7.523 16.154 4.846 16.154 C 2.17 16.154 0 13.984 0 11.308 C 0 8.631 2.17 6.462 4.846 6.462 C 7.523 6.462 9.692 8.631 9.692 11.308 Z",
    dashLen: 80.123, gap: 16.025, strokeWidth: 1.21, transform: "translate(0.923 0.922)",
  },
  tree: {
    d: "M 1.615 12.923 L 1.615 12.762 C 1.615 11.404 1.615 10.726 1.879 10.208 C 2.112 9.752 2.482 9.381 2.938 9.149 C 3.457 8.885 4.135 8.885 5.492 8.885 L 10.662 8.885 C 12.019 8.885 12.697 8.885 13.215 9.149 C 13.671 9.381 14.042 9.752 14.274 10.208 C 14.538 10.726 14.538 11.404 14.538 12.762 L 14.538 12.923 M 1.615 12.923 C 0.723 12.923 0 13.646 0 14.538 C 0 15.431 0.723 16.154 1.615 16.154 C 2.508 16.154 3.231 15.431 3.231 14.538 C 3.231 13.646 2.508 12.923 1.615 12.923 Z M 14.538 12.923 C 13.646 12.923 12.923 13.646 12.923 14.538 C 12.923 15.431 13.646 16.154 14.538 16.154 C 15.431 16.154 16.154 15.431 16.154 14.538 C 16.154 13.646 15.431 12.923 14.538 12.923 Z M 8.077 12.923 C 7.185 12.923 6.462 13.646 6.462 14.538 C 6.462 15.431 7.185 16.154 8.077 16.154 C 8.969 16.154 9.692 15.431 9.692 14.538 C 9.692 13.646 8.969 12.923 8.077 12.923 Z M 8.077 12.923 L 8.077 4.846 M 3.231 4.846 L 12.923 4.846 C 13.676 4.846 14.052 4.846 14.349 4.723 C 14.745 4.559 15.059 4.245 15.223 3.849 C 15.346 3.552 15.346 3.176 15.346 2.423 C 15.346 1.67 15.346 1.294 15.223 0.997 C 15.059 0.601 14.745 0.287 14.349 0.123 C 14.052 0 13.676 0 12.923 0 L 3.231 0 C 2.478 0 2.102 0 1.805 0.123 C 1.409 0.287 1.095 0.601 0.931 0.997 C 0.808 1.294 0.808 1.67 0.808 2.423 C 0.808 3.176 0.808 3.552 0.931 3.849 C 1.095 4.245 1.409 4.559 1.805 4.723 C 2.102 4.846 2.478 4.846 3.231 4.846 Z",
    dashLen: 93.395, gap: 18.679, strokeWidth: 1.21, transform: "translate(0.923 0.922)",
  },
  pulse: {
    d: "M 16.154 7.269 L 12.923 7.269 L 10.5 14.538 L 5.654 0 L 3.231 7.269 L 0 7.269",
    dashLen: 37.111, gap: 7.422, strokeWidth: 1.21, transform: "translate(0.923 1.728)",
  },
  database: {
    d: "M 8.885 14.538 C 8.885 15.431 8.161 16.154 7.269 16.154 C 6.377 16.154 5.654 15.431 5.654 14.538 M 8.885 14.538 C 8.885 13.646 8.161 12.923 7.269 12.923 M 8.885 14.538 L 14.538 14.538 M 5.654 14.538 C 5.654 13.646 6.377 12.923 7.269 12.923 M 5.654 14.538 L 0 14.538 M 7.269 12.923 L 7.269 9.692 M 14.538 2.423 C 14.538 3.761 11.284 4.846 7.269 4.846 C 3.255 4.846 0 3.761 0 2.423 M 14.538 2.423 C 14.538 1.085 11.284 0 7.269 0 C 3.255 0 0 1.085 0 2.423 M 14.538 2.423 L 14.538 7.269 C 14.538 8.61 11.308 9.692 7.269 9.692 M 0 2.423 L 0 7.269 C 0 8.61 3.231 9.692 7.269 9.692",
    dashLen: 82.969, gap: 16.594, strokeWidth: 1.21, transform: "translate(1.734 0.923)",
  },
};

const SalixIcon = ({ spec, delay = 0 }: { spec: SalixIconSpec; delay?: number }) => (
  <svg viewBox="0 0 18 18" className="h-9 w-9 overflow-visible">
    <g transform={spec.transform}>
      <path
        d={spec.d}
        fill="transparent"
        stroke={PINK}
        strokeWidth={spec.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${spec.dashLen} ${spec.gap}`}
        style={{
          animation: `salix-draw 4s ease-out infinite`,
          animationDelay: `${delay}s`,
          // CSS variable for the keyframe to use
          ["--dl" as never]: spec.dashLen,
        }}
      />
    </g>
  </svg>
);

interface CardData {
  iconKey: keyof typeof SALIX_ICONS;
  title: string;
  body: string;
}

const tiles: CardData[] = [
  { iconKey: "award", title: "ChileCompra en vivo", body: "Sincronización 24/7 con el portal oficial. Capturamos cada licitación, OC y adjudicación apenas se publica." },
  { iconKey: "chip", title: "IA Anthropic Claude", body: "Lectura automática de bases técnicas y chat por licitación. La misma IA detrás de las apps top del mundo." },
  { iconKey: "database", title: "Reportes y exportes", body: "Descargá cualquier vista en Excel, CSV o PDF. Reportes diarios automáticos al mail de tu equipo." },
  { iconKey: "refresh", title: "Gestión por equipo", body: "Notas tipificadas, menciones, asignación de tareas y kanban. Tu equipo opera en una sola UI, no en planillas." },
  { iconKey: "tree", title: "WhatsApp + email + Telegram", body: "Alertas donde tu equipo ya está mirando. Configurables por organización, usuario y tipo de evento." },
  { iconKey: "pulse", title: "Auditoría completa", body: "Cada acción queda registrada con fecha, hora y usuario. Trazabilidad total para licitaciones del Estado." },
];

const CARD = {
  bg: "#181818",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(0,100,224,0.40)",
  shadow:
    "0px 4px 16px 0px rgba(0,0,0,0.24), inset 0px 2px 4px 0px rgba(255,255,255,0.06)",
  shadowHover:
    "0px 24px 48px -16px rgba(0,100,224,0.30), 0px 4px 16px 0px rgba(0,0,0,0.36), inset 0px 2px 4px 0px rgba(255,255,255,0.10)",
};

interface CardProps extends CardData { index: number }

const SalixCard = ({ iconKey, title, body, index }: CardProps) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const [hovered, setHovered] = useState(false);
  const delay = index * 70;
  const spec = SALIX_ICONS[iconKey];

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        filter: inView ? "blur(0)" : "blur(6px)",
        transition:
          `opacity 0.6s ease-out ${delay}ms,` +
          ` transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms,` +
          ` filter 0.6s ease-out ${delay}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-full p-7 md:p-8 transition-all duration-400 ease-out overflow-hidden"
        style={{
          background: CARD.bg,
          border: `1px solid ${hovered ? CARD.borderHover : CARD.border}`,
          borderRadius: "20px",
          boxShadow: hovered ? CARD.shadowHover : CARD.shadow,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {hovered && (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "20px",
              padding: "1px",
              background: `conic-gradient(from var(--angle, 0deg), transparent 0deg, transparent 270deg, ${PINK} 320deg, transparent 360deg)`,
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              animation: "salix-card-beam 2.4s linear infinite",
            }}
          />
        )}

        <div className="mb-7">
          <SalixIcon spec={spec} delay={index * 0.3} />
        </div>

        <h3 className="font-display font-semibold text-[19px] md:text-[20px] leading-tight tracking-[-0.015em]" style={{ color: "#FAFAFA" }}>
          {title}
        </h3>
        <p className="mt-2.5 font-sans text-[13.5px] md:text-[14px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.55)" }}>
          {body}
        </p>
      </div>
    </div>
  );
};

export default function IntegrationsBento() {
  return (
    <section id="stack" className="py-12 md:py-20 relative bg-ink-950">
      <div className="mx-auto px-3 md:px-4 lg:px-5" style={{ maxWidth: PANEL_MAX_W }}>
        {/* The Salix-exact panel */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#181818",
            borderRadius: `${PANEL_RADIUS}px`,
            boxShadow:
              "0px 4px 16px 0px rgba(0,0,0,0.24), inset 0px 2px 4px 0px rgba(255,255,255,0.06)",
          }}
        >
          {/* === VERTICAL PINK LIGHT BEAMS travelling up/down inside the panel ===
              Short vertical line segments (~120px) that travel vertically
              along each side of the panel. This is the "luz que pasa por dentro"
              visible in the Salix screenshots. */}

          {/* LEFT BEAM */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: 0,
              left: "32px",
              width: "2px",
              height: "140px",
              background: `linear-gradient(to bottom,
                transparent 0%,
                rgba(0,100,224,0.0) 8%,
                rgba(0,100,224,0.85) 35%,
                rgba(255,255,255,1) 50%,
                rgba(0,100,224,0.85) 65%,
                rgba(0,100,224,0.0) 92%,
                transparent 100%)`,
              animation: "vertical-beam-left 7s ease-in-out infinite",
              boxShadow: "0 0 20px rgba(0,100,224,0.6), 0 0 40px rgba(0,100,224,0.4)",
            }}
          />
          {/* LEFT BEAM halo (wider blur) */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: 0,
              left: "8px",
              width: "50px",
              height: "180px",
              background: `linear-gradient(to bottom,
                transparent 0%,
                rgba(0,100,224,0.35) 50%,
                transparent 100%)`,
              animation: "vertical-beam-left 7s ease-in-out infinite",
              filter: "blur(20px)",
              opacity: 0.6,
            }}
          />

          {/* RIGHT BEAM (offset timing) */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: 0,
              right: "32px",
              width: "2px",
              height: "140px",
              background: `linear-gradient(to bottom,
                transparent 0%,
                rgba(0,100,224,0.0) 8%,
                rgba(0,100,224,0.85) 35%,
                rgba(255,255,255,1) 50%,
                rgba(0,100,224,0.85) 65%,
                rgba(0,100,224,0.0) 92%,
                transparent 100%)`,
              animation: "vertical-beam-right 9s ease-in-out infinite",
              boxShadow: "0 0 20px rgba(0,100,224,0.6), 0 0 40px rgba(0,100,224,0.4)",
            }}
          />
          {/* RIGHT BEAM halo */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: 0,
              right: "8px",
              width: "50px",
              height: "180px",
              background: `linear-gradient(to bottom,
                transparent 0%,
                rgba(0,100,224,0.35) 50%,
                transparent 100%)`,
              animation: "vertical-beam-right 9s ease-in-out infinite",
              filter: "blur(20px)",
              opacity: 0.6,
            }}
          />


          <div className="relative px-5 md:px-12 lg:px-16 py-12 md:py-20">
            {/* Header */}
            <div className="text-center max-w-[680px] mx-auto mb-12 md:mb-16">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}
              >
                <Sparkles className="h-3 w-3" style={{ color: PINK }} strokeWidth={1.8} />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                  Core Features
                </span>
              </div>
              <h2 className="font-display font-semibold text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.035em]" style={{ color: "#FAFAFA" }}>
                ¿Qué hay{" "}
                <span className="font-serif italic font-normal tracking-[-0.02em]" style={{ color: "#8AB2F9" }}>
                  dentro
                </span>
                <br />
                de IAutoLicita?
              </h2>
              <p className="mt-5 font-sans text-[15.5px] md:text-[16px] leading-[1.5] max-w-[520px] mx-auto" style={{ color: "rgba(255,255,255,0.60)" }}>
                Las empresas eligen IAutoLicita porque simplifica la complejidad de vender al Estado.
              </p>
            </div>

            {/* 3×2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {tiles.map((tile, i) => (
                <SalixCard key={i} {...tile} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Vertical beams travelling up/down along the sides of the panel.
           translateY goes from -140px (above the panel, hidden) to
           100% + 140px (past the bottom). */
        /* Travel ~900px which covers the panel height comfortably */
        @keyframes vertical-beam-left {
          0%   { transform: translateY(-140px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(900px); opacity: 0; }
        }
        @keyframes vertical-beam-right {
          0%   { transform: translateY(900px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-140px); opacity: 0; }
        }
        @keyframes salix-draw {
          0%   { stroke-dashoffset: 100; }
          45%  { stroke-dashoffset: 0; }
          85%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
        @keyframes frame-travel { to { --frame-angle: 360deg; } }
        @keyframes salix-card-beam { to { --angle: 360deg; } }
        @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @property --frame-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
      `}</style>
    </section>
  );
}
