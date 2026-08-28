import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { enviarLead, hayServidor, type Lead } from "../lib/leads";

/* Formulario de solicitud de reunión.

   El RUT es opcional pero es el campo que más vale: con él podemos
   precalcular el perfil de la empresa ANTES de la reunión y llegar
   con sus propias licitaciones en pantalla. Por eso lleva su nota
   explicando para qué sirve — un campo que pide RUT sin decir para
   qué es un campo que la gente deja vacío.

   Antiaraña: un campo honeypot invisible. Si viene lleno, es un bot
   y se descarta en silencio. Sin captcha: espanta más de lo que
   filtra en un formulario de este volumen. */

const HORARIOS = ["Mañana", "Tarde", "Me da lo mismo"];

export default function FormularioReunion() {
  const [datos, setDatos] = useState({
    nombre: "",
    empresa: "",
    rut: "",
    correo: "",
    telefono: "",
    mensaje: "",
    horario: "",
  });
  const [trampa, setTrampa] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState<"servidor" | "correo" | null>(null);
  const [error, setError] = useState("");

  const cambiar = (campo: string) => (e: { target: { value: string } }) =>
    setDatos((d) => ({ ...d, [campo]: e.target.value }));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trampa) return; // bot
    setError("");
    setEnviando(true);
    const lead: Lead = { ...datos, origen: "formulario" };
    const r = await enviarLead(lead);
    setEnviando(false);
    if (r.ok) setListo(r.via);
    else setError(r.error);
  };

  if (listo) {
    return (
      <div className="rounded-2xl border border-[var(--hairline-strong)] bg-ink-900/40 p-8 md:p-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400">
          <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 font-display text-[24px] font-medium leading-tight tracking-[-0.03em] text-cream-50">
          {listo === "servidor" ? "Listo, lo recibimos." : "Revisa tu correo."}
        </h3>
        <p className="mt-3 font-sans text-[15px] leading-[1.6] text-cream-200">
          {listo === "servidor"
            ? "Te escribimos dentro del día hábil. Si dejaste el RUT, llegamos a la reunión con tus licitaciones ya en pantalla."
            : "Se abrió tu programa de correo con el mensaje escrito. Dale enviar y te respondemos dentro del día hábil."}
        </p>
      </div>
    );
  }

  const campo =
    "w-full rounded-lg border border-[var(--hairline-strong)] bg-ink-950 px-4 py-3 font-sans text-[15px] text-cream-50 outline-none transition-colors placeholder:text-cream-400 focus:border-amber-400/60";
  const etiqueta =
    "block font-sans text-[13.5px] font-medium text-cream-50 mb-1.5";

  return (
    <form
      onSubmit={enviar}
      className="rounded-2xl border border-[var(--hairline-strong)] bg-ink-900/40 p-6 md:p-8"
    >
      {/* Honeypot — invisible para personas, irresistible para bots */}
      <input
        type="text"
        name="sitio-web"
        tabIndex={-1}
        autoComplete="off"
        value={trampa}
        onChange={(e) => setTrampa(e.target.value)}
        aria-hidden
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiqueta} htmlFor="nombre">
            Tu nombre
          </label>
          <input
            id="nombre"
            required
            value={datos.nombre}
            onChange={cambiar("nombre")}
            className={campo}
            placeholder="María Pérez"
          />
        </div>
        <div>
          <label className={etiqueta} htmlFor="empresa">
            Empresa
          </label>
          <input
            id="empresa"
            required
            value={datos.empresa}
            onChange={cambiar("empresa")}
            className={campo}
            placeholder="Comercial Andina"
          />
        </div>
        <div>
          <label className={etiqueta} htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            required
            value={datos.correo}
            onChange={cambiar("correo")}
            className={campo}
            placeholder="maria@empresa.cl"
          />
        </div>
        <div>
          <label className={etiqueta} htmlFor="telefono">
            Teléfono <span className="text-cream-400">· opcional</span>
          </label>
          <input
            id="telefono"
            value={datos.telefono}
            onChange={cambiar("telefono")}
            className={campo}
            placeholder="+56 9 …"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={etiqueta} htmlFor="rut">
          RUT de la empresa <span className="text-cream-400">· opcional</span>
        </label>
        <input
          id="rut"
          value={datos.rut}
          onChange={cambiar("rut")}
          className={campo}
          placeholder="76.543.210-9"
        />
        <p className="mt-2 font-sans text-[13px] leading-[1.5] text-cream-300">
          Si nos lo dejas, llegamos a la reunión con{" "}
          <span className="text-cream-50">tus licitaciones ya en pantalla</span>{" "}
          — las que calzan contigo hoy, sacadas de tu propio historial de ventas
          al Estado.
        </p>
      </div>

      <div className="mt-4">
        <label className={etiqueta} htmlFor="mensaje">
          ¿Qué necesitas? <span className="text-cream-400">· opcional</span>
        </label>
        <textarea
          id="mensaje"
          rows={3}
          value={datos.mensaje}
          onChange={cambiar("mensaje")}
          className={`${campo} resize-none`}
          placeholder="Vendemos insumos de aseo a municipalidades y queremos ordenar cómo postulamos."
        />
      </div>

      <div className="mt-4">
        <span className={etiqueta}>
          ¿Cuándo te acomoda? <span className="text-cream-400">· opcional</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {HORARIOS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() =>
                setDatos((d) => ({ ...d, horario: d.horario === h ? "" : h }))
              }
              className={`rounded-full border px-3.5 py-1.5 font-sans text-[13.5px] transition-colors ${
                datos.horario === h
                  ? "border-amber-400 text-amber-400"
                  : "border-[var(--hairline-strong)] text-cream-200 hover:text-cream-50"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="mt-4 font-sans text-[14px] text-ruby-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-amber-400 px-6 font-sans text-[15px] font-medium text-white transition-all hover:-translate-y-[1px] disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Pedir la reunión"}
        <ArrowUpRight
          className="h-[16px] w-[16px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </button>

      <p className="mt-4 font-sans text-[12.5px] leading-[1.5] text-cream-400">
        Usamos tus datos solo para responderte. Nada de listas de correo.{" "}
        <a href="/privacidad" className="underline hover:text-cream-200">
          Cómo tratamos tus datos
        </a>
        .
        {!hayServidor && (
          <span className="mt-1.5 block text-cream-400">
            {/* Se ve solo mientras no exista el backend. */}
            Nota de desarrollo: aún sin servidor de leads — al enviar se abre tu
            programa de correo.
          </span>
        )}
      </p>
    </form>
  );
}
