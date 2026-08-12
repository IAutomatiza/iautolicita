import { X, Check } from "lucide-react";

/* ════════════════════════════════════════════════════════════
   Dos finales — el diferenciador del precio real contado como
   historia, sin percentiles ni tablas: dos empresas postulan a
   la misma licitación; una oferta a ciegas y pierde, la otra
   sabía lo que el Estado pagó y gana.

   Reemplaza al deep-dive técnico (Results + PriceSimulator): el
   visitante que no domina la jerga entiende esto en cinco
   segundos, y es la misma licitación que Lici analiza en el
   chat de capacidades — una sola historia en toda la página.
═══════════════════════════════════════════════════════════════ */

export default function DosFinales() {
  return (
    <section id="resultados" className="relative py-16 md:py-28 overflow-hidden">
      {/* Resplandor suave */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,100,224,0.07) 0%, transparent 60%)",
        }}
      />

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

        {/* Las dos empresas */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5 md:gap-8 max-w-[1000px] mx-auto items-stretch">
          {/* Sin datos — pierde */}
          <article className="flex flex-col rounded-2xl border border-[var(--hairline-strong)] bg-white p-7 md:p-9">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-300">
              Empresa A · sin datos
            </div>

            <div className="mt-6 font-sans text-[14px] text-cream-300">
              Licitación 1057-412-LP25 · Insumos clínicos · MINSAL
            </div>

            <div className="mt-5 flex-1">
              <div className="font-display font-medium text-[40px] md:text-[52px] leading-none tracking-[-0.03em] text-cream-50 num">
                $152,4M
              </div>
              <p className="mt-3 font-sans text-[15px] leading-[1.55] text-cream-200">
                Ofertó mirando sus costos y sumando un margen{" "}
                <span className="text-cream-50 font-medium">"por si acaso"</span>.
                Nadie en su equipo sabía cuánto estaba pagando MINSAL de verdad.
              </p>
            </div>

            <div className="mt-7 flex items-center gap-2.5 pt-6 border-t border-[var(--hairline)]">
              <span className="grid place-items-center h-7 w-7 rounded-full bg-ruby-400/10">
                <X className="h-4 w-4 text-ruby-400" strokeWidth={2.5} />
              </span>
              <span className="font-sans text-[15px] font-medium text-cream-50">
                Perdió. Adjudicada a otro proveedor.
              </span>
            </div>
          </article>

          {/* Con IAutoLicita — gana */}
          <article className="relative flex flex-col rounded-2xl border-2 border-amber-400/50 bg-white p-7 md:p-9 shadow-[0_24px_60px_-24px_rgba(0,100,224,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">
                Empresa B · con IAutoLicita
              </div>
            </div>

            <div className="mt-6 font-sans text-[14px] text-cream-300">
              La misma licitación, el mismo día
            </div>

            <div className="mt-5 flex-1">
              <div className="font-display font-medium text-[40px] md:text-[52px] leading-none tracking-[-0.03em] text-amber-400 num">
                $139,9M
              </div>
              <p className="mt-3 font-sans text-[15px] leading-[1.55] text-cream-200">
                Sabía que el Estado venía pagando{" "}
                <span className="text-cream-50 font-medium">~$140M por lo mismo</span>{" "}
                — está en las órdenes de compra. Ofertó 1,8% bajo la mediana,
                sin regalar margen.
              </p>
            </div>

            <div className="mt-7 flex items-center gap-2.5 pt-6 border-t border-[var(--hairline)]">
              <span className="grid place-items-center h-7 w-7 rounded-full bg-sage-400/15">
                <Check className="h-4 w-4 text-sage-400" strokeWidth={2.5} />
              </span>
              <span className="font-sans text-[15px] font-medium text-cream-50">
                Ganó. Con el margen intacto.
              </span>
            </div>
          </article>
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
