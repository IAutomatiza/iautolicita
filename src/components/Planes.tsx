import { useEffect, useRef, useState } from "react";
import { Check, Star } from "lucide-react";
import Eyebrow from "./ui/Eyebrow";
import NumeroRodante from "./ui/NumeroRodante";
import useInView from "../hooks/useInView";
import confeti from "../lib/confeti";

/* ════════════════════════════════════════════════════════════
   Planes — las tres tarjetas que cobra la app. El marco (menú,
   trama, cierre) lo pone PreciosPage: acá vive solo el bloque,
   para que se pueda reusar como sección si algún día vuelve al
   home.

   "Planes" en el menú llevaba a una pregunta del FAQ, después a
   app.iautolicita.cl/precios, y ahora a /precios en este sitio:
   un salto de dominio para ver un precio es una fuga.

   LOS PRECIOS SON UN ESPEJO, NO LA FUENTE. La fuente es la
   tabla `planes` de la app, y la página que manda es
   app.iautolicita.cl/precios: allá los arma desde la base. Acá
   están escritos a mano porque este sitio es estático y no
   habla con Supabase. Si cambia un precio, se cambia en la base
   Y en esta constante — por eso los tres botones llevan a la
   página de la app, que siempre tiene la cifra viva.

   El año se cobra como allá: se pagan 10 meses y se usan 12
   (ver precio.ts, MESES_QUE_SE_PAGAN_AL_ANO). No es un descuento
   distinto para la web.
═══════════════════════════════════════════════════════════════ */

const APP_PRECIOS = "https://app.iautolicita.cl/precios";
const APP_REGISTRO = "https://app.iautolicita.cl/login";

/** Los mismos 10 meses que cobra la app. */
const MESES_QUE_SE_PAGAN = 10;

const IVA = 0.19;

const clp = (n: number) => "$" + n.toLocaleString("es-CL");

type Plan = {
  codigo: string;
  nombre: string;
  /** Neto mensual, sin IVA. 0 = gratis. */
  neto: number;
  gancho: string;
  incluye: string[];
  cta: string;
  destino: string;
  destacado?: boolean;
};

const PLANES: Plan[] = [
  {
    codigo: "free",
    nombre: "Free",
    neto: 0,
    gancho: "Para mirar el mercado y probar a Lici sin poner tarjeta.",
    incluye: [
      "1 usuario",
      "5 preguntas a Lici al día",
      "Mercado Público completo",
      "Panel e inteligencia de mercado",
    ],
    cta: "Empezar gratis",
    destino: APP_REGISTRO,
  },
  {
    codigo: "pro",
    nombre: "Pro",
    neto: 79000,
    gancho: "Para la empresa que se presenta todos los meses y quiere ganar más.",
    incluye: [
      "3 usuarios",
      "Lici sin límite de preguntas",
      "Alertas al instante",
      "Inteligencia de mercado avanzada",
      "Gestor de propuestas",
    ],
    cta: "Contratar Pro",
    destino: APP_PRECIOS,
    destacado: true,
  },
  {
    codigo: "max",
    nombre: "Max",
    neto: 149000,
    gancho: "Para el equipo que vive de licitar y maneja varias empresas.",
    incluye: [
      "5 usuarios",
      "Todo lo de Pro",
      "Inteligencia de mercado completa",
      "Presupuestos y cobranza",
      "Varios RUT en una sola cuenta",
    ],
    cta: "Contratar Max",
    destino: APP_PRECIOS,
  },
];

/** El abanico 3D es solo de escritorio: en el teléfono las
    tarjetas van una bajo otra y girarlas las deja ilegibles. Es
    el mismo isDesktop del bloque original. */
/** Quien pidió menos movimiento ve las tarjetas puestas, no entrando. */
function sinMovimiento() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useEscritorio() {
  const [esc, setEsc] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onCambio = () => setEsc(mq.matches);
    mq.addEventListener("change", onCambio);
    return () => mq.removeEventListener("change", onCambio);
  }, []);
  return esc;
}

