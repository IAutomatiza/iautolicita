import { TrendingUp, Banknote, Star } from "lucide-react";
import Sparkline from "../ui/Sparkline";

const ocs = [
  {
    id: "750-2453-OC25",
    org: "MINSAL",
    proveedor: "Insumos Médicos Andina SpA",
    monto: 142_580_000,
    estado: "ACEPTADA",
    cierre: "12 d",
    rating: 4.8,
    evals: 142,
  },
  {
    id: "1057-887-OC25",
    org: "MOP REGIONAL",
    proveedor: "Consultora Vial Sur Ltda.",
    monto: 78_240_000,
    estado: "ENVIADA",
    cierre: "—",
    rating: 4.2,
    evals: 38,
  },
  {
    id: "2438-1102-OC25",
    org: "JUNAEB",
    proveedor: "Audita Servicios Profesionales",
    monto: 36_000_000,
    estado: "ACEPTADA",
    cierre: "8 d",
    rating: 4.9,
    evals: 67,
  },
  {
    id: "5193-441-OC25",
    org: "DGAC",
    proveedor: "RadarTech Chile S.A.",
    monto: 210_500_000,
    estado: "ACEPTADA",
    cierre: "21 d",
    rating: 4.5,
    evals: 24,
  },
  {
    id: "3382-2055-OC25",
    org: "SERVIU MAULE",
    proveedor: "Inspectoría Técnica Maule",
    monto: 54_320_000,
    estado: "EN PROCESO",
    cierre: "—",
    rating: 4.0,
    evals: 19,
  },
  {
    id: "7711-998-OC25",
    org: "CARABINEROS",
    proveedor: "Sistemas Integrados Patag.",
    monto: 18_900_000,
    estado: "ACEPTADA",
    cierre: "5 d",
    rating: 4.7,
    evals: 88,
  },
];

const monthlySpark = [180, 245, 220, 290, 310, 285, 340, 380, 360, 410, 445, 478];
const ratingDist = [
  { star: 5, pct: 52 },
  { star: 4, pct: 31 },
  { star: 3, pct: 11 },
  { star: 2, pct: 4 },
  { star: 1, pct: 2 },
];

const fmtCLP = (n: number) =>
  "$" +
  n.toLocaleString("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const stateBadge = (e: string) => {
  if (e === "ACEPTADA")
    return "border-sage-400/40 text-sage-400 bg-sage-400/[0.06]";
  if (e === "ENVIADA")
    return "border-brand-300/40 text-brand-200 bg-brand-500/[0.06]";
  return "border-amber-400/30 text-amber-400 bg-amber-400/[0.05]";
};

export default function OCTableMock() {
  return (
    <div className="surface border border-[var(--hairline-strong)] relative shadow-[0_24px_60px_-20px_rgba(10,10,10,0.10)]">
      {/* header strip */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--hairline)]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-400">
            mp_ordenes_compra · vista live
          </div>
          <div className="mt-1 font-display font-medium text-[22px] leading-none text-cream-50">
            Órdenes de compra · panel ejecutivo
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400 uppercase tracking-[0.18em]">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
          Live
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-3 border-b border-[var(--hairline)]">
        <div className="px-5 py-4 border-r border-[var(--hairline)]">
          <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400">
            <Banknote className="h-3 w-3" strokeWidth={1.6} />
            OC abril 2026
          </div>
          <div className="num font-display font-medium text-[34px] leading-none text-cream-50 mt-2">
            478
          </div>
          <div className="flex items-center gap-1 mt-1.5 font-mono text-[9.5px] text-amber-400">
            <TrendingUp className="h-2.5 w-2.5" strokeWidth={2} />
            +14% vs marzo
          </div>
        </div>
        <div className="px-5 py-4 border-r border-[var(--hairline)]">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400">
            Monto adjudicado · YTD
          </div>
          <div className="num font-display font-medium text-[34px] leading-none text-amber-400 mt-2">
            $4.2B
          </div>
          <div className="font-mono text-[9.5px] text-cream-300 mt-1.5">
            CLP · 2.527 adj.
          </div>
        </div>
        <div className="px-5 py-4 relative">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400 mb-2">
            Tendencia 12 meses
          </div>
          <Sparkline data={monthlySpark} width={160} height={42} />
        </div>
      </div>

      {/* column headers */}
      <div className="grid grid-cols-[100px_1fr_110px_82px_72px] px-5 py-2.5 border-b border-[var(--hairline)] font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400">
        <div>OC · Organismo</div>
        <div>Proveedor adjudicado</div>
        <div className="text-right">Monto</div>
        <div className="text-right">Estado</div>
        <div className="text-right">Calif.</div>
      </div>

      {/* rows */}
      <div>
        {ocs.map((oc, i) => (
          <div
            key={i}
            className="grid grid-cols-[100px_1fr_110px_82px_72px] gap-2 items-center px-5 py-2.5 border-b border-[var(--hairline)] last:border-b-0 hover:bg-amber-400/[0.018] transition-colors"
          >
            <div className="min-w-0">
              <div className="font-mono text-[10px] text-cream-100 truncate">
                {oc.id}
              </div>
              <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream-400 mt-0.5 truncate">
                {oc.org}
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-sans text-[12px] text-cream-100 truncate">
                {oc.proveedor}
              </div>
              <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream-400 mt-0.5">
                cierre · {oc.cierre}
              </div>
            </div>
            <div className="num font-mono text-[11px] text-cream-50 text-right">
              {fmtCLP(oc.monto)}
            </div>
            <div className="text-right">
              <span
                className={`inline-block border px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.16em] ${stateBadge(
                  oc.estado
                )}`}
              >
                {oc.estado}
              </span>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 fill-amber-400 stroke-amber-400" />
                <span className="num font-mono text-[11px] text-amber-400">
                  {oc.rating.toFixed(1)}
                </span>
              </div>
              <div className="font-mono text-[8.5px] text-cream-400 mt-0.5">
                ({oc.evals})
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calification distribution panel */}
      <div className="px-5 py-3.5 border-t border-[var(--hairline)] bg-ink-950/40">
        <div className="flex items-center justify-between mb-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-400">
            Distribución calificación · proveedores
          </div>
          <div className="font-mono text-[9px] text-amber-400 num">
            avg 4.6 ★
          </div>
        </div>
        <div className="space-y-1">
          {ratingDist.map((d) => (
            <div
              key={d.star}
              className="grid grid-cols-[28px_1fr_32px] items-center gap-2"
            >
              <div className="font-mono text-[9.5px] text-cream-300 flex items-center gap-0.5">
                {d.star}
                <Star className="h-2 w-2 stroke-cream-400 fill-cream-400/30" />
              </div>
              <div className="relative h-1.5 bg-ink-700/60 overflow-hidden">
                <div
                  className={`h-full ${d.star >= 4 ? "bg-amber-400" : "bg-cream-300/40"}`}
                  style={{ width: `${d.pct * 1.7}%` }}
                />
              </div>
              <div className="num font-mono text-[9.5px] text-cream-300 text-right">
                {d.pct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--hairline-strong)] font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-cream-400">35.500 OCs · 40+ campos c/u</span>
        <span className="text-amber-400 flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-blink" />
          export · csv · api
        </span>
      </div>
    </div>
  );
}
