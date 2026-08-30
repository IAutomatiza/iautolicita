import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import LiveDot from "./ui/LiveDot";
import { enlaceApp } from "../lib/cta";

/* ════════════════════════════════════════════════════════════
   Cierre de /lici — la página terminaba en la comparación y
   saltaba al pie: el visitante convencido no tenía nada que
   apretar. Mismo lenguaje del FinalCTA del home (tarjeta oscura,
   trama de rejilla, haces de luz — reusa sus keyframes
   cta-beam-*), con el mensaje de Lici y el CTA a la app.
═══════════════════════════════════════════════════════════════ */

export default function LiciCierre() {
  return (
    <section className="relative py-16 md:py-28">
      <div className="mx-auto px-3 md:px-4 lg:px-5" style={{ maxWidth: 1920 }}>
        <div
          className="relative overflow-hidden rounded-3xl px-5 py-12 md:px-16 md:py-24"
          style={{
            background:
              "radial-gradient(ellipse at 30% 0%, rgba(0,100,224,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(0,100,224,0.10) 0%, transparent 50%), #0A0A0A",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 30px 100px -30px rgba(0,100,224,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* La trama de rejilla del FinalCTA */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          {/* Los haces de luz, con los keyframes ya definidos */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0"
            style={{
              left: "22%",
              width: "1.5px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,100,224,0.7) 35%, rgba(255,255,255,0.95) 50%, rgba(0,100,224,0.7) 65%, transparent 100%)",
              animation: "cta-beam-1 11s ease-in-out infinite",
              filter: "blur(0.5px)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0"
            style={{
              right: "18%",
              width: "1.5px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,100,224,0.6) 35%, rgba(255,255,255,0.85) 50%, rgba(0,100,224,0.6) 65%, transparent 100%)",
              animation: "cta-beam-2 14s ease-in-out infinite",
              filter: "blur(0.5px)",
            }}
          />

          <div className="relative mx-auto max-w-[920px] text-center">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 md:mb-10">
              <LiveDot />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/70">
                Lici está en línea
              </span>
            </div>

            <h2 className="font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-[58px]">
              Tu competencia lee las bases.
              <br />
              <span className="text-[#5790F5]">Lici ya se las sabe.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-[52ch] font-sans text-[15px] leading-[1.65] text-white/65 md:text-[17px]">
              Abre tu cuenta gratis y pregúntale por tu próxima licitación:
              en minutos ves las que calzan contigo, con su precio sugerido.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={enlaceApp("cierre")}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#0064E0] px-7 font-sans text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0A57BC]"
              >
                Pregúntale gratis
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                to="/precios"
                className="inline-flex h-12 items-center rounded-lg border border-white/20 px-7 font-sans text-[15px] font-medium text-white/85 transition-colors duration-200 hover:border-white/45 hover:text-white"
              >
                Ver planes
              </Link>
            </div>

            <p className="mt-9 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
              Gratis para partir · Sin tarjeta · Desde el navegador
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
