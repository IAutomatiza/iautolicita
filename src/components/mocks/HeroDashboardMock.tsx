import {
  LayoutDashboard,
  Inbox,
  FileSearch,
  Building2,
  MessageSquare,
  Settings,
  TrendingUp,
  Sparkles,
  Search,
  Bell,
  ChevronRight,
} from "lucide-react";
import Sparkline from "../ui/Sparkline";
import LiveDot from "../ui/LiveDot";

const rows = [
  { org: "MINSAL", title: "Insumos clínicos especializados Hospital Sótero", score: 92, monto: "$ 142.580.000", tag: "MATCH", cierre: "16-may" },
  { org: "MOP", title: "Estudio de carga vial Ruta CH-225", score: 84, monto: "$ 78.240.000", tag: "MATCH", cierre: "21-may" },
  { org: "JUNAEB", title: "Auditoría técnica programa PAE", score: 71, monto: "$ 36.000.000", tag: "EVAL.", cierre: "12-may" },
  { org: "DGAC", title: "Mantención sistemas radar aeroportuario", score: 64, monto: "$ 210.500.000", tag: "EVAL.", cierre: "28-may" },
  { org: "SERVIU", title: "Inspección técnica obras viviendas Maule", score: 58, monto: "$ 54.320.000", tag: "BAJO", cierre: "19-may" },
];

const sparkData = [12, 18, 15, 22, 19, 26, 24, 31, 28, 35, 33, 42];
const chartData = [42, 38, 51, 47, 62, 58, 71, 68, 82, 76, 89, 94];

const scoreColor = (s: number) =>
  s >= 85 ? "text-amber-400" : s >= 70 ? "text-cream-50" : "text-cream-300";

const tagBadge = (e: string) => {
  if (e === "MATCH")
    return "border-amber-400/40 text-amber-400 bg-amber-400/[0.08]";
  if (e === "EVAL.")
    return "border-cream-300 text-cream-200 bg-cream-50/[0.04]";
  return "border-cream-300/40 text-cream-400";
};

interface Props {
  /** 0 → 1 scroll progress driven by parent Hero. Used to cascade-highlight
   *  product moments as the dashboard approaches the viewport. */
  progress?: number;
  /** When true, drops the external shadow/rounding so the mock sits cleanly
   *  inside a device frame (LaptopFrame) that already provides those. */
  framed?: boolean;
}

