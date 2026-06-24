/* ════════════════════════════════════════════════════════════
   MarketTicker — barra fina al tope con licitaciones scrolleando
   en vivo, estilo Bloomberg/WSJ markets bar adaptado a ChileCompra.

   - Fixed top, persiste durante el scroll
   - Marquee continuo (CSS keyframe), pause on hover
   - "LIVE · ChileCompra" indicator pulsante a la izquierda
   - Items con código formato ChileCompra real (NNNN-NN-LP25/LE25/etc)
═══════════════════════════════════════════════════════════════ */

type EventType = "LIC" | "ADJ" | "OC" | "CIE";

type TickerItem = {
  type: EventType;
  id: string;
  org: string;          // organismo comprador
  amount: string;
  meta: string;         // contexto (cierra en Xd, ganador, etc)
  urgent?: boolean;
};

// Eventos mixtos: nuevas licitaciones, adjudicaciones que cierran, OCs emitidas,
// alertas de cierre. Imita el feed de actividad real de ChileCompra.
const items: TickerItem[] = [
  { type: "LIC", id: "5837-122-LP25", org: "MINSAL",         amount: "$48M",  meta: "cierra en 4d" },
  { type: "ADJ", id: "4912-08-LP25",  org: "MOP RM",         amount: "$58M",  meta: "→ Constructora Sur SpA" },
  { type: "OC",  id: "OC#5524891",    org: "JUNAEB",         amount: "$22M",  meta: "→ Servicios Andes" },
  { type: "LIC", id: "2412-87-LE25",  org: "M. Ñuñoa",       amount: "$22M",  meta: "cierra en 7d" },
  { type: "CIE", id: "8842-30-CM25",  org: "JUNAEB",         amount: "$182M", meta: "cierra HOY", urgent: true },
  { type: "ADJ", id: "3201-91-LE25",  org: "MINSAL",         amount: "$94M",  meta: "→ Insumos Médicos AC" },
  { type: "LIC", id: "1199-41-LR25",  org: "U. de Chile",    amount: "$135M", meta: "cierra en 12d" },
  { type: "OC",  id: "OC#5524923",    org: "SERVIU RM",      amount: "$67M",  meta: "→ Andes Construcción" },
  { type: "LIC", id: "3091-55-LP25",  org: "MOP RM",         amount: "$58M",  meta: "cierra en 14d" },
  { type: "ADJ", id: "7621-44-LP25",  org: "Carabineros",    amount: "$31M",  meta: "→ Uniformes Patriot" },
  { type: "LIC", id: "6724-19-LE25",  org: "CENABAST",       amount: "$94M",  meta: "cierra en 9d" },
  { type: "CIE", id: "7361-04-CA25",  org: "M. Providencia", amount: "$8.4M", meta: "cierra en 2d", urgent: true },
  { type: "OC",  id: "OC#5524947",    org: "BancoEstado",    amount: "$45M",  meta: "→ TI Soluciones" },
  { type: "LIC", id: "9275-23-LP25",  org: "SERVIU RM",      amount: "$67M",  meta: "cierra en 6d" },
  { type: "ADJ", id: "5512-17-LP25",  org: "Junta Nacional", amount: "$28M",  meta: "→ Servicios del Sur" },
  { type: "LIC", id: "2237-90-LE25",  org: "Metro Stgo",     amount: "$120M", meta: "cierra en 22d" },
];

// Color por tipo de evento — sutiles, no gritan
const typeStyle: Record<EventType, { bg: string; text: string; label: string }> = {
  LIC: { bg: "bg-white/8",    text: "text-white/75",       label: "LIC" }, // nueva licitación
  ADJ: { bg: "bg-sage-400/15",text: "text-sage-400",       label: "ADJ" }, // adjudicada
  OC:  { bg: "bg-brand-400/15",text: "text-brand-300",     label: "OC"  }, // orden de compra emitida
  CIE: { bg: "bg-amber-400/15",text: "text-amber-400",     label: "CIE" }, // cierre urgente
};

function Item({ item }: { item: TickerItem }) {
  const s = typeStyle[item.type];
  return (
    <li className="flex items-center gap-2 whitespace-nowrap font-mono text-[10.5px] leading-none">
      <span className={`px-1.5 py-0.5 rounded font-semibold tracking-[0.06em] ${s.bg} ${s.text}`}>
        {s.label}
      </span>
      <span className="text-white/35">{item.id}</span>
      <span className="text-white/85 font-medium">{item.org}</span>
      <span className="text-white font-semibold tabular-nums">{item.amount}</span>
      <span className={item.urgent ? "text-amber-400 font-medium" : "text-white/45"}>
        {item.meta}
      </span>
      <span className="text-white/20 px-1">·</span>
    </li>
  );
}

export default function MarketTicker() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-8 bg-[#0A0A0A] border-b border-white/10 overflow-hidden"
      role="region"
      aria-label="Licitaciones en tiempo real desde ChileCompra"
    >
      <div className="flex items-center h-full">
        {/* LIVE label */}
        <div className="flex-shrink-0 px-3 h-full flex items-center gap-2 border-r border-white/10 bg-gradient-to-r from-[#131313] to-[#0A0A0A]">
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-sage-400" />
            <span className="absolute inset-0 rounded-full bg-sage-400 animate-ping opacity-60" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white font-semibold leading-none">
            Live <span className="hidden sm:inline text-white/45">· ChileCompra</span>
          </span>
        </div>

        {/* Scrolling track */}
        <div className="relative flex-1 overflow-hidden group">
          {/* Left fade */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            <ul className="flex items-center gap-6 pr-6 list-none m-0 shrink-0">
              {items.map((it, i) => (
                <Item key={`a-${i}`} item={it} />
              ))}
            </ul>
            <ul className="flex items-center gap-6 pr-6 list-none m-0 shrink-0" aria-hidden>
              {items.map((it, i) => (
                <Item key={`b-${i}`} item={it} />
              ))}
            </ul>
          </div>
        </div>

        {/* Right meta — refresh status */}
        <div className="hidden lg:flex flex-shrink-0 px-3 h-full items-center gap-2 border-l border-white/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 leading-none">
            refresh · ahora
          </span>
        </div>
      </div>
    </div>
  );
}
