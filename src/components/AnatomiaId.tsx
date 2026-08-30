import { useState } from "react";

/* El ID de una licitación, desarmado y tocable.

   Por qué esto y no una imagen bonita
   ───────────────────────────────────
   «1234-56-LE26» es lo primero que ve alguien que entra a Mercado
   Público y lo único que nadie le explica. La competencia lo cuenta
   en un párrafo; acá se toca: el visitante aprieta un trozo y ve qué
   significa ESE trozo.

   Y es honesto con la regla de no exponer la app — no muestra datos
   nuestros ni pantallas del producto. Muestra cómo está hecho un
   código público, que es exactamente lo que la persona vino a
   entender.

   Accesible y táctil
   ──────────────────
   Son botones de verdad, no divs con onClick: se recorren con el
   tabulador y responden a Enter. En el teléfono se aprieta, que es
   por lo que no basta con `:hover` — en pantalla táctil el hover no
   existe y la mitad del contenido quedaría inalcanzable. */

type Trozo = {
  texto: string;
  etiqueta: string;
  explicacion: string;
  /** El tramo es el trozo que decide las reglas: se destaca solo. */
  destacado?: boolean;
};

const TROZOS: Trozo[] = [
  {
    texto: "1234",
    etiqueta: "Organismo",
    explicacion:
      "El código de la unidad de compra que publicó. Un mismo ministerio tiene decenas: cada hospital, cada dirección regional, cada liceo lleva el suyo.",
  },
  {
    texto: "56",
    etiqueta: "Correlativo",
    explicacion:
      "El número que le tocó a esta licitación dentro de ese organismo en el año. No dice nada del contenido: sólo la ordena.",
  },
  {
    texto: "LE",
    etiqueta: "Tramo",
    explicacion:
      "Acá está lo que importa. Estas dos letras dicen el tamaño del proceso, y con eso el plazo que tienes para ofertar y si te van a pedir garantía. LE es entre 100 y 1.000 UTM.",
    destacado: true,
  },
  {
    texto: "26",
    etiqueta: "Año",
    explicacion:
      "Los dos últimos dígitos del año en que se publicó. Sirve para no confundir una licitación vigente con una de hace tres años que sigue apareciendo en las búsquedas.",
  },
];

export default function AnatomiaId() {
  const [abierto, setAbierto] = useState(2); // arranca en el tramo

  return (
    <figure className="mt-10 rounded-xl border border-[var(--hairline)] p-5 md:p-7">
      <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-400">
        Aprieta cada parte
      </figcaption>

      <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-2">
        {TROZOS.map((t, i) => (
          <span key={t.etiqueta} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setAbierto(i)}
              aria-pressed={abierto === i}
              className={[
                "rounded-lg px-2.5 py-2 font-mono text-[26px] md:text-[34px] leading-none",
                "transition-all duration-200 outline-none",
                "focus-visible:ring-2 focus-visible:ring-amber-400/50",
                abierto === i
                  ? "bg-amber-400 text-white"
                  : t.destacado
                    ? "text-amber-400 hover:bg-amber-400/10"
                    : "text-cream-300 hover:bg-[rgba(10,10,10,0.04)]",
              ].join(" ")}
            >
              {t.texto}
            </button>
            {i < TROZOS.length - 1 && (
              <span
                aria-hidden
                className="font-mono text-[26px] md:text-[34px] leading-none text-cream-400"
              >
                {i === 1 ? "-" : i === 2 ? "" : "-"}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* La explicación vive en un alto mínimo fijo: sin esto, cambiar
          de trozo mueve todo lo que viene abajo y la página salta. */}
      <div className="mt-6 min-h-[112px] border-t border-[var(--hairline)] pt-5 md:min-h-[92px]">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-amber-400">
          {TROZOS[abierto].etiqueta}
        </p>
        <p className="mt-2.5 font-sans text-[15.5px] leading-[1.6] text-cream-200">
          {TROZOS[abierto].explicacion}
        </p>
      </div>
    </figure>
  );
}
