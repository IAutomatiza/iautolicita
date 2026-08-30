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
} from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";
import LiveDot from "./ui/LiveDot";
import useInView from "../hooks/useInView";

/* ────────────────────────────────────────────────────────────
   Animated visual mocks — each one dominates its card,
   plays continuously without hover, and feels real.
─────────────────────────────────────────────────────────────── */

// ════════ 1. Live sync feed — items stream in continuously ════════
const SyncFeedMock = () => {
  const items = [
    { org: "MINSAL", lic: "Insumos clínicos especializados", t: "ahora", score: 92 },
    { org: "MOP", lic: "Estudio de carga vial CH-225", t: "2m", score: 84 },
    { org: "JUNAEB", lic: "Auditoría programa PAE", t: "5m", score: 71 },
    { org: "DGAC", lic: "Mantención sistemas radar", t: "9m", score: 88 },
    { org: "SERVIU", lic: "Inspección obras Maule", t: "13m", score: 64 },
    { org: "CONAF", lic: "Servicios prevención forestal", t: "17m", score: 86 },
    { org: "JUNJI", lic: "Equipamiento jardines RM", t: "22m", score: 79 },
  ];

  return (
    <div className="relative h-[280px] overflow-hidden">
      {/* Top fade mask */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/60 to-transparent z-10 pointer-events-none" />

      <div className="space-y-2 animate-scroll-y">
        {[...items, ...items].map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3.5 py-2.5 border border-cream-300/40 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm"
          >
            <span
              className={`num font-display font-semibold text-[18px] leading-none flex-shrink-0 w-7 ${
                it.score >= 85 ? "text-amber-400" : "text-cream-100"
              }`}
            >
              {it.score}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-cream-300">
                {it.org}
              </div>
              <div className="font-sans text-[12px] text-cream-100 truncate leading-tight mt-0.5">
                {it.lic}
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft" />
              <span className="font-mono text-[9.5px] text-cream-300">{it.t}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ════════ 2. AI Radar Sweep — sonar scanning licitaciones ════════
const RadarSweepMock = () => {
  // 14 licitaciones distribuidas en diferentes ángulos y radios
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

  const SIZE = 280;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = SIZE / 2 - 8;
  const SWEEP_DURATION = 5; // seconds for full rotation

  // currently highlighted org based on time → angle
  const [highlight, setHighlight] = useState<{
    org: string;
    score: number;
  } | null>(null);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = ((now - start) / 1000) % SWEEP_DURATION;
      const sweepAngle = (elapsed / SWEEP_DURATION) * 360;
      // find point whose angle is within ±10° of the sweep
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
    <div className="relative h-[300px] flex items-center justify-center">
      {/* Side stats — left */}
      <div className="absolute left-0 top-0 space-y-2 z-10">
        <div>
          <div className="num font-display font-medium text-[42px] md:text-[52px] leading-none tracking-[-0.04em] text-cream-50">
            73<span className="text-amber-400">.4</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream-300 mt-1">
            score promedio
          </div>
        </div>
        <div className="pt-3 mt-3 border-t border-[var(--hairline)] space-y-1.5">
          <div className="flex items-center gap-2 text-[10.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="font-mono text-amber-400">7 sobre 80 pts</span>
          </div>
          <div className="flex items-center gap-2 text-[10.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
            <span className="font-mono text-cream-200">14 entre 60-80</span>
          </div>
          <div className="flex items-center gap-2 text-[10.5px]">
            <span className="h-1.5 w-1.5 rounded-full bg-cream-300" />
            <span className="font-mono text-cream-300">21 bajo umbral</span>
          </div>
        </div>
      </div>

      {/* Right side — current scan readout */}
      <div className="absolute right-0 top-0 z-10">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full mb-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50 animate-pulse-soft" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-amber-400 font-medium">
            scanning · IA
          </span>
        </div>

        {highlight && (
          <div className="bg-white border border-amber-400/40 rounded-lg p-2.5 shadow-lg shadow-amber-400/10 min-w-[140px] animate-[fadeUp_0.3s_ease-out]">
            <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-cream-300">
              MATCH detectado
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="num font-display font-medium text-[26px] leading-none text-amber-400">
                {highlight.score}
              </span>
              <span className="font-mono text-[10px] text-cream-200 truncate">
                {highlight.org}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Radar SVG */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-[280px] w-[280px]"
      >
        <defs>
          {/* Sweep beam gradient — fades from solid to transparent */}
          <radialGradient id="sweep-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0064E0" stopOpacity="0.0" />
            <stop offset="60%" stopColor="#0064E0" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#0064E0" stopOpacity="0.45" />
          </radialGradient>
          <linearGradient id="ring-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0064E0" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0064E0" stopOpacity="0.04" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0064E0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
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

        {/* Crosshair lines */}
        <line x1={CX - R} y1={CY} x2={CX + R} y2={CY} stroke="rgba(0,100,224,0.12)" strokeWidth="1" />
        <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="rgba(0,100,224,0.12)" strokeWidth="1" />

        {/* Center core glow */}
        <circle cx={CX} cy={CY} r={28} fill="url(#core-glow)" />

        {/* Sweep wedge — rotates continuously */}
        <g
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: `radarSpin ${SWEEP_DURATION}s linear infinite`,
          }}
        >
          {/* Wedge: 60° pie slice with gradient */}
          <path
            d={`
              M ${CX} ${CY}
              L ${CX} ${CY - R}
              A ${R} ${R} 0 0 1 ${CX + R * Math.sin((Math.PI / 180) * 45)} ${CY - R * Math.cos((Math.PI / 180) * 45)}
              Z
            `}
            fill="url(#sweep-grad)"
          />
          {/* Solid leading edge */}
          <line x1={CX} y1={CY} x2={CX} y2={CY - R} stroke="#0064E0" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* Points */}
        {points.map((p, i) => {
          const [x, y] = polar(p.angle, R * p.radius);
          const isHigh = p.score >= 85;
          // each point pulses once per sweep cycle, delayed by its angular position
          const delay = (p.angle / 360) * SWEEP_DURATION;
          return (
            <g key={i}>
              {/* base dot */}
              <circle
                cx={x}
                cy={y}
                r={isHigh ? 3.5 : 2.5}
                fill={isHigh ? "#0064E0" : p.score >= 70 ? "#0064E0" : "rgba(143,151,171,0.6)"}
                opacity={isHigh ? 1 : p.score >= 70 ? 0.65 : 0.4}
              />
              {/* pulse ring synced to sweep */}
              <circle
                cx={x}
                cy={y}
                r={isHigh ? 3.5 : 2.5}
                fill="none"
                stroke={isHigh ? "#0064E0" : "#0064E0"}
                strokeWidth="1.5"
                opacity="0"
                style={{
                  animation: `radarPing ${SWEEP_DURATION}s linear infinite`,
                  animationDelay: `${delay}s`,
                  transformOrigin: `${x}px ${y}px`,
                }}
              />
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={CX} cy={CY} r={3} fill="#0064E0" />
        <circle cx={CX} cy={CY} r={3} fill="#0064E0" opacity="0.4">
          <animate attributeName="r" values="3;9;3" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Local keyframes */}
      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes radarPing {
          0%, 92% { opacity: 0; transform: scale(1); }
          93% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(3.5); }
        }
      `}</style>
    </div>
  );
};

// ════════ 3. Notification stack — always rotating ════════
const NotificationStackMock = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 2200);
    return () => clearInterval(t);
  }, []);
  const notifications = [
    { Icon: MessageCircle, ch: "WhatsApp", title: "Nueva oportunidad · MINSAL", sub: "Score 92 · revisar antes de 16-may", color: "sage" },
    { Icon: Mail, ch: "Email", title: "Reporte diario · 42 detectadas", sub: "7 sobre umbral 80 pts", color: "brand" },
    { Icon: Send, ch: "Telegram", title: "OC adjudicada a la competencia", sub: "MOP · Vial Sur Ltda · M$ 78.240", color: "amber" },
    { Icon: Bell, ch: "In-app", title: "@felipe te asignó tarea", sub: "Postular Lic. 1057-887-LP25", color: "cream" },
  ];

  return (
    <div className="relative h-[200px]">
      {notifications.map((n, i) => {
        const Icon = n.Icon;
        const offset = (i - active + 4) % 4;
        return (
          <div
            key={i}
            className="absolute left-0 right-0 transition-all duration-700 ease-out"
            style={{
              top: `${offset * 8}px`,
              transform: `scale(${1 - offset * 0.04})`,
              opacity: offset === 0 ? 1 : 0.45 - offset * 0.12,
              zIndex: 10 - offset,
            }}
          >
            <div
              className={`px-4 py-3 rounded-xl border shadow-lg ${
                offset === 0
                  ? "bg-white border-amber-400/60 shadow-amber-400/10"
                  : "bg-white/80 border-cream-300/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`h-9 w-9 grid place-items-center rounded-lg flex-shrink-0 ${
                    offset === 0 ? "bg-amber-400/15" : "bg-cream-50/60"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      offset === 0 ? "text-amber-400" : "text-cream-200"
                    }`}
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-cream-300">
                    {n.ch}
                  </div>
                  <div className="font-sans text-[13px] font-medium text-cream-50 truncate leading-tight mt-0.5">
                    {n.title}
                  </div>
                  <div className="font-sans text-[11.5px] text-cream-200 truncate mt-0.5">
                    {n.sub}
                  </div>
                </div>
                {offset === 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-soft mt-2 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ════════ 4. Multi-org with constant pulsing beams ════════
const MultiOrgBeamMock = () => (
  <div className="relative h-[200px]">
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0064E0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hub glow */}
      <circle cx="160" cy="36" r="40" fill="url(#hub-glow)" />

      {/* Connection lines */}
      <path d="M 160 42 Q 110 80 60 138" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M 160 42 L 160 138" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M 160 42 Q 210 80 260 138" stroke="rgba(0,100,224,0.2)" strokeWidth="1.5" fill="none" />

      {/* Hub */}
      <circle cx="160" cy="38" r="6" fill="#0064E0" />
      <circle cx="160" cy="38" r="6" fill="#0064E0" opacity="0.4">
        <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Animated traveling beams */}
      {[
        { d: "M 160 42 Q 110 80 60 138", delay: "0s" },
        { d: "M 160 42 L 160 138", delay: "0.7s" },
        { d: "M 160 42 Q 210 80 260 138", delay: "1.4s" },
      ].map((p, i) => (
        <g key={i}>
          <circle r="3" fill="#0064E0">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.delay} path={p.d} />
          </circle>
          <circle r="6" fill="#0064E0" opacity="0.3">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={p.delay} path={p.d} />
          </circle>
        </g>
      ))}

      {/* Endpoint dots */}
      <circle cx="60" cy="138" r="4" fill="#0064E0" />
      <circle cx="160" cy="138" r="4" fill="#0064E0" />
      <circle cx="260" cy="138" r="4" fill="#0064E0" />
    </svg>

    {/* Hub label */}
    <div className="absolute left-1/2 top-3 -translate-x-1/2 px-3 py-1.5 bg-white border border-amber-400/40 rounded-full font-mono text-[9.5px] uppercase tracking-[0.18em] text-amber-400 shadow-sm shadow-amber-400/10">
      cuenta principal
    </div>

    {/* Org cards */}
    <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 gap-2.5">
      {[
        { name: "Andina", lic: 12 },
        { name: "Etcheverry", lic: 28 },
        { name: "Distrib. Sur", lic: 17 },
      ].map((o) => (
        <div
          key={o.name}
          className="bg-white border border-cream-300/40 rounded-lg px-2.5 py-2 text-center shadow-sm"
        >
          <div className="font-sans font-medium text-[11px] text-cream-50 truncate">
            {o.name}
          </div>
          <div className="num font-mono text-[10px] text-amber-400 mt-0.5">
            {o.lic} lic.
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ════════ 5. Number ticker with continuous sparkline draw ════════
const TickerMock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [drawProgress, setDrawProgress] = useState(0);

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

  // Continuous sparkline animation
  useEffect(() => {
    let raf = 0;
    const animate = () => {
      setDrawProgress((p) => (p + 0.005) % 1.4);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const points = [22, 26, 31, 28, 35, 33, 41, 38, 44, 50, 56, 62, 70, 78, 85, 88];
  const pathLen = 100;
  const visiblePts = Math.min(points.length, Math.floor(drawProgress * points.length));

  return (
    <div ref={ref} className="relative h-[200px] flex flex-col justify-between">
      <div>
        <div className="num font-display font-medium text-[68px] md:text-[80px] leading-none tracking-[-0.045em] text-cream-50">
          {n.toLocaleString("es-CL")}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300">
            órdenes de compra
          </span>
          <span className="px-1.5 py-0.5 bg-amber-400/15 border border-amber-400/30 rounded font-mono text-[9px] uppercase tracking-[0.14em] text-amber-400">
            +14% mes
          </span>
        </div>
      </div>

      <div className="relative h-[68px]">
        <svg viewBox={`0 0 ${pathLen} 40`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spk-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0064E0" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Background grid lines */}
          {[0, 10, 20, 30].map((y) => (
            <line key={y} x1="0" y1={y} x2={pathLen} y2={y} stroke="rgba(10,10,10,0.04)" strokeWidth="0.5" />
          ))}
          {/* Filled area */}
          <path
            d={`M 0 ${40 - (points[0] / 100) * 38} ${points
              .slice(0, visiblePts + 1)
              .map(
                (v, i) =>
                  `L ${(i / (points.length - 1)) * pathLen} ${40 - (v / 100) * 38}`
              )
              .join(" ")} L ${(visiblePts / (points.length - 1)) * pathLen} 40 L 0 40 Z`}
            fill="url(#spk-fill)"
          />
          {/* Line */}
          <path
            d={`M 0 ${40 - (points[0] / 100) * 38} ${points
              .slice(0, visiblePts + 1)
              .map(
                (v, i) =>
                  `L ${(i / (points.length - 1)) * pathLen} ${40 - (v / 100) * 38}`
              )
              .join(" ")}`}
            fill="none"
            stroke="#0064E0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Pulse dot at the leading edge */}
          {visiblePts > 0 && visiblePts < points.length && (
            <g>
              <circle
                cx={(visiblePts / (points.length - 1)) * pathLen}
                cy={40 - (points[visiblePts] / 100) * 38}
                r="2.4"
                fill="#0064E0"
              />
              <circle
                cx={(visiblePts / (points.length - 1)) * pathLen}
                cy={40 - (points[visiblePts] / 100) * 38}
                r="5"
                fill="#0064E0"
                opacity="0.3"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

// ════════ 6. RLS query with rotating tenant + glow ════════
const RLSMock = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % 3), 1900);
    return () => clearInterval(t);
  }, []);
  const tenants = [
    { name: "Consultora Andina", id: "a3d7…f201", color: "amber" },
    { name: "Lab. Etcheverry", id: "b9e2…c054", color: "brand" },
    { name: "Distribuidora Sur", id: "c1f8…9a3b", color: "sage" },
  ];
  const tenant = tenants[idx];

  return (
    <div className="relative h-[200px] flex flex-col justify-center">
      <div className="border border-[var(--hairline-strong)] rounded-xl bg-cream-50/40 backdrop-blur-sm overflow-hidden shadow-sm">
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--hairline)] bg-white">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-amber-400" strokeWidth={2} />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-400">
              row-level security
            </span>
          </div>
          <span className="font-mono text-[9px] text-cream-300">postgres</span>
        </div>

        {/* Code */}
        <div className="p-4 font-mono text-[11.5px] leading-[1.65] tabular-nums">
          <div className="text-cream-300">— request from</div>
          <div className="text-cream-100">
            tenant: <span className="text-amber-400 font-medium transition-colors duration-500">{tenant.name}</span>
          </div>
          <div className="text-cream-300 mt-2">— generated query</div>
          <div className="text-cream-50">
            <span className="text-cream-300">SELECT</span> <span className="text-cream-100">*</span> <span className="text-cream-300">FROM</span> <span className="text-amber-400">mp_licitaciones</span>
          </div>
          <div className="text-cream-50">
            <span className="text-cream-300">WHERE</span>{" "}
            <span className="text-cream-100">org_id</span>{" "}
            <span className="text-cream-300">=</span>{" "}
            <span className="text-amber-400 transition-colors duration-500">'{tenant.id}'</span>
            <span className="inline-block w-[6px] h-[12px] bg-amber-400 ml-0.5 align-middle animate-blink" />
          </div>
        </div>
      </div>

      {/* Tenant indicator dots below */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5">
        {tenants.map((_, i) => (
          <span
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === idx ? "w-6 bg-amber-400" : "w-1 bg-cream-300/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   The bento section — rich cards w/ gradients + glow
─────────────────────────────────────────────────────────────── */

interface CardProps {
  title: string;
  body: string;
  Icon: typeof Radar;
  className?: string;
  tone?: "blue" | "amber" | "sage" | "neutral";
  index?: number;
  children: React.ReactNode;
}

const toneStyles = {
  blue: {
    bg: "bg-[radial-gradient(ellipse_at_top_left,_rgba(0,100,224,0.10),_transparent_70%)]",
    iconBg: "bg-amber-400/[0.08]",
    iconColor: "text-amber-400",
    iconBorder: "border-amber-400/25",
  },
  amber: {
    bg: "bg-[radial-gradient(ellipse_at_top_right,_rgba(0,100,224,0.12),_transparent_70%)]",
    iconBg: "bg-amber-400/10",
    iconColor: "text-amber-400",
    iconBorder: "border-amber-400/30",
  },
  sage: {
    bg: "bg-[radial-gradient(ellipse_at_bottom_left,_rgba(22,163,74,0.08),_transparent_70%)]",
    iconBg: "bg-sage-400/10",
    iconColor: "text-sage-400",
    iconBorder: "border-sage-400/30",
  },
  neutral: {
    bg: "bg-gradient-to-br from-white to-cream-50/40",
    iconBg: "bg-cream-50/60",
    iconColor: "text-cream-100",
    iconBorder: "border-cream-300/30",
  },
};

const Card = ({ title, body, Icon, className = "", tone = "blue", index = 0, children }: CardProps) => {
  const t = toneStyles[tone];
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const delay = index * 90; // ms — stagger across the bento

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(32px) scale(0.96)",
        filter: inView ? "blur(0)" : "blur(8px)",
        transition:
          `opacity 0.7s ease-out ${delay}ms,` +
          ` transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,` +
          ` filter 0.7s ease-out ${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      <SpotlightCard
        className={`group relative border border-[var(--hairline-strong)] rounded-2xl bg-white ${t.bg} shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_4px_20px_-8px_rgba(10,10,10,0.06)] hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_24px_48px_-20px_rgba(0,100,224,0.18)] hover:border-amber-400/40 transition-all duration-300 h-full`}
        spotlightColor="rgba(0,100,224,0.08)"
      >
        <div className="p-7 md:p-8 flex flex-col h-full min-h-[420px]">
          <div className="flex items-center gap-3 mb-3">
            <div className={`h-10 w-10 grid place-items-center rounded-lg border ${t.iconBg} ${t.iconBorder}`}>
              <Icon className={`h-[18px] w-[18px] ${t.iconColor}`} strokeWidth={1.6} />
            </div>
          </div>
          <h3 className="font-display font-medium text-[22px] md:text-[26px] leading-[1.1] tracking-[-0.025em] text-cream-50">
            {title}
          </h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.55] text-cream-200 max-w-[440px]">
            {body}
          </p>
          <div className="mt-7 flex-1 min-h-0 flex flex-col justify-end">{children}</div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default function KeyFeatures() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Section atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,100,224,0.04),_transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hairline-strong)] to-transparent" />

      <div className="container-edge relative">
        <div className="text-center max-w-[760px] mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-amber-400/25 bg-amber-400/[0.05] rounded-full mb-6">
            <LiveDot size={7} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-400 font-medium">
              Key features
            </span>
          </div>
          <h2 className="font-display font-medium text-[44px] md:text-[68px] leading-[1] tracking-[-0.04em] text-cream-50">
            Seis capacidades.
            <br />
            <span className="text-cream-300">Operando en vivo.</span>
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[18px] leading-[1.5] text-cream-200">
            No son screenshots estáticos. Cada card abajo es una pieza viva del producto que se mueve sola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <Card
            index={0}
            Icon={Radar}
            title="Sync en vivo con Mercado Público"
            body="13 workflows ingestan licitaciones nuevas. Captura completa de campos vía API oficial."
            tone="amber"
          >
            <SyncFeedMock />
          </Card>

          <Card
            index={1}
            Icon={Brain}
            title="Score IA · matching automático"
            body="Cada licitación nueva se puntúa contra tu perfil. El motor escanea 6.062 licitaciones en vivo."
            className="md:col-span-2"
            tone="blue"
          >
            <RadarSweepMock />
          </Card>

          <Card
            index={2}
            Icon={Bell}
            title="Notificaciones multi-canal"
            body="WhatsApp, email, Telegram e in-app. Configurable por organización y tipo de evento."
            className="md:col-span-2"
            tone="amber"
          >
            <NotificationStackMock />
          </Card>

          <Card
            index={3}
            Icon={Network}
            title="Multi-organización"
            body="Una cuenta, varias razones sociales. Routing automático según matching."
            tone="blue"
          >
            <MultiOrgBeamMock />
          </Card>

          <Card
            index={4}
            Icon={TrendingUp}
            title="Órdenes de compra activas"
            body="Catastradas con 40+ campos cada una. Único en el mercado chileno."
            tone="amber"
          >
            <TickerMock />
          </Card>

          <Card
            index={5}
            Icon={Shield}
            title="Aislamiento de datos · RLS"
            body="Row Level Security a nivel Postgres. Cada tenant ve sólo lo suyo."
            className="md:col-span-2"
            tone="sage"
          >
            <RLSMock />
          </Card>
        </div>
      </div>
    </section>
  );
}
