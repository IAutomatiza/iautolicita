import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  FileSearch,
  ScanSearch,
  Share2,
  CalendarDays,
  AlarmClock,
  Trophy,
  ReceiptText,
  BadgeDollarSign,
  MessagesSquare,
  Landmark,
  Mail,
  ChevronRight,
} from "lucide-react";
import LiciGlifo from "./LiciGlifo";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Bento "El motor, por dentro" — clon del Bento Grid de MagicUI
   (magicui.design/docs/components/bento-grid) con sus cuatro
   efectos originales adaptados a licitaciones:

   1. Marquee de archivos  → los documentos de una licitación,
      borrosos hasta que el cursor los enfoca.
   2. AnimatedList          → el radar: avisos llegando solos en
      loop, con losetas degradadas como las del original.
   3. AnimatedBeam          → tarjeta blanca como la del original:
      nodos circulares con ícono, el glifo de Lici al centro con
      aura, y el degradado azul viajando por cada línea (SMIL).
   4. Calendar              → el mes real con los cierres marcados.

   El chrome replica el hover de MagicUI: el texto sube, el ícono
   se encoge y aparece el CTA. En móvil el CTA queda visible.
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

/* Losetas con degradado (como los cuadros de color del demo
   original de MagicUI), no planas: cada aviso tiene su par. */

const AVISOS = [
  {
    Icon: ScanSearch,
    grad: "linear-gradient(135deg, #5b8cff 0%, #2F63E8 100%)",
    titulo: "Licitación nueva — calce 91",
    detalle: "2239-45-LP26 · Suministro de insumos médicos",
  },
  {
    Icon: AlarmClock,
    grad: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
    titulo: "Cierre en 48 horas",
    detalle: "1057-412-LP25 · MINSAL",
  },
  {
    Icon: BadgeDollarSign,
    grad: "linear-gradient(135deg, #38bdf8 0%, #0882f7 100%)",
    titulo: "Precio real calculado",
    detalle: "Mediana pagada por el organismo: $139,9M",
  },
  {
    Icon: Trophy,
    grad: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
    titulo: "Adjudicación publicada",
    detalle: "$84,2M · 12 oferentes · ganó el 2° más barato",
  },
  {
    Icon: MessagesSquare,
    grad: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
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
  const cajaRef = useRef<HTMLDivElement>(null);

  // El loop solo corre con la tarjeta en pantalla: cada aviso nuevo
  // es un repintado, y fuera de vista sería trabajo perdido.
  useEffect(() => {
    const caja = cajaRef.current;
    if (!caja) return;
    let id = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id) {
        id = window.setInterval(() => setTotal((t) => t + 1), 2000);
      } else if (!e.isIntersecting && id) {
        window.clearInterval(id);
        id = 0;
      }
    });
    obs.observe(caja);
    return () => {
      obs.disconnect();
      if (id) window.clearInterval(id);
    };
  }, []);

  // Los últimos 4 avisos, el más nuevo arriba. La key es el número de
  // secuencia: solo el recién llegado se monta y anima su entrada.
  const visibles = Array.from({ length: Math.min(4, total) }, (_, i) => {
    const seq = total - 1 - i;
    return { seq, aviso: AVISOS[seq % AVISOS.length], hora: HORAS[i] };
  });

  return (
    <div
      ref={cajaRef}
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
              className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl shadow-[inset_0_-3px_6px_rgba(0,0,0,0.18),0_2px_6px_-2px_rgba(13,21,48,0.35)]"
              style={{ background: aviso.grad }}
            >
              <aviso.Icon className="h-[18px] w-[18px] text-white drop-shadow-sm" strokeWidth={2} />
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

/* ── 3 · Beams que convergen en Lici (tarjeta blanca) ─────── */

/* Clon fiel del AnimatedBeam de MagicUI: fondo blanco, nodos
   circulares con sombra, y un degradado azul que viaja por cada
   línea (animando las coordenadas del gradiente con SMIL, igual
   que hace el original con framer-motion). */

const IconoWhatsApp = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path
      fill="#25D366"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
    />
  </svg>
);

const IconoPdf = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path
      fill="#E5252A"
      d="M6 1.5h8.4l5.1 5.1v11.9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z"
    />
    <path fill="#B71D22" d="M14.4 1.5v5.1h5.1z" />
    <text
      x="11.75"
      y="17"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="700"
      fontSize="6"
      letterSpacing="0.2"
      fill="#ffffff"
    >
      PDF
    </text>
  </svg>
);

const IconoDrive = () => (
  <svg viewBox="0 0 87.3 78" className="h-5 w-5" aria-hidden>
    <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" />
    <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" />
    <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z" />
    <path fill="#00832d" d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.2z" />
    <path fill="#2684fc" d="M59.85 53H27.45L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" />
    <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" />
  </svg>
);

