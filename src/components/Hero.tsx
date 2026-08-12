import { ArrowRight } from "lucide-react";
import WhatsAppButton from "./ui/WhatsAppButton";
import LiveDot from "./ui/LiveDot";
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
        <div className="max-w-[980px] mx-auto text-center">
          {/* Status pill with classic LED */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-amber-400/30 bg-amber-400/[0.06] rounded-full reveal">
            <LiveDot size={8} />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400 font-medium">
              441K licitaciones · 7.2M adjudicaciones · 6.4M OC
            </span>
          </div>

          {/* Dos golpes paralelos: el verbo del resultado lleva el color. */}
          <h1 className="mt-8 font-display font-medium text-[40px] md:text-[60px] lg:text-[78px] leading-[1.04] tracking-[-0.04em] text-cream-50">
            Deja de buscar licitaciones.
            <br />
            Empieza a{" "}
            <span className="text-amber-400">ganarlas.</span>
          </h1>

          <p className="mt-7 max-w-[640px] mx-auto font-sans text-[18px] md:text-[20px] leading-[1.45] text-cream-200 reveal">
            Detectamos las que calzan con lo que vendes, leemos sus bases con IA y te decimos <span className="text-cream-50 font-medium">cuánto pagó el Estado por lo mismo</span>. Ofertar a ciegas quedó atrás.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center reveal">
            <WhatsAppButton variant="huge" label="Agendar demo" />
            <a
              href="#capacidades"
              className="group inline-flex items-center justify-center gap-2 h-14 px-7 text-[15px] font-medium font-sans rounded-lg
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

          <div className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-400 reveal">
            Multi-organización · Chat IA · WhatsApp
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
              src={`${import.meta.env.BASE_URL}app-iautolicita.png`}
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
