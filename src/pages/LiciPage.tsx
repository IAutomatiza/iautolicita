import { useEffect } from "react";
import { Link } from "react-router-dom";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import LiciGlifo from "../components/LiciGlifo";
import OrbitaLici from "../components/OrbitaLici";
import Footer from "../components/Footer";
import { buildWAUrl, MSG_DEMO } from "../lib/whatsapp";

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
  }, []);

  return (
    <>
      {/* ═══ NAV ═══ */}
      <header className="fixed inset-x-0 top-0 z-40 bg-[#000115]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container-edge flex h-16 items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display font-medium text-[22px] tracking-tightest leading-none text-white">
              <span className="text-brand-400">IA</span>utoLicita
              <span className="text-brand-400">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden md:inline-flex items-center h-9 px-3 text-[13.5px] font-sans text-white/50 hover:text-white/80 transition-colors"
            >
              Plataforma
            </Link>
            <a
              href="https://app.iautolicita.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center h-9 px-3 text-[13.5px] font-sans text-white/50 hover:text-white/80 transition-colors"
            >
              Iniciar sesión
            </a>
            <WhatsAppButton variant="primary" label="Probar Lici" />
          </div>
        </div>
      </header>

      <main className="bg-[#F2F0EA] text-[#0A0A0A]">
        {/* ═══ HERO — órbitas de ruixen, recortadas al costado ═══ */}
        <section className="relative min-h-[100svh] overflow-hidden flex items-center pt-16">
          {/* Órbitas recortadas por la derecha, como el original */}
          <div
            aria-hidden
            className="pointer-events-none hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[14rem] xl:-right-[8rem] 2xl:-right-[4rem]"
          >
            <OrbitaLici />
          </div>

          <div className="container-edge relative w-full">
            <div className="max-w-[660px] py-20 lg:py-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">
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

              <h1 className="mt-8 font-display font-semibold text-[42px] md:text-[56px] xl:text-[64px] leading-[1.03] tracking-[-0.03em]">
                Deja de leer bases.
                <br />
                <span className="text-[#0064E0]">Empieza a ganarlas.</span>
              </h1>

              <p className="mt-7 font-sans text-[16px] md:text-[17px] leading-[1.6] text-[#0A0A0A]/60 max-w-[480px]">
                Lici se lee las 80 páginas por ti, calcula el precio para
                ganar y te avisa antes de cada cierre — entrenada sobre 6,4
                millones de órdenes de compra de ChileCompra.
              </p>

              <div className="mt-10 flex items-center gap-1.5">
                <a
                  href={buildWAUrl(MSG_DEMO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center h-12 px-6 rounded-lg bg-[#16161A] font-mono text-[12px] uppercase tracking-[0.14em] text-[#F2F0EA] hover:bg-[#0064E0] transition-colors duration-200"
                >
                  Probar Lici
                </a>
                <a
                  href="https://app.iautolicita.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center h-12 px-6 rounded-lg bg-[#16161A] font-mono text-[12px] uppercase tracking-[0.14em] text-[#F2F0EA] hover:bg-[#0064E0] transition-colors duration-200"
                >
                  Acceder
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#55b4f8]" />
                </a>
              </div>

              <div className="mt-12 font-mono text-[11px] uppercase tracking-[0.06em] text-[#0A0A0A]/50 flex flex-wrap gap-x-8 gap-y-1.5">
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
      </main>

      <Footer />
    </>
  );
}
