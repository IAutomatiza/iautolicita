import { Link } from "react-router-dom";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import { GUIAS, rutaGuia, minutosDe, RUTA_GUIAS } from "../lib/guias";

/* El índice de guías.

   Cumple la misma función que el del glosario: es la puerta para quien
   busca «guías de licitaciones» y es el nudo que sostiene a las
   páginas hijas. Sin una página que las junte, cada guía quedaría
   colgando de un enlace suelto en el pie. */

export default function GuiasPage() {
  return (
    <>
      <MarketTicker />
      <Seo ruta={RUTA_GUIAS} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">Guías</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              Cómo se le vende al Estado
            </h1>

            <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
              Los procesos completos, explicados de principio a fin: qué
              hacer, en qué orden, cuánto se demora cada trámite y dónde
              se pierde la mayoría.
            </p>

            <div className="mt-12 space-y-px border-t border-[var(--hairline)] pt-2">
              {GUIAS.map((g) => (
                <Link
                  key={g.slug}
                  to={rutaGuia(g.slug)}
                  className="group flex flex-col gap-2 border-b border-[var(--hairline)] py-6 transition-colors hover:border-amber-400/30"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-400">
                    {minutosDe(g)} min
                  </span>
                  <span className="font-display font-medium text-[21px] md:text-[24px] leading-tight tracking-[-0.025em] text-cream-50 transition-colors group-hover:text-amber-400">
                    {g.titulo}
                  </span>
                  <span className="font-sans text-[15px] leading-[1.58] text-cream-300">
                    {g.bajada}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-12 font-sans text-[14.5px] leading-[1.6] text-cream-300">
              Si buscabas algo que no está,{" "}
              <Link to="/contacto" className="underline hover:text-amber-400">
                dinos qué
              </Link>{" "}
              y lo escribimos. También puedes revisar el{" "}
              <Link to="/glosario" className="underline hover:text-amber-400">
                glosario
              </Link>{" "}
              si lo que necesitas es una palabra suelta.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
