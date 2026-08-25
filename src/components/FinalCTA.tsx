import { ArrowUpRight, MessageCircle } from "lucide-react";
import { buildWAUrl, MSG_PRUEBA } from "../lib/whatsapp";
import LiveDot from "./ui/LiveDot";

/* ════════════════════════════════════════════════════════════
   Final CTA — cinematic dark close.
   Single provocative claim, one strong CTA, present-tense urgency.
═══════════════════════════════════════════════════════════════ */

export default function FinalCTA() {
  return (
    <section id="contacto" className="scroll-mt-28 py-16 md:py-28 relative">
      <div className="mx-auto px-3 md:px-4 lg:px-5" style={{ maxWidth: 1920 }}>
        <div
          className="relative overflow-hidden rounded-3xl px-5 md:px-16 py-12 md:py-28"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(0,100,224,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(0,100,224,0.10) 0%, transparent 50%), #0A0A0A",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 30px 100px -30px rgba(0,100,224,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Decorative grid pattern */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          {/* Vertical light beam — drifting */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: "20%",
              width: "1.5px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,100,224,0.7) 35%, rgba(255,255,255,0.95) 50%, rgba(0,100,224,0.7) 65%, transparent 100%)",
              animation: "cta-beam-1 11s ease-in-out infinite",
              filter: "blur(0.5px)",
            }}
          />
          <div
            aria-hidden
            className="absolute top-0 bottom-0 pointer-events-none opacity-50"
            style={{
              left: "20%",
              width: "60px",
              marginLeft: "-30px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,100,224,0.35) 50%, transparent 100%)",
              animation: "cta-beam-1 11s ease-in-out infinite",
              filter: "blur(20px)",
            }}
          />
          <div
            aria-hidden
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              right: "16%",
              width: "1.5px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,100,224,0.6) 35%, rgba(255,255,255,0.85) 50%, rgba(0,100,224,0.6) 65%, transparent 100%)",
              animation: "cta-beam-2 14s ease-in-out infinite",
              filter: "blur(0.5px)",
            }}
          />

          {/* Content */}
          <div className="relative max-w-[920px] mx-auto text-center">
            {/* Eyebrow with LED */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-8 md:mb-10 border"
              style={{
                background: "rgba(0,100,224,0.08)",
                borderColor: "rgba(0,100,224,0.25)",
              }}
            >
              <LiveDot size={7} />
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.20em] font-medium"
                style={{ color: "#5790F5" }}
              >
                Mientras lees esto · 42 licitaciones nuevas
              </span>
            </div>

            {/* Provocative headline */}
            <h2
              className="font-display font-medium leading-[1.02] tracking-[-0.04em]"
              style={{ color: "#FFFFFF" }}
            >
              <span className="block text-[40px] md:text-[60px] lg:text-[78px]">
                Tu próxima licitación
              </span>
              <span
                className="block font-display font-medium text-[44px] md:text-[66px] lg:text-[86px] mt-1 tracking-[-0.025em]"
                style={{ color: "#0064E0" }}
              >
                ya se publicó.
              </span>
              <span
                className="block text-[28px] md:text-[34px] lg:text-[42px] mt-4 font-normal"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                ¿La vas a leer mañana, o ahora?
              </span>
            </h2>

            {/* Sub */}
            <p
              className="mt-10 font-sans text-[16px] md:text-[18px] leading-[1.55] max-w-[620px] mx-auto"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              Pruébalo gratis con tus propias licitaciones: escribes por WhatsApp y en minutos ves las que <em className="not-italic" style={{ color: "#FFFFFF" }}>calzan contigo hoy</em>, con su precio sugerido. Sin tarjeta y sin instalar nada.
            </p>

            {/* CTAs */}
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              {/* Primary — with halo */}
              <span className="relative inline-flex">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-lg blur-2xl opacity-60 animate-halo-pulse pointer-events-none"
                  style={{ background: "#0064E0" }}
                />
                <a
                  href={buildWAUrl(MSG_PRUEBA)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 h-14 px-7 text-[15px] font-medium rounded-lg transition-all duration-200 ease-out hover:-translate-y-[1px] active:translate-y-0"
                  style={{
                    background: "#0064E0",
                    color: "#FFFFFF",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(10,10,10,0.10), 0 1px 2px rgba(10,10,10,0.10), 0 8px 28px -6px rgba(0,100,224,0.55)",
                  }}
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  ¡Pruébalo gratis!
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
              </span>

              {/* Secondary — text link with subtle border */}
              <a
                href="https://iautomatiza.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-14 px-6 text-[14.5px] font-medium rounded-lg transition-colors duration-200 hover:bg-white/[0.04]"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                Conocer iautomatiza.cl
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>

            {/* Trust line — micro signals, not big stats */}
            <div className="mt-12 md:mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em]">
              {[
                "Gratis para partir",
                "Sin tarjeta",
                "Sin instalar nada",
                "Por WhatsApp",
              ].map((t, i, arr) => (
                <span
                  key={t}
                  className="flex items-center gap-3"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  <span>{t}</span>
                  {i < arr.length - 1 && (
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.20)" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cta-beam-1 {
          0%, 100% { transform: translateX(0); opacity: 0.7; }
          50% { transform: translateX(40px); opacity: 1; }
        }
        @keyframes cta-beam-2 {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(-50px); opacity: 0.95; }
        }
      `}</style>
    </section>
  );
}
