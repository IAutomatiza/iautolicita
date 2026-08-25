import { X, Check } from "lucide-react";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "Antes / Con IAutoLicita" — clon fiel de la sección
   Before / With V7 de v7.com (referencia Mobbin del cliente):
   dos columnas espejadas, cada una con su etiqueta de radio y
   su titular (el "antes" apagado en gris, el "con" en tinta
   firme), y debajo un panel grande — negro con cruces vs
   vibrante con checks — con los chips translúcidos en grilla
   2×2 y la textura de vetas verticales del original. El naranjo
   de V7 se traduce al azul IAutoLicita.

   Los textos dejan los genéricos: cada chip lleva el dato
   concreto del producto. Entrada escalonada solo con
   transform/opacity; la base visible es el estado final.
═══════════════════════════════════════════════════════════════ */

const ANTES = [
  "Horas revisando el portal, todos los días",
  "Bases de 80 páginas leídas a mano",
  "Precios por intuición que regalan margen",
  "Anexos y cierres descubiertos tarde",
];

const CON = [
  "Alerta el día 1, con score de calce 0–100",
  "La IA lee las bases y cita la página exacta",
  "Precio óptimo sobre 6,4M de órdenes de compra",
  "Cada cierre avisado con días de ventaja",
];

/* Vetas verticales sutiles, como la textura del original */
const VETAS =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1.5px, transparent 1.5px, transparent 22px)";

export default function DosFinales() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);

  const aparecer = (delayMs: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.6s ease ${delayMs}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <section id="resultados" className="px-3 md:px-5 py-8 md:py-12">
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-white px-6 py-16 md:px-12 lg:px-16 md:py-24">
        <div ref={ref} className="max-w-[1240px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-14">
            {/* ── ANTES ─────────────────────────────────────── */}
            <div style={aparecer(0)}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-4 w-4 place-items-center rounded-full border border-[#0A1530]/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0A1530]/25" />
                </span>
                <span className="font-sans text-[14px] text-[#0A1530]/55">Antes</span>
              </div>
              <h3 className="mt-6 font-display font-medium text-[26px] md:text-[33px] leading-[1.15] tracking-[-0.025em] text-[#0A1530]/35 max-w-[440px] lg:min-h-[2.3em]">
                El equipo se gasta la semana buscando y leyendo bases.
              </h3>

              <div
                className="relative mt-9 rounded-md bg-[#0B0B0C] px-6 py-10 md:px-8 md:py-24 overflow-hidden"
                style={aparecer(120)}
              >
                <div aria-hidden className="absolute inset-0" style={{ background: VETAS, opacity: 0.6 }} />
                <div className="relative grid sm:grid-cols-2 gap-3.5">
                  {ANTES.map((t, i) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-lg bg-white/[0.07] border border-white/[0.05] px-4 py-4"
                      style={aparecer(200 + i * 90)}
                    >
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-white/70" strokeWidth={2.2} />
                      <span className="font-sans text-[13.5px] leading-[1.5] text-white/85">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CON IAUTOLICITA ───────────────────────────── */}
            <div style={aparecer(120)}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-4 w-4 place-items-center rounded-full border border-[#0064E0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0064E0]" />
                </span>
                <span className="font-sans text-[14px] text-[#0A1530]">Con IAutoLicita</span>
              </div>
              <h3 className="mt-6 font-display font-medium text-[26px] md:text-[33px] leading-[1.15] tracking-[-0.025em] text-[#0A1530] max-w-[440px] lg:min-h-[2.3em]">
                Enfoca el equipo en ganar las que calzan.
              </h3>

              <div
                className="relative mt-9 rounded-md px-6 py-10 md:px-8 md:py-24 overflow-hidden"
                style={{
                  ...aparecer(240),
                  background:
                    "radial-gradient(ellipse 80% 90% at 50% 40%, #4D95FF 0%, #0B72F5 45%, #0064E0 100%)",
                }}
              >
                <div aria-hidden className="absolute inset-0" style={{ background: VETAS }} />
                <div className="relative grid sm:grid-cols-2 gap-3.5">
                  {CON.map((t, i) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-lg bg-white/[0.16] border border-white/[0.14] px-4 py-4 backdrop-blur-[2px]"
                      style={aparecer(320 + i * 90)}
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
    </section>
  );
}
