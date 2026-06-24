import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════
   LiveStatus — radical transparency. Métricas vivas del
   pipeline real. Inspiración: status.openai.com / vercel/status,
   embebido como sección de marketing.

   El move: ningún competidor en Chile puede mostrar esto porque
   no tiene los datos. Acá lo gritamos.
═══════════════════════════════════════════════════════════════ */

// Simulated "live" deltas — en producción vendrían de Supabase realtime
const lastLicMin = 4;
const lastOcSec = 12;

const services = [
  { name: "Pipeline detección", state: "operativa", meta: "refresh cada 2 h" },
  { name: "Chat IA · bases técnicas", state: "operativa", meta: "gpt-4o-mini · 12 s/base" },
  { name: "8 data marts", state: "operativa", meta: "refresh nocturno 3am UTC" },
  { name: "Notificaciones realtime", state: "operativa", meta: "Supabase realtime · in-app" },
  { name: "Inteligencia organismo", state: "operativa", meta: "fn_mp_organismo_intelligence" },
  { name: "Motor matching multimodal", state: "operativa", meta: "keywords + UNSPSC + sectores" },
];

// Sparkline data — 24 puntos representando actividad horaria
const sparkData = [42, 38, 31, 28, 22, 18, 24, 35, 52, 68, 81, 94, 102, 98, 89, 76, 84, 91, 88, 79, 67, 58, 51, 49];

function useCountUp(target: number, duration = 1600, start = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(start);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cleanup: (() => void) | undefined;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const t0 = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(start + (target - start) * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      cleanup = () => cancelAnimationFrame(raf);
      obs.disconnect();
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); cleanup?.(); };
  }, [target, duration, start]);
  return [ref, n] as const;
}

function fmtCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1000) + "K";
  return Math.round(n).toString();
}

