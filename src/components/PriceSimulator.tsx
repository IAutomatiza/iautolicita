import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

/* ════════════════════════════════════════════════════════════
   PriceSimulator — el diferenciador único.
   El visitante elige categoría + región y ve precio real
   pagado por ítem (p25/p50/p75) vía OC. Nadie en Chile tiene
   esto. Mostrarlo en vivo en la home es la prueba más fuerte.
═══════════════════════════════════════════════════════════════ */

type Cat = { id: string; label: string; unspsc: string; base: number; nOcBase: number };
type Reg = { id: string; label: string; mult: number };

const categories: Cat[] = [
  { id: "seguridad",   label: "Seguridad y vigilancia",      unspsc: "92121500", base: 48,  nOcBase: 6_140 },
  { id: "alimentacion",label: "Alimentación (JUNAEB)",       unspsc: "50000000", base: 178, nOcBase: 3_480 },
  { id: "aseo",        label: "Aseo institucional",          unspsc: "76111501", base: 24,  nOcBase: 4_520 },
  { id: "insumos_med", label: "Insumos médicos",             unspsc: "42312000", base: 32,  nOcBase: 5_860 },
  { id: "mantencion",  label: "Mantención de edificios",     unspsc: "72101500", base: 22,  nOcBase: 3_280 },
  { id: "ti_serv",     label: "Software y servicios TI",     unspsc: "81111800", base: 94,  nOcBase: 2_410 },
  { id: "construccion",label: "Construcción y obras menores",unspsc: "72121400", base: 186, nOcBase: 1_120 },
  { id: "combustibles",label: "Combustibles y lubricantes",  unspsc: "15101500", base: 58,  nOcBase: 2_790 },
  { id: "uniformes",   label: "Uniformes y vestuario",       unspsc: "53102500", base: 38,  nOcBase: 1_860 },
  { id: "vehiculos",   label: "Vehículos y mantención flota",unspsc: "25101500", base: 124, nOcBase: 1_340 },
];

const regions: Reg[] = [
  { id: "rm",          label: "Metropolitana", mult: 1.18 },
  { id: "valpo",       label: "Valparaíso",    mult: 0.96 },
  { id: "biobio",      label: "Biobío",        mult: 0.87 },
  { id: "maule",       label: "Maule",         mult: 0.80 },
  { id: "antofagasta", label: "Antofagasta",   mult: 1.05 },
  { id: "araucania",   label: "La Araucanía",  mult: 0.78 },
];

const BARS = 28;

function buildStats(cat: Cat, reg: Reg) {
  const median = cat.base * reg.mult;
  const p25 = median * 0.62;
  const p75 = median * 1.48;
  const min = median * 0.35;
  const max = median * 2.6;

  // Lognormal-ish right-skewed distribution centered near median
  const hist = Array.from({ length: BARS }, (_, i) => {
    const x = (i + 0.5) / BARS;
    const center = 0.42;
    const spread = 0.20;
    const z = (x - center) / spread;
    const h = Math.exp(-0.5 * z * z) * 0.94 + 0.06;
    return h;
  });

  const nOc = Math.floor(cat.nOcBase * reg.mult);
  const nProv = Math.max(12, Math.floor(nOc / 14));
  const nOrg = Math.max(6, Math.floor(nOc / 42));

  return { p25, p50: median, p75, min, max, hist, nOc, nProv, nOrg };
}

function fmtCLP(m: number): string {
  if (m >= 1000) return `$${(m / 1000).toFixed(1)}MM`;
  if (m >= 100) return `$${Math.round(m)}M`;
  if (m >= 10) return `$${m.toFixed(1)}M`;
  return `$${m.toFixed(2)}M`;
}
function fmtN(n: number): string {
  return n.toLocaleString("es-CL");
}

