import { Link } from "react-router-dom";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import {
  TERMINOS,
  FAMILIAS,
  rutaTermino,
  RUTA_GLOSARIO,
} from "../lib/glosario";

/* El índice del glosario.

   Cumple dos funciones a la vez: es la puerta para quien llega
   buscando «glosario licitaciones», y es el nudo que enlaza a todas
   las fichas — sin una página que las junte, cada término quedaría
   colgando y Google tendría que descubrirlas de a una.

   Se agrupa por familia y no alfabéticamente a propósito: alfabético
   sirve a quien ya sabe qué busca; por familia sirve a quien está
   entendiendo el terreno, que es la mayoría de quien llega acá. */

export default function GlosarioPage() {
  const porFamilia = FAMILIAS.map((f) => ({
    familia: f,
    terminos: TERMINOS.filter((t) => t.familia === f),
  })).filter((g) => g.terminos.length > 0);

  return (
    <>
      <MarketTicker />
      <Seo ruta={RUTA_GLOSARIO} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">Glosario</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              El idioma de Mercado Público
            </h1>

            <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
              Las palabras que aparecen en una ficha de licitación y
              que nadie te explicó: qué significan, cuándo te las van a
              pedir y en qué se equivoca todo el mundo.
            </p>

            <div className="mt-12 space-y-12 border-t border-[var(--hairline)] pt-12">
              {porFamilia.map((g) => (
                <section key={g.familia}>
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
                    {g.familia}
                  </h2>
                  <ul className="mt-5 space-y-px">
                    {g.terminos.map((t) => (
                      <li key={t.slug}>
                        <Link
                          to={rutaTermino(t.slug)}
                          className="group flex flex-col gap-1 border-b border-[var(--hairline)] py-4 transition-colors hover:border-amber-400/30"
                        >
                          <span className="font-display font-medium text-[19px] md:text-[21px] leading-tight tracking-[-0.02em] text-cream-50 transition-colors group-hover:text-amber-400">
                            {t.termino}
                            {t.nombreLargo && (
                              <span className="ml-2 font-sans text-[13.5px] font-normal tracking-normal text-cream-400">
                                {t.nombreLargo}
                              </span>
                            )}
                          </span>
                          <span className="font-sans text-[14.5px] leading-[1.55] text-cream-300">
                            {t.definicion}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-[var(--hairline)] pt-7 font-sans text-[14.5px] leading-[1.6] text-cream-300">
              Faltan términos y se van sumando. Si buscabas uno que no
              está,{" "}
              <Link to="/contacto" className="underline hover:text-amber-400">
                dinos cuál
              </Link>{" "}
              y lo escribimos.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