/* Las alturas van bien separadas (8→92) para que los círculos no
   se toquen ni en el alto de tarjeta del teléfono. */
const ENTRADAS = [
  { label: "Licitaciones", y: 8, nodo: <FileSearch className="h-[18px] w-[18px] text-[#2F63E8]" strokeWidth={1.9} /> },
  { label: "Órdenes de compra", y: 36, nodo: <ReceiptText className="h-[18px] w-[18px] text-[#0882f7]" strokeWidth={1.9} /> },
  { label: "Adjudicaciones", y: 64, nodo: <Trophy className="h-[18px] w-[18px] text-[#d97706]" strokeWidth={1.9} /> },
  { label: "Proveedores", y: 92, nodo: <Landmark className="h-[18px] w-[18px] text-[#64748b]" strokeWidth={1.9} /> },
];

const SALIDAS = [
  { label: "WhatsApp", y: 8, nodo: <IconoWhatsApp /> },
  { label: "Correo", y: 36, nodo: <Mail className="h-5 w-5 text-[#EA4335]" strokeWidth={1.9} /> },
  { label: "Informes PDF", y: 64, nodo: <IconoPdf /> },
  { label: "Google Drive", y: 92, nodo: <IconoDrive /> },
];

const XI = 14; // % columna de entradas
const XO = 86; // % columna de salidas

