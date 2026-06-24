import StatCounter from "./ui/StatCounter";
import Sparkline from "./ui/Sparkline";

const stats = [
  {
    value: 6062,
    label: "Licitaciones procesadas con IA",
    sub: "histórico activo",
    trend: [4200, 4380, 4520, 4710, 4900, 5120, 5340, 5560, 5780, 5910, 6010, 6062],
  },
  {
    value: 35500,
    label: "Órdenes de compra catastradas",
    sub: "40+ campos por OC",
    trend: [22000, 23800, 25400, 27000, 28800, 30200, 31500, 32600, 33700, 34500, 35100, 35500],
  },
  {
    value: 899,
    label: "Organismos del Estado mapeados",
    sub: "catálogo maestro",
    trend: [820, 832, 845, 858, 866, 873, 880, 885, 890, 894, 897, 899],
  },
  {
    value: 64,
    prefix: "+",
    suffix: " pts",
    label: "Ventaja en benchmark",
    sub: "vs mejor competidor",
    trend: [42, 46, 49, 52, 54, 56, 58, 60, 61, 62, 63, 64],
  },
];

export default function StatsBar() {
  return (
    <section className="border-y border-[var(--hairline-strong)] bg-ink-900/50 py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.30] mix-blend-overlay pointer-events-none" />
      <div className="container-edge relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`relative px-2 ${
                i !== 0 ? "lg:border-l border-[var(--hairline)]" : ""
              } ${i === 2 ? "lg:border-l border-[var(--hairline)]" : ""}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-400">
                  ↗ trend 12m
                </div>
                <Sparkline
                  data={s.trend}
                  width={68}
                  height={20}
                  color="#0064E0"
                  showDot
                />
              </div>

              <div className="font-display font-light italic text-[44px] md:text-[64px] leading-none tracking-tightest text-cream-50">
                <StatCounter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>
              <div className="mt-3 font-sans text-[13px] text-cream-100 max-w-[200px]">
                {s.label}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
