import { useEffect, useRef, useState } from "react";
import {
  Radar,
  Brain,
  Bell,
  Network,
  TrendingUp,
  Shield,
  MessageCircle,
  Mail,
  Send,
  Star,
} from "lucide-react";
import LiveDot from "./ui/LiveDot";
import Sparkline from "./ui/Sparkline";

/* ────────────────────────────────────────────────────────────
   Sticky scrollytelling — text scrolls, visual stays pinned
   and crossfades through five feature mocks. Apple/Stripe pattern.
─────────────────────────────────────────────────────────────── */

// ════════ MOCK 1 — Live sync feed ════════
const SyncFeedMock = () => {
  const items = [
    { org: "MINSAL", lic: "Insumos clínicos especializados", t: "ahora", score: 92 },
    { org: "MOP", lic: "Estudio de carga vial CH-225", t: "2m", score: 84 },
    { org: "JUNAEB", lic: "Auditoría programa PAE", t: "5m", score: 71 },
    { org: "DGAC", lic: "Mantención sistemas radar", t: "9m", score: 88 },
    { org: "SERVIU", lic: "Inspección obras Maule", t: "13m", score: 64 },
    { org: "CONAF", lic: "Servicios prevención forestal", t: "17m", score: 86 },
  ];

  return (
    <div className="h-full overflow-hidden p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
          Feed · sincronización ChileCompra
        </div>
        <div className="flex items-center gap-2">
          <LiveDot size={7} />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-400">
            Live · 13 workflows
          </span>
        </div>
      </div>
      <div className="space-y-2.5 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 border border-[var(--hairline)] rounded-xl bg-white shadow-sm"
            style={{
              animation: `slideInFromTop 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s both`,
            }}
          >
            <span
              className={`num font-display font-semibold text-[22px] leading-none w-8 ${
                it.score >= 85 ? "text-amber-400" : "text-cream-100"
              }`}
            >
              {it.score}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream-300">
                {it.org}
              </div>
              <div className="font-sans text-[13px] text-cream-100 truncate leading-tight mt-0.5">
                {it.lic}
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <LiveDot size={5} />
              <span className="font-mono text-[10px] text-cream-300">{it.t}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ════════ MOCK 2 — AI Radar (preserved from KeyFeatures) ════════
const RadarSweepMock = () => {
  const points = [
    { angle: 28, radius: 0.62, score: 92, org: "MINSAL" },
    { angle: 55, radius: 0.85, score: 84, org: "MOP" },
    { angle: 92, radius: 0.42, score: 71, org: "JUNAEB" },
    { angle: 118, radius: 0.75, score: 88, org: "DGAC" },
    { angle: 142, radius: 0.55, score: 64, org: "SERVIU" },
    { angle: 175, radius: 0.92, score: 86, org: "CONAF" },
    { angle: 205, radius: 0.48, score: 79, org: "JUNJI" },
    { angle: 238, radius: 0.78, score: 91, org: "FOSIS" },
    { angle: 268, radius: 0.62, score: 58, org: "INDAP" },
    { angle: 295, radius: 0.88, score: 73, org: "SAG" },
    { angle: 322, radius: 0.45, score: 82, org: "SENCE" },
    { angle: 348, radius: 0.7, score: 68, org: "DIRECTEMAR" },
    { angle: 12, radius: 0.36, score: 95, org: "MIN. JUSTICIA" },
    { angle: 78, radius: 0.32, score: 77, org: "TESORERÍA" },
  ];
  const SIZE = 360;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = SIZE / 2 - 8;
  const SWEEP_DURATION = 5;
  const [highlight, setHighlight] = useState<{ org: string; score: number } | null>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = ((now - start) / 1000) % SWEEP_DURATION;
      const sweepAngle = (elapsed / SWEEP_DURATION) * 360;
      const hit = points.find((p) => {
        const diff = Math.abs(((p.angle - sweepAngle + 540) % 360) - 180);
        return Math.abs(diff - 180) < 12;
      });
      setHighlight(hit ? { org: hit.org, score: hit.score } : null);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const polar = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [CX + Math.cos(rad) * r, CY + Math.sin(rad) * r];
  };

  return (
    <div className="relative h-full flex items-center justify-center p-7">
      <div className="absolute left-7 top-7 z-10">
        <div className="num font-display font-medium text-[56px] leading-none tracking-[-0.04em] text-cream-50">
          73<span className="text-amber-400">.4</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-300 mt-1">
          score promedio · 7 días
        </div>
      </div>
      <div className="absolute right-7 top-7 z-10">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full">
          <LiveDot size={6} />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber-400 font-medium">
            scanning · IA
          </span>
        </div>
        {highlight && (
          <div className="bg-white border border-amber-400/40 rounded-lg p-2.5 shadow-lg shadow-amber-400/10 min-w-[160px] mt-3">
            <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-cream-300">
              MATCH detectado
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="num font-display font-medium text-[28px] leading-none text-amber-400">
                {highlight.score}
              </span>
              <span className="font-mono text-[10px] text-cream-200 truncate">
                {highlight.org}
              </span>
            </div>
          </div>
        )}
      </div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-[360px] w-[360px]">
        <defs>
          <radialGradient id="sweep-grad-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0064E0" stopOpacity="0.0" />
            <stop offset="60%" stopColor="#0064E0" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#0064E0" stopOpacity="0.45" />
          </radialGradient>
          <radialGradient id="core-glow-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0064E0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((r, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={R * r}
            fill="none"
            stroke="rgba(0,100,224,0.18)"
            strokeWidth="1"
            strokeDasharray={i === 3 ? "0" : "2 4"}
          />
        ))}
        <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="rgba(0,100,224,0.12)" strokeWidth="1" />
        <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="rgba(0,100,224,0.12)" strokeWidth="1" />
        <circle cx={CX} cy={CY} r={36} fill="url(#core-glow-2)" />
        <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: `radarSpin2 ${SWEEP_DURATION}s linear infinite` }}>
          <path
            d={`M ${CX} ${CY} L ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX + R * Math.sin((Math.PI / 180) * 45)} ${CY - R * Math.cos((Math.PI / 180) * 45)} Z`}
            fill="url(#sweep-grad-2)"
          />
          <line x1={CX} y1={CY} x2={CX} y2={CY - R} stroke="#0064E0" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        </g>
        {points.map((p, i) => {
          const [x, y] = polar(p.angle, R * p.radius);
          const isHigh = p.score >= 85;
          const delay = (p.angle / 360) * SWEEP_DURATION;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={isHigh ? 4 : 3}
                fill={isHigh || p.score >= 70 ? "#0064E0" : "rgba(143,151,171,0.6)"}
                opacity={isHigh ? 1 : p.score >= 70 ? 0.65 : 0.4}
              />
              <circle
                cx={x}
                cy={y}
                r={isHigh ? 4 : 3}
                fill="none"
                stroke="#0064E0"
                strokeWidth="1.5"
                opacity="0"
                style={{ animation: `radarPing2 ${SWEEP_DURATION}s linear infinite`, animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px` }}
              />
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={4} fill="#0064E0" />
        <circle cx={CX} cy={CY} r={4} fill="#0064E0" opacity="0.4">
          <animate attributeName="r" values="4;12;4" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
      <style>{`
        @keyframes radarSpin2 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes radarPing2 { 0%, 92% { opacity: 0; transform: scale(1); } 93% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(3.5); } }
      `}</style>
    </div>
  );
};

// ════════ MOCK 3 — Notification stack ════════
const NotificationStackMock = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 2200);
    return () => clearInterval(t);
  }, []);
  const notifications = [
    { Icon: MessageCircle, ch: "WhatsApp", title: "Nueva oportunidad · MINSAL", sub: "Score 92 · revisar antes de 16-may" },
    { Icon: Mail, ch: "Email", title: "Reporte diario · 42 detectadas", sub: "7 sobre umbral 80 pts" },
    { Icon: Send, ch: "Telegram", title: "OC adjudicada a la competencia", sub: "MOP · Vial Sur Ltda · M$ 78.240" },
    { Icon: Bell, ch: "In-app", title: "@felipe te asignó tarea", sub: "Postular Lic. 1057-887-LP25" },
  ];

  return (
    <div className="relative h-full p-7 flex items-center">
      <div className="relative w-full" style={{ height: 280 }}>
        {notifications.map((n, i) => {
          const Icon = n.Icon;
          const offset = (i - active + 4) % 4;
          return (
            <div
              key={i}
              className="absolute left-0 right-0 transition-all duration-700 ease-out"
              style={{
                top: `${offset * 12}px`,
                transform: `scale(${1 - offset * 0.04})`,
                opacity: offset === 0 ? 1 : 0.45 - offset * 0.12,
                zIndex: 10 - offset,
              }}
            >
              <div
                className={`px-5 py-4 rounded-2xl border shadow-lg ${
                  offset === 0
                    ? "bg-white border-amber-400/60 shadow-amber-400/15"
                    : "bg-white/80 border-cream-300/40"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`h-11 w-11 grid place-items-center rounded-xl flex-shrink-0 ${offset === 0 ? "bg-amber-400/15" : "bg-cream-50/60"}`}>
                    <Icon className={`h-5 w-5 ${offset === 0 ? "text-amber-400" : "text-cream-200"}`} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-300">
                      {n.ch}
                    </div>
                    <div className="font-sans text-[14px] font-medium text-cream-50 truncate leading-tight mt-0.5">
                      {n.title}
                    </div>
                    <div className="font-sans text-[12px] text-cream-200 truncate mt-1">
                      {n.sub}
                    </div>
                  </div>
                  {offset === 0 && <LiveDot size={6} className="mt-2.5 flex-shrink-0" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════ MOCK 4 — Multi-org with beams ════════
const MultiOrgBeamMock = () => (
  <div className="relative h-full p-7 flex items-center">
    <svg viewBox="0 0 360 280" className="w-full h-auto">
      <defs>
        <radialGradient id="hub-glow-2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0064E0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="56" r="50" fill="url(#hub-glow-2)" />
      <path d="M 180 62 Q 110 130 60 220" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M 180 62 L 180 220" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M 180 62 Q 250 130 300 220" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
      <circle cx="180" cy="58" r="8" fill="#0064E0" />
      <circle cx="180" cy="58" r="8" fill="#0064E0" opacity="0.4">
        <animate attributeName="r" values="8;18;8" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {[
        { d: "M 180 62 Q 110 130 60 220", delay: "0s" },
        { d: "M 180 62 L 180 220", delay: "0.7s" },
        { d: "M 180 62 Q 250 130 300 220", delay: "1.4s" },
      ].map((p, i) => (
        <g key={i}>
          <circle r="4" fill="#0064E0">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.delay} path={p.d} />
          </circle>
          <circle r="8" fill="#0064E0" opacity="0.3">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.delay} path={p.d} />
          </circle>
        </g>
      ))}
      <circle cx="60" cy="220" r="5" fill="#0064E0" />
      <circle cx="180" cy="220" r="5" fill="#0064E0" />
      <circle cx="300" cy="220" r="5" fill="#0064E0" />
    </svg>
    <div className="absolute left-1/2 top-12 -translate-x-1/2 px-4 py-2 bg-white border border-amber-400/40 rounded-full font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-400 shadow-md shadow-amber-400/10">
      cuenta principal
    </div>
    <div className="absolute bottom-7 inset-x-7 grid grid-cols-3 gap-3">
      {[
        { name: "Andina", lic: 12, score: 75 },
        { name: "Etcheverry", lic: 28, score: 60 },
        { name: "Distrib. Sur", lic: 17, score: 70 },
      ].map((o) => (
        <div key={o.name} className="bg-white border border-cream-300/40 rounded-xl p-3 text-center shadow-sm">
          <div className="font-sans font-medium text-[12px] text-cream-50 truncate">{o.name}</div>
          <div className="mt-1.5 grid grid-cols-2 gap-2 font-mono text-[9.5px]">
            <div>
              <div className="text-cream-300">score</div>
              <div className="num text-amber-400">{o.score}</div>
            </div>
            <div>
              <div className="text-cream-300">lic.</div>
              <div className="num text-cream-50">{o.lic}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ════════ MOCK 5 — OC ticker ════════
const TickerMock = () => {
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
          const t = Math.min(1, (now - start) / 1800);
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
    { id: "750-2453", org: "MINSAL", monto: "$142.5M", rating: 4.8 },
    { id: "1057-887", org: "MOP", monto: "$78.2M", rating: 4.2 },
    { id: "2438-1102", org: "JUNAEB", monto: "$36.0M", rating: 4.9 },
    { id: "5193-441", org: "DGAC", monto: "$210.5M", rating: 4.5 },
  ];

  return (
    <div ref={ref} className="h-full p-7 flex flex-col justify-between">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300">
          Total OCs catastradas
        </div>
        <div className="num font-display font-medium text-[88px] leading-[0.95] tracking-[-0.045em] text-cream-50 mt-2">
          {n.toLocaleString("es-CL")}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2 py-0.5 bg-amber-400/15 border border-amber-400/30 rounded font-mono text-[10px] uppercase tracking-[0.14em] text-amber-400">
            +14% mes
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300">
            40+ campos por OC
          </span>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {sample.map((o, i) => (
          <div
            key={o.id}
            className="grid grid-cols-[80px_1fr_92px_50px] items-center gap-2 px-3 py-2 border border-[var(--hairline)] rounded-lg bg-white"
            style={{ animation: `slideInRight 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both` }}
          >
            <div className="font-mono text-[10px] text-cream-200 truncate">{o.id}</div>
            <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream-300">{o.org}</div>
            <div className="num font-mono text-[11px] text-cream-50 text-right">{o.monto}</div>
            <div className="flex items-center gap-0.5 justify-end">
              <Star className="h-2.5 w-2.5 fill-amber-400 stroke-amber-400" />
              <span className="num font-mono text-[10.5px] text-amber-400">{o.rating}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--hairline)]">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-cream-300">
          <span>monto YTD adjudicado</span>
          <span className="text-amber-400 num">$4.2B CLP</span>
        </div>
        <div className="mt-2">
          <Sparkline data={[180, 245, 220, 290, 310, 285, 340, 380, 360, 410, 445, 478]} width={400} height={36} color="#0064E0" />
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// ════════ MOCK 6 — RLS rotating tenant ════════
const RLSMock = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 1900);
    return () => clearInterval(t);
  }, []);
  const tenants = [
    { name: "Consultora Andina", id: "a3d7…f201" },
    { name: "Lab. Etcheverry", id: "b9e2…c054" },
    { name: "Distribuidora Sur", id: "c1f8…9a3b" },
  ];
  const tenant = tenants[idx];

  return (
    <div className="h-full p-7 flex flex-col justify-center">
      <div className="border border-[var(--hairline-strong)] rounded-2xl bg-white overflow-hidden shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hairline)] bg-ink-900/40">
          <div className="flex items-center gap-2.5">
            <Shield className="h-4 w-4 text-amber-400" strokeWidth={2} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-400 font-medium">
              row-level security
            </span>
          </div>
          <span className="font-mono text-[10px] text-cream-300">postgres 15.8</span>
        </div>
        <div className="p-5 font-mono text-[12.5px] leading-[1.7]">
          <div className="text-cream-300">— request from</div>
          <div className="text-cream-100">
            tenant: <span className="text-amber-400 font-medium transition-colors duration-500">{tenant.name}</span>
          </div>
          <div className="text-cream-300 mt-3">— generated query</div>
          <div className="text-cream-50">
            <span className="text-cream-300">SELECT</span> <span className="text-cream-100">*</span> <span className="text-cream-300">FROM</span> <span className="text-amber-400">mp_licitaciones</span>
          </div>
          <div className="text-cream-50">
            <span className="text-cream-300">WHERE</span>{" "}
            <span className="text-cream-100">org_id</span>{" "}
            <span className="text-cream-300">=</span>{" "}
            <span className="text-amber-400 transition-colors duration-500">'{tenant.id}'</span>
            <span className="inline-block w-[7px] h-[14px] bg-amber-400 ml-0.5 align-middle animate-blink" />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {tenants.map((_, i) => (
          <span
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === idx ? "w-8 bg-amber-400" : "w-1.5 bg-cream-300/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Layout
─────────────────────────────────────────────────────────────── */

interface Feature {
  id: string;
  index: string;
  eyebrow: string;
  Icon: typeof Radar;
  title: React.ReactNode;
  body: string;
  bullets: string[];
  Mock: React.ComponentType;
}

const features: Feature[] = [
  {
    id: "sync",
    index: "01",
    eyebrow: "Sync · ChileCompra",
    Icon: Radar,
    title: (
      <>
        Cada licitación, en tu inbox{" "}
        <span className="text-amber-400">antes que la abras.</span>
      </>
    ),
    body: "13 workflows ingestan licitaciones, OCs, adjudicaciones y organismos directo desde la API oficial. Captura completa — no scraping, no subset.",
    bullets: [
      "Sincronización 24/7 sin manos humanas",
      "Auditoría con métricas por workflow",
      "6.062 licitaciones procesadas a la fecha",
    ],
    Mock: SyncFeedMock,
  },
  {
    id: "score",
    index: "02",
    eyebrow: "Match IA · Score",
    Icon: Brain,
    title: (
      <>
        El motor escanea, puntúa{" "}
        <span className="text-amber-400">y solo te pasa lo que importa.</span>
      </>
    ),
    body: "Tu perfil tiene 20+ atributos (servicios, regiones, keywords, montos, acreditaciones). Cada licitación nueva se puntúa contra ese perfil. Un trigger en Postgres asigna automáticamente al(los) perfil(es) que mejor matchean.",
    bullets: [
      "Score automático por licitación",
      "Routing multi-organización sin intervención",
      "Distribución típica: 7 sobre umbral, 14 entre 60-80",
    ],
    Mock: RadarSweepMock,
  },
  {
    id: "notif",
    index: "03",
    eyebrow: "Notificaciones",
    Icon: Bell,
    title: (
      <>
        Alertas donde tu equipo ya{" "}
        <span className="text-amber-400">está mirando.</span>
      </>
    ),
    body: "WhatsApp, email, Telegram e in-app. Cada organización configura sus canales y el tipo de evento que dispara cada notificación. Menciones, asignaciones, oportunidades sobre umbral.",
    bullets: [
      "4 canales nativos · sin Zapier ni middleware",
      "Configurable por organización y por usuario",
      "Trigger Postgres → tabla mp_notificaciones → dispatcher",
    ],
    Mock: NotificationStackMock,
  },
  {
    id: "multi",
    index: "04",
    eyebrow: "Multi-organización",
    Icon: Network,
    title: (
      <>
        Una cuenta. Varias razones sociales.{" "}
        <span className="text-amber-400">Datos aislados a nivel BD.</span>
      </>
    ),
    body: "Si operas varias razones sociales o eres una consultora con varios clientes, los gestionas todos desde una sola cuenta. Cada perfil con su propio matching, equipo, notas y oportunidades.",
    bullets: [
      "Row Level Security a nivel Postgres",
      "Routing automático según matching score",
      "3 organizaciones operando hoy en producción",
    ],
    Mock: MultiOrgBeamMock,
  },
  {
    id: "ocs",
    index: "05",
    eyebrow: "Órdenes de compra · Único en Chile",
    Icon: TrendingUp,
    title: (
      <>
        Te mostramos{" "}
        <span className="text-amber-400">qué pasó después</span> de adjudicar.
      </>
    ),
    body: "El módulo de OCs captura 35.500 órdenes con 40+ campos cada una. Vincula la OC a su licitación origen, expone calificación al proveedor y tiempo de cierre como proxy del comportamiento de pago.",
    bullets: [
      "35.500 OCs históricas + refresh diario",
      "Calificación al proveedor (PromedioCalificacion + CantidadEvaluacion)",
      "Tiempo de cierre como proxy de pago",
    ],
    Mock: TickerMock,
  },
  {
    id: "rls",
    index: "06",
    eyebrow: "Seguridad · RLS",
    Icon: Shield,
    title: (
      <>
        Cada tenant ve solo lo suyo.{" "}
        <span className="text-amber-400">Sin escape posible.</span>
      </>
    ),
    body: "Row Level Security a nivel Postgres significa que cada query es reescrita automáticamente con el filtro del tenant. Aislamiento garantizado en el motor de base de datos, no en código de aplicación.",
    bullets: [
      "Aislamiento a nivel motor BD, no aplicación",
      "Auditoría completa de cada acceso",
      "19 tablas mp_* con RLS habilitado",
    ],
    Mock: RLSMock,
  },
];

interface SectionProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
}

const FeatureSection = ({ feature, index, isActive, onActivate }: SectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActivate(index);
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onActivate]);

  const Icon = feature.Icon;

  return (
    <section
      ref={ref}
      className="min-h-[80vh] py-20 flex flex-col justify-center transition-all duration-500"
      style={{
        opacity: isActive ? 1 : 0.32,
        filter: isActive ? "blur(0)" : "blur(0.5px)",
      }}
    >
      <div className="relative">
        {/* Active accent rule — left edge */}
        <span
          className={`absolute -left-6 top-2 bottom-2 w-[2px] rounded-full transition-all duration-500 ${
            isActive ? "bg-amber-400 shadow-[0_0_16px_rgba(0,100,224,0.5)]" : "bg-transparent"
          }`}
        />

        <div className="flex items-center gap-3 mb-5">
          <div
            className={`h-10 w-10 grid place-items-center rounded-lg border transition-all duration-500 ${
              isActive
                ? "border-amber-400/40 bg-amber-400/[0.10]"
                : "border-[var(--hairline)] bg-ink-900/30"
            }`}
          >
            <Icon
              className={`h-[18px] w-[18px] transition-colors duration-500 ${
                isActive ? "text-amber-400" : "text-cream-300"
              }`}
              strokeWidth={1.6}
            />
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-400 font-medium">
            {feature.index} · {feature.eyebrow}
          </span>
        </div>
        <h3 className="font-display font-medium text-[36px] md:text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.035em] text-cream-50">
          {feature.title}
        </h3>
        <p className="mt-5 font-sans text-[16px] md:text-[17px] leading-[1.55] text-cream-200 max-w-[520px]">
          {feature.body}
        </p>
        <ul className="mt-7 space-y-2.5">
          {feature.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] text-cream-100">
              <span className="mt-2 h-1 w-1 rounded-full bg-amber-400 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default function FeaturesScrollytelling() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="capacidades"
      className="relative py-24 md:py-32 overflow-hidden bg-ink-950"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,100,224,0.04),_transparent_60%)]" />

      <div className="container-edge relative">
        {/* Section header */}
        <div className="text-center max-w-[780px] mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-amber-400/30 bg-amber-400/[0.06] rounded-full mb-6">
            <LiveDot size={7} />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400 font-medium">
              Capacidades · operando en producción
            </span>
          </div>
          <h2 className="font-display font-medium text-[44px] md:text-[68px] leading-[1] tracking-[-0.04em] text-cream-50">
            Seis capacidades.
            <br />
            <span className="text-cream-300">Una sola plataforma.</span>
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[18px] leading-[1.5] text-cream-200">
            Haz scroll. La pieza viva del producto a la derecha cambia con cada capacidad que lees a la izquierda.
          </p>
        </div>

        {/* Scrollytelling grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
          {/* Left: scrolling features */}
          <div className="lg:col-span-5">
            {features.map((f, i) => (
              <FeatureSection
                key={f.id}
                feature={f}
                index={i}
                isActive={i === active}
                onActivate={setActive}
              />
            ))}
          </div>

          {/* Right: sticky mock display — only active mock is rendered */}
          <div className="lg:col-span-7 hidden lg:block">
            <div className="sticky top-28">
              {/* Mock viewport */}
              <div className="relative h-[640px] rounded-2xl overflow-hidden shadow-[0_30px_100px_-30px_rgba(0,100,224,0.30),0_0_0_1px_rgba(10,10,10,0.06)] bg-white">
                {/* Active feature pill — top */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 bg-ink-950/95 backdrop-blur-sm border border-[var(--hairline)] rounded-full shadow-md">
                  <LiveDot size={6} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-400 font-medium">
                    {features[active].index} · {features[active].eyebrow}
                  </span>
                </div>

                {/* SINGLE active mock — keyed so React unmounts/remounts on change.
                    This eliminates simultaneous animations bleeding through. */}
                {(() => {
                  const Mock = features[active].Mock;
                  return (
                    <div
                      key={active}
                      className="absolute inset-0 animate-cinematic-fade-in"
                      style={{ willChange: "opacity, transform, filter" }}
                    >
                      <Mock />
                    </div>
                  );
                })()}

                {/* Counter — bottom right */}
                <div className="absolute bottom-5 right-5 z-20 px-3 py-1.5 bg-ink-950/95 backdrop-blur-sm border border-[var(--hairline)] rounded-full font-mono text-[10px] text-cream-300 shadow-md tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </div>

                {/* Progress dots — bottom left */}
                <div className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5">
                  {features.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 transition-all duration-500 rounded-full ${
                        i === active
                          ? "w-7 bg-amber-400"
                          : i < active
                          ? "w-1.5 bg-amber-400/40"
                          : "w-1.5 bg-cream-300/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Hint below the mock */}
              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-400">
                <span className="h-px w-8 bg-cream-300/30" />
                Haz scroll · el panel cambia con cada capacidad
                <span className="h-px w-8 bg-cream-300/30" />
              </div>
            </div>
          </div>

          {/* Mobile: stacked mocks under each feature (no sticky) */}
          <div className="lg:hidden col-span-full mt-8">
            {features.map((f) => {
              const Mock = f.Mock;
              return (
                <div key={f.id} className="mb-12 rounded-2xl overflow-hidden h-[420px] bg-white shadow-md border border-[var(--hairline)]">
                  <Mock />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
