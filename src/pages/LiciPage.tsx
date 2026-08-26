import { useEffect } from "react";
import Nav from "../components/Nav";
import LineShadowText from "../components/ui/LineShadowText";
import LiciGlifo from "../components/LiciGlifo";
import OrbitaLici from "../components/OrbitaLici";
import LiciRejilla from "../components/LiciRejilla";
import LiciAManoVsLici from "../components/LiciAManoVsLici";
import DotPattern from "../components/ui/DotPattern";
import Footer from "../components/Footer";
import { buildWAUrl, MSG_PRUEBA } from "../lib/whatsapp";

/* ════════════════════════════════════════════════════════════
   /lici — página reiniciada desde cero: por ahora solo el hero,
   adaptación del stack-feature-section de ruixen. Texto a la
   izquierda y las órbitas de Lici recortadas por el costado
   derecho (en el teléfono van completas bajo el texto). Las
   secciones siguientes se irán agregando sobre esta base.
═══════════════════════════════════════════════════════════════ */

export default function LiciPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // La SPA comparte el <title> del index; sin esto /lici se
    // indexa y se comparte con el titular del home.
    const previo = document.title;
    document.title = "Lici — tu analista de licitaciones | IAutoLicita";
    return () => {
      document.title = previo;
    };
  }, []);

  return (
    <>
      {/* El mismo menú del home; el ticker en vivo queda solo
          en la portada, acá distrae del producto */}
      <Nav conTicker={false} />

      <main className="bg-white text-[#0A0A0A]">
        {/* ═══ HERO — órbitas de ruixen, recortadas al costado ═══ */}
        <section className="relative min-h-[100svh] overflow-hidden flex items-center pt-16">
          {/* Trama de puntos de fondo, desvanecida hacia los bordes */}
          <DotPattern
            cr={1}
            className="[mask-image:radial-gradient(ellipse_75%_65%_at_35%_45%,#000_10%,transparent_75%)]"
          />
          {/* Órbitas recortadas por la derecha, como el original */}
          <div
            aria-hidden
            className="pointer-events-none hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[14rem] xl:-right-[8rem] 2xl:-right-[4rem]"
          >
            <OrbitaLici />
          </div>

          <div className="container-edge relative w-full">
            <div className="max-w-[760px] py-20 lg:py-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
                Tu analista de licitaciones.
              </div>

              {/* La marca en grande */}
              <div className="mt-7 flex items-center gap-3.5">
                <LiciGlifo
                  alto={52}
                  conBorde
                  className="drop-shadow-[0_10px_24px_rgba(10,10,10,0.16)]"
                />
                <span className="font-display font-bold text-[36px] tracking-[-0.02em] leading-none">
                  Lici<span className="text-[#0064E0]">.</span>
                </span>
              </div>

              <h1 className="mt-8 font-display font-semibold text-[50px] md:text-[70px] xl:text-[84px] leading-[1.01] tracking-[-0.035em]">
                Tu próxima adjudicación
                <br />
                <span className="text-[#0064E0]">
                  ya está{" "}
                  <LineShadowText className="italic pr-[0.06em]" shadowColor="#0A0A0A">
                    publicada
                  </LineShadowText>
                  .
                </span>
              </h1>

              <p className="mt-8 font-sans text-[17px] md:text-[18px] leading-[1.6] text-[#0A0A0A]/70 max-w-[520px]">
                Lici la encuentra entre todo lo que el Estado publica cada
                día, se lee las bases completas y te dice el precio para
                ganarla — antes de que tu competencia termine de leer.
              </p>

              <div className="mt-10 flex items-center gap-1.5">
                <a
                  href={buildWAUrl(MSG_PRUEBA)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-12 px-6 rounded-lg bg-[#16161A] font-mono text-[12px] uppercase tracking-[0.14em] text-[#F2F0EA] hover:bg-[#0064E0] transition-colors duration-200"
                >
                  Probar Lici
                </a>
                <a
                  href="https://app.iautolicita.cl/login"
                  className="relative inline-flex items-center h-12 px-6 rounded-lg bg-[#16161A] font-mono text-[12px] uppercase tracking-[0.14em] text-[#F2F0EA] hover:bg-[#0064E0] transition-colors duration-200"
                >
                  Acceder
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#55b4f8]" />
                </a>
              </div>

              <div className="mt-12 font-mono text-[11px] uppercase tracking-[0.06em] text-[#0A0A0A]/60 flex flex-wrap gap-x-8 gap-y-1.5">
                <span>441K licitaciones</span>
                <span>7,2M adjudicaciones</span>
                <span>
                  Respuesta: &lt;3s
                  <span className="inline-block w-[7px] h-[13px] bg-[#0A0A0A] ml-1.5 align-middle animate-blink" />
                </span>
              </div>
            </div>

            {/* Móvil: las órbitas completas bajo el texto */}
            <div aria-hidden className="lg:hidden pointer-events-none relative h-[360px] mt-6 mb-10">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 scale-[0.58] origin-top">
                <OrbitaLici />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ QUÉ HACE LICI — rejilla de capacidades ═══ */}
        <LiciRejilla />

        {/* ═══ A MANO VS. CON LICI — la comparación ═══ */}
        <LiciAManoVsLici />
      </main>

      <Footer />
    </>
  );
}
