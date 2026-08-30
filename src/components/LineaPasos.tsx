import { useState } from "react";

/* Una secuencia con sus tiempos, tocable.

   Por qué existe
   ──────────────
   Hay términos donde lo que importa no es la definición sino EL
   ORDEN Y LOS DÍAS. «Boleta de garantía» es el caso puro: todo el
   mundo entiende qué es, y aun así pierde la licitación por empezar
   el trámite tarde. Eso en prosa se lee y se olvida; en una línea de
   tiempo se ve.

   Reutilizable: cualquier ficha puede traer sus `pasos` y esto los
   dibuja. La ficha que no los trae no muestra nada — un adorno
   forzado sería peor que el texto solo.

   Táctil y accesible: botones de verdad, no divs con onClick. En el
   teléfono se aprieta; el `:hover` no existe en pantalla táctil y
   la mitad del contenido quedaría inalcanzable. */

export type Paso = {
  /** El nombre corto del paso. */
  titulo: string;
  /** Lo que dura, si se puede decir. Ej: "3 a 5 días". */
  duracion?: string;
  /** Qué pasa acá. */
  detalle: string;
  /** El paso donde la gente se cae. Se marca en ámbar. */
  riesgo?: boolean;
};

export default function LineaPasos({
  pasos,
  titulo = "Cómo se ordena en el tiempo",
}: {
  pasos: Paso[];
  titulo?: string;
}) {
  // Arranca abierto en el paso de riesgo, que es el que hay que ver.
  const inicial = Math.max(0, pasos.findIndex((p) => p.riesgo));
  const [abierto, setAbierto] = useState(inicial);
  const p = pasos[abierto];

  return (
    <figure className="mt-10 rounded-xl border border-[var(--hairline)] p-5 md:p-7">
      <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-400">
        {titulo}
      </figcaption>

      {/* La línea. En teléfono se desplaza de lado dentro de su propio
          contenedor: sin esto, cinco pasos empujarían la página entera. */}
      <div className="mt-5 -mx-1 overflow-x-auto pb-1">
        <ol className="flex min-w-max items-stretch gap-1 px-1">
          {pasos.map((paso, i) => {
            const activo = abierto === i;
            return (
              <li key={paso.titulo} className="flex items-stretch">
                <button
                  type="button"
                  onClick={() => setAbierto(i)}
                  aria-pressed={activo}
                  className={[
                    "flex w-[132px] flex-col gap-1.5 rounded-lg px-3 py-3 text-left",
                    "outline-none transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-amber-400/50",
                    activo
                      ? "bg-amber-400 text-white"
                      : "hover:bg-[rgba(10,10,10,0.04)]",
                  ].join(" ")}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
                      activo
                        ? "text-white/70"
                        : paso.riesgo
                          ? "text-amber-400"
                          : "text-cream-400"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                    {paso.riesgo && !activo && " · ojo"}
                  </span>
                  <span
                    className={`font-sans text-[14px] font-medium leading-tight ${
                      activo ? "text-white" : "text-cream-100"
                    }`}
                  >
                    {paso.titulo}
                  </span>
                  {paso.duracion && (
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        activo ? "text-white/75" : "text-cream-400"
                      }`}
                    >
                      {paso.duracion}
                    </span>
                  )}
                </button>
                {i < pasos.length - 1 && (
                  <span
                    aria-hidden
                    className="self-center px-0.5 font-mono text-[13px] text-cream-400"
                  >
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Alto mínimo fijo: si cambia con cada paso, la página salta
          bajo el dedo al ir tocando. */}
      <div className="mt-5 min-h-[96px] border-t border-[var(--hairline)] pt-5 md:min-h-[76px]">
        <p
          className={`font-mono text-[10.5px] uppercase tracking-[0.14em] ${
            p.riesgo ? "text-amber-400" : "text-cream-400"
          }`}
        >
          {p.titulo}
          {p.duracion && ` · ${p.duracion}`}
        </p>
        <p className="mt-2.5 font-sans text-[15.5px] leading-[1.6] text-cream-200">
          {p.detalle}
        </p>
      </div>
    </figure>
  );
}
