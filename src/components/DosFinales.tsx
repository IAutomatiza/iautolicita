import { X, Check } from "lucide-react";
import Eyebrow from "./ui/Eyebrow";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "Antes / Con IAutoLicita" — clon de la sección Before/With V7
   de v7.com (referencia Mobbin del cliente), con el naranjo
   traducido al azul de la marca.

   · Las dos columnas van estiradas (items-stretch + flex-col y
     panel flex-1) para que ambos paneles midan EXACTAMENTE lo
     mismo aunque los textos difieran.
   · El panel azul está "vivo": un destello diagonal lo recorre
     y un resplandor respira detrás de los chips; el negro queda
     quieto y apagado a propósito — ese contraste es el mensaje.
   · Entradas desde lados opuestos, chips escalonados; todo
     transform/opacity, y prefers-reduced-motion lo apaga (la
     base visible es el estado final).
═══════════════════════════════════════════════════════════════ */

const ANTES = [
  "Horas revisando el portal, todos los días",
  "Bases de 80 páginas leídas a mano",
  "Precios por intuición que regalan margen",
  "Anexos y cierres descubiertos tarde",
];

const CON = [
  "Alerta el día 1, puntuada 0–100 contra tu perfil",
  "La IA lee las bases y cita la página exacta",
  "Precio óptimo sobre 6,4M de órdenes de compra",
  "Cada cierre avisado con días de ventaja",
];

/* Vetas verticales sutiles, como la textura del original */
const VETAS =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1.5px, transparent 1.5px, transparent 22px)";

export default function DosFinales() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);

  const entrada = (delayMs: number, desdeX: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : `translateX(${desdeX}px)`,
    transition: `opacity 0.65s ease ${delayMs}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  const chip = (delayMs: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0) scale(1)" : "translateY(14px) scale(0.96)",
    transition: `opacity 0.5s ease ${delayMs}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <section id="resultados" className="scroll-mt-28 px-3 md:px-5 py-8 md:py-12">
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-white px-6 py-16 md:px-12 lg:px-16 md:py-24">
        <div ref={ref} className="max-w-[1240px] mx-auto w-full">
          <div style={entrada(0, 0)}>
            <Eyebrow className="mb-12 md:mb-16">Con y sin IAutoLicita</Eyebrow>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-14 items-stretch">
            {/* ── ANTES — quieto y apagado ──────────────────── */}
            <div className="flex flex-col" style={entrada(0, -28)}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-4 w-4 place-items-center rounded-full border border-[#0A1530]/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0A1530]/25" />
                </span>
                <span className="font-sans text-[14px] text-[#0A1530]/55">Antes</span>
              </div>
              <h3 className="mt-6 font-display font-medium text-[26px] md:text-[33px] leading-[1.15] tracking-[-0.025em] text-[#0A1530]/35 max-w-[440px] lg:min-h-[2.3em]">
                El equipo se gasta la semana buscando y leyendo bases.
              </h3>

              <div className="relative mt-9 flex-1 flex items-center rounded-md bg-[#0B0B0C] px-6 py-10 md:px-8 md:py-20 overflow-hidden">
                <div aria-hidden className="absolute inset-0" style={{ background: VETAS, opacity: 0.6 }} />
                <div className="relative w-full grid sm:grid-cols-2 gap-3.5">
                  {ANTES.map((t, i) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-lg bg-white/[0.07] border border-white/[0.05] px-4 py-4"
                      style={chip(180 + i * 90)}
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-white/70" strokeWidth={2.2} />
                      <span className="font-sans text-[13.5px] leading-[1.5] text-white/85">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CON IAUTOLICITA — el panel vivo ───────────── */}
            <div className="flex flex-col" style={entrada(120, 28)}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-4 w-4 place-items-center rounded-full border border-[#0064E0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0064E0]" />
                </span>
                <span className="font-sans text-[14px] text-[#0A1530]">Con IAutoLicita</span>
              </div>
              <h3 className="mt-6 font-display font-medium text-[26px] md:text-[33px] leading-[1.15] tracking-[-0.025em] text-[#0A1530] max-w-[440px] lg:min-h-[2.3em]">
                Tu equipo se dedica a una sola cosa: ganar.
              </h3>

              <div
                className="relative mt-9 flex-1 flex items-center rounded-md px-6 py-10 md:px-8 md:py-20 overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 90% at 50% 40%, #4D95FF 0%, #0B72F5 45%, #0064E0 100%)",
                }}
              >
                <div aria-hidden className="absolute inset-0" style={{ background: VETAS }} />
                {/* Resplandor que respira detrás de los chips */}
                {inView && (
                  <div
                    aria-hidden
                    className="df-nube absolute -top-1/4 -left-1/4 h-[120%] w-[120%] rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28) 0%, transparent 55%)",
                    }}
                  />
                )}
                {/* Destello diagonal que recorre el panel */}
                {inView && (
                  <div
                    aria-hidden
                    className="df-brillo absolute inset-y-0 w-[38%] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                    }}
                  />
                )}
                <div className="relative w-full grid sm:grid-cols-2 gap-3.5">
                  {CON.map((t, i) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-lg bg-white/[0.16] border border-white/[0.14] px-4 py-4 backdrop-blur-[2px] transition-transform duration-300 hover:-translate-y-1"
                      style={chip(300 + i * 90)}
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={2.4} />
                      <span className="font-sans text-[13.5px] font-medium leading-[1.5] text-white">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .df-brillo {
          animation: dfBrillo 5.5s cubic-bezier(0.4, 0, 0.2, 1) 1.2s infinite;
          transform: translateX(-160%) skewX(-16deg);
        }
        @keyframes dfBrillo {
          0% { transform: translateX(-160%) skewX(-16deg); }
          45%, 100% { transform: translateX(420%) skewX(-16deg); }
        }
        .df-nube {
          animation: dfNube 9s ease-in-out infinite;
        }
        @keyframes dfNube {
          0%, 100% { transform: translate(-10%, -6%) scale(1); }
          50% { transform: translate(12%, 8%) scale(1.18); }
        }
        @media (prefers-reduced-motion: reduce) {
          .df-brillo, .df-nube { animation: none; }
        }
      `}</style>
    </section>
  );
}
