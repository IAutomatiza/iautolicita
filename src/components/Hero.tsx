import { ArrowRight } from "lucide-react";
import WhatsAppButton from "./ui/WhatsAppButton";
import { useEffect, useState } from "react";
import useScrollProgress, { lerp } from "../hooks/useScrollProgress";

export default function Hero() {
  // Cinematic Salix-style scroll reveal — desktop only.
  // On mobile we soften it (less scale change, no perspective tilt)
  // because the dashboard mock at 62% on a small viewport is unreadable.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [mockRef, progress] = useScrollProgress<HTMLDivElement>({
    span: 1.15,
    easing: "easeOutCubic",
  });

  // Mobile: gentler — 88% start, no tilt, less translate/blur
  // Desktop: Mercury-style cinematic — 48% start, 20° tilt, deep travel
  const scale = isMobile ? lerp(0.92, 1.0, progress) : lerp(0.48, 1.0, progress);
  const rotateX = isMobile ? 0 : lerp(20, 0, progress);
  const translateY = isMobile ? lerp(20, 0, progress) : lerp(100, 0, progress);
  const opacity = isMobile ? lerp(0.85, 1, progress) : lerp(0.4, 1, progress);
  const blur = isMobile ? 0 : lerp(8, 0, progress);

  return (
    <section
      id="top"
      className="relative pt-24 md:pt-40 pb-16 md:pb-48 overflow-hidden bg-ink-950"
      style={{ perspective: "1400px" }}
    >
      {/* Atmosphere */}
      <div className="absolute inset-x-0 top-0 h-[640px] bg-gradient-to-b from-brand-50/70 via-ink-950 to-transparent" />
      <div className="absolute inset-0 bg-grid-faint bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />

      <div className="container-edge relative">
        {/* Hero al estilo Wise: titular colosal en mayúsculas condensadas,
            todo en tinta; las cifras bajan al subtítulo y los CTA son
            píldoras. Sin badge ni línea mono: el titular ES la pieza. */}
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="font-condensed uppercase text-cream-50 leading-[0.96] tracking-[0.01em] text-[13vw] md:text-[72px] lg:text-[96px] reveal">
            Deja de buscar
            <br />
            licitaciones.
            <br />
            Empieza a <span className="text-amber-400">ganarlas.</span>
          </h1>

          <p className="mt-8 max-w-[640px] mx-auto font-sans text-[17px] md:text-[19px] leading-[1.45] text-cream-200 reveal">
            Detectamos las que calzan con lo que vendes, leemos sus bases con IA y te decimos <span className="text-cream-50 font-medium">cuánto pagó el Estado por lo mismo</span>. Ofertar a ciegas quedó atrás.
          </p>

          {/* Los CTA usan los mismos componentes y radios que el resto del
              sitio (el azul es el mismo botón del menú, en grande). */}
          <div className="mt-9 flex flex-col items-center sm:flex-row gap-3 justify-center reveal">
            <WhatsAppButton variant="huge" label="¡Pruébalo gratis!" />
            <a
              href="#capacidades"
              className="group inline-flex items-center justify-center gap-2 h-14 px-7 text-[15px] font-medium font-sans rounded-full
                bg-white text-cream-50 border border-[var(--hairline-strong)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_2px_rgba(10,10,10,0.04)]
                hover:border-amber-400/40 hover:text-amber-400
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(0,100,224,0.20)]
                hover:-translate-y-[1px] active:translate-y-0
                transition-all duration-200 ease-out tracking-[-0.005em]"
            >
              Ver producto
              <ArrowRight className="h-[15px] w-[15px] transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* Cinematic scroll-linked dashboard reveal.
            Multiple transforms scrub together for a "rising into focus" feel. */}
        <div
          ref={mockRef}
          className="mt-16 md:mt-20 relative"
          style={{
            transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg)`,
            transformOrigin: "center top",
            transformStyle: "preserve-3d",
            opacity,
            filter: `blur(${blur}px)`,
            willChange: "transform, opacity, filter",
          }}
        >
          {/* Glow that intensifies as the mock comes into focus */}
          <div
            className="absolute -inset-x-12 -top-8 -bottom-12 bg-gradient-to-b from-amber-400/[0.10] to-transparent blur-3xl pointer-events-none"
            style={{ opacity: progress }}
          />
          {/* Captura de la app real, no una maqueta: la pantalla "Mis
              licitaciones" tal como la ve un cliente. */}
          <div className="relative max-w-[1180px] mx-auto">
            <img
              src={`${import.meta.env.BASE_URL}app-mis-licitaciones-v2.png`}
              width={1680}
              height={1050}
              alt="Pantalla Mis licitaciones de IAutoLicita: cada licitación con su score, fecha de cierre y estado de gestión"
              className="w-full h-auto rounded-2xl border border-[var(--hairline-strong)]"
              style={{
                boxShadow:
                  "0 40px 100px -30px rgba(10,10,10,0.28), 0 2px 8px -2px rgba(10,10,10,0.08)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
