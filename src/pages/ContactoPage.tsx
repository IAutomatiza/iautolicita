import { Check } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import FormularioReunion from "../components/FormularioReunion";
import LiciGlifo from "../components/LiciGlifo";

/* /contacto — el lugar donde cae quien quiere hablar con alguien.

   Dos caminos a propósito: Lici para el que quiere respuesta ahora,
   el formulario para el que quiere una reunión con una persona.

   25-nov: panel azul partido (variante A elegida por Carlos).
   Textos, h1 y enlaces iguales que antes (sin tocar SEO). */

const PUNTOS = [
  "Te mostramos la plataforma con las licitaciones de tu rubro, no con un demo genérico.",
  "Si nos dejas el RUT, llegamos con tu perfil ya calculado desde tu historial real.",
  "Media hora. Si no te sirve, te lo decimos ahí mismo.",
];

const abrirLici = () => window.dispatchEvent(new CustomEvent("lici:abrir"));

export default function ContactoPage() {
  return (
    <>
      <Seo ruta="/contacto" />
      <Nav />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-edge">
          <div className="mx-auto max-w-[1120px] overflow-hidden rounded-3xl border border-[var(--hairline-strong)] bg-white shadow-[0_30px_80px_-40px_rgba(0,40,120,0.35)]">
            <div className="grid lg:grid-cols-[5fr_7fr]">
              <div className="relative bg-brand-600 p-8 text-white md:p-12">
                <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/70">
                  <span>Hablemos</span>
                  <span className="h-px w-8 bg-white/30" aria-hidden />
                </div>
                <h1 className="mt-5 font-display font-medium text-[40px] md:text-[54px] leading-[1.02] tracking-[-0.04em] text-white">
                  Media hora con <span className="serif-em text-[#BFD6FF]">tus</span> licitaciones.
                </h1>
                <p className="mt-5 font-sans text-[16.5px] leading-[1.6] text-white/85">
                  No es una demo con datos de mentira. Es tu empresa, tu rubro y lo que el Estado está comprando hoy.
                </p>
                <ul className="mt-8 space-y-4">
                  {PUNTOS.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                      </span>
                      <span className="font-sans text-[15px] leading-[1.6] text-white/90">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 rounded-xl bg-white/10 p-5 ring-1 ring-white/15">
                  <div className="flex items-center gap-2.5">
                    <LiciGlifo alto={24} conBorde />
                    <span className="font-display text-[15px] font-semibold">¿Apurado?</span>
                  </div>
                  <p className="mt-2.5 font-sans text-[14.5px] leading-[1.55] text-white/85">
                    Lici te responde ahora mismo lo que quieras saber del producto y los planes, sin esperar la reunión.
                  </p>
                  <button
                    type="button"
                    onClick={abrirLici}
                    className="mt-3.5 font-sans text-[14.5px] font-medium text-white underline-offset-4 hover:underline"
                  >
                    Preguntarle a Lici →
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <FormularioReunion sinMarco />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
