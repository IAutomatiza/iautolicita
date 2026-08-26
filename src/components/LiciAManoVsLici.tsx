import { MoveRight } from "lucide-react";
import LineShadowText from "./ui/LineShadowText";
import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   "A mano vs. con Lici" — la comparación montada sobre el
   section-with-mockup: texto a la izquierda y a la derecha la
   tarjeta con el teléfono, con una segunda tarjeta asomada
   detrás; al entrar en pantalla las dos derivan en direcciones
   contrarias, que es el gesto del original.

   En blanco, sobre el mismo fondo de la página: la primera
   versión copió el bg-black del original y quedaba como un
   parche en una página clara.

   Las DOS tarjetas llevan pantallas reales hechas a propósito
   (mockups renderizados desde HTML, como los demás del sitio):
   adelante Lici resumiendo bases, atrás la bandeja de
   licitaciones con nota. Antes la de atrás era un recorte
   borroso de una captura de escritorio y se leía como un error.

   El original monta sobre framer-motion; acá los tres gestos
   (entrada escalonada del texto y la deriva contraria de las
   tarjetas) son transiciones CSS. La deriva se dispara con su
   propio useInView al 50%, igual que el viewport amount 0.5 del
   original: con el de la sección entera partía antes de que el
   mockup se viera y parecía que nada se movía.
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
  const [refTexto, textoEnVista] = useInView<HTMLDivElement>(0.2);
  // La deriva de las tarjetas espera a que el mockup esté a la
  // mitad en pantalla, como el viewport amount 0.5 del original.
  const [refMockup, mockupEnVista] = useInView<HTMLDivElement>(0.5);

  const entrada = (ms: number) => ({
    opacity: textoEnVista ? 1 : 0,
    transform: textoEnVista ? "translateY(0)" : "translateY(50px)",
    transition: `opacity 0.7s ease-out ${ms}ms, transform 0.7s ease-out ${ms}ms`,
  });

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-40">
      <div className="container-edge relative z-10">
        <div className="grid w-full grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
          {/* ── Texto ── */}
          <div
            ref={refTexto}
            className="mx-auto mt-10 flex max-w-[546px] flex-col items-start gap-4 md:mx-0 md:mt-0"
          >
            {/* El encabezado con el lenguaje del hero de la página:
                eyebrow en mono, titular grande con «a mano» tachado
                en gris —la columna que se abandona— y «perdiendo» en
                el azul con la sombra de rayas. */}
            <div style={entrada(0)}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
                Antes y después
              </p>
              <h2 className="mt-4 font-display text-[36px] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0A0A0A] md:text-[54px]">
                Licitar{" "}
                <span className="text-[#0A1530]/35 line-through decoration-[#0A1530]/30 decoration-[3px]">
                  a mano
                </span>
                <br />
                es competir{" "}
                <span className="text-[#0064E0]">
                  <LineShadowText
                    className="italic pr-[0.06em]"
                    shadowColor="#0A0A0A"
                  >
                    perdiendo
                  </LineShadowText>
                  .
                </span>
              </h2>
              <p className="mt-5 max-w-[44ch] font-sans text-[15px] leading-[1.6] text-[#0A1530]/60 md:text-[16px]">
                Las tres tareas que se comen la semana, lado a lado: lo que
                cuestan hoy y lo que tardan con Lici.
              </p>
            </div>

            {/* Las tres comparaciones: la tarea, cómo era y cómo es.
                La flecha del medio hace la lectura sola. */}
            <div className="mt-4 flex w-full flex-col gap-6" style={entrada(200)}>
              {COMPARACION.map((c) => (
                <div
                  key={c.tarea}
                  className="border-t border-[#0A1530]/[0.08] pt-5 first:border-t-0 first:pt-0"
                >
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#0A1530]/40">
                    {c.tarea}
                  </p>
                  <p className="mt-2 font-sans text-[14px] leading-6 text-[#0A1530]/55 md:text-[15px]">
                    <span className="line-through decoration-[#0A1530]/30">
                      {c.aMano}
                    </span>
                    <MoveRight
                      className="mx-2 inline h-4 w-4 text-[#0064E0]"
                      aria-hidden
                    />
                    <span className="font-medium text-[#0A0A0A]">
                      {c.conLici}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-2 font-sans text-[14px] leading-6 text-[#0A1530]/55 md:text-[15px]"
              style={entrada(400)}
            >
              Tu competencia sigue en la columna tachada.{" "}
              <span className="font-medium text-[#0A0A0A]">
                Esa es la ventaja.
              </span>
            </p>
          </div>

          {/* ── Mockups ── */}
          <div
            ref={refMockup}
            className="relative mx-auto mt-10 w-full max-w-[300px] md:mt-0 md:max-w-[420px]"
          >
            {/* La bandeja de licitaciones, asomada detrás: sube al
                entrar mientras la de adelante baja. El blur(2px) es
                el del original, suficiente para leerse como fondo
                sin parecer una imagen rota. */}
            <div
              aria-hidden
              className="absolute -left-[22%] top-[6%] z-0 w-[82%] overflow-hidden rounded-[32px] border border-[#0A1530]/[0.08] shadow-[0_30px_70px_-40px_rgba(10,21,48,0.4)]"
              style={{
                filter: "blur(2px)",
                transform: mockupEnVista ? "translateY(-30px)" : "translateY(24px)",
                transition: "transform 1.2s ease-out",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}lici-alertas-movil.png`}
                alt=""
                width={942}
                height={1274}
                loading="lazy"
                className="block w-full"
              />
            </div>

            {/* Lici resumiendo bases, al frente. */}
            <div
              className="relative z-10 ml-auto w-[88%] overflow-hidden rounded-[32px] border border-[#0A1530]/[0.08] bg-white shadow-[0_40px_90px_-45px_rgba(10,21,48,0.5)]"
              style={{
                transform: mockupEnVista ? "translateY(30px)" : "translateY(-24px)",
                transition: "transform 1.2s ease-out 0.1s",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}lici-chat-movil.png`}
                alt="Lici en el teléfono: resume las bases de una licitación, cita la página exacta y sugiere el precio para ganar"
                width={942}
                height={1274}
                loading="lazy"
                className="block w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* El destello del borde inferior del original, invertido a
          tinta para el fondo claro. */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(10,21,48,0.18) 0%, rgba(10,21,48,0) 100%)",
        }}
      />
    </section>
  );
}
