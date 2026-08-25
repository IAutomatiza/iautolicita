import { useId } from "react";

/* ════════════════════════════════════════════════════════════
   DotPattern — trama de puntos de MagicUI. Un <pattern> SVG que
   se repite sobre todo el contenedor; se recorta con una
   mask-image para que se desvanezca hacia los bordes en vez de
   cubrir la pantalla de punta a punta.

   El original tipa todo como `any` y usa el helper cn de shadcn;
   acá va tipado y con className concatenada, que es como trabaja
   el resto del proyecto.
═══════════════════════════════════════════════════════════════ */

type Props = {
  /** Distancia entre puntos. */
  width?: number;
  height?: number;
  /** Desplazamiento de la trama. */
  x?: number;
  y?: number;
  /** Centro y radio de cada punto dentro de su celda. */
  cx?: number;
  cy?: number;
  cr?: number;
  /** Opacidad del punto. Va como atributo y no como clase: dos
      `fill-[…]/x` arbitrarias tienen la misma especificidad y la
      que gana depende del orden del CSS generado. */
  opacidad?: number;
  className?: string;
};

export default function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  opacidad = 0.25,
  className = "",
}: Props) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      fill={`rgba(10,21,48,${opacidad})`}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