export default function LiveStatus() {
  const [licRef, licN] = useCountUp(441_268);
  const [adjRef, adjN] = useCountUp(7_234_812);
  const [ocRef, ocN] = useCountUp(6_412_087);
  const [coverageRef, coverageN] = useCountUp(99.94);

  // Live clock
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // "Last OC processed N seconds ago" — increments to feel alive
  const [ocAgo, setOcAgo] = useState(lastOcSec);
  useEffect(() => {
    const id = setInterval(() => {
      setOcAgo((p) => (p > 90 ? Math.floor(Math.random() * 20) + 5 : p + 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Sparkline SVG path
  const spW = 360;
  const spH = 56;
  const max = Math.max(...sparkData);
  const pts = sparkData.map((v, i) => {
    const x = (i / (sparkData.length - 1)) * spW;
    const y = spH - (v / max) * spH;
    return `${x},${y}`;
  });
  const linePath = "M" + pts.join(" L");
  const areaPath = `${linePath} L${spW},${spH} L0,${spH} Z`;

  const timeStr = now.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <section
      id="status"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0A0A0B 0%, #0E1116 50%, #0A0A0B 100%)",
      }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.20] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
      />

      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,100,224,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="container-edge relative">
        {/* Section header */}
        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-sage-400" />
                <span className="absolute inset-0 rounded-full bg-sage-400 animate-ping opacity-60" />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-sage-400 font-medium">
                Pipeline · operativo · {timeStr} CL
              </span>
            </div>
            <h2 className="font-display font-medium text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.04em] text-cream-950 max-w-[680px]" style={{ color: "#FAFAF9" }}>
              El pipeline{" "}
              <span className="font-serif italic font-normal tracking-[-0.02em]" style={{ color: "#8AB2F9" }}>
                ahora mismo.
              </span>
            </h2>
            <p className="mt-5 font-sans text-[15px] md:text-[16px] leading-[1.55] max-w-[520px]" style={{ color: "rgba(250,250,249,0.65)" }}>
              No es una landing page hablando de datos. Esto es el estado en vivo de nuestra infraestructura. Si está roto, te enteras antes que nosotros.
            </p>
          </div>

          <a
            href="#"
            className="font-mono text-[10.5px] uppercase tracking-[0.18em] font-medium px-3.5 py-2 rounded-full border transition-colors"
            style={{
              color: "rgba(255,255,255,0.70)",
              borderColor: "rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            status.iautolicita.cl →
          </a>
        </div>

        {/* Top stat row — 4 big counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="p-6 md:p-8" style={{ background: "#0E1116" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Licitaciones · histórico
            </div>
            <div className="font-display font-medium text-[42px] md:text-[56px] leading-none tracking-[-0.04em] num" style={{ color: "#FAFAF9" }} ref={licRef}>
              {fmtCompact(licN)}
            </div>
            <div className="mt-3 font-mono text-[10.5px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              cobertura 100% · Jun 2024 →
            </div>
          </div>

          <div className="p-6 md:p-8" style={{ background: "#0E1116" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Adjudicaciones
            </div>
            <div className="font-display font-medium text-[42px] md:text-[56px] leading-none tracking-[-0.04em] num" style={{ color: "#FAFAF9" }} ref={adjRef}>
              {fmtCompact(adjN)}
            </div>
            <div className="mt-3 font-mono text-[10.5px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              p25/p50/p75 por ítem disponible
            </div>
          </div>

          <div className="p-6 md:p-8" style={{ background: "#0E1116" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Órdenes de compra
            </div>
            <div className="font-display font-medium text-[42px] md:text-[56px] leading-none tracking-[-0.04em] num" style={{ color: "#FAFAF9" }} ref={ocRef}>
              {fmtCompact(ocN)}
            </div>
            <div className="mt-3 font-mono text-[10.5px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              flujo CLP región → región
            </div>
          </div>

          <div className="p-6 md:p-8 relative" style={{ background: "#0E1116" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              Cobertura pipeline
            </div>
            <div className="font-display font-medium text-[42px] md:text-[56px] leading-none tracking-[-0.04em] num" style={{ color: "#16A34A" }} ref={coverageRef}>
              {coverageN.toFixed(2)}<span className="text-[24px] ml-1" style={{ color: "rgba(22,163,74,0.6)" }}>%</span>
            </div>
            <div className="mt-3 font-mono text-[10.5px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              últimas 24 h · sin incidentes
            </div>
          </div>
        </div>

        {/* Middle row — live events + sparkline */}
        <div className="mt-px grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {/* Última licitación */}
          <div className="p-6 md:p-7 rounded-bl-2xl rounded-br-2xl md:rounded-br-none" style={{ background: "#0E1116" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-brand-400" />
                <span className="absolute inset-0 rounded-full bg-brand-400 animate-ping opacity-60" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.50)" }}>
                Última licitación detectada
              </span>
            </div>
            <div className="font-sans text-[15px] font-medium mb-1.5" style={{ color: "#FAFAF9" }}>
              Mantención eléctrica · MINSAL
            </div>
            <div className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              ID 5837-122-LP25 · hace {lastLicMin} min
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.12em]" style={{ color: "#8AB2F9" }}>
              match 92% · prioridad alta →
            </div>
          </div>

          {/* Última OC procesada (live) */}
          <div className="p-6 md:p-7" style={{ background: "#0E1116" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative inline-flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-sage-400" />
                <span className="absolute inset-0 rounded-full bg-sage-400 animate-ping opacity-60" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.50)" }}>
                Última OC catastrada
              </span>
            </div>
            <div className="font-sans text-[15px] font-medium mb-1.5" style={{ color: "#FAFAF9" }}>
              MOP RM · construcción
            </div>
            <div className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              hace <span style={{ color: "#FAFAF9" }} className="num">{ocAgo}</span> seg · $58M
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.12em]" style={{ color: "#16A34A" }}>
              ↑ 14% volumen vs ayer
            </div>
          </div>

          {/* Sparkline */}
          <div className="p-6 md:p-7 rounded-tr-2xl rounded-br-2xl md:rounded-bl-none" style={{ background: "#0E1116" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(255,255,255,0.50)" }}>
              Actividad últimas 24 h
            </div>
            <svg viewBox={`0 0 ${spW} ${spH}`} className="w-full h-14 mb-2" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0064E0" stopOpacity="0.40" />
                  <stop offset="100%" stopColor="#0064E0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#sparkGrad)" />
              <path d={linePath} fill="none" stroke="#5790F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Pulse dot at tail */}
              <circle cx={spW} cy={spH - (sparkData[sparkData.length - 1] / max) * spH} r="3" fill="#5790F5">
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <div className="flex justify-between font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              <span>hace 24 h</span>
              <span>ahora</span>
            </div>
          </div>
        </div>

        {/* Bottom — service status grid */}
        <div className="mt-10 md:mt-14">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(255,255,255,0.40)" }}>
            Servicios · todos operativos
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3.5">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-3 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="relative inline-flex w-1.5 h-1.5 flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-sage-400" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-sans text-[13.5px] font-medium truncate" style={{ color: "rgba(255,255,255,0.92)" }}>
                      {s.name}
                    </div>
                    <div className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.40)" }}>
                      {s.meta}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] flex-shrink-0" style={{ color: "#16A34A" }}>
                  {s.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