const BeamsLici = () => {
  // SMIL no respeta prefers-reduced-motion: los <animate> solo se
  // montan si el visitante no lo pidió.
  const [animar] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Los beams repintan el SVG en cada frame: fuera de pantalla se
  // pausan con pauseAnimations() para no ralentizar el scroll.
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !animar) return;
    const obs = new IntersectionObserver(([e]) => {
      try {
        if (e.isIntersecting) svg.unpauseAnimations();
        else svg.pauseAnimations();
      } catch {
        /* navegadores sin pauseAnimations: se quedan corriendo */
      }
    });
    obs.observe(svg);
    return () => obs.disconnect();
  }, [animar]);

  const rutas = [
    ...ENTRADAS.map((n) => ({
      d: `M ${XI * 6} ${n.y * 3} C ${XI * 6 + 110} ${n.y * 3}, 190 150, 300 150`,
      x0: XI * 6,
      x1: 300,
    })),
    ...SALIDAS.map((n) => ({
      d: `M 300 150 C 410 150, ${XO * 6 - 110} ${n.y * 3}, ${XO * 6} ${n.y * 3}`,
      x0: 300,
      x1: XO * 6,
    })),
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div className="absolute inset-x-4 top-3 bottom-[196px] md:inset-x-8 md:top-5 md:bottom-[110px]">
        <svg
          ref={svgRef}
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 600 300"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            {rutas.map((r, i) => (
              <linearGradient
                key={i}
                id={`beamGrad-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={r.x0 - 90}
                y1="0"
                x2={r.x0}
                y2="0"
              >
                <stop stopColor="#55b4f8" stopOpacity="0" />
                <stop offset="0.35" stopColor="#55b4f8" />
                <stop offset="0.7" stopColor="#2F63E8" />
                <stop offset="1" stopColor="#2F63E8" stopOpacity="0" />
                {animar && (
                  <>
                    <animate
                      attributeName="x1"
                      values={`${r.x0 - 90};${r.x1 + 30}`}
                      dur="3.6s"
                      begin={`${(i % 7) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="x2"
                      values={`${r.x0};${r.x1 + 120}`}
                      dur="3.6s"
                      begin={`${(i % 7) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </>
                )}
              </linearGradient>
            ))}
          </defs>
          {rutas.map((r, i) => (
            <path key={`base-${i}`} d={r.d} fill="none" stroke="rgba(13,21,48,0.12)" strokeWidth="1.4" />
          ))}
          {rutas.map((r, i) => (
            <path
              key={`beam-${i}`}
              d={r.d}
              fill="none"
              stroke={`url(#beamGrad-${i})`}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {ENTRADAS.map((n) => (
          <span
            key={n.label}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${XI}%`, top: `${n.y}%` }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--hairline-strong)] bg-white shadow-[0_2px_10px_-2px_rgba(13,21,48,0.22)] md:h-11 md:w-11">
              <span className="grid scale-[0.82] place-items-center md:scale-100">{n.nodo}</span>
            </span>
            <span className="hidden whitespace-nowrap rounded bg-white px-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-cream-300 md:inline-block">
              {n.label}
            </span>
          </span>
        ))}

        {/* Lici al centro: el ícono real de la app (L de tinta con el
            punto azul) sobre el círculo blanco, con un aura que late */}
        <span
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          <span className="relative grid h-[52px] w-[52px] place-items-center rounded-full border-2 border-[var(--hairline-strong)] bg-white shadow-[0_4px_24px_-6px_rgba(47,99,232,0.45)] md:h-16 md:w-16">
            <span aria-hidden className="lici-aura absolute inset-0 rounded-full border-2 border-brand-300" />
            <span className="md:hidden"><LiciGlifo alto={24} tinta="#0A0A0A" /></span>
            <span className="hidden md:inline"><LiciGlifo alto={30} tinta="#0A0A0A" /></span>
          </span>
        </span>

        {SALIDAS.map((n) => (
          <span
            key={n.label}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${XO}%`, top: `${n.y}%` }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--hairline-strong)] bg-white shadow-[0_2px_10px_-2px_rgba(13,21,48,0.22)] md:h-11 md:w-11">
              <span className="grid scale-[0.82] place-items-center md:scale-100">{n.nodo}</span>
            </span>
            <span className="hidden whitespace-nowrap rounded bg-white px-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-cream-300 md:inline-block">
              {n.label}
            </span>
          </span>
        ))}
      </div>

      {/* Velo inferior blanco para que el texto de la tarjeta respire */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />
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
  const clases =
    "pointer-events-auto inline-flex items-center gap-1 font-sans text-[13.5px] font-medium text-brand-600 hover:text-cream-50 transition-colors";
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

const BentoCard = ({ t, entrada, retardo }: { t: Tarjeta; entrada: boolean; retardo: number }) => (
  <div
    className={[
      "group relative flex transform-gpu flex-col justify-end overflow-hidden rounded-2xl",
      "border border-[var(--hairline-strong)] bg-white shadow-[0_14px_40px_-18px_rgba(13,21,48,0.18)]",
      entrada ? "bento-in" : "",
      t.clase,
    ].join(" ")}
    style={{ animationDelay: `${retardo}s` }}
  >
    <div className="absolute inset-0">{t.fondo}</div>

    {/* Texto: en desktop sube al hacer hover y deja aparecer el CTA;
        en móvil (sin hover) queda arriba de un CTA siempre visible. */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 p-6 pb-12 transition-all duration-300 md:pb-6 md:group-hover:-translate-y-9">
      {/* Loseta del ícono en tinte de marca, no el trazo pelado */}
      <span className="grid h-10 w-10 origin-left transform-gpu place-items-center rounded-xl border border-brand-100 bg-brand-50 transition-all duration-300 ease-in-out md:group-hover:scale-90">
        <t.Icon className="h-5 w-5 text-brand-600" strokeWidth={1.8} />
      </span>
      <h3 className="mt-1 font-display text-[20px] font-medium tracking-[-0.02em] text-cream-50">
        {t.nombre}
      </h3>
      <p className="max-w-lg font-sans text-[13.5px] leading-[1.5] text-cream-200">
        {t.descripcion}
      </p>
    </div>

    <div
      className="pointer-events-none absolute bottom-0 z-10 flex w-full transform-gpu flex-row items-center p-5
        opacity-100 transition-all duration-300 md:translate-y-9 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
    >
      <CtaTarjeta t={t} />
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 md:group-hover:bg-[#0d1530]/[0.03]" />
  </div>
);

/* ── El grid ──────────────────────────────────────────────── */

export default function MotorBento() {
  // Entrada al hacer scroll: cada tarjeta llega con el blur-fade de
  // MagicUI, escalonada. La base es visible (la animación solo corre
  // al entrar en pantalla), así Safari nunca deja nada invisible.
  const [ref, inView] = useInView<HTMLDivElement>(0.12);

  return (
    <div ref={ref} className="grid w-full auto-rows-[21rem] grid-cols-3 gap-4 md:auto-rows-[22rem]">
      {TARJETAS.map((t, i) => (
        <BentoCard key={t.nombre} t={t} entrada={inView} retardo={0.08 + i * 0.13} />
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
        /* backwards: invisible durante el retardo, y al terminar vuelve
           al estado base (idéntico al final) sin bloquear los hovers.
           Solo opacity + transform (compositor): animar blur sobre
           tarjetas grandes ralentizaba el scroll en el teléfono. */
        .bento-in { animation: bentoIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) backwards; }
        @keyframes bentoIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .lici-aura { animation: liciAura 2.4s ease-out infinite; }
        @keyframes liciAura {
          from { transform: scale(1); opacity: 0.55; }
          to { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bento-marquee, .aviso-in, .lici-aura, .bento-in { animation: none; }
          .lici-aura { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
