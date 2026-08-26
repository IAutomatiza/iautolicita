import { useEffect, useRef, useState } from "react";
import LiciGlifo from "./LiciGlifo";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "Pruébala tú" — el demo interactivo: cuatro preguntas reales
   como chips; al tocar una, la respuesta de Lici se escribe sola
   con cifras del corpus. La página deja de contar lo que hace
   Lici y lo muestra.

   No es el chat en vivo (eso vive en la app y requiere cuenta):
   son respuestas reales pre-escritas. La sección lo dice abajo
   («con tus licitaciones, las respuestas son sobre lo tuyo»)
   para no prometer otra cosa.

   La primera pregunta se dispara sola al entrar en pantalla: un
   demo que arranca vacío parece un formulario. El tipeo corre
   solo visible y salta al final con prefers-reduced-motion.
═══════════════════════════════════════════════════════════════ */

type Pregunta = {
  id: string;
  chip: string;
  respuesta: string;
};

const PREGUNTAS: Pregunta[] = [
  {
    id: "precio",
    chip: "¿Cuánto pagó el Estado por lo que vendo?",
    respuesta:
      "En tu rubro, la mediana pagada fue $139,9M en las últimas 24 adjudicaciones — el presupuesto decía $180M. Bajo $132M ganas por precio; sobre $148M te quedas fuera.",
  },
  {
    id: "conviene",
    chip: "¿Me conviene esta licitación?",
    respuesta:
      "Calza 91/100 contigo: pide exactamente lo que vendes, el organismo te ha comprado antes y la garantía es del 10%. Cierra en 6 días — alcanzas a preparar la oferta.",
  },
  {
    id: "competencia",
    chip: "¿Contra quién compito?",
    respuesta:
      "Comercial Médica SpA se adjudicó 4 de las últimas 7 en este rubro, ofertando en promedio 8% bajo el presupuesto. Los otros dos oferentes frecuentes no pasan la evaluación técnica.",
  },
  {
    id: "documentos",
    chip: "¿Qué documentos me van a pedir?",
    respuesta:
      "Declaración jurada simple, Anexo N°5 y garantía de seriedad por el 10% del monto ofertado. Está en las bases administrativas, página 47, sección 8.3 — te la dejo abierta.",
  },
];

export default function LiciDemo() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.35);
  const [activa, setActiva] = useState<Pregunta | null>(null);
  const [escrito, setEscrito] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const preguntar = (p: Pregunta) => {
    setActiva(p);
    if (timer.current) clearInterval(timer.current);

    // Con menos movimiento pedido, la respuesta aparece entera.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEscrito(p.respuesta);
      return;
    }
    setEscrito("");
    let i = 0;
    timer.current = setInterval(() => {
      i += 2; // de a dos: al ritmo de un caracter se hace eterno
      setEscrito(p.respuesta.slice(0, i));
      if (i >= p.respuesta.length && timer.current) clearInterval(timer.current);
    }, 18);
  };

  // La primera pregunta parte sola al entrar en pantalla.
  useEffect(() => {
    if (enVista && !activa) preguntar(PREGUNTAS[0]);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enVista]);

  const escribiendo = activa !== null && escrito.length < activa.respuesta.length;

  return (
    <section className="relative overflow-hidden border-t border-[#0A1530]/[0.07] bg-[#F7F8FA] py-16 md:py-28">
      <div className="container-edge">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
            Pruébala tú
          </p>
          <h2 className="mt-4 font-display text-[30px] font-medium leading-[1.07] tracking-[-0.03em] text-[#0A0A0A] md:text-[42px]">
            Elige una pregunta.{" "}
            <span className="text-[#0064E0]">Lici hace el resto.</span>
          </h2>
        </div>

        {/* ── Chips ── */}
        <div className="mx-auto mt-10 flex max-w-[860px] flex-wrap justify-center gap-2.5">
          {PREGUNTAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => preguntar(p)}
              aria-pressed={activa?.id === p.id}
              className={`rounded-full border px-4 py-2.5 font-sans text-[13.5px] transition-colors duration-200 ${
                activa?.id === p.id
                  ? "border-[#0064E0] bg-[#0064E0] text-white shadow-[0_10px_24px_-14px_rgba(0,100,224,0.6)]"
                  : "border-[#0A1530]/15 bg-white text-[#0A0A0A]/80 hover:border-[#0064E0]/50 hover:text-[#0A0A0A]"
              }`}
            >
              {p.chip}
            </button>
          ))}
        </div>

        {/* ── La respuesta ── */}
        <div
          ref={ref}
          className="mx-auto mt-8 max-w-[720px] rounded-2xl border border-[#0A1530]/[0.09] bg-white shadow-[0_30px_70px_-40px_rgba(10,21,48,0.35)]"
        >
          <div className="flex items-center gap-3 border-b border-[#0A1530]/[0.07] px-6 py-4">
            <LiciGlifo alto={30} conBorde />
            <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
              Lici<span className="text-[#0064E0]">.</span>
            </span>
            <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0A1530]/50">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              En línea
            </span>
          </div>

          {/* min-h fija: la tarjeta no puede cambiar de alto con cada
              respuesta o la página salta bajo el cursor. */}
          <div className="flex min-h-[220px] flex-col gap-4 px-6 py-6 md:min-h-[190px]">
            {activa && (
              <>
                <div className="self-end rounded-2xl rounded-tr-md bg-[#0064E0] px-4 py-2.5 font-sans text-[14px] text-white shadow-[0_10px_24px_-14px_rgba(0,100,224,0.55)]">
                  {activa.chip}
                </div>
                <div className="max-w-[92%] self-start rounded-2xl rounded-tl-md border border-[#0A1530]/[0.09] bg-[#F4F6F9] px-4 py-3 text-left font-sans text-[14px] leading-[1.65] text-[#0A0A0A]">
                  {escrito}
                  {escribiendo && (
                    <span
                      className="ml-0.5 inline-block h-[13px] w-[7px] animate-blink bg-[#0A0A0A] align-middle"
                      aria-hidden
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-[13px] text-[#0A1530]/50">
          Respuestas reales de Lici sobre una licitación de ejemplo. Con tu
          cuenta, son sobre tus licitaciones.
        </p>
      </div>
    </section>
  );
}
