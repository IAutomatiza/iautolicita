import { X, Check, Banknote, Database, TrendingDown, ShieldCheck } from "lucide-react";
import { buildWAUrl, MSG_DEMO } from "../lib/whatsapp";

/* ════════════════════════════════════════════════════════════
   Dos finales — layout clonado de la sección "Write" de Craft
   (vía Mobbin): un contenedor redondeado gigante en azul suave;
   a la izquierda dos tarjetas superpuestas como sus ventanas
   —la oferta a ciegas en grafito detrás, la ganadora con el
   degradado de Lici delante—; a la derecha eyebrow, titular,
   párrafo, grilla 2×2 de mini-features y el botón.
═══════════════════════════════════════════════════════════════ */

const MINI = [
  { icon: Banknote, label: "Lo pagado, no lo adjudicado" },
  { icon: Database, label: "6,4M órdenes de compra" },
  { icon: TrendingDown, label: "Oferta bajo la mediana" },
  { icon: ShieldCheck, label: "Margen protegido" },
];

export default function DosFinales() {
  return (
    <section id="resultados" className="py-16 md:py-28">
      <div className="container-edge">
        <div className="rounded-[2.5rem] bg-[#D9E6FA] px-6 py-10 md:px-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[1180px] mx-auto">
            {/* IZQUIERDA — las dos tarjetas superpuestas, como las ventanas de Craft */}
            <div className="relative max-w-[520px] mx-auto w-full">
              {/* Atrás: la oferta a ciegas, apagada */}
              {/* El pb extra deja vacía la franja que tapa la tarjeta de
                  adelante: el veredicto queda siempre visible. */}
              <article className="w-[88%] rounded-2xl px-6 pt-6 pb-24 md:px-7 md:pt-7 md:pb-28 bg-[#1F2126] shadow-[0_18px_44px_-18px_rgba(10,20,50,0.45)]">
                <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full border border-white/40" />
                  Sin datos
                </div>
                <div className="mt-4 font-sans text-[12.5px] text-white/40">
                  Licitación 1057-412-LP25 · MINSAL
                </div>
                <div className="mt-3 num font-display font-medium text-[38px] leading-none tracking-[-0.03em] text-white/70">
                  $152,4M
                </div>
                <p className="mt-3 font-sans text-[13.5px] leading-[1.55] text-white/45">
                  Costos + margen{" "}
                  <span className="text-white/75 font-medium">"por si acaso"</span>.
                  Nadie sabía cuánto pagaba MINSAL de verdad.
                </p>
                <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/[0.08]">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-ruby-400/15">
                    <X className="h-3.5 w-3.5 text-ruby-400" strokeWidth={2.5} />
                  </span>
                  <span className="font-sans text-[13.5px] font-medium text-white/70">
                    Perdió.
                  </span>
                </div>
              </article>

              {/* Delante: la ganadora, encendida y superpuesta */}
              <article
                className="relative z-10 w-[88%] ml-auto -mt-16 md:-mt-20 rounded-2xl p-6 md:p-7 overflow-hidden text-white shadow-[0_28px_60px_-20px_rgba(0,30,110,0.55)]"
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
                <div className="relative flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#55b4f8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#55b4f8]" />
                  Con IAutoLicita
                </div>
                <div className="relative mt-4 font-sans text-[12.5px] text-white/55">
                  La misma licitación, el mismo día
                </div>
                <div className="relative mt-3 num font-display font-medium text-[38px] leading-none tracking-[-0.03em] text-white">
                  $139,9M
                </div>
                <p className="relative mt-3 font-sans text-[13.5px] leading-[1.55] text-white/75">
                  Sabía que el Estado venía pagando{" "}
                  <span className="text-white font-medium">~$140M por lo mismo</span>.
                  Ofertó 1,8% bajo la mediana.
                </p>
                <div className="relative mt-5 flex items-center gap-2 pt-4 border-t border-white/15">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-[#4ade80]/20">
                    <Check className="h-3.5 w-3.5 text-[#4ade80]" strokeWidth={2.5} />
                  </span>
                  <span className="font-sans text-[13.5px] font-medium text-white">
                    Ganó. Con el margen intacto.
                  </span>
                </div>
              </article>

              <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-cream-300">
                Ejemplo ilustrativo con datos de demostración
              </p>
            </div>

            {/* DERECHA — eyebrow, titular, párrafo, mini-grilla y botón */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-300">
                El precio real
              </div>

              <h2 className="mt-5 font-display font-medium text-[32px] md:text-[44px] leading-[1.08] tracking-[-0.03em] text-cream-50">
                La misma licitación.
                <br />
                <span className="text-amber-400">Dos finales.</span>
              </h2>

              <p className="mt-6 font-sans text-[16px] md:text-[17px] leading-[1.6] text-cream-100 max-w-[480px]">
                La diferencia no fue el precio — fue saber cuál era. Ese dato
                vive en IAutoLicita: el precio efectivamente pagado por el
                Estado, ítem por ítem. Nadie más en Chile lo tiene.
              </p>

              {/* Grilla 2×2 de mini-features, al patrón Craft */}
              <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-[480px]">
                {MINI.map((m) => (
                  <div key={m.label} className="flex items-center gap-3.5">
                    <m.icon
                      className="h-6 w-6 text-cream-50 flex-shrink-0"
                      strokeWidth={1.6}
                    />
                    <span className="font-sans text-[15px] font-medium text-cream-50">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={buildWAUrl(MSG_DEMO)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center justify-center h-12 px-7 rounded-full
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
      </div>
    </section>
  );
}
