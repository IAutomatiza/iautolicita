import { useEffect, useRef, useState } from "react";
import { TrendingDown, ShieldAlert, BadgeCheck } from "lucide-react";
import LiciGlifo from "./LiciGlifo";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "Pruébala tú" — el demo interactivo. La primera versión era
   chat plano y no impactaba: texto que se tipea es lo mismo que
   ya muestra la rejilla. Lo que vende a Lici es que responde
   CON PRUEBAS, así que cada respuesta trae su tarjeta de
   evidencia — cifras grandes, barras, chips — como las de la
   app.

   Preguntas a la izquierda como lista (columna, no chips
   sueltos), la respuesta a la derecha. El demo rota solo cada
   pocos segundos para que se vea vivo sin tocarlo; al primer
   clic la rotación se detiene y manda el visitante.

   Ninguna pregunta repite lo que ya cuenta la página (calce,
   mediana pagada, competencia: eso vive en la rejilla).
═══════════════════════════════════════════════════════════════ */

type Pregunta = {
  id: string;
  chip: string;
  respuesta: string;
};

const PREGUNTAS: Pregunta[] = [
  {
    id: "perdida",
    chip: "¿Por qué perdí la última?",
    respuesta:
      "Quedaste segundo por $3,8M. Lo técnico lo tenías ganado: se definió solo por precio, y el ganador viene bajando 5% en cada postulación.",
  },
  {
    id: "pago",
    chip: "¿Este organismo paga a tiempo?",
    respuesta:
      "Paga a 43 días en promedio, mejor que la media del Estado. Ojo con diciembre: se estira sobre 70.",
  },
  {
    id: "riesgo",
    chip: "¿Qué letra chica tienen estas bases?",
    respuesta:
      "Dos cláusulas duras. La de experiencia descarta a la mitad de los oferentes habituales — tú acreditas 9 años, así que juega a tu favor.",
  },
  {
    id: "balance",
    chip: "¿Cómo voy este año?",
    respuesta:
      "Vas sobre el rubro. Las dos derrotas evitables fueron por la garantía mal emitida — corrigiendo eso, estarías cerca del 57%.",
  },
];

/* ── Las tarjetas de evidencia ─────────────────────────────── */

function Barra({
  etiqueta,
  valor,
  ancho,
  azul = false,
}: {
  etiqueta: string;
  valor: string;
  ancho: number; // 0–100
  azul?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-[12px] text-[#0A1530]/55">
          {etiqueta}
        </span>
        <span
          className={`font-mono text-[12.5px] font-semibold ${azul ? "text-[#0064E0]" : "text-[#0A0A0A]"}`}
        >
          {valor}
        </span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#0A1530]/[0.07]">
        <div
          className={`h-full rounded-full ${azul ? "bg-[#0064E0]" : "bg-[#0A1530]/35"}`}
          style={{ width: `${ancho}%`, transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </div>
    </div>
  );
}

function EvidenciaPerdida() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A1530]/45">
          Resultado de la adjudicación
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECEA] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#C5221F]">
          <TrendingDown className="h-3 w-3" aria-hidden />
          −$3,8M · 2,6%
        </span>
      </div>
      <Barra etiqueta="Ganador" valor="$142,4M" ancho={97} azul />
      <Barra etiqueta="Tu oferta" valor="$146,2M" ancho={100} />
      <p className="pt-1 font-sans text-[12px] text-[#0A1530]/55">
        Evaluación técnica: <span className="font-medium text-[#137333]">100% cumplida</span> · se definió por precio
      </p>
    </div>
  );
}