export default function HeroDashboardMock({ progress = 1, framed = false }: Props) {
  const max = Math.max(...chartData);

  // Cascade thresholds — each beat lights up as the mock crosses focus.
  // Story: Detectamos (42) → Puntuamos con IA (score 92) → Te mostramos el MATCH.
  const lit = (threshold: number) => progress >= threshold;
  const litDetected = lit(0.32);
  const litScore = lit(0.5);
  const litMatch = lit(0.68);

  return (
    <div
      className={
        framed
          ? "surface relative overflow-hidden"
          : "surface relative rounded-xl overflow-hidden shadow-[0_40px_120px_-30px_rgba(10,10,10,0.18)]"
      }
    >
      {/* App chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--hairline)] bg-ink-900/40">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-cream-400/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream-400/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream-400/40" />
        </div>
        <div className="font-mono text-[10.5px] text-cream-400 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sage-400" />
          app.iautolicita.cl / oportunidades
        </div>
        <div className="font-mono text-[10px] text-cream-400 hidden md:block">
          ⌘ K
        </div>
      </div>

      {/* Main app body */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-[480px]">
        {/* Sidebar */}
        <aside className="border-r border-[var(--hairline)] bg-ink-900/30 hidden md:block">
          <div className="px-4 py-4 border-b border-[var(--hairline)]">
            <div className="font-display font-medium text-[18px] tracking-tightest leading-none text-cream-50">
              <span className="text-amber-400">IA</span>utoLicita
              <span className="text-amber-400">.</span>
            </div>
            <div className="font-mono text-[9.5px] text-cream-400 mt-2">
              Consultora Andina
            </div>
          </div>

          <nav className="p-2 space-y-0.5">
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: false, badge: null as string | number | null },
              { icon: Inbox, label: "Oportunidades", active: true, badge: 42 },
              { icon: FileSearch, label: "Licitaciones", active: false, badge: null },
              { icon: Building2, label: "OCs", active: false, badge: "35.5K" },
              { icon: MessageSquare, label: "Chat IA", active: false, badge: null },
              { icon: Settings, label: "Perfiles", active: false, badge: null },
            ].map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12.5px] ${
                    n.active
                      ? "bg-amber-400/10 text-amber-400"
                      : "text-cream-200 hover:bg-cream-50/[0.04]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                  <span className="flex-1">{n.label}</span>
                  {n.badge && (
                    <span
                      className={`font-mono text-[9.5px] px-1.5 py-0.5 rounded ${
                        n.active
                          ? "bg-amber-400 text-ink-950"
                          : "bg-ink-700 text-cream-200"
                      }`}
                    >
                      {n.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-8 mx-3 px-3 py-3 border border-[var(--hairline)] rounded-md bg-ink-950/40">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400">
              Sync status
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <LiveDot size={7} color="bg-sage-400" ringColor="bg-sage-400" />
              <span className="font-mono text-[10px] text-sage-400">
                hace 4 min · OK
              </span>
            </div>
            <div className="mt-1 font-mono text-[9.5px] text-cream-400">
              13/13 workflows
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">
          {/* Top bar */}
          <div className="px-5 py-3 border-b border-[var(--hairline)] flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-[400px] px-3 py-1.5 border border-[var(--hairline-strong)] rounded-md bg-ink-950/30">
              <Search className="h-3.5 w-3.5 text-cream-400" strokeWidth={1.8} />
              <span className="font-sans text-[12.5px] text-cream-400">
                Buscar por organismo, RUT, monto…
              </span>
            </div>
            <button className="h-8 w-8 grid place-items-center border border-[var(--hairline-strong)] rounded-md text-cream-300">
              <Bell className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
            <div className="h-8 w-8 rounded-full bg-amber-400 grid place-items-center font-bold text-[11px] text-ink-950">
              FN
            </div>
          </div>

          {/* Page header */}
          <div className="px-5 pt-5 pb-3 flex items-end justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
                Inbox · Oportunidades
              </div>
              <h2 className="mt-1 font-display font-medium text-[22px] text-cream-50 leading-none">
                Detectadas hoy
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 font-mono text-[10.5px] text-cream-300">
              <Sparkles className="h-3 w-3 text-amber-400" />
              IA scoring activo
            </div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-3 mx-5 border border-[var(--hairline)] rounded-md overflow-hidden bg-ink-950/30">
            <div
              className={`relative p-3.5 border-r border-[var(--hairline)] transition-colors duration-700 ease-out ${
                litDetected ? "bg-amber-400/[0.06]" : ""
              }`}
            >
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">
                Detectadas hoy
              </div>
              <div
                className={`num font-display font-medium text-[28px] leading-none mt-1.5 transition-colors duration-700 ease-out ${
                  litDetected ? "text-amber-400" : "text-cream-50"
                }`}
              >
                42
              </div>
              <div className="flex items-center gap-1 mt-1 font-mono text-[10px] text-amber-400">
                <TrendingUp className="h-2.5 w-2.5" strokeWidth={2} />
                +18% vs ayer
              </div>
              {/* sweep line that traces under the KPI when it lights up */}
              <div
                className={`absolute left-0 bottom-0 h-[2px] bg-amber-400 transition-[width] duration-[900ms] ease-out ${
                  litDetected ? "w-full" : "w-0"
                }`}
              />
            </div>
            <div className="p-3.5 border-r border-[var(--hairline)]">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">
                Score promedio
              </div>
              <div className="num font-display font-medium text-[28px] leading-none text-amber-400 mt-1.5">
                73.4
              </div>
              <div className="font-mono text-[10px] text-cream-300 mt-1">
                7 sobre 80
              </div>
            </div>
            <div className="p-3.5">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">
                Monto total
              </div>
              <div className="num font-display font-medium text-[28px] leading-none text-cream-50 mt-1.5">
                $521M
              </div>
              <div className="font-mono text-[10px] text-cream-300 mt-1">
                CLP · 42 lic.
              </div>
            </div>
          </div>

          {/* Bento: chart + sparkline strip */}
          <div className="mx-5 mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 border border-[var(--hairline)] rounded-md p-3.5 bg-ink-950/30">
              <div className="flex items-center justify-between mb-2.5">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">
                  Detectadas · últ. 12 días
                </div>
                <div className="font-mono text-[9.5px] text-amber-400">
                  ↗ trending
                </div>
              </div>
              <div className="flex items-end gap-1 h-[68px]">
                {chartData.map((v, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${
                      i === chartData.length - 1
                        ? "bg-amber-400"
                        : "bg-cream-300/30"
                    } rounded-sm transition-colors`}
                    style={{ height: `${(v / max) * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="border border-[var(--hairline)] rounded-md p-3.5 bg-ink-950/30">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-400">
                Match score ≥ 80
              </div>
              <div className="num font-display font-medium text-[36px] leading-none text-amber-400 mt-2">
                7
              </div>
              <div className="mt-2">
                <Sparkline data={sparkData} width={120} height={28} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mx-5 mt-3 mb-5 border border-[var(--hairline)] rounded-md overflow-hidden bg-ink-950/30">
            <div className="grid grid-cols-[44px_1fr_84px_92px_70px] px-3.5 py-2 border-b border-[var(--hairline)] font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400">
              <div>Score</div>
              <div>Licitación · organismo</div>
              <div className="text-right">Cierre</div>
              <div className="text-right">Monto</div>
              <div className="text-right">Tag</div>
            </div>
            {rows.map((r, i) => {
              const isHeroRow = i === 0;
              const rowLit = isHeroRow && litScore;
              const tagLit = isHeroRow && litMatch;
              return (
                <div
                  key={i}
                  className={`relative grid grid-cols-[44px_1fr_84px_92px_70px] gap-2 items-center px-3.5 py-2.5 border-b border-[var(--hairline)] last:border-b-0 transition-colors duration-700 ease-out ${
                    rowLit
                      ? "bg-amber-400/[0.08]"
                      : "hover:bg-amber-400/[0.025]"
                  }`}
                >
                  {/* left accent rail on the hero row */}
                  {isHeroRow && (
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[2px] bg-amber-400 transition-opacity duration-700 ${
                        rowLit ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                  <div
                    className={`num font-display font-medium text-[20px] leading-none transition-all duration-700 ease-out ${
                      rowLit
                        ? "text-amber-400 scale-[1.18] drop-shadow-[0_0_12px_rgba(251,191,36,0.55)]"
                        : scoreColor(r.score)
                    }`}
                    style={{ transformOrigin: "left center" }}
                  >
                    {r.score}
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans text-[12px] text-cream-100 truncate leading-tight">
                      {r.title}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400 mt-0.5 truncate">
                      {r.org}
                    </div>
                  </div>
                  <div className="num font-mono text-[10.5px] text-cream-300 text-right">
                    {r.cierre}
                  </div>
                  <div
                    className={`num font-mono text-[10.5px] text-right transition-colors duration-700 ${
                      tagLit ? "text-amber-400" : "text-cream-50"
                    }`}
                  >
                    {r.monto}
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block border px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] rounded transition-all duration-700 ease-out ${
                        tagLit
                          ? "bg-amber-400 text-ink-950 border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.6)] scale-105"
                          : tagBadge(r.tag)
                      }`}
                    >
                      {r.tag}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="px-3.5 py-2 flex items-center justify-between font-mono text-[10px] text-cream-400">
              <span>+ 37 más sobre el umbral</span>
              <span className="flex items-center gap-1 text-amber-400">
                Ver todas <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
