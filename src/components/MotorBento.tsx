import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  ScanSearch,
  Share2,
  CalendarDays,
  Timer,
  Trophy,
  ReceiptText,
  MessageSquareDot,
  ChevronRight,
} from "lucide-react";
import LiciGlifo from "./LiciGlifo";

/* ════════════════════════════════════════════════════════════
   Bento "El motor, por dentro" — clon del Bento Grid de MagicUI
   (magicui.design/docs/components/bento-grid) con sus cuatro
   efectos originales adaptados a licitaciones:

   1. Marquee de archivos  → los documentos de una licitación,
      borrosos hasta que el cursor los enfoca (blur → nítido).
   2. AnimatedList          → el radar: avisos que van llegando
      solos en loop (calce, cierres, adjudicaciones, precios).
   3. AnimatedBeam          → todo converge en Lici y sale hacia
      donde trabaja el equipo; tarjeta en el tema oscuro de Lici.
   4. Calendar              → el mes real con los cierres marcados.

   El chrome de cada tarjeta replica el hover de MagicUI: el
   bloque de texto sube, el ícono se encoge y aparece el CTA.
   En móvil (sin hover) el CTA queda visible desde el inicio.
═══════════════════════════════════════════════════════════════ */

/* ── 1 · Marquee de documentos ────────────────────────────── */

const DOCS = [
  {
    name: "bases-administrativas.pdf",
    body: "212 páginas. Plazos, garantías, multas y requisitos de admisibilidad, extraídos en segundos.",
  },
  {
    name: "criterios-evaluacion.pdf",
    body: "Cuánto pesa el precio, la experiencia y el plazo. Dónde se gana — y se pierde — la nota.",
  },
  {
    name: "anexo-tecnico.docx",
    body: "Especificaciones, cantidades y normas exigidas, resumidas ítem por ítem contra tu catálogo.",
  },
  {
    name: "presupuesto.xlsx",
    body: "El monto disponible cruzado con lo que el organismo pagó otras veces por lo mismo.",
  },
  {
    name: "aclaraciones-foro.pdf",
    body: "Las respuestas del organismo que cambian las reglas del juego, detectadas al publicarse.",
  },
];

