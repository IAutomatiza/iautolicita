import { Check } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import OCTableMock from "./mocks/OCTableMock";

const claims = [
  "35.500 OCs históricas catastradas con 40+ campos por orden",
  "Refresh diario para detectar adjudicaciones en menos de 24 horas",
  "Vínculo OC ↔ licitación origen para cerrar el ciclo completo",
  "Calificación al proveedor (PromedioCalificacion + CantidadEvaluacion)",
  "28 campos combinados de comprador y proveedor",
  "Tiempo de cierre como proxy del comportamiento de pago",
];

export default function OCDifferentiator() {
  return (
    <section
      id="ordenes"
      className="relative py-24 md:py-32 bg-ink-900 border-y border-[var(--hairline-strong)] overflow-hidden"
    >
      {/* decorative pull-rule grid */}
      <div className="absolute inset-0 bg-grid-strong bg-[size:80px_80px] opacity-[0.5] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.4] mix-blend-overlay pointer-events-none" />

      <div className="container-edge relative">
        {/* Massive editorial header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-12 flex items-center justify-between">
            <SectionLabel index="02" label="El diferenciador" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400 hidden md:flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Único en Chile
            </span>
          </div>

          <div className="lg:col-span-12 mt-6">
            <h2 className="font-display font-medium text-[48px] md:text-[88px] lg:text-[120px] leading-[0.94] tracking-tightest text-cream-50">
              Los demás se quedan
              <br />
              en la <span className="serif-em text-amber-400">licitación</span>.
              <br />
              Nosotros te mostramos
              <br />
              <span className="serif-em">qué pasó después.</span>
            </h2>
          </div>
        </div>

        {/* Body grid: claims + table mock */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="font-sans text-[17px] leading-[1.6] text-cream-200 max-w-[440px]">
              El módulo de Órdenes de Compra es la pieza que ningún competidor del mercado chileno implementa. Captura, vincula y expone toda la información que ocurre <span className="font-medium text-cream-50">después</span> de adjudicar una licitación.
            </p>

            <ul className="mt-10 space-y-4">
              {claims.map((c, i) => (
                <li key={i} className="flex gap-3 group">
                  <div className="mt-0.5 h-5 w-5 grid place-items-center bg-amber-400/10 border border-amber-400/30 group-hover:bg-amber-400/20 transition-colors flex-shrink-0">
                    <Check className="h-3 w-3 text-amber-400" strokeWidth={2.5} />
                  </div>
                  <span className="font-sans text-[14.5px] leading-[1.5] text-cream-100">
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-6 border-t border-[var(--hairline)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400 mb-3">
                Comparativa rápida
              </div>
              <div className="space-y-2 font-mono text-[12px]">
                <div className="flex justify-between items-center py-1.5 border-b border-[var(--hairline)]">
                  <span className="text-cream-200">Competidores chilenos</span>
                  <span className="text-cream-400">— sin módulo OC</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-[var(--hairline)]">
                  <span className="text-cream-200">MB Web Services</span>
                  <span className="text-cream-400">en roadmap, no funcional</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-amber-400">IAutoLicita</span>
                  <span className="text-amber-400 num">35.500 OCs activas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <OCTableMock />
          </div>
        </div>
      </div>
    </section>
  );
}
