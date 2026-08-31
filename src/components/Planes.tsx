import { useRef, useState } from "react";
import { Check, MoveRight } from "lucide-react";
import NumeroRodante from "./ui/NumeroRodante";
import LineShadowText from "./ui/LineShadowText";
import DotPattern from "./ui/DotPattern";
import BotonBordeMovil from "./ui/BotonBordeMovil";
import confeti from "../lib/confeti";

/* ════════════════════════════════════════════════════════════
   Planes — clon del bloque pricing-cards: encabezado centrado
   con su chapa, y tres tarjetas alineadas a la izquierda donde
   cada característica lleva título y una línea que la explica.
   La del medio va sin borde de color pero con sombra fuerte,
   que es como el original marca la recomendada.

   El original monta sobre Card/Badge/Button de shadcn, que a su
   vez traen class-variance-authority y @radix-ui/react-slot.
   Ninguna está en el proyecto y no se suman tres dependencias
   por una página: las tarjetas son el mismo marcado con las
   clases ya resueltas, en la paleta del sitio.

   LOS PRECIOS SALEN DE LA BASE. La fuente es la tabla `planes`
   de la app. Estaban escritos a mano acá —y en otros tres
   lugares— porque el sitio es estático; desde el 28-ago-2026 los
   trae `src/lib/planes.ts`, que genera `npm run sync:planes`.
   Si cambias un precio en /admin/planes: corre ese script y
   commitea. El copy de cada plan sí se escribe a mano.
═══════════════════════════════════════════════════════════════ */

import { PLAN } from "../lib/planes";
import { enlaceApp } from "../lib/cta";

const APP_REGISTRO = enlaceApp("planes");

/** Los mismos 10 meses que cobra la app: se pagan 10, se usan 12. */
const MESES_QUE_SE_PAGAN = 10;

const clp = (n: number) => "$" + n.toLocaleString("es-CL");

type Caracteristica = { titulo: string; detalle: string };

type Plan = {
  codigo: string;
  nombre: string;
  descripcion: string;
  /** Neto mensual, sin IVA. 0 = gratis. */
  neto: number;
  caracteristicas: Caracteristica[];
  cta: string;
  /** La del medio: sombra fuerte en vez de borde de color. */
  recomendado?: boolean;
};

const PLANES: Plan[] = [
  {
    codigo: "free",
    nombre: "Free",
    descripcion:
      "Para mirar el mercado y probar a Lici con tus propias licitaciones.",
    neto: 0,
    caracteristicas: [
      {
        titulo: "Mercado Público completo",
        detalle: "Todo lo que publica el Estado, al día y buscable.",
      },
      {
        titulo: `${PLAN.free.preguntasDia} preguntas a Lici al día`,
        detalle: "Le preguntas en tu idioma y responde con las cifras al lado.",
      },
      {
        titulo: `${PLAN.free.usuarios} usuario`,
        detalle: "Tu cuenta, con tu RUT y tu perfil armado en un clic.",
      },
    ],
    cta: "Empezar gratis",
  },
  {
    codigo: "pro",
    nombre: "Pro",
    descripcion:
      "Para la empresa que se presenta todos los meses y quiere ganar más de las que presenta.",
    neto: PLAN.pro.neto,
    caracteristicas: [
      {
        titulo: "Lici sin límite",
        detalle: "Se lee las bases enteras y te muestra la página exacta.",
      },
      {
        titulo: "Alertas al instante",
        detalle: "Cada licitación nueva llega con nota, según lo que vendes.",
      },
      {
        titulo: `${PLAN.pro.usuarios} usuarios`,
        detalle: "Tu equipo trabajando sobre la misma información.",
      },
    ],
    cta: "Contratar ahora",
    recomendado: true,
  },
  {
    codigo: "max",
    nombre: "Max",
    descripcion:
      "Para el equipo que vive de licitar y maneja varias empresas a la vez.",
    neto: PLAN.max.neto,
    caracteristicas: [
      {
        titulo: "Todo lo de Pro",
        detalle: "Más inteligencia de mercado completa y gestor de propuestas.",
      },
      {
        titulo: "Varios RUT, una cuenta",
        detalle: "Cada empresa con su equipo y su información separada.",
      },
      {
        titulo: "Presupuestos y cobranza",
        detalle: "Del precio sugerido a la orden de compra, sin salir de acá.",
      },
    ],
    cta: "Contratar ahora",
  },
];

