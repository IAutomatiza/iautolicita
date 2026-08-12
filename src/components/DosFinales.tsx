import { X, Check } from "lucide-react";

/* ════════════════════════════════════════════════════════════
   Dos finales — el diferenciador del precio real contado como
   historia, con el tratamiento visual del before/after de V7
   (vía Mobbin): el panel sin datos va en grafito apagado, casi
   sin color; el panel con IAutoLicita se enciende con el mismo
   degradado azul profundo del chat de Lici. El contraste entre
   ambos ES el mensaje — sin datos todo es opaco.
═══════════════════════════════════════════════════════════════ */

export default function DosFinales() {
  return (
    <section id="resultados" className="relative py-16 md:py-28 overflow-hidden">
      <div className="container-edge relative">
        {/* Encabezado */}
        <div className="max-w-[760px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-300">
            <span className="h-px w-8 bg-cream-300/30" />
            <span>El precio real</span>
            <span className="h-px w-8 bg-cream-300/30" />
          </div>
          <h2 className="mt-6 font-display font-medium text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.03em] text-cream-50">
            La misma licitación.{" "}
            <span className="text-amber-400">Dos finales.</span>
          </h2>
        </div>

        {/* Los dos paneles, al patrón V7 */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5 md:gap-6 max-w-[1060px] mx-auto items-stretch">
          {/* SIN DATOS — grafito apagado */}
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-300">
              <span className="h-1.5 w-1.5 rounded-full border border-cream-300/60" />
              Sin datos
            </div>
            <article className="flex flex-col h-[calc(100%-30px)] rounded-2xl p-7 md:p-9 bg-[#1F2126]">
              <div className="font-sans text-[13.5px] text-white/40">
                Licitación 1057-412-LP25 · Insumos clínicos · MINSAL
              </div>

              <div className="mt-6 flex-1">
                <div className="num font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em] text-white/70">
                  $152,4M
                </div>
                <p className="mt-4 font-sans text-[15px] leading-[1.6] text-white/45">
                  Ofertó mirando sus costos y sumando un margen{" "}
                  <span className="text-white/75 font-medium">"por si acaso"</span>
                  . Nadie en su equipo sabía cuánto estaba pagando MINSAL de
                  verdad.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2.5 pt-6 border-t border-white/[0.08]">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-ruby-400/15">
                  <X className="h-4 w-4 text-ruby-400" strokeWidth={2.5} />
                </span>
                <span className="font-sans text-[15px] font-medium text-white/70">
                  Perdió. Adjudicada a otro proveedor.
                </span>
              </div>
            </article>
          </div>

          {/* CON IAUTOLICITA — el azul profundo de Lici, encendido */}
          <div>
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Con IAutoLicita
            </div>
            <article
              className="relative flex flex-col h-[calc(100%-30px)] rounded-2xl p-7 md:p-9 overflow-hidden text-white shadow-[0_30px_70px_-25px_rgba(0,58,179,0.55)]"
              style={{
                background:
                  "linear-gradient(180deg, #000115 0%, #000a37 26%, #001560 52%, #002494 76%, #003ab3 100%)",
              }}
            >
              {/* La misma textura de puntos del chat de Lici */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(85,180,248,0.18) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative font-sans text-[13.5px] text-white/60">
                La misma licitación, el mismo día
              </div>

              <div className="relative mt-6 flex-1">
                <div className="num font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em] text-white">
                  $139,9M
                </div>
                <p className="mt-4 font-sans text-[15px] leading-[1.6] text-white/75">
                  Sabía que el Estado venía pagando{" "}
                  <span className="text-white font-medium">
                    ~$140M por lo mismo
                  </span>{" "}
                  — está en las órdenes de compra. Ofertó 1,8% bajo la mediana,
                  sin regalar margen.
                </p>
              </div>

              <div className="relative mt-8 flex items-center gap-2.5 pt-6 border-t border-white/15">
                <span className="grid place-items-center h-7 w-7 rounded-full bg-[#4ade80]/20">
                  <Check className="h-4 w-4 text-[#4ade80]" strokeWidth={2.5} />
                </span>
                <span className="font-sans text-[15px] font-medium text-white">
                  Ganó. Con el margen intacto.
                </span>
              </div>
            </article>
          </div>
        </div>

        {/* El remate */}
        <div className="mt-12 md:mt-16 max-w-[680px] mx-auto text-center">
          <p className="font-display font-medium text-[24px] md:text-[32px] leading-[1.2] tracking-[-0.02em] text-cream-50">
            La diferencia no fue el precio.{" "}
            <span className="text-amber-400">Fue saber cuál era.</span>
          </p>
          <p className="mt-4 font-sans text-[15.5px] leading-[1.55] text-cream-200">
            Ese dato vive en IAutoLicita: el precio efectivamente pagado en 6,4
            millones de órdenes de compra del Estado. Nadie más en Chile lo
            tiene.
          </p>
          <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">
            Ejemplo ilustrativo con datos de demostración
          </p>
        </div>
      </div>
    </section>
  );
}
