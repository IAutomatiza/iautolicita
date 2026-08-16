/* ════════════════════════════════════════════════════════════
   Glifo de Lici en SVG — trazado con la geometría EXACTA medida
   pixel a pixel del archivo del cliente (lici-icon-dark.png,
   224px): L de trazo 25 con esquinas r5 y punto #2F63E8 de r14.
   El PNG traía márgenes enormes (el glifo era ~30% del lienzo) y
   a tamaños chicos se veía diminuto y borroso; el SVG va
   recortado al glifo y es nítido a cualquier resolución. La app
   conserva el PNG para su caso de 16px; aquí siempre se usa a
   26px o más, donde el vector es idéntico al original.
═══════════════════════════════════════════════════════════════ */

export const LICI_AZUL = "#2F63E8";

export default function LiciGlifo({
  alto = 26,
  tinta = "#FFFFFF",
  className,
}: {
  /** Alto en px; el ancho se deriva de la proporción del glifo. */
  alto?: number;
  /** Color de la L: blanco en fondos oscuros, tinta en claros. */
  tinta?: string;
  className?: string;
}) {
  // caja del glifo con aire mínimo: x 46..114, y 29..144
  const VB_W = 68;
  const VB_H = 115;
  return (
    <svg
      viewBox="46 29 68 115"
      height={alto}
      width={(alto * VB_W) / VB_H}
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="65.5" cy="48.5" r="14" fill={LICI_AZUL} />
      <path
        fill={tinta}
        d="M58 66 H72 Q77 66 77 71 V114 H103 Q108 114 108 119 V133 Q108 138 103 138 H58 Q53 138 53 133 V71 Q53 66 58 66 Z"
      />
    </svg>
  );
}
