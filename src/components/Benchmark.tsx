import SectionLabel from "./ui/SectionLabel";

const competitors = [
  { name: "AlertasMP", score: 14, tier: 2, note: "alertas tiempo real" },
  { name: "Vendify", score: 16, tier: 1, note: "automatización postulación" },
  { name: "LicitaFast", score: 17, tier: 1, note: "alertas en 4h" },
  { name: "Competidor líder", score: 18, tier: 1, note: "OCs sin implementar" },
  { name: "MB Web Services", score: 12, tier: 3, note: "OC en roadmap" },
  { name: "LicitXpert (Arkho)", score: 11, tier: 2, note: "consultora enterprise" },
  { name: "Licitaciones.com", score: 10, tier: 2, note: "buscador tradicional" },
  { name: "MercadoBI", score: 9, tier: 2, note: "BI analítico" },
  { name: "LicitaPyme", score: 8, tier: 2, note: "low-cost PYME" },
  { name: "Analiza.cl", score: 7, tier: 3, note: "reportería" },
];

const maxScore = 82;

export default function Benchmark() {
  return (
    <section id="benchmark" className="py-24 md:py-32 relative">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <SectionLabel index="07" label="Benchmark de competencia" />
            <h2 className="mt-6 font-display font-medium text-[40px] md:text-[60px] leading-[0.98] tracking-tightest text-cream-50">
              82 vs 18.{" "}
              <span className="serif-em text-amber-400">El gap habla.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <p className="font-sans text-[15px] leading-[1.6] text-cream-200">
              Snapshots quincenales de los 10 principales competidores chilenos, analizados con IA. Puntuación basada en completitud funcional, módulos implementados y diferenciadores únicos.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
              Última medición · abril 2026
            </p>
          </div>
        </div>

        {/* Headline comparison */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-end mb-14 border-y border-[var(--hairline-strong)] py-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">
              IAutoLicita
            </div>
            <div className="font-display font-medium text-[120px] md:text-[180px] leading-none tracking-tightest text-amber-400 num">
              82
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-300">
              puntos · score propio
            </div>
          </div>
          <div className="hidden md:block self-center font-display font-medium text-[64px] text-cream-300/50 leading-none">
            vs
          </div>
          <div className="md:text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
              Mejor competidor
            </div>
            <div className="font-display font-medium text-[100px] md:text-[140px] leading-none tracking-tightest text-cream-300 num">
              18
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-400">
              Competidor líder · benchmark
            </div>
          </div>
        </div>

        {/* Competitor bars */}
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-3">
          {/* IAutoLicita row first */}
          <div className="lg:col-span-2 border-b-2 border-amber-400 pb-3 mb-3">
            <div className="grid grid-cols-[180px_1fr_50px] gap-4 items-center">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400">★</span>
                <span className="font-display font-medium text-[18px] text-amber-400">
                  IAutoLicita
                </span>
              </div>
              <div className="relative h-2.5 bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-1000"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="num font-mono text-[14px] text-amber-400 text-right">82</div>
            </div>
            <div className="grid grid-cols-[180px_1fr_50px] gap-4 mt-1">
              <div></div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400">
                OC activas · chat IA · multi-org · benchmark · gestión CRM
              </div>
              <div></div>
            </div>
          </div>

          {competitors.map((c) => (
            <div
              key={c.name}
              className="grid grid-cols-[180px_1fr_50px] gap-4 items-center py-1.5"
            >
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400 flex-shrink-0">
                  T{c.tier}
                </span>
                <span className="font-sans text-[13px] text-cream-100 truncate">
                  {c.name}
                </span>
              </div>
              <div className="relative h-2 bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-cream-300/40"
                  style={{ width: `${(c.score / maxScore) * 100}%` }}
                />
              </div>
              <div className="num font-mono text-[12px] text-cream-200 text-right">
                {c.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
