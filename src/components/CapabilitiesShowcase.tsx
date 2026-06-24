import { useEffect, useRef, useState } from "react";
import {
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
  tag: string;
  title: string;
  body: string;
  Mock: React.ComponentType;
}

const features: Feature[] = [
  {
    id: "chat",
    tag: "Claude · bases",
    title: "Chat IA con bases técnicas",
    body: "Cada licitación tiene su hilo IA. Pregunta sobre acreditaciones, plazos, riesgos. Acceso al texto completo de las bases con persistencia por organización.",
    Mock: ChatMock,
  },
  {
    id: "detection",
    tag: "tiempo real",
    title: "Detección automática con IA",
    body: "El motor escanea ChileCompra en vivo, lee cada licitación nueva y la puntúa contra tu perfil. 6.062 licitaciones procesadas, 7 sobre umbral típicamente.",
    Mock: DetectionFeedMock,
  },
  {
    id: "ocs",
    tag: "único en Chile",
    title: "Órdenes de compra",
    body: "35.500 OCs catastradas con 40+ campos. Vincula OC ↔ licitación, calificación al proveedor, tiempo de cierre. Lo que ningún competidor te muestra.",
    Mock: OCsMock,
  },
  {
    id: "multi",
    tag: "RLS · Postgres",
    title: "Multi-organización",
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

        {/* Stage: clickable cards left + bento right */}
        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* LEFT — capability index (accordion) */}
          <div className="lg:col-span-4 flex flex-col self-start">
            {features.map((feat, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  aria-pressed={isActive}
                  className="group/row relative text-left border-t border-[var(--hairline)] last:border-b last:border-[var(--hairline)] py-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className={`font-display font-medium tracking-[-0.02em] transition-all duration-300 ${
                        isActive
                          ? "text-cream-50 text-[22px] md:text-[25px]"
                          : "text-cream-300 group-hover/row:text-cream-100 text-[18px] md:text-[20px]"
                      }`}
                    >
                      {feat.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-400 whitespace-nowrap flex-shrink-0 pt-1">
                      {feat.tag}
                    </span>
                  </div>

                  {/* Body reveals only on the active row */}
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans text-[14px] leading-[1.55] text-cream-200 max-w-[42ch]">
                        {feat.body}
                      </p>
                    </div>
                  </div>

                  {/* Autoplay progress — hairline under the active row */}
                  {isActive && (
                    <div className="absolute left-0 -bottom-px h-[2px] w-full bg-transparent overflow-hidden">
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
              {/* Context bar */}
              <div className="absolute top-0 inset-x-0 h-9 border-b border-[var(--hairline)] bg-ink-900/40 flex items-center justify-between px-4 z-10">
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
