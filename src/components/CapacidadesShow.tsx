import type { ComponentType } from "react";
import { CalendarClock, ShieldCheck, FileWarning, FileText } from "lucide-react";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Capacidades de Lici con viñetas de producto — reemplaza la
   lista 001–005 de puro texto: cada capacidad va acompañada de
   una mini-interfaz real (score de calce, histograma de precios,
   cita con página, competencia, alertas) para que la sección
   muestre el producto en vez de describirlo.

   Todo es SVG/CSS propio, sin dependencias. Las animaciones son
   transiciones de transform/stroke que solo corren al entrar en
   vista (useInView) y quedan quietas con prefers-reduced-motion
   (la base ya es el estado final cuando `activo` es true).
═══════════════════════════════════════════════════════════════ */

type VisorProps = { activo: boolean };

/* ── 001 · Radar: una licitación recién publicada con su score ── */

const CIRC = 2 * Math.PI * 34;

const VisorScore = ({ activo }: VisorProps) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0A101B] p-5 md:p-6">
    <div className="flex items-start justify-between gap-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#55b4f8] opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#55b4f8]" />
          </span>
          Publicada hace 4 min
        </div>
        <div className="mt-2 font-sans text-[14px] text-white/85">
          4886-33-LR26 · Suministro de equipos TI
        </div>
        <div className="mt-1 font-mono text-[11px] text-white/40">
          Municipalidad de Renca · $84,5M
        </div>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {["Rubro", "Monto", "Región", "Historial"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#55b4f8]/25 bg-[#55b4f8]/[0.08] px-2 py-0.5 font-mono text-[10px] text-[#55b4f8]"
            >
              {t} ✓
            </span>
          ))}
        </div>
      </div>
      <div className="relative shrink-0">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <circle
            cx="48"
            cy="48"
            r="34"
            fill="none"
            stroke="#55b4f8"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={activo ? CIRC * (1 - 0.87) : CIRC * 0.97}
            transform="rotate(-90 48 48)"
            style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) 0.15s" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="font-display font-semibold text-[22px] leading-none text-white">
              87
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
              calce
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── 002 · Precio: histograma de OC con la mediana marcada ── */

const BARRAS = [16, 28, 44, 72, 100, 82, 56, 36, 22, 12];
const MEDIANA = 4; // índice de la barra donde cae la mediana

const VisorPrecio = ({ activo }: VisorProps) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0A101B] p-5 md:p-6">
    <div className="flex items-baseline justify-between gap-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
        Notebooks corporativos · 12.847 OC
      </div>
      <div className="font-mono text-[10px] text-white/30">2025</div>
    </div>
    <div className="mt-5 flex h-24 items-end gap-1.5">
      {BARRAS.map((h, i) => (
        <div key={i} className="relative flex-1 h-full">
          <div
            className={`w-full rounded-t-[3px] origin-bottom ${
              i === MEDIANA ? "bg-[#55b4f8]" : "bg-white/[0.14]"
            }`}
            style={{
              height: `${h}%`,
              minHeight: 3,
              transform: activo ? "scaleY(1)" : "scaleY(0.05)",
              transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
              position: "absolute",
              bottom: 0,
            }}
          />
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10.5px]">
      <span className="text-white/35">p25 $389.000</span>
      <span className="inline-flex items-center gap-1.5 text-[#55b4f8]">
        <span className="h-2 w-2 rounded-[2px] bg-[#55b4f8]" />
        mediana $487.320
      </span>
      <span className="text-white/35">p75 $612.000</span>
    </div>
  </div>
);

/* ── 003 · Citas: respuesta con la fuente a la página exacta ── */

const VisorCita = ({ activo }: VisorProps) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0A101B] p-5 md:p-6">
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
      <svg width="13" height="13" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="6" y="13" width="2.6" height="6" rx="1.3" fill="#2a4a66" />
        <rect x="10.8" y="9" width="2.6" height="14" rx="1.3" fill="#55b4f8" />
        <rect x="15.6" y="5.5" width="2.6" height="21" rx="1.3" fill="#55b4f8" />
        <rect x="20.4" y="9" width="2.6" height="14" rx="1.3" fill="#55b4f8" />
        <rect x="25.2" y="13" width="2.6" height="6" rx="1.3" fill="#2a4a66" />
      </svg>
      Respuesta de Lici
    </div>
    <p className="mt-3.5 font-sans text-[14px] leading-[1.7] text-white/75">
      La garantía de seriedad debe emitirse por el{" "}
      <span className="rounded bg-[#55b4f8]/[0.16] px-1 py-0.5 text-white">
        10% del monto ofertado
      </span>{" "}
      con una vigencia mínima de 90 días desde la apertura.
    </p>
    <div
      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2"
      style={{
        opacity: activo ? 1 : 0,
        transform: activo ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.6s ease 0.5s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s",
      }}
    >
      <FileText className="h-3.5 w-3.5 text-[#55b4f8]" strokeWidth={1.8} />
      <span className="font-mono text-[11px] text-white/60">
        Bases administrativas · pág. 47 · sección 8.3
      </span>
    </div>
  </div>
);

