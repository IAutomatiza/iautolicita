import { useState } from "react";
import { ChevronDown, AlertTriangle, TrendingUp, CheckCircle2, Target } from "lucide-react";

/* ════════════════════════════════════════════════════════════
   OrganismoIntelligence — preview de la inteligencia del organismo
   comprador que aparece en la ficha de cada licitación dentro
   de la plataforma. Demuestra otro diferenciador único del producto.

   Datos: 4 KPIs históricos + top 5 proveedores + insights IA.
   Source en plataforma: vw_mp_organismo_stats + fn_mp_organismo_intelligence
═══════════════════════════════════════════════════════════════ */

type OrgKey = "minsal" | "mop" | "junaeb" | "munoa";

type OrgData = {
  label: string;
  code: string;
  totalLic: number;
  pctAdj: number;
  pctDes: number;
  plazoOC: number; // días promedio
  montoEstimado: string;
  montoAdj: string;
  topProv: { rank: 1 | 2 | 3 | 4 | 5; name: string; share: number }[];
  lastLic: string;
  totalOC: number;
  insights: { type: "warn" | "ok" | "up" | "focus"; text: string }[];
};

const data: Record<OrgKey, OrgData> = {
  minsal: {
    label: "MINSAL",
    code: "AO009",
    totalLic: 1_842,
    pctAdj: 67.4,
    pctDes: 8.2,
    plazoOC: 18,
    montoEstimado: "$48.2B",
    montoAdj: "$31.7B",
    topProv: [
      { rank: 1, name: "Insumos Médicos Andina SpA", share: 28.4 },
      { rank: 2, name: "BioFarma Chile Ltda.",      share: 19.1 },
      { rank: 3, name: "Distribuidora Salud Sur",   share: 14.6 },
      { rank: 4, name: "Equipos Médicos del Pacífico", share: 9.2 },
      { rank: 5, name: "Servicios Hospitalarios Ñ",  share: 6.8 },
    ],
    lastLic: "5837-122-LP25 · hace 4 min",
    totalOC: 4_280,
    insights: [
      { type: "ok",   text: "Organismo eficiente · solo 8.2% desiertas, sobre el promedio del Estado" },
      { type: "focus",text: "Concentración alta · proveedor #1 acumula 28.4% del CLP histórico" },
    ],
  },
  mop: {
    label: "MOP RM",
    code: "AO022",
    totalLic: 2_136,
    pctAdj: 71.8,
    pctDes: 5.4,
    plazoOC: 24,
    montoEstimado: "$184.5B",
    montoAdj: "$142.1B",
    topProv: [
      { rank: 1, name: "Constructora Vial Sur Ltda.", share: 22.1 },
      { rank: 2, name: "Pavimentos Andinos S.A.",     share: 16.8 },
      { rank: 3, name: "Ingeniería Norte Construcción", share: 12.4 },
      { rank: 4, name: "Obras Civiles Patagonia",     share: 8.7 },
      { rank: 5, name: "RadarTech Chile S.A.",        share: 5.9 },
    ],
    lastLic: "3091-55-LP25 · hace 2 h",
    totalOC: 6_412,
    insights: [
      { type: "up",   text: "Organismo activo · 12 licitaciones publicadas últimos 90 días" },
      { type: "ok",   text: "Pago rápido · 24 días promedio entre adjudicación y OC emitida" },
    ],
  },
  junaeb: {
    label: "JUNAEB",
    code: "AO014",
    totalLic: 412,
    pctAdj: 58.2,
    pctDes: 34.7,
    plazoOC: 12,
    montoEstimado: "$92.4B",
    montoAdj: "$53.8B",
    topProv: [
      { rank: 1, name: "Alimentos del Pacífico SpA",  share: 41.2 },
      { rank: 2, name: "Cocinas Industriales Sur",    share: 18.4 },
      { rank: 3, name: "Distribuidora Escolar Ltda.", share: 11.7 },
      { rank: 4, name: "Frutas y Verduras Andina",    share: 7.3 },
      { rank: 5, name: "Lácteos Centro",              share: 5.4 },
    ],
    lastLic: "8842-30-CM25 · hace 12 min",
    totalOC: 1_840,
    insights: [
      { type: "warn", text: "Riesgo alto · 34.7% de licitaciones desiertas, bases probablemente mal armadas" },
      { type: "focus",text: "Mercado dominado · proveedor #1 acumula 41.2% del CLP — barrera de entrada alta" },
    ],
  },
  munoa: {
    label: "M. Ñuñoa",
    code: "AO128",
    totalLic: 287,
    pctAdj: 73.1,
    pctDes: 4.2,
    plazoOC: 31,
    montoEstimado: "$8.4B",
    montoAdj: "$6.1B",
    topProv: [
      { rank: 1, name: "Audita Servicios Profesionales", share: 18.9 },
      { rank: 2, name: "Aseo Premium SpA",               share: 14.2 },
      { rank: 3, name: "Constructora Local Sur",         share: 11.6 },
      { rank: 4, name: "Servicios TI Ñuñoa",             share: 8.1 },
      { rank: 5, name: "Seguridad Integral",             share: 6.7 },
    ],
    lastLic: "2412-87-LE25 · hace 6 h",
    totalOC: 980,
    insights: [
      { type: "ok", text: "Excelente record · 73.1% adjudicación, solo 4.2% desiertas" },
      { type: "up", text: "Mercado abierto · 5 proveedores top suman solo 59.5% — competencia sana" },
    ],
  },
};