// Hook for smooth number transitions
function useSmoothNumber(target: number, durationMs = 700) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  const startedAtRef = useRef(0);
  useEffect(() => {
    fromRef.current = val;
    startedAtRef.current = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAtRef.current) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(fromRef.current + (target - fromRef.current) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return val;
}

/* `embedded` lo monta como continuación de Results: sin fondo ni encabezado
   propios, porque la sección de arriba ya presentó el precio real por ítem. */
export default function PriceSimulator({ embedded = false }: { embedded?: boolean }) {
  const [catId, setCatId] = useState("aseo");
  const [regId, setRegId] = useState("rm");

  const cat = categories.find((c) => c.id === catId)!;
  const reg = regions.find((r) => r.id === regId)!;
  const stats = useMemo(() => buildStats(cat, reg), [cat, reg]);

  // Smooth the three percentiles
  const p25 = useSmoothNumber(stats.p25);
  const p50 = useSmoothNumber(stats.p50);
  const p75 = useSmoothNumber(stats.p75);
  const nOc = useSmoothNumber(stats.nOc, 500);
  const nProv = useSmoothNumber(stats.nProv, 500);
  const nOrg = useSmoothNumber(stats.nOrg, 500);

  // Percentile X positions on the histogram axis
  const range = stats.max - stats.min;
  const xP25 = ((stats.p25 - stats.min) / range) * 100;
  const xP50 = ((stats.p50 - stats.min) / range) * 100;
  const xP75 = ((stats.p75 - stats.min) / range) * 100;

  return (
    <section
      id="simulador"
      className={
        embedded
          ? "relative pb-20 md:pb-28 overflow-hidden"
          : "relative py-20 md:py-32 overflow-hidden"
      }
    >
      {/* El resplandor y la grilla los pone Results cuando va embebido */}
      {!embedded && (
        <>
          {/* Soft atmospheric glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(0,100,224,0.08) 0%, transparent 60%)",
            }}
          />
          {/* Subtle grid */}
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-faint bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none"
          />
        </>
      )}

      <div className="container-edge relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — pitch + dropdowns */}
          <div className="lg:col-span-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-7">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-amber-400" />
                <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-60" />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-400 font-medium">
                Prueba interactiva · data exclusiva
              </span>
            </div>

            {embedded ? (
              /* Results ya dijo qué es el precio real; aquí sólo se invita a probarlo. */
              <h3 className="font-display font-medium text-[26px] md:text-[34px] leading-[1.1] tracking-[-0.03em] text-cream-50">
                Pruébalo:{" "}
                <span className="font-serif italic font-normal text-amber-400 tracking-[-0.015em]">
                  elige categoría y región.
                </span>
              </h3>
            ) : (
              <>
                {/* Headline */}
                <h2 className="font-display font-medium text-[36px] md:text-[52px] leading-[1.02] tracking-[-0.04em] text-cream-50">
                  El{" "}
                  <span className="font-serif italic font-normal text-amber-400 tracking-[-0.02em]">
                    precio real
                  </span>
                  <br />
                  pagado por ítem.
                </h2>

                <p className="mt-5 font-sans text-[15.5px] md:text-[16.5px] leading-[1.55] text-cream-200 max-w-[460px]">
                  No el monto adjudicado. El que <em>realmente</em> se pagó, extraído de cada orden de compra del Estado. Cruza categoría + región para ver la distribución completa.
                </p>
              </>
            )}

            {/* Dropdowns */}
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[480px]">
              <div>
                <label className="block mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300">
                  Categoría
                </label>
                <div className="relative">
                  <select
                    value={catId}
                    onChange={(e) => setCatId(e.target.value)}
                    className="appearance-none w-full pl-3 pr-8 py-2.5 rounded-lg bg-white border border-[var(--hairline-strong)] text-cream-50 text-[13px] font-normal tracking-tight cursor-pointer hover:border-amber-400/40 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15 transition"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-300 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300">
                  Región compradora
                </label>
                <div className="relative">
                  <select
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                    className="appearance-none w-full pl-3 pr-8 py-2.5 rounded-lg bg-white border border-[var(--hairline-strong)] text-cream-50 text-[13px] font-normal tracking-tight cursor-pointer hover:border-amber-400/40 focus:outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/15 transition"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream-300 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Meta footer */}
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-[480px]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300 mb-1">
                  OCs analizadas
                </div>
                <div className="font-display font-medium text-[20px] text-cream-50 num tabular-nums">
                  {fmtN(Math.round(nOc))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300 mb-1">
                  Proveedores
                </div>
                <div className="font-display font-medium text-[20px] text-cream-50 num tabular-nums">
                  {fmtN(Math.round(nProv))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300 mb-1">
                  Organismos
                </div>
                <div className="font-display font-medium text-[20px] text-cream-50 num tabular-nums">
                  {fmtN(Math.round(nOrg))}
                </div>
              </div>
            </div>

            <div className="mt-7 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream-400 px-3 py-1.5 bg-ink-900/60 border border-[var(--hairline)] rounded-full">
              <Sparkles className="h-3 w-3 text-amber-400" />
              UNSPSC {cat.unspsc} · últimos 12 meses
            </div>
          </div>

          {/* RIGHT — the visualization card */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-2xl bg-white p-6 md:p-8"
              style={{
                border: "1px solid var(--hairline-strong)",
                boxShadow:
                  "0 30px 80px -30px rgba(0,100,224,0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--hairline)]">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream-300 font-medium">
                  Distribución precio pagado · CLP por OC
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream-400 hidden md:block">
                  fuente: mp_ordenes_compra · p25/p50/p75
                </div>
              </div>

              {/* Histogram */}
              <div className="relative">
                <div className="flex items-end gap-[3px] h-[180px] md:h-[220px]">
                  {stats.hist.map((h, i) => {
                    const x = (i + 0.5) / BARS;
                    // bars between p25 and p75 are accent, outside are muted
                    const xLow = (stats.p25 - stats.min) / range;
                    const xHigh = (stats.p75 - stats.min) / range;
                    const inIqr = x >= xLow && x <= xHigh;
                    return (
                      <div
                        key={i}
                        className="flex-1 origin-bottom rounded-t-sm transition-all duration-700 ease-out"
                        style={{
                          height: `${h * 100}%`,
                          background: inIqr ? "#0064E0" : "#E7E5E4",
                          opacity: inIqr ? 0.85 : 0.6,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Percentile markers */}
                {[
                  { x: xP25, label: "p25", val: p25, color: "#737373" },
                  { x: xP50, label: "p50", val: p50, color: "#0064E0", primary: true },
                  { x: xP75, label: "p75", val: p75, color: "#737373" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="absolute top-0 bottom-0 transition-all duration-700 ease-out"
                    style={{ left: `${m.x}%` }}
                  >
                    <div
                      className="absolute top-0 bottom-0 w-px"
                      style={{
                        background: m.color,
                        opacity: m.primary ? 0.85 : 0.45,
                        boxShadow: m.primary ? "0 0 0 2px rgba(0,100,224,0.10)" : undefined,
                      }}
                    />
                    <div
                      className="absolute -top-7 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] font-medium px-1.5 py-0.5 rounded bg-white"
                      style={{ color: m.color }}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* X axis labels */}
              <div className="mt-2 flex justify-between font-mono text-[10px] text-cream-300">
                <span>{fmtCLP(stats.min)}</span>
                <span>{fmtCLP((stats.min + stats.max) / 2)}</span>
                <span>{fmtCLP(stats.max)}</span>
              </div>

              {/* Three big percentile numbers */}
              <div className="mt-8 grid grid-cols-3 gap-3 md:gap-5">
                {[
                  { label: "p25", val: p25, tag: "conservador", note: "ofertas más bajas" },
                  { label: "p50", val: p50, tag: "mediana", note: "el precio típico", primary: true },
                  { label: "p75", val: p75, tag: "p75", note: "ofertas más altas" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className={`p-4 md:p-5 rounded-xl ${
                      m.primary
                        ? "bg-amber-400/[0.08] border border-amber-400/30"
                        : "bg-ink-900/60 border border-[var(--hairline)]"
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2"
                      style={{ color: m.primary ? "#0064E0" : "#737373" }}>
                      {m.label === "p25" ? "p25 · conservador" : m.label === "p50" ? "p50 · mediana" : "p75 · agresivo"}
                    </div>
                    <div className={`font-serif italic font-normal leading-none text-[34px] md:text-[44px] tracking-[-0.02em] num tabular-nums ${
                      m.primary ? "text-amber-400" : "text-cream-50"
                    }`}>
                      {fmtCLP(m.val)}
                    </div>
                    <div className="mt-2 font-sans text-[12px] text-cream-300">
                      {m.note}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer with deep-dive link */}
              <div className="mt-7 pt-5 border-t border-[var(--hairline)] flex items-center justify-between flex-wrap gap-3">
                <div className="font-mono text-[10.5px] text-cream-300">
                  En la plataforma: filtrá por código UNSPSC exacto, tendencia 12 meses, tu RUT vs mercado
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] font-medium text-amber-400 hover:text-amber-500 transition group"
                >
                  Pedir acceso
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>

            {/* Disclosure under card */}
            <div className="mt-4 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400">
              ↑ Demo con muestra de datos · Plataforma usa 6.4M OCs reales con `unspsc_codigo_producto` filtrado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
