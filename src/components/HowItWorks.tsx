import useInView from "../hooks/useInView";

/* ════════════════════════════════════════════════════════════
   Cómo funciona — cuatro pasos donde el usuario pone uno solo.
   Copy en resultados, sin jerga de infraestructura ni canales:
   cada paso es una promesa corta con UNA frase destacada.
   Cierra con una captura real de la app (el módulo Lici con una
   licitación abierta) que muestra los pasos 2–4 en pantalla.
═══════════════════════════════════════════════════════════════ */

const steps: {
  n: string;
  title: string;
  body: React.ReactNode;
}[] = [
  {
    n: "01",
    title: "Parte con tu RUT",
    body: (
      <>
        Leemos tu historial en 7,2 millones de adjudicaciones y tu perfil se
        arma solo: qué vendes, dónde ganas y quién te compra.{" "}
        <span className="text-cream-50 font-medium">
          Es lo único que haces.
        </span>
      </>
    ),
  },
  {
    n: "02",
    title: "El radar no duerme",
    body: (
      <>
        Cada licitación nueva se detecta apenas se publica y recibe un{" "}
        <span className="text-cream-50 font-medium">score 0–100</span> contra
        tu perfil. Las que calzan llegan solas; el resto ni lo ves.
      </>
    ),
  },
  {
    n: "03",
    title: "Lici lee las bases",
    body: (
      <>
        Requisitos, plazos y riesgos extraídos al instante — y{" "}
        <span className="text-cream-50 font-medium">
          el precio para ganar
        </span>
        , calculado con lo que el Estado pagó por lo mismo.
      </>
    ),
  },
  {
    n: "04",
    title: "Tú solo decides",
    body: (
      <>
        La alerta te llega con todo masticado: score, precio sugerido y
        riesgos. Tu equipo postula con ventaja —{" "}
        <span className="text-cream-50 font-medium">
          sin haber abierto el portal
        </span>
        .
      </>
    ),
  },
];

export default function HowItWorks() {
  const [shotRef, shotInView] = useInView<HTMLDivElement>(0.2);

  return (
    <section id="como" className="py-16 md:py-32 relative">
      <div className="container-edge">
        <div className="text-center mb-16 max-w-[680px] mx-auto">
          {/* Mismo eyebrow entre líneas que "El motor, por dentro" */}
          <div className="flex items-center justify-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-300">
            <span className="h-px w-8 bg-cream-300/30" />
            <span>Cómo funciona</span>
            <span className="h-px w-8 bg-cream-300/30" />
          </div>
          <h2 className="mt-6 font-display font-medium text-[40px] md:text-[60px] leading-[1] tracking-tightest text-cream-50">
            Cuatro pasos.{" "}
            <span className="serif-em text-amber-400">
              Tres en automático.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 max-w-[1100px] mx-auto">
          {steps.map((s) => (
            <article
              key={s.n}
              className="relative pt-8 border-t border-[var(--hairline-strong)] group"
            >
              <div className="absolute -top-px left-0 w-12 h-px bg-amber-400 group-hover:w-24 transition-all duration-500" />

              <div className="num font-display font-medium text-[64px] leading-none text-amber-400 mb-3">
                {s.n}
              </div>

              <h3 className="font-display font-medium text-[28px] leading-[1.05] tracking-[-0.02em] text-cream-50 mt-4">
                {s.title}
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-[1.6] text-cream-200 max-w-[460px]">
                {s.body}
              </p>
            </article>
          ))}
        </div>

        {/* La app real sobre un escenario Lici: gradiente profundo,
            textura de puntos, resplandor y chips flotantes con los
            datos que los pasos 2–4 prometen en texto */}
        <div
          ref={shotRef}
          className={`mt-16 md:mt-24 max-w-[1160px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            shotInView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-[0.97]"
          }`}
        >
          <div className="relative">
            {/* Resplandor ambiental tras el escenario */}
            <div
              aria-hidden
              className="absolute inset-x-0 md:-inset-x-10 -top-8 -bottom-8 rounded-[3rem] bg-[#0064E0]/25 blur-[90px] pointer-events-none transition-opacity duration-1000"
              style={{ opacity: shotInView ? 1 : 0 }}
            />

            {/* Escenario: el mismo azul profundo de Lici */}
            <div
              className="relative rounded-[1.75rem] md:rounded-[2rem] p-3 md:p-9"
              style={{
                background:
                  "linear-gradient(180deg, #000115 0%, #000a37 26%, #001560 52%, #002494 76%, #003ab3 100%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(85,180,248,0.18) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
              </div>

              <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/15 shadow-[0_40px_100px_-30px_rgba(0,1,21,0.8)]">
                <img
                  src={`${import.meta.env.BASE_URL}app-lici-escritorio-v2.png`}
                  alt="Lici dentro de IAutoLicita: resumen de bases, documentos a presentar, calce 87/100 y cuánto conviene ofertar"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>

              {/* Chip flotante: el score del radar */}
              <div
                className={`chip-flotante absolute -top-5 md:-top-7 right-4 md:right-14 rounded-xl bg-white px-4 py-3 md:px-5 md:py-3.5
                  shadow-[0_18px_44px_-12px_rgba(0,1,21,0.45)] border border-[var(--hairline)]
                  transition-all duration-500 delay-300 ${
                    shotInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-300">
                  Score de calce
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="num font-display font-medium text-[26px] md:text-[30px] leading-none text-[#16A34A]">
                    87
                  </span>
                  <span className="font-sans text-[12px] text-cream-200">
                    con lo que vendes
                  </span>
                </div>
              </div>

              {/* Chip flotante: la urgencia real */}
              <div
                className={`chip-flotante-b absolute -bottom-5 md:-bottom-7 left-4 md:left-14 rounded-xl bg-white px-4 py-3 md:px-5 md:py-3.5
                  shadow-[0_18px_44px_-12px_rgba(0,1,21,0.45)] border border-[var(--hairline)]
                  transition-all duration-500 delay-500 ${
                    shotInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ruby-400 animate-pulse-soft" />
                  <span className="font-sans text-[13px] font-medium text-ruby-400">
                    Cierra en 2 días
                  </span>
                </div>
                <div className="mt-0.5 font-sans text-[11.5px] text-cream-300">
                  Municipalidad de Antofagasta · 2211-14-LP26
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-300">
            La app real — Lici con una licitación abierta
          </div>
        </div>
      </div>
    </section>
  );
}
