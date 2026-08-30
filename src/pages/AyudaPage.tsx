import { Link } from "react-router-dom";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import { FICHAS, FAMILIAS_AYUDA, rutaAyuda, RUTA_AYUDA } from "../lib/ayuda";

/* El índice del centro de ayuda.

   Se agrupa en dos, y la diferencia es real: los reportes de
   Inteligencia de Mercado se CONSULTAN cuando surge una pregunta;
   los de «Cómo se usa» se SIGUEN una vez y no se vuelven a mirar.
   Mezclarlos haría que el que viene a resolver una duda tenga que
   pasar por encima de los tutoriales. */

export default function AyudaPage() {
  const grupos = FAMILIAS_AYUDA.map((fam) => ({
    familia: fam,
    fichas: FICHAS.filter((f) => f.familia === fam),
  })).filter((g) => g.fichas.length > 0);

  return (
    <>
      <MarketTicker />
      <Seo ruta={RUTA_AYUDA} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">Centro de ayuda</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              Qué hay dentro de IAutoLicita
            </h1>

            <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
              Cada pantalla explicada por lo que responde, no por lo que
              hace. Para decidir si te sirve antes de entrar, y para no
              perderte una vez adentro.
            </p>

            <div className="mt-12 space-y-14">
              {grupos.map((g) => (
                <section key={g.familia}>
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
                    {g.familia}
                  </h2>
                  <ul className="mt-5 space-y-px">
                    {g.fichas.map((f) => (
                      <li key={f.slug}>
                        <Link
                          to={rutaAyuda(f.slug)}
                          className="group flex flex-col gap-1 border-b border-[var(--hairline)] py-4 transition-colors hover:border-amber-400/30"
                        >
                          <span className="font-display font-medium text-[19px] md:text-[21px] leading-tight tracking-[-0.02em] text-cream-50 transition-colors group-hover:text-amber-400">
                            {f.titulo}
                          </span>
                          <span className="font-sans text-[14.5px] leading-[1.55] text-cream-300">
                            {f.bajada}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-[var(--hairline)] pt-7 font-sans text-[14.5px] leading-[1.6] text-cream-300">
              Si buscabas cómo funciona una licitación y no la app, eso
              está en las{" "}
              <Link to="/guias" className="underline hover:text-amber-400">
                guías
              </Link>{" "}
              y en el{" "}
              <Link to="/glosario" className="underline hover:text-amber-400">
                glosario
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