/* ── 004 · Competencia: quién adjudica en el rubro ── */

const COMPETIDORES = [
  { n: "Comercial Médica SpA", p: 34 },
  { n: "HealthSupply Ltda", p: 21 },
  { n: "MediTech Chile", p: 14 },
  { n: "Tu empresa", p: 7, propia: true },
];

const VisorCompetencia = ({ activo }: VisorProps) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0A101B] p-5 md:p-6">
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
      Adjudicaciones MINSAL · últimos 12 meses
    </div>
    <div className="mt-4 space-y-3">
      {COMPETIDORES.map((c, i) => (
        <div key={c.n}>
          <div className="flex items-baseline justify-between font-mono text-[11px]">
            <span className={c.propia ? "text-[#55b4f8]" : "text-white/55"}>{c.n}</span>
            <span className={c.propia ? "text-[#55b4f8]" : "text-white/35"}>{c.p}%</span>
          </div>
          <div className="mt-1.5 h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full rounded-full ${c.propia ? "bg-[#55b4f8]" : "bg-white/[0.22]"}`}
              style={{
                width: activo ? `${c.p * 2.6}%` : "0%",
                transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.1}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 font-mono text-[10.5px] text-white/35">
      847 licitaciones del rubro analizadas
    </div>
  </div>
);

/* ── 005 · Alertas: lo que vence, avisado con ventaja ── */

const ALERTAS = [
  {
    Icon: CalendarClock,
    color: "#f59e0b",
    texto: "Cierre 27 de agosto",
    chip: "quedan 6 días",
  },
  {
    Icon: ShieldCheck,
    color: "#55b4f8",
    texto: "Boleta de garantía: 10% del monto",
    chip: "vigencia 90 días",
  },
  {
    Icon: FileWarning,
    color: "#f87171",
    texto: "Anexo N°5 obligatorio",
    chip: "falta cargarlo",
  },
];

const VisorAlertas = ({ activo }: VisorProps) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0A101B] p-5 md:p-6">
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
      4886-33-LR26 · Vigilancia activa
    </div>
    <div className="mt-4 space-y-2.5">
      {ALERTAS.map((a, i) => (
        <div
          key={a.texto}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3"
          style={{
            opacity: activo ? 1 : 0,
            transform: activo ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.55s ease ${0.15 + i * 0.14}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.14}s`,
          }}
        >
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
            style={{ backgroundColor: `${a.color}1f` }}
          >
            <a.Icon className="h-4 w-4" style={{ color: a.color }} strokeWidth={1.8} />
          </span>
          <span className="flex-1 font-sans text-[13px] text-white/70">{a.texto}</span>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px]"
            style={{ backgroundColor: `${a.color}1a`, color: a.color }}
          >
            {a.chip}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Las cinco filas: texto + viñeta, alternadas ── */

const FILAS: {
  n: string;
  t: string;
  d: string;
  Visor: ComponentType<VisorProps>;
}[] = [
  {
    n: "001",
    t: "Radar con score de calce",
    d: "Cada licitación nueva se puntúa 0–100 contra tu perfil apenas se publica. Las que calzan llegan solas; el resto ni lo ves.",
    Visor: VisorScore,
  },
  {
    n: "002",
    t: "El precio real, ítem por ítem",
    d: "Lo que el Estado efectivamente pagó por lo mismo, calculado sobre 6,4 millones de órdenes de compra. Ofertas sabiendo dónde está la mediana.",
    Visor: VisorPrecio,
  },
  {
    n: "003",
    t: "Citas a la página exacta",
    d: "Cada respuesta trae su fuente: página, sección y texto original de las bases. Nada que confiar a ciegas — todo verificable.",
    Visor: VisorCita,
  },
  {
    n: "004",
    t: "Competencia mapeada",
    d: "Quién gana en tu rubro, con qué precios y ante qué organismos. La cancha completa antes de entrar a jugar.",
    Visor: VisorCompetencia,
  },
  {
    n: "005",
    t: "Alertas antes del cierre",
    d: "Fechas, riesgos y documentos exigidos, avisados con días de ventaja. Ninguna se cierra sin que lo sepas.",
    Visor: VisorAlertas,
  },
];

function Fila({
  n,
  t,
  d,
  Visor,
  invertida,
}: (typeof FILAS)[number] & { invertida: boolean }) {
  const [ref, activo] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16 items-center">
      <div className={invertida ? "md:order-2" : ""}>
        <div className="font-mono text-[13px] uppercase tracking-[0.12em] text-white">
          {n} / {t}
        </div>
        <p className="mt-3 font-sans text-[14.5px] leading-[1.65] text-white/55 max-w-[420px]">
          {d}
        </p>
      </div>
      <div className={invertida ? "md:order-1" : ""}>
        <Visor activo={activo} />
      </div>
    </div>
  );
}

export default function CapacidadesShow() {
  return (
    <div className="mt-16 md:mt-24 max-w-[1000px] space-y-14 md:space-y-24">
      {FILAS.map((f, i) => (
        <Fila key={f.n} {...f} invertida={i % 2 === 1} />
      ))}
    </div>
  );
}