export default function Planes({
  /** En /precios el bloque es la página: el título va más grande
      y se agrega la bajada larga. Como sección del home iría
      compacto — hoy solo lo usa la página. */
  conEncabezado = false,
}: {
  conEncabezado?: boolean;
} = {}) {
  const [anual, setAnual] = useState(false);
  const [ref, enVista] = useInView<HTMLDivElement>(0.1);
  const escritorio = useEscritorio();
  const quieto = sinMovimiento();
  const interruptor = useRef<HTMLButtonElement>(null);

  // El estallido sale del interruptor y solo al ENCENDER el cobro
  // anual: es una celebración del ahorro, no un parpadeo en cada
  // clic. Igual que en el bloque original.
  const alternar = (nuevo: boolean) => {
    setAnual(nuevo);
    if (!nuevo || !interruptor.current) return;
    const r = interruptor.current.getBoundingClientRect();
    confeti({
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
      colores: ["#0064E0", "#0A0A0A", "#5790F5", "#737373"],
    });
  };

  return (
    <section
      id="planes"
      className={`scroll-mt-28 ${conEncabezado ? "pt-12 pb-16 md:pt-20 md:pb-24" : "py-16 md:py-28"}`}
    >
      <div className="container-edge">
        <div ref={ref} className="text-center">
          <Eyebrow>Planes</Eyebrow>
          <h2
            className={`mt-5 font-display font-medium leading-[1.02] tracking-[-0.04em] text-cream-50 ${
              conEncabezado
                ? "text-[42px] md:text-[64px]"
                : "text-[36px] md:text-[52px]"
            }`}
          >
            Cuesta menos que perder{" "}
            <span className="italic text-brand-600">una licitación</span>
          </h2>
          <p className="mt-4 mx-auto max-w-[52ch] text-[15px] md:text-[16px] leading-[1.6] text-cream-300">
            Sin permanencia y sin instalación: cancelas cuando quieras y
            partes el mismo día.
          </p>

          {/* Como el original: el interruptor primero y una sola
              etiqueta a su derecha, no Mensual · switch · Anual. El
              anual no es otro precio, son los mismos 10 meses que
              cobra la app. */}
          <div className="mt-10 flex items-center justify-center">
            <button
              type="button"
              role="switch"
              aria-checked={anual}
              aria-label="Cobro anual"
              ref={interruptor}
              onClick={() => alternar(!anual)}
              className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              style={{ backgroundColor: anual ? "#0064E0" : "#D6D3D1" }}
            >
              <span
                // left-0 explícito: sin él la posición estática del
                // pulgar cae al borde derecho del botón y se sale
                // fuera del riel.
                className="pointer-events-none absolute left-0 top-0 block h-5 w-5 rounded-full bg-white shadow-lg transition-transform"
                style={{ transform: `translateX(${anual ? 20 : 0}px)` }}
              />
            </button>

            <span className="ml-2 font-sans text-[15px] font-semibold text-cream-50">
              Cobro anual{" "}
              <span className="text-brand-600">
                ({12 - MESES_QUE_SE_PAGAN} meses gratis)
              </span>
            </span>
          </div>
        </div>

        {/* Entrada en abanico del bloque original: las laterales
            entran giradas y hundidas hacia el centro, la destacada
            queda al frente y un poco más arriba. La perspectiva va
            en el contenedor; sin ella el rotateY no se ve. */}
        <div
          className="mt-12 grid gap-5 md:grid-cols-3 md:items-stretch"
          style={{ perspective: "1200px" }}
        >
          {PLANES.map((p, i) => {
            const lateral = escritorio && !p.destacado;
            const reposo = !escritorio
              ? "none"
              : p.destacado
                ? "translateY(-20px)"
                : `translateX(${i === 0 ? 30 : -30}px) translateZ(-50px) rotateY(${i === 0 ? 10 : -10}deg) scale(0.94)`;

            return (
              <div
                key={p.codigo}
                className={p.destacado ? "z-10" : "z-0"}
                style={{
                  transformOrigin: lateral
                    ? i === 0
                      ? "right center"
                      : "left center"
                    : "center",
                  opacity: enVista ? 1 : 0,
                  transform: enVista ? reposo : "translateY(50px)",
                  transition: quieto
                    ? "none"
                    : "opacity 0.5s ease 0.4s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s",
                }}
              >
                <Tarjeta plan={p} anual={anual} />
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-sans text-[13px] text-cream-400">
          Valores netos, sin IVA. Boleta o factura electrónica al contratar.{" "}
          <a
            href={APP_PRECIOS}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream-200 underline underline-offset-4 hover:text-cream-50 transition-colors"
          >
            Ver el detalle de cada plan
          </a>
        </p>
      </div>
    </section>
  );
}

function Tarjeta({ plan, anual }: { plan: Plan; anual: boolean }) {
  const gratis = plan.neto === 0;

  // Al año se pagan 10 meses; lo que se muestra en grande sigue
  // siendo el mensual, para que las tres tarjetas se comparen
  // con la misma unidad.
  const netoAnual = plan.neto * MESES_QUE_SE_PAGAN;
  const mensualMostrado = anual ? Math.round(netoAnual / 12) : plan.neto;
  const conIva = Math.round(mensualMostrado * (1 + IVA));
  const ahorro = plan.neto * (12 - MESES_QUE_SE_PAGAN);

  return (
    // El original centra la tarjeta entera y deja alineada a la
    // izquierda solo la lista de características. Las que no van
    // destacadas bajan mt-5, que es lo que abre el escalón.
    <div
      className={`relative flex h-full flex-col rounded-2xl p-6 text-center ${
        plan.destacado
          ? "border-2 border-brand-600 bg-white shadow-[0_24px_60px_-30px_rgba(0,100,224,0.45)]"
          : "border border-[var(--hairline)] bg-white md:mt-5"
      }`}
    >
      {/* La chapa pegada a la esquina, con la estrella rellena y el
          redondeo solo en dos vértices. */}
      {plan.destacado && (
        <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-brand-600 px-2 py-0.5">
          <Star className="h-4 w-4 fill-current text-white" aria-hidden />
          <span className="ml-1 font-sans text-[13px] font-semibold text-white">
            Popular
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <p className="font-sans text-[16px] font-semibold text-cream-300">
          {plan.nombre}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2">
          <NumeroRodante
            texto={gratis ? "$0" : clp(mensualMostrado)}
            className="font-display text-[48px] font-bold leading-none tracking-tight text-cream-50"
          />
          <span className="whitespace-nowrap font-sans text-[14px] font-semibold leading-6 tracking-wide text-cream-300">
            {gratis ? "/ siempre" : "+ IVA / mes"}
          </span>
        </div>

        <p className="mt-1 font-sans text-[12px] leading-5 text-cream-400">
          {gratis
            ? "sin tarjeta"
            : anual
              ? `cobro anual · ${clp(netoAnual)} + IVA al año, ahorras ${clp(ahorro)}`
              : `cobro mensual · ${clp(conIva)} con IVA incluido`}
        </p>

        <ul className="mt-5 flex flex-col gap-2">
          {plan.incluye.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check
                className="mt-1 h-4 w-4 flex-shrink-0 text-brand-600"
                aria-hidden
              />
              <span className="text-left font-sans text-[14px] leading-[1.5] text-cream-200">
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* mt-auto pega el pie de la tarjeta al piso: las tres tienen
            distinto número de líneas y los CTA deben quedar parejos. */}
        <div className="mt-auto">
          <hr className="my-4 w-full border-[var(--hairline)]" />

          <a
            href={plan.destino}
            target="_blank"
            rel="noopener noreferrer"
            // El hover del original: el anillo del acento separado del
            // botón por un pelo, con transform-gpu para que la
            // transición no salte.
            className="group relative flex w-full transform-gpu items-center justify-center gap-2 overflow-hidden rounded-md bg-cream-50 px-4 py-2.5 font-sans text-[18px] font-semibold tracking-tighter text-white ring-offset-2 ring-offset-white transition-all duration-300 ease-out hover:bg-brand-600 hover:ring-2 hover:ring-brand-600"
          >
            {plan.cta}
          </a>

          <p className="mt-6 font-sans text-[12px] leading-5 text-cream-400">
            {plan.gancho}
          </p>
        </div>
      </div>
    </div>
  );
}