const MarqueeDocs = () => (
  <div className="absolute top-10 flex w-full overflow-hidden [--gap:1rem] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
    {[0, 1].map((copia) => (
      <div
        key={copia}
        aria-hidden={copia === 1}
        className="bento-marquee flex shrink-0 items-stretch gap-[var(--gap)] pr-[var(--gap)] group-hover:[animation-play-state:paused]"
      >
        {DOCS.map((d) => (
          <figure
            key={d.name}
            className="relative w-44 cursor-pointer overflow-hidden rounded-xl border border-[var(--hairline-strong)] bg-white p-4
              transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none hover:bg-[#f4f7fd]"
          >
            <figcaption className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 flex-shrink-0 text-brand-600" strokeWidth={1.8} />
              <span className="truncate font-mono text-[10.5px] font-medium text-cream-50">{d.name}</span>
            </figcaption>
            <blockquote className="mt-2 font-sans text-[11.5px] leading-[1.45] text-cream-200">
              {d.body}
            </blockquote>
          </figure>
        ))}
      </div>
    ))}
  </div>
);

/* ── 2 · Lista animada del radar ──────────────────────────── */

const AVISOS = [
  {
    Icon: ScanSearch,
    tinte: "#2F63E8",
    titulo: "Licitación nueva — calce 91",
    detalle: "2239-45-LP26 · Suministro de insumos médicos",
  },
  {
    Icon: Timer,
    tinte: "#d97706",
    titulo: "Cierre en 48 horas",
    detalle: "1057-412-LP25 · MINSAL",
  },
  {
    Icon: ReceiptText,
    tinte: "#0882f7",
    titulo: "Precio real calculado",
    detalle: "Mediana pagada por el organismo: $139,9M",
  },
  {
    Icon: Trophy,
    tinte: "#16a34a",
    titulo: "Adjudicación publicada",
    detalle: "$84,2M · 12 oferentes · ganó el 2° más barato",
  },
  {
    Icon: MessageSquareDot,
    tinte: "#7c3aed",
    titulo: "Respuesta en el foro",
    detalle: "El organismo amplió el plazo de entrega",
  },
];

/* La hora se asigna por posición en la lista (el de arriba siempre
   es "ahora"): así el orden se lee coherente en cualquier vuelta
   del loop. */
const HORAS = ["ahora", "hace 2 min", "hace 9 min", "hace 16 min"];

const ListaRadar = () => {
  const [total, setTotal] = useState(3);

  useEffect(() => {
    const id = window.setInterval(() => setTotal((t) => t + 1), 2000);
    return () => window.clearInterval(id);
  }, []);

  // Los últimos 4 avisos, el más nuevo arriba. La key es el número de
  // secuencia: solo el recién llegado se monta y anima su entrada.
  const visibles = Array.from({ length: Math.min(4, total) }, (_, i) => {
    const seq = total - 1 - i;
    return { seq, aviso: AVISOS[seq % AVISOS.length], hora: HORAS[i] };
  });

  return (
    <div
      className="absolute right-2 top-2 flex h-[185px] w-full transform-gpu flex-col gap-2.5 overflow-hidden p-2 md:top-4 md:h-[300px]
        scale-90 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-95"
    >
      {visibles.map(({ seq, aviso, hora }) => (
        <figure
          key={seq}
          className="aviso-in relative mx-auto min-h-fit w-full max-w-[430px] cursor-pointer overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white p-3.5
            shadow-[0_4px_14px_-6px_rgba(13,21,48,0.14)] transform-gpu transition-all duration-200 ease-out hover:scale-[1.03]"
        >
          <div className="flex flex-row items-center gap-3">
            <div
              className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl"
              style={{ background: aviso.tinte }}
            >
              <aviso.Icon className="h-[18px] w-[18px] text-white" strokeWidth={2} />
            </div>
            <div className="flex min-w-0 flex-col overflow-hidden">
              <figcaption className="flex flex-row items-center gap-1.5 truncate text-[13.5px] font-medium text-cream-50">
                <span className="truncate">{aviso.titulo}</span>
                <span className="flex-shrink-0 text-[10.5px] font-normal text-cream-300">· {hora}</span>
              </figcaption>
              <p className="truncate font-sans text-[12px] font-normal text-cream-200">{aviso.detalle}</p>
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
};

/* ── 3 · Beams que convergen en Lici (tema oscuro) ────────── */

/* Coordenadas compartidas entre los nodos HTML (en %) y los paths
   del SVG (viewBox 0 0 600 300, preserveAspectRatio none): así los
   beams nacen y mueren exactamente en cada nodo. */

const ENTRADAS = [
  { label: "Licitaciones", y: 14 },
  { label: "Órdenes de compra", y: 38 },
  { label: "Adjudicaciones", y: 62 },
  { label: "Proveedores", y: 86 },
];

const SALIDAS = [
  { label: "WhatsApp", y: 25 },
  { label: "Correo", y: 50 },
  { label: "Telegram", y: 75 },
];

const XI = 16; // % columna de entradas
const XO = 84; // % columna de salidas

const BeamsLici = () => {
  const pathsIn = ENTRADAS.map(
    (n) => `M ${XI * 6} ${n.y * 3} C ${XI * 6 + 110} ${n.y * 3}, 190 150, 300 150`
  );
  const pathsOut = SALIDAS.map(
    (n) => `M 300 150 C 410 150, ${XO * 6 - 110} ${n.y * 3}, ${XO * 6} ${n.y * 3}`
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fondo Lici: el degradado institucional + la trama de puntos */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #000115 0%, #000324 16%, #000a37 36%, #001560 62%, #002494 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(85,180,248,0.16) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Diagrama: deja aire abajo para el bloque de texto de la tarjeta */}
      <div className="absolute inset-x-4 top-4 bottom-[168px] md:inset-x-8 md:top-5 md:bottom-[110px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 600 300"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[...pathsIn, ...pathsOut].map((d, i) => (
            <path key={`base-${i}`} d={d} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" />
          ))}
          {[...pathsIn, ...pathsOut].map((d, i) => (
            <path
              key={`beam-${i}`}
              d={d}
              fill="none"
              stroke="#55b4f8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="42 458"
              className="bento-beam"
              style={{ animationDelay: `${(i % 7) * 0.55}s` }}
            />
          ))}
        </svg>

        {ENTRADAS.map((n) => (
          <span
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1.5
              font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm"
            style={{ left: `${XI}%`, top: `${n.y}%` }}
          >
            {n.label}
          </span>
        ))}

        <span
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <span className="relative grid h-16 w-16 place-items-center rounded-full border border-[#55b4f8]/40 bg-[#55b4f8]/15 shadow-[0_0_40px_rgba(85,180,248,0.35)]">
            <LiciGlifo alto={28} />
          </span>
        </span>

        {SALIDAS.map((n) => (
          <span
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1.5
              font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm"
            style={{ left: `${XO}%`, top: `${n.y}%` }}
          >
            {n.label}
          </span>
        ))}
      </div>

      {/* Velo inferior para que el texto de la tarjeta se lea siempre */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#000115]/90 via-[#000115]/45 to-transparent" />
    </div>
  );
};

/* ── 4 · Calendario de cierres ────────────────────────────── */

/* Agosto 2026: parte sábado. Semana chilena L→D. */
const CIERRES = [24, 27];
const HOY = 21;

const CalendarioCierres = () => (
  <div
    className="absolute right-4 top-6 w-[218px] origin-top transform-gpu rounded-xl border border-[var(--hairline-strong)] bg-white p-3
      shadow-[0_10px_30px_-14px_rgba(13,21,48,0.2)] scale-90 [mask-image:linear-gradient(to_top,transparent_0%,#000_16%)]
      transition-all duration-300 ease-out group-hover:scale-95"
  >
    <div className="flex items-baseline justify-between px-0.5">
      <span className="font-display text-[13px] font-medium text-cream-50">Agosto 2026</span>
      <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-cream-300">2 cierres</span>
    </div>
    <div className="mt-2 grid grid-cols-7 gap-y-0.5 text-center">
      {["L", "M", "X", "J", "V", "S", "D"].map((d, i) => (
        <span key={i} className="font-mono text-[8.5px] uppercase text-cream-400">
          {d}
        </span>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={`v-${i}`} />
      ))}
      {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => {
        const cierre = CIERRES.includes(dia);
        const hoy = dia === HOY;
        return (
          <span key={dia} className="relative mx-auto grid h-6 w-6 place-items-center">
            <span
              className={[
                "grid h-6 w-6 place-items-center rounded-full text-[10.5px] leading-none",
                cierre
                  ? "bg-brand-600 font-medium text-white"
                  : hoy
                    ? "border border-cream-50 font-medium text-cream-50"
                    : "text-cream-200",
              ].join(" ")}
            >
              {dia}
            </span>
          </span>
        );
      })}
    </div>
  </div>
);

/* ── El chrome de la tarjeta (clon del BentoCard) ─────────── */

type Tarjeta = {
  Icon: typeof FileText;
  nombre: string;
  descripcion: string;
  href: string;
  cta: string;
  clase: string;
  oscura?: boolean;
  fondo: ReactNode;
};

const TARJETAS: Tarjeta[] = [
  {
    Icon: FileText,
    nombre: "Se lee las bases por ti",
    descripcion: "Bases, anexos y aclaraciones, resumidos al llegar. Tú decides con todo leído.",
    href: "/lici",
    cta: "Conoce a Lici",
    clase: "col-span-3 lg:col-span-1",
    fondo: <MarqueeDocs />,
  },
  {
    Icon: ScanSearch,
    nombre: "Radar 24/7 con score",
    descripcion:
      "Cada licitación nueva se compara con tu perfil y recibe un puntaje 0–100. Las que calzan llegan solas.",
    href: "#como-funciona",
    cta: "Ver cómo funciona",
    clase: "col-span-3 lg:col-span-2",
    fondo: <ListaRadar />,
  },
  {
    Icon: Share2,
    nombre: "Todo converge en Lici",
    descripcion:
      "441 mil licitaciones, 6,4 millones de órdenes de compra y 7,2 millones de adjudicaciones — y las alertas salen hacia donde trabaja tu equipo.",
    href: "/lici",
    cta: "Conoce a Lici",
    clase: "col-span-3 lg:col-span-2",
    oscura: true,
    fondo: <BeamsLici />,
  },
  {
    Icon: CalendarDays,
    nombre: "Ningún cierre te pilla",
    descripcion: "Los plazos que te importan, marcados y con aviso antes de que venzan.",
    href: "#como-funciona",
    cta: "Ver cómo funciona",
    clase: "col-span-3 lg:col-span-1",
    fondo: <CalendarioCierres />,
  },
];

const CtaTarjeta = ({ t }: { t: Tarjeta }) => {
  const clases = `pointer-events-auto inline-flex items-center gap-1 font-sans text-[13.5px] font-medium ${
    t.oscura ? "text-[#55b4f8] hover:text-white" : "text-brand-600 hover:text-cream-50"
  } transition-colors`;
  const contenido = (
    <>
      {t.cta}
      <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
    </>
  );
  return t.href.startsWith("/") ? (
    <Link to={t.href} className={clases}>
      {contenido}
    </Link>
  ) : (
    <a href={t.href} className={clases}>
      {contenido}
    </a>
  );
};

const BentoCard = ({ t }: { t: Tarjeta }) => (
  <div
    className={[
      "group relative flex transform-gpu flex-col justify-end overflow-hidden rounded-2xl",
      t.oscura
        ? "border border-white/10 shadow-[0_24px_60px_-24px_rgba(0,20,80,0.5)]"
        : "border border-[var(--hairline-strong)] bg-white shadow-[0_14px_40px_-18px_rgba(13,21,48,0.18)]",
      t.clase,
    ].join(" ")}
  >
    <div className="absolute inset-0">{t.fondo}</div>

    {/* Texto: en desktop sube al hacer hover y deja aparecer el CTA;
        en móvil (sin hover) queda arriba de un CTA siempre visible. */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 pb-12 transition-all duration-300 md:pb-6 md:group-hover:-translate-y-9">
      <t.Icon
        className={`h-9 w-9 origin-left transform-gpu transition-all duration-300 ease-in-out md:group-hover:scale-75 ${
          t.oscura ? "text-[#55b4f8]" : "text-cream-100"
        }`}
        strokeWidth={1.5}
      />
      <h3
        className={`font-display text-[20px] font-medium tracking-[-0.02em] ${
          t.oscura ? "text-white" : "text-cream-50"
        }`}
      >
        {t.nombre}
      </h3>
      <p
        className={`max-w-lg font-sans text-[13.5px] leading-[1.5] ${
          t.oscura ? "text-white/60" : "text-cream-200"
        }`}
      >
        {t.descripcion}
      </p>
    </div>

    <div
      className="pointer-events-none absolute bottom-0 z-10 flex w-full transform-gpu flex-row items-center p-5
        opacity-100 transition-all duration-300 md:translate-y-9 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
    >
      <CtaTarjeta t={t} />
    </div>

    <div
      className={`pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 ${
        t.oscura ? "md:group-hover:bg-white/[0.04]" : "md:group-hover:bg-[#0d1530]/[0.03]"
      }`}
    />
  </div>
);

/* ── El grid ──────────────────────────────────────────────── */

export default function MotorBento() {
  return (
    <div className="grid w-full auto-rows-[21rem] grid-cols-3 gap-4 md:auto-rows-[22rem]">
      {TARJETAS.map((t) => (
        <BentoCard key={t.nombre} t={t} />
      ))}

      <style>{`
        .bento-marquee { animation: bentoMarquee 32s linear infinite; }
        @keyframes bentoMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
        .aviso-in { animation: avisoIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) backwards; }
        @keyframes avisoIn {
          from { opacity: 0; transform: translateY(-14px) scale(0.96); }
        }
        .bento-beam { animation: beamRun 3.4s linear infinite; }
        @keyframes beamRun {
          from { stroke-dashoffset: 500; }
          to { stroke-dashoffset: -500; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bento-marquee, .aviso-in { animation: none; }
          .bento-beam { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
