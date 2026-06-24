import { useEffect, useRef, useState } from "react";
import {
  Radar,
  MessageSquare,
  Building2,
  Network,
  Star,
  TrendingUp,
  Search,
  Paperclip,
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

const DURATION_MS = 5500;

/* ════════════════════════════════════════════════════════════
   MOCK 1 · Detección IA — radar centered with side panels
═══════════════════════════════════════════════════════════════ */

const RadarMock = () => {
  const points = [
    { angle: 28, radius: 0.62, score: 92, org: "MINSAL" },
    { angle: 55, radius: 0.85, score: 84, org: "MOP" },
    { angle: 92, radius: 0.42, score: 71, org: "JUNAEB" },
    { angle: 118, radius: 0.75, score: 88, org: "DGAC" },
    { angle: 175, radius: 0.92, score: 86, org: "CONAF" },
    { angle: 205, radius: 0.48, score: 79, org: "JUNJI" },
    { angle: 238, radius: 0.78, score: 91, org: "FOSIS" },
    { angle: 295, radius: 0.88, score: 73, org: "SAG" },
    { angle: 322, radius: 0.45, score: 82, org: "SENCE" },
    { angle: 12, radius: 0.36, score: 95, org: "MIN. JUSTICIA" },
  ];
  const SIZE = 280;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = SIZE / 2 - 8;
  const SWEEP = 5;
  const [hl, setHl] = useState<{ org: string; score: number } | null>(null);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const ang = (((now - t0) / 1000) % SWEEP) / SWEEP * 360;
      const hit = points.find((p) => {
        const d = Math.abs(((p.angle - ang + 540) % 360) - 180);
        return Math.abs(d - 180) < 12;
      });
      setHl(hit ? { org: hit.org, score: hit.score } : null);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const polar = (a: number, r: number) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [CX + Math.cos(rad) * r, CY + Math.sin(rad) * r];
  };

  return (
    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-3 p-4 md:p-6">
      {/* LEFT panel — distribution */}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          <div className="num font-display font-medium text-[40px] leading-none tracking-[-0.04em] text-cream-50">
            73<span className="text-amber-400">.4</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-300 mt-1.5">
            score promedio · 7d
          </div>
        </div>
        <div className="space-y-2">
          {[
            { label: "≥ 80 pts", count: 7, color: "bg-amber-400" },
            { label: "60–80 pts", count: 14, color: "bg-brand-300" },
            { label: "< 60 pts", count: 21, color: "bg-cream-300/50" },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-[11px]">
              <span className={`h-1.5 w-1.5 rounded-full ${r.color}`} />
              <span className="font-mono text-cream-200 flex-1 truncate">{r.label}</span>
              <span className="num font-mono text-cream-50">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER — radar */}
      <div className="flex items-center justify-center min-w-0">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-[220px] h-[220px] md:w-[280px] md:h-[280px]">
          <defs>
            <radialGradient id="sw4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0064E0" stopOpacity="0" />
              <stop offset="60%" stopColor="#0064E0" stopOpacity="0" />
              <stop offset="100%" stopColor="#0064E0" stopOpacity="0.45" />
            </radialGradient>
            <radialGradient id="cg4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0064E0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map((r, i) => (
            <circle key={i} cx={CX} cy={CY} r={R * r} fill="none" stroke="rgba(0,100,224,0.18)" strokeWidth="1" strokeDasharray={i === 3 ? "0" : "2 4"} />
          ))}
          <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="rgba(0,100,224,0.12)" strokeWidth="1" />
          <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="rgba(0,100,224,0.12)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={28} fill="url(#cg4)" />
          <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: `radarSpin4 ${SWEEP}s linear infinite` }}>
            <path
              d={`M ${CX} ${CY} L ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX + R * Math.sin((Math.PI / 180) * 45)} ${CY - R * Math.cos((Math.PI / 180) * 45)} Z`}
              fill="url(#sw4)"
            />
            <line x1={CX} y1={CY} x2={CX} y2={CY - R} stroke="#0064E0" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          </g>
          {points.map((p, i) => {
            const [x, y] = polar(p.angle, R * p.radius);
            const isHigh = p.score >= 85;
            const delay = (p.angle / 360) * SWEEP;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={isHigh ? 3.5 : 2.5} fill="#0064E0" opacity={isHigh ? 1 : p.score >= 70 ? 0.65 : 0.4} />
                <circle cx={x} cy={y} r={isHigh ? 3.5 : 2.5} fill="none" stroke="#0064E0" strokeWidth="1.4" opacity="0" style={{ animation: `radarPing4 ${SWEEP}s linear infinite`, animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px` }} />
              </g>
            );
          })}
          <circle cx={CX} cy={CY} r={3.5} fill="#0064E0" />
          <circle cx={CX} cy={CY} r={3.5} fill="#0064E0" opacity="0.4">
            <animate attributeName="r" values="3.5;10;3.5" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* RIGHT panel — live readout */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full self-end">
          <LiveDot size={6} />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber-400 font-medium">
            scanning
          </span>
        </div>
        <div className="bg-white border border-amber-400/30 rounded-lg p-3 shadow-md shadow-amber-400/10 min-h-[80px]">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-cream-300">
            MATCH detectado
          </div>
          {hl ? (
            <div className="flex items-baseline gap-2 mt-1">
              <span className="num font-display font-medium text-[28px] leading-none text-amber-400">
                {hl.score}
              </span>
              <span className="font-mono text-[10px] text-cream-200 truncate flex-1 min-w-0">
                {hl.org}
              </span>
            </div>
          ) : (
            <div className="font-mono text-[10px] text-cream-300 mt-1 italic">
              esperando...
            </div>
          )}
        </div>
        <div className="bg-ink-900/40 border border-[var(--hairline)] rounded-lg p-3">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-300">
            Detectadas hoy
          </div>
          <div className="num font-display font-medium text-[28px] leading-none text-cream-50 mt-1">
            42
          </div>
          <div className="flex items-center gap-1 mt-1 font-mono text-[9.5px] text-amber-400">
            <TrendingUp className="h-2.5 w-2.5" strokeWidth={2} />
            +18% vs ayer
          </div>
        </div>
      </div>
      <style>{`
        @keyframes radarSpin4 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes radarPing4 { 0%, 92% { opacity: 0; transform: scale(1); } 93% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(3.5); } }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   MOCK 2 · Chat IA — chat-app-like screen
═══════════════════════════════════════════════════════════════ */

const ChatMock = () => (
  <div className="absolute inset-0 flex flex-col p-6">
    {/* Context bar */}
    <div className="flex items-center justify-between pb-4 border-b border-[var(--hairline)] mb-5 flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-amber-400/10 border border-amber-400/25 flex-shrink-0">
          <Paperclip className="h-4 w-4 text-amber-400" strokeWidth={1.6} />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream-300">
            Lic. 1057-887-LP25 · MOP
          </div>
          <div className="font-display font-medium text-[14px] text-cream-50 mt-0.5 truncate">
            Estudio carga vial Ruta CH-225
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber-400 px-2 py-1 border border-amber-400/30 bg-amber-400/[0.06] rounded-full">
          Score 84
        </span>
      </div>
    </div>

    {/* Messages — flex-1 with overflow-hidden so it doesn't bleed */}
    <div className="flex-1 space-y-3 overflow-hidden min-h-0 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
      <div className="flex justify-end" style={{ animation: "fadeInChat 0.5s 0.1s both" }}>
        <div className="max-w-[78%] bg-amber-400/10 border border-amber-400/25 rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="font-sans text-[13px] text-cream-50">¿Qué acreditaciones técnicas exigen?</p>
        </div>
      </div>
      <div className="flex justify-start" style={{ animation: "fadeInChat 0.5s 0.7s both" }}>
        <div className="max-w-[88%] border-l-2 border-amber-400 pl-3.5 py-1">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-amber-400 mb-1.5">
            IAutoLicita · Claude
          </div>
          <p className="font-sans text-[13px] leading-[1.55] text-cream-100">
            ISO 9001:2015 vigente, registro MOP categoría 2A o superior, mínimo 3 obras similares en últimos 5 años. Las bases admiten consorcios siempre que el líder cumpla MOP.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {["ISO 9001", "Registro MOP 2A", "3+ obras", "Consorcios OK"].map((c) => (
              <span key={c} className="font-mono text-[9px] px-1.5 py-0.5 border border-amber-400/30 bg-amber-400/[0.06] text-amber-400 rounded">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end" style={{ animation: "fadeInChat 0.5s 1.5s both" }}>
        <div className="max-w-[78%] bg-amber-400/10 border border-amber-400/25 rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="font-sans text-[13px] text-cream-50">¿Cuál es el plazo de presentación?</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400 pl-3.5" style={{ animation: "fadeInChat 0.5s 2s both" }}>
        <span className="flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft" />
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft [animation-delay:0.2s]" />
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse-soft [animation-delay:0.4s]" />
        </span>
        Buscando en bases · 847 KB
      </div>
    </div>

    {/* Input bar */}
    <div className="mt-4 pt-3 border-t border-[var(--hairline)] flex items-center gap-3 flex-shrink-0">
      <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-ink-900/30 border border-[var(--hairline)] rounded-lg">
        <Search className="h-3.5 w-3.5 text-cream-400" strokeWidth={1.8} />
        <span className="font-sans text-[12.5px] text-cream-400">Pregunta sobre esta licitación…</span>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-400 flex-shrink-0">⌘ ↵</span>
    </div>

    <style>{`
      @keyframes fadeInChat {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

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

interface Feature {
  id: string;
  Icon: typeof Radar;
  title: string;
  body: string;
  Mock: React.ComponentType;
}

const features: Feature[] = [
  {
    id: "chat",
    Icon: MessageSquare,
    title: "Chat IA con bases técnicas",
    body: "Cada licitación tiene su hilo IA. Pregunta sobre acreditaciones, plazos, riesgos. Acceso al texto completo de las bases con persistencia por organización.",
    Mock: ChatMock,
  },
  {
    id: "detection",
    Icon: Radar,
    title: "Detección automática con IA",
    body: "El motor escanea ChileCompra en vivo, lee cada licitación nueva y la puntúa contra tu perfil. 6.062 licitaciones procesadas, 7 sobre umbral típicamente.",
    Mock: RadarMock,
  },
  {
    id: "ocs",
    Icon: Building2,
    title: "Órdenes de compra · Único en Chile",
    body: "35.500 OCs catastradas con 40+ campos. Vincula OC ↔ licitación, calificación al proveedor, tiempo de cierre. Lo que ningún competidor te muestra.",
    Mock: OCsMock,
  },
  {
    id: "multi",
    Icon: Network,
    title: "Multi-organización con RLS",
    body: "Una cuenta, varias razones sociales. Datos aislados a nivel motor BD con Row Level Security. Cada perfil con su matching, equipo y notas.",
    Mock: MultiOrgRLSMock,
  },
];

/* ════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */

export default function CapabilitiesShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / DURATION_MS);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % features.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, inView]);

  const handleSelect = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  const f = features[active];
  const Mock = f.Mock;

  return (
    <section
      ref={sectionRef}
      id="capacidades"
      className="relative py-16 md:py-32 overflow-hidden bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,100,224,0.05),_transparent_60%)]" />

      <div className="container-edge relative">
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-amber-400/30 bg-amber-400/[0.06] rounded-full mb-6">
            <LiveDot size={7} />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400 font-medium">
              Capacidades · clic para explorar
            </span>
          </div>
          <h2 className="font-display font-medium text-[44px] md:text-[64px] leading-[1] tracking-[-0.04em] text-cream-50">
            Cuatro piezas.
            <br />
            <span className="font-serif italic font-normal text-amber-400 tracking-[-0.02em]">
              Una plataforma viva.
            </span>
          </h2>
          <p className="mt-6 font-sans text-[16px] md:text-[18px] leading-[1.5] text-cream-200">
            Hacé click en cualquier capacidad para ver su pieza del producto. Si no tocas nada, avanza sola cada 5.5 segundos.
          </p>
        </div>

        {/* Stage: clickable cards left + bento right */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* LEFT — clickable cards */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {features.map((feat, i) => {
              const isActive = i === active;
              const Icon = feat.Icon;
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`relative text-left rounded-xl border transition-all duration-400 overflow-hidden p-5 group/card ${
                    isActive
                      ? "bg-white border-amber-400/40 shadow-lg shadow-amber-400/10"
                      : "bg-ink-900/30 border-[var(--hairline)] hover:border-cream-300/30 hover:bg-ink-900/50"
                  }`}
                >
                  {/* Active accent — left edge */}
                  <span
                    className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-all duration-500 ${
                      isActive ? "bg-amber-400 shadow-[0_0_16px_rgba(0,100,224,0.5)]" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className={`h-8 w-8 grid place-items-center rounded-lg border transition-all duration-400 ${
                        isActive
                          ? "border-amber-400/40 bg-amber-400/10"
                          : "border-[var(--hairline)] bg-ink-800"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-colors duration-400 ${
                          isActive ? "text-amber-400" : "text-cream-300"
                        }`}
                        strokeWidth={1.6}
                      />
                    </div>
                    <h3
                      className={`font-display font-medium text-[16px] tracking-[-0.015em] transition-colors duration-400 ${
                        isActive ? "text-cream-50" : "text-cream-200"
                      }`}
                    >
                      {feat.title}
                    </h3>
                  </div>
                  <p
                    className={`font-sans text-[13px] leading-[1.5] transition-colors duration-400 ${
                      isActive ? "text-cream-200" : "text-cream-300"
                    }`}
                  >
                    {feat.body}
                  </p>

                  {/* Progress bar at the top of the active card */}
                  {isActive && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-[var(--hairline)] overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-[width] duration-100 ease-linear"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT — bento stage with strict containment */}
          <div className="lg:col-span-8">
            <div className="relative h-[480px] md:h-[540px] rounded-2xl overflow-hidden bg-white shadow-[0_30px_100px_-30px_rgba(0,100,224,0.30),0_0_0_1px_rgba(10,10,10,0.06)]">
              {/* Browser-chrome top bar */}
              <div className="absolute top-0 inset-x-0 h-9 border-b border-[var(--hairline)] bg-ink-900/40 flex items-center justify-between px-4 z-10">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cream-400/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cream-400/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cream-400/40" />
                </div>
                <div className="font-mono text-[10px] text-cream-400 flex items-center gap-2">
                  <LiveDot size={5} color="bg-sage-400" ringColor="bg-sage-400" />
                  app.iautolicita.cl / {f.id}
                </div>
                <span className="font-mono text-[10px] text-cream-400 tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </span>
              </div>

              {/* The active mock — single render, fresh on each switch */}
              <div
                key={`mock-${active}`}
                className="absolute inset-0 pt-9 animate-cinematic-fade-in"
                style={{ willChange: "opacity, transform, filter" }}
              >
                <div className="relative h-full">
                  <Mock />
                </div>
              </div>
            </div>

            {/* Status line removed per design feedback */}
            <div className="hidden">
              {/* placeholder so paused/inView remain in scope */}
              <span>{paused ? "" : !inView ? "" : f.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
