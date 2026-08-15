import { X, Check } from "lucide-react";
import { buildWAUrl, MSG_DEMO } from "../lib/whatsapp";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Con y sin IAutoLicita — clon del patrón "Before / With V7"
   (vía Mobbin): dos paneles frente a frente, cada uno con su
   titular. El "sin" es oscuro y apagado, con cruces; el "con"
   es el azul Lici, encendido, con checks. Los paneles entran
   desde lados opuestos y los chips aparecen escalonados.
═══════════════════════════════════════════════════════════════ */

const SIN = [
  "Horas buscando en el portal — y las buenas igual se escapan",
  "Precio inflado “por si acaso”: nadie sabe cuánto paga el Estado",
  "Bases de 80 páginas sin leer: un anexo la deja fuera",
];

const CON = [
  "Alerta el día 1, con puntaje de calce 0–100",
  "El precio real: lo que el Estado pagó por lo mismo, ítem por ítem",
  "Lici lee las bases y cita requisitos con la página exacta",
];

export default function DosFinales() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);

  // Cada columna entra desde su lado; los chips internos se
  // escalonan con retardos crecientes.
  const entrada = (visible: boolean, desde: string, delay: string) =>
    `transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${delay} ${
      visible ? "opacity-100 translate-x-0" : `opacity-0 ${desde}`
    }`;

  const chip = (visible: boolean) =>
    `transition-all duration-500 ease-out ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;

  const retardo = (ms: number) => ({ transitionDelay: `${ms}ms` });

  return (
    <section id="resultados" className="px-3 md:px-5 py-8 md:py-12">
      {/* Contenedor a pantalla casi completa */}
      <div className="rounded-[2rem] md:rounded-[2.5rem] bg-[#EEF4FC] px-6 py-16 md:px-12 lg:px-16 md:py-20 min-h-[86vh] flex items-center">
        <div ref={ref} className="max-w-[1240px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8">
            {/* ── SIN IAUTOLICITA — apagado ─────────────────── */}
            <div className={entrada(inView, "-translate-x-10", "")}>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream-300">
                <span className="h-1.5 w-1.5 rounded-full border border-cream-300" />
                Sin IAutoLicita
              </div>
              <h3 className="mt-4 font-display font-medium text-[26px] md:text-[32px] leading-[1.12] tracking-[-0.025em] text-cream-300 min-h-[2.24em]">
                Buscar a mano, ofertar a ciegas, perder sin saber por qué.
              </h3>

              <div className="mt-6 rounded-2xl bg-[#1F2126] p-5 md:p-6 space-y-3 shadow-[0_18px_44px_-18px_rgba(10,20,50,0.4)]">
                {SIN.map((texto, i) => (
                  <div
                    key={texto}
                    style={retardo(200 + i * 120)}
                    className={`flex items-start gap-3 rounded-xl bg-white/[0.045] border border-white/[0.06] p-4 ${chip(inView)}`}
                  >
                    <span className="grid place-items-center h-5 w-5 mt-0.5 rounded-full bg-ruby-400/15 flex-shrink-0">
                      <X className="h-3 w-3 text-ruby-400" strokeWidth={2.5} />
                    </span>
                    <span className="font-sans text-[14px] leading-[1.5] text-white/60">
                      {texto}
                    </span>
                  </div>
                ))}
                {/* Veredicto */}
                <div
                  style={retardo(200 + SIN.length * 120)}
                  className={`rounded-xl border border-ruby-400/20 bg-ruby-400/[0.07] p-4 md:p-5 ${chip(inView)}`}
                >
                  <div className="num font-display font-medium text-[26px] md:text-[30px] leading-none tracking-[-0.03em] text-white/75">
                    $152,4M
                  </div>
                  <div className="mt-2 font-sans text-[13.5px] font-medium text-ruby-400">
                    Perdió. Adjudicada a otro — y nunca supo por qué.
                  </div>
                </div>
              </div>
            </div>

            {/* ── CON IAUTOLICITA — encendido ───────────────── */}
            <div className={entrada(inView, "translate-x-10", "delay-150")}>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Con IAutoLicita
              </div>
              <h3 className="mt-4 font-display font-medium text-[26px] md:text-[32px] leading-[1.12] tracking-[-0.025em] text-cream-50 min-h-[2.24em]">
                Verlas todas, ofertar con datos,{" "}
                <span className="text-amber-400">ganar con margen.</span>
              </h3>

              <div
                className="relative mt-6 rounded-2xl p-5 md:p-6 space-y-3 overflow-hidden
                  shadow-[0_28px_60px_-20px_rgba(0,30,110,0.55)]"
                style={{
                  background:
                    "linear-gradient(180deg, #000115 0%, #000a37 26%, #001560 52%, #002494 76%, #003ab3 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(85,180,248,0.18) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                {CON.map((texto, i) => (
                  <div
                    key={texto}
                    style={retardo(350 + i * 120)}
                    className={`relative flex items-start gap-3 rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-[2px] ${chip(inView)}`}
                  >
                    <span className="grid place-items-center h-5 w-5 mt-0.5 rounded-full bg-[#4ade80]/20 flex-shrink-0">
                      <Check className="h-3 w-3 text-[#4ade80]" strokeWidth={2.5} />
                    </span>
                    <span className="font-sans text-[14px] leading-[1.5] text-white">
                      {texto}
                    </span>
                  </div>
                ))}
                {/* Veredicto */}
                <div
                  style={retardo(350 + CON.length * 120)}
                  className={`relative rounded-xl border border-[#4ade80]/30 bg-[#4ade80]/10 p-4 md:p-5 ${chip(inView)}`}
                >
                  <div className="num font-display font-medium text-[26px] md:text-[30px] leading-none tracking-[-0.03em] text-white">
                    $139,9M
                  </div>
                  <div className="mt-2 font-sans text-[13.5px] font-medium text-[#4ade80]">
                    Ganó. La misma licitación, 1,8% bajo la mediana, margen intacto.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Remate + CTA */}
          <div
            style={retardo(900)}
            className={`mt-12 md:mt-14 flex flex-col items-center gap-5 text-center ${chip(inView)}`}
          >
            <p className="font-display font-medium text-[20px] md:text-[24px] tracking-[-0.02em] text-cream-50 max-w-[560px]">
              La misma licitación. Dos finales.{" "}
              <span className="text-cream-300">La diferencia no es suerte — son datos.</span>
            </p>
            <a
              href={buildWAUrl(MSG_DEMO)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full
                bg-white text-cream-50 font-sans font-medium text-[15px]
                shadow-[0_2px_8px_rgba(10,20,50,0.10)]
                hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(10,20,50,0.14)]
                transition-all duration-200 ease-out"
            >
              Agendar demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
