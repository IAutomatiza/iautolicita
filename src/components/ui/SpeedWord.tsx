import type { ReactNode } from "react";

/* ════════════════════════════════════════════════════════════
   SpeedWord — una palabra del titular atravesada por estelas de
   velocidad, al modo del "fast" de incident.io.

   Dos decisiones que se tomaron mirando el render, no en abstracto:

   · La palabra se queda en la tipografía del titular, no en la serif.
     Instrument Serif compone mucho más liviana que Geist en negrita y
     el contraste de peso la dejaba desfondada al lado del resto.

   · Va inclinada. Probada derecha, con las mismas estelas, la palabra
     se lee como TACHADA — justo lo contrario de lo que se busca. La
     inclinación es lo que convierte las rayas en movimiento.

   Todo va en `em`, así que escala solo con el tamaño del titular en
   cada breakpoint sin repetir medidas.
═══════════════════════════════════════════════════════════════ */

type Estela = {
  /** desplazamiento vertical desde el centro de la palabra */
  y: number;
  /** bordes: acepta % del ancho de la palabra y em hacia afuera */
  izq: string;
  der: string;
  grosor: number;
};

// Ninguna cruza la palabra entera: unas entran por la izquierda y mueren
// a mitad de camino, otras arrancan adentro y se escapan por la derecha.
// Si todas midieran lo mismo volvería a parecer un tachado.
const ESTELAS: Estela[] = [
  { y: -0.02, izq: "-0.34em", der: "40%", grosor: 0.026 },
  { y: 0.10, izq: "22%", der: "-0.48em", grosor: 0.03 },
  { y: 0.21, izq: "-0.26em", der: "55%", grosor: 0.022 },
];

export default function SpeedWord({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block ${className}`}
      // El margen deja aire para que las estelas no toquen la palabra vecina.
      style={{ transform: "skewX(-11deg)", marginInline: "0.5em 0" }}
    >
      {children}
      <span aria-hidden className="absolute inset-0 pointer-events-none">
        {ESTELAS.map((e, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: `calc(50% + ${e.y}em)`,
              left: e.izq,
              right: e.der,
              height: `${e.grosor}em`,
              background: "currentColor",
              borderRadius: "999px",
            }}
          />
        ))}
      </span>
    </span>
  );
}