function EvidenciaPago() {
  // Días de pago por mes: diciembre se dispara.
  const meses = [44, 41, 43, 40, 42, 45, 43, 41, 44, 46, 52, 74];
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] text-[#0A0A0A]">
            43 <span className="text-[16px] font-medium text-[#0A1530]/50">días</span>
          </div>
          <p className="mt-1 font-sans text-[12px] text-[#0A1530]/55">
            promedio de pago · Estado: 54
          </p>
        </div>
        <div className="flex h-[64px] items-end gap-1" aria-hidden>
          {meses.map((d, i) => (
            <div
              key={i}
              className={`w-[11px] rounded-t ${i === 11 ? "bg-[#C5221F]" : "bg-[#0064E0]/70"}`}
              style={{ height: `${(d / 74) * 100}%`, transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms` }}
              title={`Mes ${i + 1}: ${d} días`}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-[#C5221F]">
        dic: 74 días
      </p>
    </div>
  );
}

function EvidenciaRiesgo() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-start gap-2.5 rounded-lg border border-[#0A1530]/[0.08] bg-[#FFF8E6] px-3 py-2.5">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#B26A00]" aria-hidden />
        <p className="font-sans text-[12.5px] leading-[1.5] text-[#0A0A0A]">
          <span className="font-semibold">Multa 1 UF por día</span> de atraso,
          tope 8% del contrato
        </p>
      </div>
      <div className="flex items-start gap-2.5 rounded-lg border border-[#0A1530]/[0.08] bg-[#FFF8E6] px-3 py-2.5">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#B26A00]" aria-hidden />
        <p className="font-sans text-[12.5px] leading-[1.5] text-[#0A0A0A]">
          <span className="font-semibold">5 años de experiencia certificada</span>{" "}
          — descarta a 1 de cada 2 oferentes
        </p>
      </div>
      <div className="flex items-start gap-2.5 rounded-lg border border-[#137333]/20 bg-[#E6F4EA] px-3 py-2.5">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#137333]" aria-hidden />
        <p className="font-sans text-[12.5px] leading-[1.5] text-[#0A0A0A]">
          Tú acreditas <span className="font-semibold">9 años</span>: cumples y
          compites con menos rivales
        </p>
      </div>
    </div>
  );
}

function EvidenciaBalance() {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] text-[#0064E0]">
          43%
        </span>
        <span className="font-sans text-[13px] text-[#0A1530]/55">
          de adjudicación · <span className="font-medium text-[#0A0A0A]">6 de 14</span>
        </span>
      </div>
      <Barra etiqueta="Tú" valor="43%" ancho={43} azul />
      <Barra etiqueta="Promedio del rubro" valor="31%" ancho={31} />
      <p className="pt-1 font-sans text-[12px] text-[#0A1530]/55">
        Con la garantía bien emitida:{" "}
        <span className="font-semibold text-[#137333]">57% proyectado</span>
      </p>
    </div>
  );
}

const EVIDENCIAS: Record<string, () => JSX.Element> = {
  perdida: EvidenciaPerdida,
  pago: EvidenciaPago,
  riesgo: EvidenciaRiesgo,
  balance: EvidenciaBalance,
};

/* ── El demo ───────────────────────────────────────────────── */

const ROTACION_MS = 7000;

export default function LiciDemo() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.3);
  const [activa, setActiva] = useState<Pregunta | null>(null);
  const [escrito, setEscrito] = useState("");
  const [conEvidencia, setConEvidencia] = useState(false);
  const [manual, setManual] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotacion = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preguntar = (p: Pregunta, porClic = false) => {
    if (porClic) setManual(true);
    setActiva(p);
    setConEvidencia(false);
    if (timer.current) clearInterval(timer.current);
    if (rotacion.current) clearTimeout(rotacion.current);

    const terminar = () => setConEvidencia(true);

    // Con menos movimiento pedido, todo aparece de una vez.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEscrito(p.respuesta);
      terminar();
      return;
    }
    setEscrito("");
    let i = 0;
    timer.current = setInterval(() => {
      i += 3;
      setEscrito(p.respuesta.slice(0, i));
      if (i >= p.respuesta.length) {
        if (timer.current) clearInterval(timer.current);
        terminar();
      }
    }, 16);
  };

  // Parte sola al entrar en pantalla.
  useEffect(() => {
    if (enVista && !activa) preguntar(PREGUNTAS[0]);
    return () => {
      if (timer.current) clearInterval(timer.current);
      if (rotacion.current) clearTimeout(rotacion.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enVista]);

  // Rota sola mientras nadie la toque: un demo quieto parece
  // una captura. El primer clic detiene la rotación.
  useEffect(() => {
    if (!conEvidencia || manual || !enVista || !activa) return;
    const idx = PREGUNTAS.findIndex((p) => p.id === activa.id);
    rotacion.current = setTimeout(
      () => preguntar(PREGUNTAS[(idx + 1) % PREGUNTAS.length]),
      ROTACION_MS
    );
    return () => {
      if (rotacion.current) clearTimeout(rotacion.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conEvidencia, manual, enVista, activa]);

  const Evidencia = activa ? EVIDENCIAS[activa.id] : null;

  return (
    <section className="relative overflow-hidden border-t border-[#0A1530]/[0.07] bg-[#F7F8FA] py-16 md:py-28">
      <div className="container-edge">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
            Pruébala tú
          </p>
          <h2 className="mt-4 font-display text-[30px] font-medium leading-[1.07] tracking-[-0.03em] text-[#0A0A0A] md:text-[42px]">
            No te responde con opiniones.{" "}
            <span className="text-[#0064E0]">Te responde con pruebas.</span>
          </h2>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-12 grid max-w-[980px] gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:gap-6"
        >
          {/* ── Las preguntas, como lista ── */}
          <div className="flex flex-col gap-2" role="tablist" aria-label="Preguntas de ejemplo">
            {PREGUNTAS.map((p) => {
              const activo = activa?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={activo}
                  onClick={() => preguntar(p, true)}
                  className={`relative overflow-hidden rounded-xl border px-4 py-3.5 text-left font-sans text-[14px] transition-all duration-200 ${
                    activo
                      ? "border-[#0064E0]/60 bg-white text-[#0A0A0A] shadow-[0_16px_40px_-24px_rgba(0,100,224,0.5)]"
                      : "border-[#0A1530]/10 bg-white/60 text-[#0A1530]/60 hover:border-[#0A1530]/25 hover:text-[#0A0A0A]"
                  }`}
                >
                  {/* La barrita de progreso de la rotación: cuenta el
                      tiempo hasta la siguiente pregunta. */}
                  {activo && !manual && conEvidencia && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] bg-[#0064E0]"
                      style={{ animation: `demo-progreso ${ROTACION_MS}ms linear forwards` }}
                    />
                  )}
                  {activo && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px] bg-[#0064E0]"
                    />
                  )}
                  {p.chip}
                </button>
              );
            })}
          </div>

          {/* ── La respuesta con su evidencia ── */}
          <div className="overflow-hidden rounded-2xl border border-[#0A1530]/[0.09] bg-white shadow-[0_30px_70px_-40px_rgba(10,21,48,0.4)]">
            <div className="flex items-center gap-3 border-b border-[#0A1530]/[0.07] px-5 py-3.5">
              <LiciGlifo alto={26} conBorde />
              <span className="font-display text-[16px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
                Lici<span className="text-[#0064E0]">.</span>
              </span>
              <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#0A1530]/50">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                En línea
              </span>
            </div>

            {/* min-h fija: el panel no puede cambiar de alto con cada
                respuesta o la página salta bajo el cursor. */}
            <div className="flex min-h-[330px] flex-col gap-4 px-5 py-5">
              {activa && (
                <>
                  <p className="font-sans text-[14.5px] leading-[1.65] text-[#0A0A0A]">
                    {escrito}
                    {escrito.length < activa.respuesta.length && (
                      <span
                        className="ml-0.5 inline-block h-[13px] w-[7px] animate-blink bg-[#0A0A0A] align-middle"
                        aria-hidden
                      />
                    )}
                  </p>

                  {/* La evidencia entra cuando el texto terminó. */}
                  <div
                    className="rounded-xl border border-[#0A1530]/[0.08] bg-[#FAFBFC] p-4"
                    style={{
                      opacity: conEvidencia ? 1 : 0,
                      transform: conEvidencia ? "translateY(0)" : "translateY(14px)",
                      transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {Evidencia && conEvidencia && <Evidencia />}
                  </div>

                  <p
                    className="mt-auto font-mono text-[10px] uppercase tracking-[0.14em] text-[#0A1530]/40"
                    style={{ opacity: conEvidencia ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}
                  >
                    Fuente: ChileCompra · datos públicos verificables
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-[13px] text-[#0A1530]/50">
          Respuestas reales de Lici sobre una licitación de ejemplo. Con tu
          cuenta, son sobre tus licitaciones.
        </p>
      </div>

      <style>{`
        @keyframes demo-progreso { from { width: 0 } to { width: 100% } }
        @media (prefers-reduced-motion: reduce) {
          [style*="demo-progreso"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
