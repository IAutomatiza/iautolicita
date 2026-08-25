/* ════════════════════════════════════════════════════════════
   Eyebrow — la etiqueta pequeña que corona cada sección, con su
   hairline a los costados (el patrón de "El motor, por dentro").

   Vive acá para que todas las secciones usen exactamente el
   mismo tratamiento: antes cada una traía su propia variante —
   unas con líneas y otras sin ellas, unas en gris y otras en el
   acento — y la página se veía despareja.
═══════════════════════════════════════════════════════════════ */

export default function Eyebrow({
  children,
  align = "center",
  className = "",
}: {
  children: string;
  /** Centrada lleva línea a ambos lados; a la izquierda, solo después. */
  align?: "center" | "left";
  className?: string;
}) {
  const linea = <span className="h-px w-8 bg-cream-300/30" aria-hidden />;

  return (
    <div
      className={`flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-300 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      {align === "center" && linea}
      <span>{children}</span>
      {linea}
    </div>
  );
}
