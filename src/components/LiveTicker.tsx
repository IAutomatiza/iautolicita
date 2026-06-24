const ticks = [
  { org: "MINSAL", title: "Insumos clínicos especializados", monto: "M$ 142.500", score: 92 },
  { org: "MOP", title: "Estudio carga vial Ruta CH-225", monto: "M$ 78.200", score: 84 },
  { org: "JUNAEB", title: "Auditoría técnica programa PAE", monto: "M$ 36.000", score: 71 },
  { org: "DGAC", title: "Mantención sistemas radar aeroportuario", monto: "M$ 210.500", score: 88 },
  { org: "SERVIU", title: "Inspección técnica obras Maule", monto: "M$ 54.300", score: 64 },
  { org: "CARABINEROS", title: "Sistemas integrados patrullaje", monto: "M$ 18.900", score: 75 },
  { org: "FOSIS", title: "Capacitación emprendimientos rurales", monto: "M$ 92.700", score: 82 },
  { org: "JUNJI", title: "Equipamiento jardines infantiles RM", monto: "M$ 124.000", score: 79 },
  { org: "CONAF", title: "Servicios prevención incendios forestales", monto: "M$ 165.300", score: 86 },
  { org: "GENDARMERIA", title: "Suministro alimentación recintos", monto: "M$ 235.900", score: 70 },
];

const TickItem = ({ t }: { t: (typeof ticks)[number] }) => (
  <div className="flex items-center gap-3 px-5 py-3 border-r border-[var(--hairline)]">
    <span
      className={`num font-display font-medium text-[22px] leading-none ${
        t.score >= 85 ? "text-amber-400" : "text-cream-200"
      }`}
    >
      {t.score}
    </span>
    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400 whitespace-nowrap">
      {t.org}
    </span>
    <span className="font-sans text-[12.5px] text-cream-100 whitespace-nowrap">
      {t.title}
    </span>
    <span className="num font-mono text-[11px] text-amber-400 whitespace-nowrap">
      {t.monto}
    </span>
  </div>
);

export default function LiveTicker() {
  return (
    <section
      aria-label="Ticker en vivo de licitaciones detectadas"
      className="relative bg-ink-900 border-y border-[var(--hairline-strong)] overflow-hidden"
    >
      <div className="container-edge py-3 flex items-center gap-4 border-b border-[var(--hairline)]">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft shadow-[0_0_12px_rgba(0,100,224,0.4)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-400">
            Live · feed
          </span>
        </div>
        <span className="h-3 w-px bg-cream-300/20" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300">
          Detectadas en últimas 24h · ChileCompra
        </span>
        <span className="h-3 w-px bg-cream-300/20 hidden md:block" />
        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
          Tags anonimizados · score real
        </span>
      </div>

      <div className="relative py-1">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {[...ticks, ...ticks].map((t, i) => (
            <TickItem key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
