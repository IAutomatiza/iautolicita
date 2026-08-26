import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/* ════════════════════════════════════════════════════════════
   BotonBordeMovil — el moving-border de Aceternity: un punto de
   luz recorre el borde del botón sin parar.

   El original monta sobre framer-motion (useAnimationFrame,
   useMotionValue, useMotionTemplate) solo para escribir un
   transform en cada cuadro. Eso es un requestAnimationFrame que
   toca el style del nodo: no entra la dependencia por esto, y de
   paso se evita re-renderizar React 60 veces por segundo.

   El truco es el mismo: un <rect> SVG del tamaño del botón hace
   de riel, y en cada cuadro se pide el punto de esa curva a la
   distancia que toca. La luz se mueve por el perímetro exacto,
   con las esquinas redondeadas incluidas.

   Se detiene cuando el botón sale de pantalla y no arranca si el
   sistema pide menos movimiento: queda el borde quieto.
═══════════════════════════════════════════════════════════════ */

type Props = {
  children: ReactNode;
  /** Vuelta completa, en milisegundos. */
  duracion?: number;
  /** Redondeo del contenedor. */
  radio?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Clases del interior (fondo, borde, texto). */
  claseInterior?: string;
  /** Clases del punto de luz. */
  claseLuz?: string;
};

export default function BotonBordeMovil({
  children,
  duracion = 2600,
  radio = "9999px",
  href,
  onClick,
  className = "",
  claseInterior = "",
  claseLuz = "",
}: Props) {
  const riel = useRef<SVGRectElement>(null);
  const luz = useRef<HTMLSpanElement>(null);
  const caja = useRef<HTMLElement>(null);

  useEffect(() => {
    const r = riel.current;
    const l = luz.current;
    const c = caja.current;
    if (!r || !l || !c) return;

    // Firefox viejo y algunos motores no implementan getTotalLength
    // sobre <rect>: sin riel no hay recorrido, y el botón se queda
    // con su borde quieto en vez de reventar.
    if (typeof r.getTotalLength !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let corriendo = false;

    const paso = (t: number) => {
      const largo = r.getTotalLength();
      if (largo) {
        const p = ((t * largo) / duracion) % largo;
        const punto = r.getPointAtLength(p);
        l.style.transform = `translateX(${punto.x}px) translateY(${punto.y}px) translateX(-50%) translateY(-50%)`;
      }
      raf = requestAnimationFrame(paso);
    };

    // Un rAF por botón fuera de pantalla es gasto puro, sobre todo
    // en el menú, que vive en todas las páginas.
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !corriendo) {
        corriendo = true;
        raf = requestAnimationFrame(paso);
      } else if (!e.isIntersecting && corriendo) {
        corriendo = false;
        cancelAnimationFrame(raf);
      }
    });
    obs.observe(c);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duracion]);

  // Sin href ni onClick sale como <span>: así lo puede envolver el
  // <Link> del router sin anidar un ancla dentro de otra, que es
  // marcado inválido y en algunos navegadores mata el clic.
  const Etiqueta = (href ? "a" : onClick ? "button" : "span") as "a";

  return (
    <Etiqueta
      ref={caja as never}
      href={href}
      onClick={onClick}
      style={{ borderRadius: radio }}
      className={`relative inline-block overflow-hidden bg-transparent p-[2.5px] ${className}`}
    >
      {/* El riel: invisible, solo existe para que la luz le pida
          puntos. rx/ry en 30% lo redondea como el contenedor. */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${radio} * 0.96)` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
          aria-hidden
        >
          <rect
            ref={riel}
            fill="none"
            width="100%"
            height="100%"
            rx="30%"
            ry="30%"
          />
        </svg>

        <span
          ref={luz}
          aria-hidden
          className={`absolute left-0 top-0 inline-block h-16 w-16 rounded-full [background:radial-gradient(#0064E0_45%,rgba(0,100,224,0.35)_60%,transparent_72%)] ${claseLuz}`}
        />
      </div>

      <span
        style={{ borderRadius: `calc(${radio} * 0.96)` }}
        className={`relative flex h-full w-full items-center justify-center antialiased ${claseInterior}`}
      >
        {children}
      </span>
    </Etiqueta>
  );
}
