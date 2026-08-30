import { Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import { POR_SLUG_COMERCIAL, rutaComercial } from "../lib/comerciales";
import { POR_SLUG as TERMINOS, rutaTermino } from "../lib/glosario";
import { enlaceApp } from "../lib/cta";

/* Las páginas que venden.

   Se distinguen del glosario a propósito. Una ficha responde una duda
   y de paso menciona la app; ésta viene a vender, y quien llega ya
   tiene el problema identificado.

   Por eso el orden cambia: arriba las tres pruebas duras —números y
   hechos, nada de adjetivos— porque es lo que decide si sigue
   leyendo. El desarrollo va después, y el cierre se repite arriba y
   abajo porque en una página larga mucha gente se convence a la
   mitad y no debería tener que buscar dónde apretar.

   Las preguntas frecuentes van al texto Y a los datos estructurados:
   Google las puede mostrar desplegables dentro del propio resultado,
   y eso ocupa más espacio en la pantalla que el resultado del vecino. */

export default function ComercialPage({ slug }: { slug: string }) {
  const c = POR_SLUG_COMERCIAL[slug];
  if (!c) return <Navigate to="/" replace />;

  const CTA = ({ grande = false }: { grande?: boolean }) => (
    <a
      href={enlaceApp(c.origen, { campana: c.slug })}
      className={`group inline-flex items-center gap-2 rounded-full bg-amber-400 font-sans font-medium text-white transition-all duration-200 hover:-translate-y-[1px] ${
        grande ? "h-14 px-8 text-[15.5px]" : "h-12 px-6 text-[14.5px]"
      }`}
    >
      {c.cierre.boton}
      <ArrowUpRight
        size={grande ? 18 : 16}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );

  return (
    <>
      <MarketTicker />
      <Seo ruta={rutaComercial(c.slug)} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow align="left">IAutoLicita</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[40px] md:text-[58px] leading-[1.02] tracking-[-0.04em] text-cream-50">
              {c.titulo}
            </h1>

            <p className="mt-6 max-w-[62ch] font-sans text-[18px] leading-[1.55] text-cream-200">
              {c.bajada}
            </p>

            <div className="mt-9">
              <CTA grande />
              <p className="mt-3 font-sans text-[13.5px] text-cream-400">
                Se parte con el plan gratis.
              </p>
            </div>

            {/* Las tres pruebas. Van arriba porque son lo que decide si
                la persona sigue leyendo o se devuelve a Google. */}
            <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[var(--hairline)] sm:grid-cols-3">
              {c.pruebas.map((p) => (
                <div
                  key={p.dato}
                  className="border-b border-[var(--hairline)] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <p className="font-display font-medium text-[17px] leading-tight tracking-[-0.02em] text-amber-400">
                    {p.dato}
                  </p>
                  <p className="mt-2 font-sans text-[14px] leading-[1.5] text-cream-300">
                    {p.glosa}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 space-y-12">
              {c.bloques.map((b) => (
                <section key={b.titulo}>
                  <h2 className="font-display font-medium text-[24px] md:text-[29px] leading-tight tracking-[-0.03em] text-cream-50">
                    {b.titulo}
                  </h2>
                  <div className="mt-4 space-y-3.5">
                    {b.parrafos.map((p, i) => (
                      <p
                        key={i}
                        className="font-sans text-[16px] leading-[1.68] text-cream-200"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-16 border-t border-[var(--hairline)] pt-12">
              <h2 className="font-display font-medium text-[24px] md:text-[29px] leading-tight tracking-[-0.03em] text-cream-50">
                Preguntas frecuentes
              </h2>
              <dl className="mt-6 space-y-7">
                {c.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="font-sans text-[16.5px] font-medium leading-snug text-cream-50">
                      {f.q}
                    </dt>
                    <dd className="mt-2 font-sans text-[15.5px] leading-[1.65] text-cream-200">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-16 rounded-xl border border-[var(--hairline-strong)] p-7 md:p-9">
              <h2 className="font-display font-medium text-[24px] md:text-[29px] leading-tight tracking-[-0.03em] text-cream-50">
                {c.cierre.titulo}
              </h2>
              <p className="mt-4 max-w-[52ch] font-sans text-[16.5px] leading-[1.6] text-cream-200">
                {c.cierre.texto}
              </p>
              <div className="mt-7">
                <CTA grande />
              </div>
              <p className="mt-3 font-sans text-[13.5px] text-cream-400">
                Se parte con el plan gratis. Sin reunión previa.
              </p>
            </section>

            {/* Hacia el glosario: la página comercial vende, y el
                glosario sostiene. Enlazarlos hace que Google entienda
                que el sitio cubre el tema y no sólo lo menciona. */}
            {c.glosario.length > 0 && (
              <nav className="mt-14 border-t border-[var(--hairline)] pt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
                  Para entender los términos
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {c.glosario
                    .map((s) => TERMINOS[s])
                    .filter(Boolean)
                    .map((t) => (
                      <li key={t.slug}>
                        <Link
                          to={rutaTermino(t.slug)}
                          className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-4 py-2 font-sans text-[14px] text-cream-200 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                        >
                          {t.termino}
                        </Link>
                      </li>
                    ))}
                  <li>
                    <Link
                      to="/glosario"
                      className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-4 py-2 font-sans text-[14px] text-cream-300 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                    >
                      Ver el glosario completo
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
