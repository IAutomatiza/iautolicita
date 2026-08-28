import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import Eyebrow from "../components/ui/Eyebrow";
import FormularioReunion from "../components/FormularioReunion";
import LiciGlifo from "../components/LiciGlifo";

/* /contacto — el lugar donde cae quien quiere hablar con alguien.

   Dos caminos a propósito: Lici para el que quiere respuesta ahora,
   el formulario para el que quiere una reunión con una persona.
   Antes de esto el sitio no tenía ninguno de los dos: el único
   contacto era un mailto en el pie. */

const PUNTOS = [
  "Te mostramos la plataforma con las licitaciones de tu rubro, no con un demo genérico.",
  "Si nos dejas el RUT, llegamos con tu perfil ya calculado desde tu historial real.",
  "Media hora. Si no te sirve, te lo decimos ahí mismo.",
];

export default function ContactoPage() {
  return (
    <>
      <Seo ruta="/contacto" />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ── Argumento ── */}
            <div className="lg:col-span-5">
              <Eyebrow align="left">Hablemos</Eyebrow>
              <h1 className="mt-5 font-display font-medium text-[40px] md:text-[54px] leading-[1.02] tracking-[-0.04em] text-cream-50">
                Media hora con{" "}
                <span className="serif-em text-amber-400">tus</span>{" "}
                licitaciones.
              </h1>
              <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-cream-200 max-w-[440px]">
                No es una demo con datos de mentira. Es tu empresa, tu rubro y lo
                que el Estado está comprando hoy.
              </p>

              <ul className="mt-8 space-y-3.5">
                {PUNTOS.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span className="font-sans text-[15px] leading-[1.6] text-cream-200">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-xl border border-[var(--hairline)] bg-ink-900/40 p-5">
                <div className="flex items-center gap-2.5">
                  <LiciGlifo alto={24} conBorde />
                  <span className="font-display text-[15px] font-semibold text-cream-50">
                    ¿Apurado?
                  </span>
                </div>
                <p className="mt-2.5 font-sans text-[14.5px] leading-[1.55] text-cream-200">
                  Lici te responde ahora mismo lo que quieras saber del producto
                  y los planes, sin esperar la reunión.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("lici:abrir"))
                  }
                  className="mt-3.5 font-sans text-[14.5px] font-medium text-amber-400 hover:underline"
                >
                  Preguntarle a Lici →
                </button>
              </div>
            </div>

            {/* ── Formulario ── */}
            <div className="lg:col-span-7">
              <FormularioReunion />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