export default function Planes() {
  const [anual, setAnual] = useState(false);
  const interruptor = useRef<HTMLButtonElement>(null);

  // El estallido sale del interruptor y solo al ENCENDER el cobro
  // anual: es una celebración del ahorro, no un parpadeo en cada
  // clic.
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
      className="relative w-full scroll-mt-28 overflow-hidden py-20 lg:py-32"
    >
      {/* La misma trama de /lici, desvanecida sobre el encabezado. */}
      <DotPattern
        cr={1}
        opacidad={0.06}
        className="[mask-image:radial-gradient(ellipse_65%_45%_at_50%_12%,#000_10%,transparent_75%)]"
      />

      <div className="container-edge relative">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* La chapa que corona el hero, con el moving-border: una
              luz recorre su borde sin parar. */}
          <BotonBordeMovil
            radio="9999px"
            duracion={2400}
            claseInterior="h-8 px-4 bg-ink-950 border border-[var(--hairline)] font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-cream-50"
          >
            Planes
          </BotonBordeMovil>

          <div className="flex flex-col gap-4">
            <h1 className="max-w-[16ch] text-center font-display text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-cream-50 md:text-[76px]">
              Cuesta menos que perder{" "}
              <span className="text-brand-600">
                <LineShadowText
                  className="italic pr-[0.06em]"
                  shadowColor="#0A0A0A"
                >
                  una
                </LineShadowText>{" "}
                licitación.
              </span>
            </h1>
            <p className="mx-auto max-w-[46ch] text-center font-sans text-[17px] leading-relaxed tracking-tight text-cream-300 md:text-[19px]">
              Partes gratis. Cuando veas lo que hay para ti,
              eliges plan — y lo cancelas cuando quieras.
            </p>
          </div>

          {/* Las cifras que respaldan el precio, en el mismo tono que el
              hero de /lici: el visitante ve contra qué está pagando. */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-cream-400">
            <span>441K licitaciones vigiladas</span>
            <span>7,2M adjudicaciones</span>
            <span>Sin permanencia</span>
          </div>

          {/* Mensual o por año. El año no es otro precio: son los
              mismos 10 meses que cobra la app. */}
          <div className="mt-6 flex items-center justify-center">
            <button
              type="button"
              role="switch"
              aria-checked={anual}
              aria-label="Contratar por un año"
              ref={interruptor}
              onClick={() => alternar(!anual)}
              className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
              style={{ backgroundColor: anual ? "#0064E0" : "#D6D3D1" }}
            >
              <span
                // left-0 explícito: sin él la posición estática del
                // pulgar cae al borde derecho y se sale del riel.
                className="pointer-events-none absolute left-0 top-0 block h-5 w-5 rounded-full bg-white shadow-lg transition-transform"
                style={{ transform: `translateX(${anual ? 20 : 0}px)` }}
              />
            </button>

            <span className="ml-2 font-sans text-[15px] font-semibold text-cream-50">
              Contratar por un año{" "}
              <span className="text-brand-600">
                ({12 - MESES_QUE_SE_PAGAN} meses gratis)
              </span>
            </span>
          </div>

          <div className="grid w-full grid-cols-1 items-stretch gap-8 pt-16 text-left lg:grid-cols-3">
            {PLANES.map((plan) => (
              <Tarjeta key={plan.codigo} plan={plan} anual={anual} />
            ))}
          </div>

          <p className="pt-10 font-sans text-[13px] text-cream-400">
            Valores netos, sin IVA. Sin permanencia: cancelas cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}

function Tarjeta({ plan, anual }: { plan: Plan; anual: boolean }) {
  const gratis = plan.neto === 0;
  const alAno = plan.neto * MESES_QUE_SE_PAGAN;
  const ahorro = plan.neto * (12 - MESES_QUE_SE_PAGAN);

  // El número grande sigue siendo el mensual —real o prorrateado—
  // para que los tres planes se comparen con la misma unidad. Lo
  // que se cobra de verdad va en la línea de abajo.
  const mensualMostrado = anual ? Math.round(alAno / 12) : plan.neto;

  return (
    <div
      className={`flex h-full w-full flex-col rounded-md border bg-white ${
        plan.recomendado
          ? "border-[var(--hairline)] shadow-2xl"
          : "border-[var(--hairline)] shadow-sm"
      }`}
    >
      {/* Cabecera de la tarjeta: nombre y la frase que lo explica. */}
      <div className="flex flex-col space-y-1.5 p-6">
        <h2 className="font-display text-[24px] font-normal leading-none tracking-tight text-cream-50">
          {plan.nombre}
        </h2>
        <p className="font-sans text-[14px] leading-relaxed text-cream-300">
          {plan.descripcion}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-0">
        <div className="flex flex-1 flex-col justify-start gap-8">
          <div>
            <p className="flex flex-row items-center gap-2 font-sans text-[20px] text-cream-50">
              {/* Los dígitos ruedan al cambiar de periodicidad, para
                  que se note qué número se movió. */}
              <NumeroRodante
                texto={gratis ? "$0" : clp(mensualMostrado)}
                className="font-display text-[36px] leading-none"
              />
              <span className="font-sans text-[14px] text-cream-300">
                {gratis ? "/ para partir" : "+ IVA / mes"}
              </span>
            </p>

            {/* El año no es otro precio: son los mismos 10 meses. La
                línea existe también en el gratis para que las tres
                columnas arranquen a la misma altura. */}
            <p className="mt-2 font-sans text-[13px] text-cream-400">
              {gratis ? (
                "gratis, para partir"
              ) : anual ? (
                <>
                  {clp(alAno)} + IVA al año —{" "}
                  <span className="text-brand-600">ahorras {clp(ahorro)}</span>
                </>
              ) : (
                <>
                  o {clp(alAno)} + IVA al año —{" "}
                  <span className="text-brand-600">
                    {12 - MESES_QUE_SE_PAGAN} meses gratis
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col justify-start gap-4 pb-2">
            {plan.caracteristicas.map((c) => (
              <div key={c.titulo} className="flex flex-row gap-4">
                <Check
                  className="mt-2 h-4 w-4 shrink-0 text-brand-600"
                  aria-hidden
                />
                <div className="flex flex-col">
                  <p className="font-sans text-[15px] text-cream-50">
                    {c.titulo}
                  </p>
                  <p className="font-sans text-[13px] leading-relaxed text-cream-300">
                    {c.detalle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sin target _blank: el visitante no quiere que se le abra
              otra pestaña, sigue en la misma ventana. */}
          <a
            href={APP_REGISTRO}
            className={`mt-auto inline-flex h-10 w-full items-center justify-center gap-4 rounded-md px-4 py-2 font-sans text-[14px] font-medium transition-colors ${
              plan.recomendado
                ? "bg-cream-50 text-white hover:bg-cream-50/90"
                : "border border-[var(--hairline)] bg-white text-cream-50 hover:bg-ink-900"
            }`}
          >
            {plan.cta}
            <MoveRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
