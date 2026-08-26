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
  // Ninguna repite lo que ya cuenta la página: el chat de la
  // rejilla ya muestra el calce, la mediana pagada y la
  // competencia. Estas cuatro son capacidades que no aparecen en
  // ninguna otra sección.
  {
    id: "perdida",
    chip: "¿Por qué perdí la última?",
    respuesta:
      "Quedaste segundo por $3,8M — un 2,6% de tu oferta. Lo técnico lo tenías ganado: se definió solo por precio. El ganador viene bajando 5% en cada postulación; la próxima vez conviene partir de su último precio, no del tuyo.",
  },
  {
    id: "pago",
    chip: "¿Este organismo paga a tiempo?",
    respuesta:
      "Paga a 43 días en promedio, mejor que la media del Estado (54). Ojo con diciembre: se estira sobre 70. De sus últimas 200 órdenes de compra, solo 4 terminaron en reclamo.",
  },
  {
    id: "riesgo",
    chip: "¿Qué letra chica tienen estas bases?",
    respuesta:
      "Dos cláusulas duras: multa de 1 UF por día de atraso con tope del 8%, y exigen 5 años de experiencia certificada — eso descarta a la mitad de los oferentes habituales. Tú acreditas 9, así que juega a tu favor.",
  },
  {
    id: "balance",
    chip: "¿Cómo voy este año?",
    respuesta:
      "Llevas 6 de 14: 43% de adjudicación, contra el 31% típico de tu rubro. Las dos derrotas evitables fueron por la garantía mal emitida — corrigiendo eso, estarías cerca del 57%.",
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
