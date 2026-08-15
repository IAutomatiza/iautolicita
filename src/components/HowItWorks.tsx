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

        {/* La app real: Lici con una licitación abierta — cubre en
            pantalla lo que los pasos 2–4 prometen en texto */}
        <div
          ref={shotRef}
          className={`mt-16 md:mt-24 max-w-[1100px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            shotInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-2xl overflow-hidden border border-[var(--hairline-strong)] shadow-[0_36px_90px_-36px_rgba(0,30,110,0.45)]">
            <img
              src={`${import.meta.env.BASE_URL}app-lici-workspace.png`}
              alt="Lici dentro de IAutoLicita: resumen de bases, documentos a presentar, calce 87/100 y cuánto conviene ofertar"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
          <div className="mt-5 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-300">
            La app real — Lici con una licitación abierta
          </div>
        </div>
      </div>
    </section>
  );
}
