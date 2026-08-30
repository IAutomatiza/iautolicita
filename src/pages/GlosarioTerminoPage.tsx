import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import { POR_SLUG, rutaTermino, RUTA_GLOSARIO } from "../lib/glosario";
import { enlaceApp } from "../lib/cta";
import AnatomiaId from "../components/AnatomiaId";
import LineaPasos from "../components/LineaPasos";

/* La ficha de un término del glosario.

   Mismo marco que las páginas legales —misma tipografía, misma
   medida de lectura— para que no parezca un blog pegado al costado
   del sitio. Lo que cambia es que ésta convierte: cierra con lo que
   la app hace en ese punto, y el botón va marcado con
   `utm_medium=glosario` para poder saber después qué término trajo
   registros y cuál sólo trajo visitas.

   La medida de 720px no es estética: a más de ~75 caracteres por
   línea el ojo pierde el renglón al volver. En el teléfono el ancho
   lo da el contenedor y el texto respira igual. */

export default function GlosarioTerminoPage() {
  const { slug = "" } = useParams();
  const t = POR_SLUG[slug];

  // Un slug que no existe no puede quedar en una pantalla en blanco:
  // Google lo leería como página rota. Vuelve al índice.
  if (!t) return <Navigate to={RUTA_GLOSARIO} replace />;

  return (
    <>
      <MarketTicker />
      <Seo ruta={rutaTermino(t.slug)} />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[720px]">
            <Eyebrow align="left">{t.familia}</Eyebrow>

            <h1 className="mt-5 font-display font-medium text-[38px] md:text-[54px] leading-[1.03] tracking-[-0.04em] text-cream-50">
              {t.termino}
            </h1>

            {t.nombreLargo && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
                {t.nombreLargo}
              </p>
            )}

            {/* La definición va destacada: es la frase que Google puede
                levantar como respuesta directa en el resultado. */}
            <p className="mt-6 border-l-2 border-amber-400 pl-5 font-sans text-[17.5px] leading-[1.55] text-cream-100">
              {t.definicion}
            </p>

            {t.visual === "anatomia-id" && <AnatomiaId />}
            {t.pasos && <LineaPasos pasos={t.pasos} />}

            <div className="mt-11 space-y-4 border-t border-[var(--hairline)] pt-11">
              {t.cuerpo.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-[15.5px] leading-[1.68] text-cream-200"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* La grilla, cuando el término es comparativo.
                Va en su propio contenedor con scroll horizontal: en un
                teléfono de 390px cuatro columnas no caben, y sin esto
                el `body` entero se desplazaría de lado. */}
            {t.tabla && (
              <div className="mt-10 overflow-x-auto rounded-xl border border-[var(--hairline)]">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[var(--hairline)]">
                      {t.tabla.columnas.map((c) => (
                        <th
                          key={c}
                          scope="col"
                          className="px-4 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.14em] font-normal text-cream-400"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.tabla.filas.map((fila) => (
                      <tr
                        key={fila[0]}
                        className="border-b border-[var(--hairline)] last:border-0"
                      >
                        {fila.map((celda, j) => (
                          <td
                            key={j}
                            className={
                              j === 0
                                ? "px-4 py-3.5 font-mono text-[14px] font-medium text-amber-400"
                                : "px-4 py-3.5 font-sans text-[14.5px] tabular-nums text-cream-200"
                            }
                          >
                            {celda}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {t.tabla?.nota && (
              <p className="mt-3 font-sans text-[13.5px] leading-[1.55] text-cream-400">
                {t.tabla.nota}
              </p>
            )}

            {/* Lo que la persona vino a saber de verdad. */}
            <section className="mt-12 rounded-xl border border-[var(--hairline)] bg-[var(--surface-soft,rgba(10,10,10,0.02))] p-6 md:p-7">
              <h2 className="font-display font-medium text-[20px] md:text-[23px] leading-tight tracking-[-0.025em] text-cream-50">
                Qué significa si tú vendes
              </h2>
              <div className="mt-4 space-y-3.5">
                {t.paraTi.map((p, i) => (
                  <p
                    key={i}
                    className="font-sans text-[15.5px] leading-[1.68] text-cream-200"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {t.error && (
              <section className="mt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-400">
                  El error típico
                </h2>
                <p className="mt-3 font-sans text-[15.5px] leading-[1.68] text-cream-200">
                  {t.error}
                </p>
              </section>
            )}

            {/* El cierre. Contextual al término — un botón genérico
                acá convertiría la ficha en folleto. */}
            <section className="mt-14 rounded-xl border border-[var(--hairline-strong)] p-6 md:p-8">
              <p className="font-sans text-[16.5px] leading-[1.6] text-cream-100">
                {t.cierre.texto}
              </p>
              <a
                href={enlaceApp("glosario", { campana: t.slug })}
                className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-amber-400 px-6 font-sans text-[14.5px] font-medium text-white transition-all duration-200 hover:-translate-y-[1px]"
              >
                {t.cierre.boton}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              {/* Deliberadamente sin promesa de duración: «no caduca» es
                  un compromiso que ata al negocio, y si mañana el plan
                  gratis cambia quedan todas las fichas mintiendo. */}
              <p className="mt-3 font-sans text-[13.5px] leading-[1.5] text-cream-400">
                Se parte con el plan gratis.
              </p>
            </section>

            {/* El tejido interno: cada ficha sostiene a sus vecinas. */}
            {t.vecinos.length > 0 && (
              <nav className="mt-14 border-t border-[var(--hairline)] pt-8">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream-400">
                  Relacionados
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {t.vecinos
                    .map((s) => POR_SLUG[s])
                    .filter(Boolean)
                    .map((v) => (
                      <li key={v.slug}>
                        <Link
                          to={rutaTermino(v.slug)}
                          className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-4 py-2 font-sans text-[14px] text-cream-200 transition-colors hover:border-amber-400/40 hover:text-amber-400"
                        >
                          {v.termino}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            )}

            <p className="mt-10 font-sans text-[14.5px] text-cream-300">
              <Link to={RUTA_GLOSARIO} className="underline hover:text-amber-400">
                Volver al glosario
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
