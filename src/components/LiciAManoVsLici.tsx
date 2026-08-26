import { MoveRight } from "lucide-react";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "A mano vs. con Lici" — la comparación montada sobre el
   section-with-mockup: banda oscura, texto a la izquierda y a la
   derecha la tarjeta con el mockup del teléfono, con una segunda
   tarjeta borrosa asomada detrás y el destello de luz al pie.

   El original monta sobre framer-motion para tres gestos
   (entrada escalonada del texto, y las dos tarjetas que se
   separan verticalmente al entrar). Son transiciones CSS
   disparadas por un IntersectionObserver: no entra la
   dependencia.

   La banda es oscura dentro de una página blanca a propósito —
   es la única sección que compara contra el mundo de afuera, y
   el quiebre de fondo marca ese cambio de tema, igual que el
   FinalCTA del home.
═══════════════════════════════════════════════════════════════ */

const COMPARACION = [
  {
    tarea: "Leerse las bases",
    aMano: "3 horas por licitación",
    conLici: "3 segundos, con la página exacta citada",
  },
  {
    tarea: "Saber cuánto ofertar",
    aMano: "a ojo, con el presupuesto de las bases",
    conLici: "el precio real que pagó el Estado por lo mismo",
  },
  {
    tarea: "Enterarse a tiempo",
    aMano: "cuando alguien se acuerda de revisar",
    conLici: "el primer día, con nota según lo que vendes",
  },
];

export default function LiciAManoVsLici() {
  const [ref, enVista] = useInView<HTMLDivElement>(0.2);

  // Entrada escalonada del original: cada bloque parte 50px abajo.
  const entrada = (ms: number) => ({
    opacity: enVista ? 1 : 0,
    transform: enVista ? "translateY(0)" : "translateY(50px)",
    transition: `opacity 0.7s ease-out ${ms}ms, transform 0.7s ease-out ${ms}ms`,
  });

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-40">
      <div className="container-edge relative z-10">
        <div
          ref={ref}
          className="grid w-full grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8"
        >
          {/* ── Texto ── */}
          <div className="mx-auto mt-10 flex max-w-[546px] flex-col items-start gap-4 md:mx-0 md:mt-0">
            <div style={entrada(0)}>
              <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.02em] text-white md:text-[40px] md:leading-[1.25]">
                Licitar a mano
                <br />
                ya es competir perdiendo.
              </h2>
            </div>

            {/* Las tres comparaciones: la tarea, cómo era y cómo es.
                La flecha del medio hace la lectura sola. */}
            <div className="mt-4 flex w-full flex-col gap-6" style={entrada(200)}>
              {COMPARACION.map((c) => (
                <div
                  key={c.tarea}
                  className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                >
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                    {c.tarea}
                  </p>
                  <p className="mt-2 font-sans text-[14px] leading-6 text-[#868f97] md:text-[15px]">
                    <span className="line-through decoration-white/25">
                      {c.aMano}
                    </span>
                    <MoveRight
                      className="mx-2 inline h-4 w-4 text-[#0064E0]"
                      aria-hidden
                    />
                    <span className="font-medium text-white">{c.conLici}</span>
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-2 font-sans text-[14px] leading-6 text-[#868f97] md:text-[15px]"
              style={entrada(400)}
            >
              Tu competencia sigue en la columna tachada. Esa es la ventaja.
            </p>
          </div>

          {/* ── Mockup ── */}
          <div className="relative mx-auto mt-10 w-full max-w-[300px] md:mt-0 md:max-w-[471px]">
            {/* Tarjeta decorativa de atrás: borrosa, asomada al
                costado, sube un poco al entrar. */}
            <div
              aria-hidden
              className="absolute -left-[20%] top-[10%] z-0 h-[317px] w-[300px] rounded-[32px] bg-[#090909] md:h-[500px] md:w-[472px]"
              style={{
                filter: "blur(2px)",
                transform: enVista ? "translateY(-30px)" : "translateY(10%)",
                transition: "transform 1.2s ease-out",
              }}
            >
              <div
                className="h-full w-full rounded-[32px] bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}lici-fondo-movil.png)`,
                }}
              />
            </div>

            {/* Tarjeta principal: baja un poco al entrar, en
                dirección contraria a la de atrás. */}
            <div
              className="relative z-10 h-[405px] w-full overflow-hidden rounded-[32px] bg-white/[0.04] backdrop-blur-[15px] md:h-[637px]"
              style={{
                transform: enVista ? "translateY(30px)" : "translateY(0)",
                transition: "transform 1.2s ease-out 0.1s",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}lici-chat-movil.png`}
                alt="Lici en el teléfono: resume las bases de una licitación, cita la página exacta y sugiere el precio para ganar"
                width={942}
                height={1274}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* El destello de luz del borde inferior, como el original. */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
}
