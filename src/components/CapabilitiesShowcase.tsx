import { useEffect, useRef, useState } from "react";
import {
  Star,
  TrendingUp,
  Shield,
  ChevronRight,
} from "lucide-react";
import LiveDot from "./ui/LiveDot";
import Sparkline from "./ui/Sparkline";

/* ════════════════════════════════════════════════════════════
   peec.ai-style showcase:
   · 4 clickable cards on the LEFT (vertical stack)
   · Big product-screen bento on the RIGHT that swaps on click
   · Autoplay 5.5s/feature with progress bar on the active card
   · Each mock is a contained "screen" of the product, no overflow
═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════
   MOCK 1 · Detección IA — live feed of detected tenders
   (Profound "Opportunities"-style stream, replaces the old radar)
═══════════════════════════════════════════════════════════════ */

const DetectionFeedMock = () => {
  const detections = [
    { org: "MINSAL", title: "Insumos clínicos · regiones", score: 92, reason: "coincide con 3 categorías ganadas" },
    { org: "MOP", title: "Estudio carga vial Ruta CH-225", score: 88, reason: "keyword 'ingeniería' + monto objetivo" },
    { org: "CONAF", title: "Brigada control forestal", score: 86, reason: "categoría afín a tu perfil" },
    { org: "JUNAEB", title: "Ración alimentaria escolar", score: 84, reason: "organismo comprador frecuente" },
    { org: "FOSIS", title: "Programa apoyo social", score: 79, reason: "monto dentro de tu rango" },
  ];
  const [scan, setScan] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScan((s) => (s + 1) % detections.length), 1500);
    return () => clearInterval(t);
  }, [detections.length]);

  return (
    <div className="absolute inset-0 flex flex-col p-5 md:p-6">
      {/* Header — scanning indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] flex-shrink-0">
        <div className="flex items-center gap-2">
          <LiveDot size={7} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400 font-medium">
            Scanning ChileCompra · en vivo
          </span>
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300">
          6.062 procesadas
        </span>
      </div>

      {/* Feed — detection cards stream in */}
      <div className="flex-1 min-h-0 overflow-hidden mt-3 space-y-2.5 [mask-image:linear-gradient(to_bottom,black_86%,transparent)]">
        {detections.map((d, i) => {
          const active = i === scan;
          const high = d.score >= 85;
          return (
            <div
              key={d.org}
              className={`rounded-xl border p-3 transition-all duration-500 ${
                active
                  ? "border-amber-400/50 bg-amber-400/[0.05] shadow-md shadow-amber-400/10 scale-[1.015]"
                  : "border-[var(--hairline)] bg-ink-900/30"
              }`}
              style={{ animation: `feedIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both` }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-300">
                  {d.org}
                </span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${
                    high
                      ? "border-amber-400/40 bg-amber-400/[0.08] text-amber-400"
                      : "border-[var(--hairline)] text-cream-300"
                  }`}
                >
                  Score {d.score}
                </span>
              </div>
              <div className="font-display font-medium text-[14px] text-cream-50 mt-1 truncate">
                {d.title}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                {high && (
                  <TrendingUp className="h-3 w-3 text-amber-400 flex-shrink-0" strokeWidth={2} />
                )}
                <span className="font-sans text-[11.5px] text-cream-300 truncate">
                  {d.reason}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer — daily tally */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-[var(--hairline)] flex-shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="num font-display font-medium text-[22px] leading-none text-cream-50">
            42
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300">
            detectadas hoy
          </span>
        </div>
        <span className="flex items-center gap-1 font-mono text-[10px] text-amber-400">
          <TrendingUp className="h-3 w-3" strokeWidth={2} />
          +18% vs ayer
        </span>
      </div>

      <style>{`
        @keyframes feedIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   MOCK 2 · ARIA — Cleo-style conversational onboarding
   (brand badge + intro bubbles + capability reply pills)
═══════════════════════════════════════════════════════════════ */

const AriaMock = () => {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCycle((c) => c + 1), 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(180deg, #000115 0%, #000324 14%, #000a37 30%, #001560 52%, #002494 74%, #003ab3 100%)",
      }}
    >
      {/* Depth overlay + dot texture (echoes the /aria hero) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 32%, rgba(0,1,21,0.55) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(85,180,248,0.16) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />

      {/* Content */}
      <div key={cycle} className="relative h-full flex flex-col px-5 md:px-7 pt-4 pb-4">
        {/* ARIA logo — same mark as the /aria page */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="inline-flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="3" cy="4" r="1.5" fill="#55b4f8" opacity="0.5" />
              <circle cx="3" cy="10" r="1.5" fill="#55b4f8" opacity="0.7" />
              <circle cx="3" cy="16" r="1.5" fill="#55b4f8" opacity="0.5" />
              <path d="M4.5 4 L10 8.5" stroke="#55b4f8" strokeWidth="0.8" opacity="0.4" />
              <path d="M4.5 10 L10 10" stroke="#55b4f8" strokeWidth="0.8" opacity="0.6" />
              <path d="M4.5 16 L10 11.5" stroke="#55b4f8" strokeWidth="0.8" opacity="0.4" />
              <circle cx="11" cy="10" r="3" fill="#55b4f8" opacity="0.15" />
              <circle cx="11" cy="10" r="1.8" fill="#55b4f8" opacity="0.3" />
              <circle cx="11" cy="10" r="0.8" fill="#e0f6ff" />
              <path d="M14 10 L18.5 10" stroke="#e0f6ff" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M17 8 L19 10 L17 12" stroke="#e0f6ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="font-display font-semibold text-[22px] tracking-tight leading-none text-white">
              ARIA<span className="text-[#55b4f8]">.</span>
            </span>
          </div>
          <div className="absolute right-0 h-8 w-8 grid place-items-center rounded-full border border-[#55b4f8]/30">
            <span className="h-3 w-3 rounded-full border-[1.5px] border-[#55b4f8]/60" />
          </div>
        </div>

        {/* Today divider */}
        <div className="mt-3 flex-shrink-0">
          <div className="text-center font-sans text-[11px] text-white/45 mb-1.5">Hoy</div>
          <div className="h-px bg-white/10" />
        </div>

        {/* Conversation — a real, high-value exchange */}
        <div className="flex-1 min-h-0 mt-3 flex flex-col gap-2.5 overflow-hidden">
          {/* User question */}
          <div
            className="self-end max-w-[82%] rounded-3xl rounded-br-md px-4 py-2.5 bg-[#0882f7]"
            style={{ animation: `cleoIn 0.4s 0.1s both` }}
          >
            <p className="font-sans text-[13px] leading-[1.4] text-white">
              ¿Me conviene postular a la 4500-12-LP24 de MINSAL?
            </p>
          </div>

          {/* ARIA strategic answer */}
          <div
            className="self-start w-full rounded-2xl px-4 py-3 bg-white/[0.07] border border-[#55b4f8]/20 backdrop-blur-sm"
            style={{ animation: `cleoIn 0.5s 0.7s both` }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#55b4f8]" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-[#9fd2fb]">
                ARIA · recomendación
              </span>
            </div>
            <p className="font-sans text-[13px] leading-[1.45] text-white mb-2.5">
              Sí, encaja fuerte con tu perfil:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { k: "Match perfil", v: "92/100" },
                { k: "Prob. ganar", v: "78%" },
                { k: "Cierra en", v: "12 días" },
              ].map((m) => (
                <div key={m.k} className="rounded-lg bg-white/[0.06] border border-white/10 px-2.5 py-2">
                  <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/45 truncate">
                    {m.k}
                  </div>
                  <div className="num font-display font-semibold text-[16px] leading-none text-[#55b4f8] mt-1">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
            <p className="font-sans text-[12px] leading-[1.45] text-white/80 mt-2.5">
              Ganaste 2 de 3 licitaciones similares en MINSAL.
            </p>
          </div>

          {/* Follow-up question */}
          <div
            className="self-end max-w-[82%] rounded-3xl rounded-br-md px-4 py-2.5 bg-[#0882f7]"
            style={{ animation: `cleoIn 0.4s 1.5s both` }}
          >
            <p className="font-sans text-[13px] leading-[1.4] text-white">
              ¿A qué precio exacto oferto?
            </p>
          </div>

          {/* ARIA price recommendation */}
          <div
            className="self-start max-w-[92%] rounded-2xl px-4 py-3 bg-white/[0.07] border border-[#55b4f8]/20 backdrop-blur-sm"
            style={{ animation: `cleoIn 0.5s 2.1s both` }}
          >
            <p className="font-sans text-[13px] leading-[1.5] text-white">
              Oferta <span className="font-semibold text-[#55b4f8]">$139.900.000</span> — 1,8% bajo el p50 histórico. Margen óptimo sin sacrificar competitividad.
            </p>
            <div className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/45">
              Análisis · 35.500 OCs + bases
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cleoIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   MOCK 3 · Órdenes de Compra — dashboard-style screen
═══════════════════════════════════════════════════════════════ */

const OCsMock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1500);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.floor(35500 * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const sample = [
    { id: "750-2453-OC25", org: "MINSAL", monto: "$142.5M", cierre: "12d", rating: 4.8, evals: 142 },
    { id: "1057-887-OC25", org: "MOP", monto: "$78.2M", cierre: "—", rating: 4.2, evals: 38 },
    { id: "2438-1102-OC25", org: "JUNAEB", monto: "$36.0M", cierre: "8d", rating: 4.9, evals: 67 },
    { id: "5193-441-OC25", org: "DGAC", monto: "$210.5M", cierre: "21d", rating: 4.5, evals: 24 },
  ];

  return (
    <div ref={ref} className="absolute inset-0 grid grid-cols-[1fr_1.4fr] gap-4 p-6">
      {/* LEFT — big number + KPI strip */}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300">
            Total OCs catastradas
          </div>
          <div className="num font-display font-medium text-[64px] leading-[0.95] tracking-[-0.045em] text-cream-50 mt-2">
            {n.toLocaleString("es-CL")}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-amber-400/15 border border-amber-400/30 rounded font-mono text-[10px] uppercase tracking-[0.14em] text-amber-400">
              +14% mes
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300">
              40+ campos
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="bg-ink-900/40 border border-[var(--hairline)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300">
                Monto YTD
              </span>
              <span className="num font-mono text-[12px] text-amber-400">$4.2B</span>
            </div>
            <Sparkline
              data={[180, 245, 220, 290, 310, 285, 340, 380, 360, 410, 445, 478]}
              width={180}
              height={30}
              color="#0064E0"
            />
          </div>
          <div className="bg-ink-900/40 border border-[var(--hairline)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300">
                Calif. avg
              </span>
              <span className="num font-mono text-[12px] text-amber-400 flex items-center gap-1">
                <Star className="h-2.5 w-2.5 fill-amber-400 stroke-amber-400" />
                4.6
              </span>
            </div>
            <div className="flex items-end gap-1 h-3">
              {[8, 18, 38, 56, 78].map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i >= 3 ? "bg-amber-400" : "bg-cream-300/40"}`}
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — actual OC table */}
      <div className="flex flex-col bg-white border border-[var(--hairline)] rounded-xl overflow-hidden shadow-sm min-w-0">
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--hairline)] bg-ink-900/20 flex-shrink-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-300">
            mp_ordenes_compra · live
          </span>
          <LiveDot size={6} />
        </div>
        <div className="grid grid-cols-[60px_1fr_64px_50px] px-3.5 py-2 border-b border-[var(--hairline)] font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream-300 flex-shrink-0">
          <div>Org</div>
          <div>OC</div>
          <div className="text-right">Monto</div>
          <div className="text-right">★</div>
        </div>
        <div className="flex-1 overflow-hidden">
          {sample.map((o, i) => (
            <div
              key={o.id}
              className="grid grid-cols-[60px_1fr_64px_50px] gap-2 items-center px-3.5 py-2.5 border-b border-[var(--hairline)] last:border-b-0"
              style={{ animation: `slideOC 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s both` }}
            >
              <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream-300 truncate">
                {o.org}
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] text-cream-100 truncate">{o.id}</div>
                <div className="font-mono text-[8.5px] text-cream-400 mt-0.5">cierre · {o.cierre}</div>
              </div>
              <div className="num font-mono text-[10.5px] text-cream-50 text-right">{o.monto}</div>
              <div className="flex items-center gap-0.5 justify-end">
                <Star className="h-2.5 w-2.5 fill-amber-400 stroke-amber-400" />
                <span className="num font-mono text-[10px] text-amber-400">{o.rating}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3.5 py-2 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] flex-shrink-0">
          <span className="text-cream-400">+ 35.496 más</span>
          <span className="text-amber-400 flex items-center gap-1">
            ver <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <style>{`
        @keyframes slideOC {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   MOCK 4 · Multi-org + RLS — diagram + live SQL
═══════════════════════════════════════════════════════════════ */

const MultiOrgRLSMock = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 1900);
    return () => clearInterval(t);
  }, []);
  const tenants = [
    { name: "Consultora Andina", id: "a3d7…f201", lic: 12 },
    { name: "Lab. Etcheverry", id: "b9e2…c054", lic: 28 },
    { name: "Distribuidora Sur", id: "c1f8…9a3b", lic: 17 },
  ];
  const tenant = tenants[idx];

  return (
    <div className="absolute inset-0 grid grid-rows-[1fr_auto] gap-4 p-6">
      {/* TOP — visual hierarchy diagram */}
      <div className="relative min-h-0">
        <svg viewBox="0 0 480 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="hg5" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#0064E0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="240" cy="36" r="50" fill="url(#hg5)" />
          <path d="M 240 42 Q 140 100 80 170" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
          <path d="M 240 42 L 240 170" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
          <path d="M 240 42 Q 340 100 400 170" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
          <circle cx="240" cy="38" r="7" fill="#0064E0" />
          <circle cx="240" cy="38" r="7" fill="#0064E0" opacity="0.4">
            <animate attributeName="r" values="7;16;7" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {[
            { d: "M 240 42 Q 140 100 80 170", delay: "0s" },
            { d: "M 240 42 L 240 170", delay: "0.7s" },
            { d: "M 240 42 Q 340 100 400 170", delay: "1.4s" },
          ].map((p, i) => (
            <g key={i}>
              <circle r="3.5" fill="#0064E0">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.delay} path={p.d} />
              </circle>
              <circle r="7" fill="#0064E0" opacity="0.3">
                <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.delay} path={p.d} />
              </circle>
            </g>
          ))}
          <circle cx="80" cy="170" r="4" fill="#0064E0" />
          <circle cx="240" cy="170" r="4" fill="#0064E0" />
          <circle cx="400" cy="170" r="4" fill="#0064E0" />
        </svg>

        <div className="absolute left-1/2 top-3 -translate-x-1/2 px-3 py-1.5 bg-white border border-amber-400/40 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400 shadow-md whitespace-nowrap">
          cuenta principal
        </div>

        <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 gap-2.5">
          {tenants.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white border rounded-lg p-2.5 text-center shadow-sm transition-all duration-500 ${
                i === idx ? "border-amber-400/60 shadow-md scale-[1.02]" : "border-cream-300/40"
              }`}
            >
              <div className="font-sans font-medium text-[11.5px] text-cream-50 truncate leading-tight">
                {t.name}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-300 mt-0.5">
                {t.lic} lic. activas
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM — RLS SQL */}
      <div className="border border-[var(--hairline-strong)] rounded-xl bg-white overflow-hidden shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-[var(--hairline)] bg-ink-900/30">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-amber-400" strokeWidth={2} />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-amber-400 font-medium">
              Row Level Security
            </span>
          </div>
          <span className="font-mono text-[9.5px] text-cream-300">postgres 15.8</span>
        </div>
        <div className="px-3.5 py-2.5 font-mono text-[11px] leading-[1.6]">
          <span className="text-cream-300">tenant: </span>
          <span className="text-amber-400 font-medium transition-colors duration-500">{tenant.name}</span>
          <div className="text-cream-50 mt-1">
            <span className="text-cream-300">SELECT</span> <span className="text-cream-100">*</span>{" "}
            <span className="text-cream-300">FROM</span>{" "}
            <span className="text-amber-400">mp_licitaciones</span>{" "}
            <span className="text-cream-300">WHERE</span>{" "}
            <span className="text-cream-100">org_id = </span>
            <span className="text-amber-400 transition-colors duration-500">'{tenant.id}'</span>
            <span className="inline-block w-[6px] h-[12px] bg-amber-400 ml-0.5 align-middle animate-blink" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   FEATURES DATA · 4 consolidated capabilities
═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════
   BENTO TILE primitives
═══════════════════════════════════════════════════════════════ */

const TileHead = ({
  title,
  tag,
  desc,
  live,
}: {
  title: string;
  tag: string;
  desc?: string;
  live?: boolean;
}) => (
  <div className="flex-shrink-0 px-5 pt-4 pb-3.5 relative z-10">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        {live && <LiveDot size={6} />}
        <h3 className="font-display font-medium text-[17px] tracking-[-0.02em] text-cream-50 truncate">
          {title}
        </h3>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber-400 whitespace-nowrap flex-shrink-0">
        {tag}
      </span>
    </div>
    {desc && (
      <p className="mt-1.5 font-sans text-[12.5px] leading-[1.45] text-cream-300 max-w-[46ch]">
        {desc}
      </p>
    )}
  </div>
);

const TileBody = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex-1 min-h-0 overflow-hidden border-t border-[var(--hairline)]">
    <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
      {children}
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════
   COMPONENT · Windsurf-style bento of live capability tiles
═══════════════════════════════════════════════════════════════ */

export default function CapabilitiesShowcase() {
  const tile =
    "relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[var(--hairline)] shadow-[0_24px_70px_-38px_rgba(0,100,224,0.32)]";

  return (
    <section
      id="capacidades"
      className="relative py-16 md:py-32 overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,100,224,0.05),_transparent_60%)]" />

      <div className="container-edge relative">
        {/* Header — left-aligned editorial */}
        <div className="max-w-[820px] mb-10 md:mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-400 font-medium">
            El motor, por dentro
          </span>
          <h2 className="mt-4 font-display font-medium text-[38px] md:text-[58px] leading-[1.02] tracking-[-0.04em] text-cream-50">
            Cuatro capacidades sobre el{" "}
            <span className="font-serif italic font-normal text-amber-400 tracking-[-0.02em]">
              mismo dato
            </span>
            .
          </h2>
        </div>

        {/* Bento grid — every capability visible at once, live */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 lg:auto-rows-[262px]">
          {/* ARIA — hero, spans 2×2 (Cleo-style, full-bleed) */}
          <div className={`${tile} min-h-[520px] lg:min-h-0 lg:col-span-2 lg:row-span-2`}>
            <AriaMock />
          </div>

          {/* Detección */}
          <div className={`${tile} min-h-[300px] lg:min-h-0`}>
            <TileHead title="Detección automática" tag="tiempo real" />
            <TileBody>
              <DetectionFeedMock />
            </TileBody>
          </div>

          {/* Multi-organización */}
          <div className={`${tile} min-h-[300px] lg:min-h-0`}>
            <TileHead title="Multi-organización" tag="RLS · Postgres" />
            <TileBody>
              <MultiOrgRLSMock />
            </TileBody>
          </div>

          {/* Órdenes de compra — full-width band */}
          <div className={`${tile} min-h-[340px] lg:min-h-0 lg:col-span-3 lg:row-span-1`}>
            <TileHead
              title="Órdenes de compra"
              tag="único en Chile"
              desc="35.500 OCs con 40+ campos. Precio real pagado, vínculo OC ↔ licitación y calificación del proveedor — lo que ningún competidor muestra."
            />
            <TileBody>
              <OCsMock />
            </TileBody>
          </div>
        </div>
      </div>
    </section>
  );
}
