import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import type { Documento } from "../lib/legal";

/* Las dos páginas legales comparten esta pantalla: cambia el
   documento, no el diseño. Tipografía del sitio, medida de lectura
   corta y nada de adornos — es un texto que se lee, no una landing. */

export default function LegalPage({ doc }: { doc: Documento }) {
  return (
    <>
      <Seo ruta={doc.ruta} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">Legal</Eyebrow>
            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              {doc.titulo}
            </h1>
            <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200">
              {doc.bajada}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
              Actualizado: {doc.actualizado}
            </p>

            <div className="mt-12 space-y-10 border-t border-[var(--hairline)] pt-12">
              {doc.secciones.map((s, i) => (
                <section key={s.titulo}>
                  <h2 className="flex items-baseline gap-3 font-display font-medium text-[22px] md:text-[26px] leading-tight tracking-[-0.025em] text-cream-50">
                    <span className="font-mono text-[11px] tabular-nums text-amber-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.titulo}
                  </h2>
                  <div className="mt-4 space-y-3.5 pl-[calc(11px+0.75rem)]">
                    {s.parrafos.map((p, j) => (
                      <p
                        key={j}
                        className="font-sans text-[15.5px] leading-[1.68] text-cream-200"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-14 border-t border-[var(--hairline)] pt-7 font-sans text-[14.5px] leading-[1.6] text-cream-300">
              ¿Alguna duda sobre esto? Escríbenos a{" "}
              <a
                href="mailto:contacto@iautolicita.cl"
                className="text-amber-400 hover:underline"
              >
                contacto@iautolicita.cl
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
