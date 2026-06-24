export default function PullQuote() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-grid-faint bg-[size:96px_96px] opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[440px] bg-amber-400/[0.05] blur-3xl rounded-full pointer-events-none" />

      <div className="container-edge relative">
        <div className="max-w-[1040px] mx-auto">
          {/* Decorative quote mark */}
          <div className="font-display font-medium text-[180px] md:text-[280px] leading-[0.7] text-amber-400/30 select-none mb-[-40px] md:mb-[-72px]">
            “
          </div>

          <blockquote className="font-display font-medium text-[34px] md:text-[58px] leading-[1.05] tracking-[-0.025em] text-cream-50">
            Antes invertíamos{" "}
            <span className="font-sans font-normal bg-amber-400/15 text-amber-400 px-2">
              160 horas-persona al mes
            </span>{" "}
            revisando el portal a mano. Hoy IAutoLicita las detecta, lee y prioriza solas. Nuestro equipo solo decide.
          </blockquote>

          <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-6 items-end border-t border-[var(--hairline-strong)] pt-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400 mb-2">
                — Lectura del documento de producto
              </div>
              <div className="font-sans text-[15px] text-cream-200 max-w-[640px]">
                3 organizaciones operando en producción · 6.062 licitaciones procesadas con enriquecimiento IA · 35.500 órdenes de compra catastradas
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-6 gap-y-1 md:text-right">
              <div className="border-l border-[var(--hairline)] pl-4 md:border-l-0 md:border-r md:pr-4 md:pl-0">
                <div className="num font-display font-medium text-[26px] leading-none text-cream-50">
                  &lt;24h
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400 mt-1">
                  detección
                </div>
              </div>
              <div className="border-l border-[var(--hairline)] pl-4 md:border-l-0 md:border-r md:pr-4 md:pl-0">
                <div className="num font-display font-medium text-[26px] leading-none text-cream-50">
                  20+
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400 mt-1">
                  atributos perfil
                </div>
              </div>
              <div className="border-l border-[var(--hairline)] pl-4 md:border-l-0 md:pl-0">
                <div className="num font-display font-medium text-[26px] leading-none text-amber-400">
                  100%
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400 mt-1">
                  trazable
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