const insightStyle = {
  warn:  { icon: AlertTriangle, color: "#D80027", bg: "bg-ruby-400/[0.08]", border: "border-ruby-400/30" },
  ok:    { icon: CheckCircle2,  color: "#16A34A", bg: "bg-sage-400/[0.08]", border: "border-sage-400/30" },
  up:    { icon: TrendingUp,    color: "#0064E0", bg: "bg-amber-400/[0.08]", border: "border-amber-400/30" },
  focus: { icon: Target,        color: "#C49B2C", bg: "bg-gold-50/60",      border: "border-gold-400/30" },
} as const;

const rankMedal = {
  1: { color: "#C49B2C", label: "oro" },
  2: { color: "#A8A29E", label: "plata" },
  3: { color: "#A37348", label: "bronce" },
  4: { color: "#737373", label: "" },
  5: { color: "#737373", label: "" },
} as const;

export default function OrganismoIntelligence() {
  const [orgKey, setOrgKey] = useState<OrgKey>("minsal");
  const org = data[orgKey];

  return (
    <section
      id="inteligencia-organismo"
      className="relative py-20 md:py-32 bg-ink-900/40 border-y border-[var(--hairline)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,100,224,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — pitch */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-7">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-amber-400" />
                <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-60" />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400 font-medium">
                Inteligencia del comprador · embebida en la ficha
              </span>
            </div>

            <h2 className="font-display font-medium text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
              Antes de postular,{" "}
              <span className="font-serif italic font-normal text-amber-400 tracking-[-0.02em]">
                conoces a tu comprador.
              </span>
            </h2>

            <p className="mt-5 font-sans text-[15.5px] md:text-[16.5px] leading-[1.55] text-cream-200 max-w-[460px]">
              Cada ficha de licitación carga 4 KPIs históricos del organismo, su top 5 de proveedores ganadores e <em>insights automáticos</em> generados por IA: cuándo paga, qué tan eficiente es, dónde concentra el gasto.
            </p>

            <div className="mt-8 space-y-3 max-w-[440px]">
              <div className="flex items-start gap-3 text-[13.5px]">
                <span className="text-amber-400 mt-1.5 text-[8px]">●</span>
                <p className="text-cream-200">
                  <span className="text-cream-50 font-medium">% desiertas:</span>{" "}
                  detecta bases mal armadas antes de invertir tiempo
                </p>
              </div>
              <div className="flex items-start gap-3 text-[13.5px]">
                <span className="text-amber-400 mt-1.5 text-[8px]">●</span>
                <p className="text-cream-200">
                  <span className="text-cream-50 font-medium">Plazo OC:</span>{" "}
                  días promedio entre adjudicación y orden — proxy de comportamiento de pago
                </p>
              </div>
              <div className="flex items-start gap-3 text-[13.5px]">
                <span className="text-amber-400 mt-1.5 text-[8px]">●</span>
                <p className="text-cream-200">
                  <span className="text-cream-50 font-medium">Top 5 proveedores:</span>{" "}
                  share histórico con HHI para evaluar barrera de entrada
                </p>
              </div>
            </div>

            {/* Selector de organismo */}
            <div className="mt-9">
              <label className="block mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300">
                Probá con un organismo real
              </label>
              <div className="relative max-w-[320px]">
                <select
                  value={orgKey}
                  onChange={(e) => setOrgKey(e.target.value as OrgKey)}
                  className="appearance-none w-full pl-3 pr-8 py-2.5 rounded-lg bg-white border border-[var(--hairline-strong)] text-cream-50 text-[13px] font-medium tracking-tight cursor-pointer hover:border-amber-400/40 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15 transition"
                >
                  <option value="minsal">MINSAL · Ministerio de Salud</option>
                  <option value="mop">MOP RM · Obras Públicas</option>
                  <option value="junaeb">JUNAEB · Junta Auxilio Escolar</option>
                  <option value="munoa">M. Ñuñoa · Municipalidad</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-300 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* RIGHT — intelligence panel */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-2xl bg-white p-6 md:p-7"
              style={{
                border: "1px solid var(--hairline-strong)",
                boxShadow:
                  "0 30px 80px -30px rgba(0,100,224,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--hairline)] flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 grid place-items-center font-mono text-[11px] font-semibold text-amber-400">
                    {org.label.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-display font-medium text-[15px] text-cream-50 leading-tight">
                      {org.label}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-300 mt-0.5">
                      código · {org.code}
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
                  fn_mp_organismo_intelligence({org.code})
                </div>
              </div>

              {/* 4 KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-5 rounded-xl overflow-hidden bg-[var(--hairline)]">
                {[
                  { lbl: "Total licitaciones", val: org.totalLic.toLocaleString("es-CL"), unit: "histórico" },
                  { lbl: "% adjudicadas",      val: org.pctAdj.toFixed(1) + "%", unit: "tasa", tone: "good" },
                  { lbl: "% desiertas",        val: org.pctDes.toFixed(1) + "%", unit: org.pctDes > 30 ? "alto" : "normal", tone: org.pctDes > 30 ? "warn" : "neutral" },
                  { lbl: "Plazo OC promedio",  val: org.plazoOC + "d", unit: "tras adj." },
                ].map((kpi, i) => (
                  <div key={i} className="bg-white p-4">
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300 mb-2">
                      {kpi.lbl}
                    </div>
                    <div className={`font-display font-medium text-[22px] leading-none tracking-[-0.02em] num tabular-nums ${
                      kpi.tone === "warn" ? "text-ruby-400" : kpi.tone === "good" ? "text-sage-400" : "text-cream-50"
                    }`}>
                      {kpi.val}
                    </div>
                    <div className="font-mono text-[9.5px] text-cream-400 mt-1.5">
                      {kpi.unit}
                    </div>
                  </div>
                ))}
              </div>

              {/* Montos row */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="p-4 rounded-xl bg-ink-900/40 border border-[var(--hairline)]">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300 mb-1.5">
                    Monto estimado histórico
                  </div>
                  <div className="font-display font-medium text-[24px] tracking-[-0.025em] text-cream-50 num">
                    {org.montoEstimado}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-amber-400/[0.05] border border-amber-400/20">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-amber-400 mb-1.5">
                    Monto adjudicado
                  </div>
                  <div className="font-display font-medium text-[24px] tracking-[-0.025em] text-amber-400 num">
                    {org.montoAdj}
                  </div>
                </div>
              </div>

              {/* Top 5 proveedores */}
              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300 mb-3">
                  Top 5 proveedores históricos
                </div>
                <div className="space-y-1.5">
                  {org.topProv.map((p) => {
                    const m = rankMedal[p.rank];
                    return (
                      <div key={p.rank} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-ink-900/30 transition">
                        <div
                          className="w-5 h-5 rounded-full grid place-items-center font-mono text-[10px] font-bold flex-shrink-0"
                          style={{
                            background: p.rank <= 3 ? `${m.color}20` : "transparent",
                            color: m.color,
                            border: p.rank <= 3 ? `1px solid ${m.color}55` : "1px solid var(--hairline-strong)",
                          }}
                        >
                          {p.rank}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-sans text-[13px] text-cream-50 font-medium truncate">{p.name}</div>
                        </div>
                        <div className="flex items-center gap-2.5 flex-shrink-0">
                          <div className="w-20 h-1.5 rounded-full bg-ink-700 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 transition-all duration-500"
                              style={{ width: `${(p.share / org.topProv[0].share) * 100}%` }}
                            />
                          </div>
                          <div className="font-mono text-[11px] text-cream-100 font-medium tabular-nums w-12 text-right">
                            {p.share.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Insights IA */}
              <div className="mt-5 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300 mb-1">
                  Insights automáticos IA
                </div>
                {org.insights.map((ins, i) => {
                  const s = insightStyle[ins.type];
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${s.bg} ${s.border}`}
                    >
                      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: s.color }} strokeWidth={2} />
                      <p className="font-sans text-[13px] leading-[1.45] text-cream-100">
                        {ins.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400 flex-wrap gap-2">
                <span>
                  última licitación · <span className="text-cream-200">{org.lastLic}</span>
                </span>
                <span>
                  total OC · <span className="text-cream-200">{org.totalOC.toLocaleString("es-CL")}</span>
                </span>
              </div>
            </div>

            <div className="mt-4 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400">
              ↑ Esto se carga embebido en cada ficha de licitación · zero clicks extra
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
