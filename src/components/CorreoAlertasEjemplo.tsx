/* El correo de cada mañana, dibujado con datos de ejemplo.

   25-nov (W5, aprobado por Carlos): las páginas comerciales eran pura
   letra y nunca se veía qué recibe el cliente. Esto copia la forma del
   correo real (mp-alertas-resumen-diario) con compras inventadas: no
   sale nada de la base. Es HTML y no una imagen para que se lea
   nítido en cualquier pantalla y no pese. aria-hidden porque es
   decorativo: el texto que importa para Google sigue siendo el de la
   página. */

const CIERRAN = [
  { n: "01", t: "Tóner para impresoras de la oficina de partes", tipo: "Compra Ágil", cierre: "cierra hoy 17:00", org: "Municipalidad de ejemplo" },
];
const NUEVAS = [
  { n: "01", t: "Suministro anual de insumos de impresión", tipo: "Licitación", cierre: "cierra jueves 14:00", org: "Servicio de Salud de ejemplo" },
  { n: "02", t: "Cartuchos de tinta para liceo", tipo: "Compra Ágil", cierre: "cierra mañana 16:00", org: "Liceo de ejemplo" },
];

function Fila({ f }: { f: (typeof CIERRAN)[number] }) {
  return (
    <div className="flex gap-3 border-b border-black/[0.07] py-3 last:border-b-0">
      <span className="w-5 shrink-0 font-sans text-[13px] font-semibold tabular-nums text-[#0064E0]">{f.n}</span>
      <div className="min-w-0">
        <p className="font-sans text-[14.5px] font-semibold leading-snug text-[#0A0A0A]">{f.t}</p>
        <p className="mt-1 font-sans text-[12.5px] text-[#57534E]">
          {f.tipo} · <span className="font-semibold text-[#D80027]">{f.cierre}</span>
        </p>
        <p className="mt-0.5 font-sans text-[12.5px] text-[#78716C]">{f.org}</p>
      </div>
    </div>
  );
}

export default function CorreoAlertasEjemplo() {
  return (
    <figure className="mt-14">
      <figcaption className="mb-4">
        <span className="font-display font-medium text-[22px] md:text-[26px] leading-tight tracking-[-0.03em] text-cream-50">
          Así te llega cada mañana
        </span>
        <span className="mt-1.5 block font-sans text-[14px] text-cream-400">
          Ejemplo con compras inventadas. El tuyo trae las de tu rubro.
        </span>
      </figcaption>

      <div aria-hidden="true" className="select-none rounded-2xl bg-[#EEF1F6] p-3 sm:p-6">
        <div className="mx-auto max-w-[520px] overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_-30px_rgba(0,40,120,0.45)]">
          <div className="border-b border-black/[0.07] px-5 py-3.5 sm:px-7">
            <p className="font-sans text-[12px] text-[#78716C]">
              De: <b className="font-semibold text-[#0A0A0A]">IAutoLicita</b> · Asunto:{" "}
              <b className="font-semibold text-[#0A0A0A]">1 licitación y 2 Compras Ágiles</b>
            </p>
          </div>
          <div className="px-5 py-5 sm:px-7 sm:py-6">
            <p className="font-sans text-[17px] font-semibold tracking-[-0.01em] text-[#0A0A0A]">
              <span className="text-[#0064E0]">IA</span>utoLicita<span className="text-[#0064E0]">.</span>
            </p>
            <p className="mt-4 font-sans text-[24px] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-[#0A0A0A] sm:text-[28px]">
              Tu día en <span className="text-[#0064E0]">Mercado Público.</span>
            </p>
            <p className="mt-3 font-sans text-[14.5px] leading-[1.55] text-[#44403C]">
              <b className="text-[#0A0A0A]">3</b> abiertas calzan con lo que vendes: 1 licitación y 2 Compras Ágiles.
            </p>

            <p className="mt-5 font-sans text-[14px] font-semibold text-[#0A0A0A]">Cierran hoy · 1</p>
            <div>{CIERRAN.map((f) => <Fila key={f.t} f={f} />)}</div>

            <p className="mt-4 font-sans text-[14px] font-semibold text-[#0A0A0A]">Nuevas desde ayer · 2</p>
            <div>{NUEVAS.map((f) => <Fila key={f.t} f={f} />)}</div>

            <div className="mt-5 flex justify-center">
              <span className="rounded-md bg-[#0064E0] px-6 py-2.5 font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-white">
                Ver en IAutoLicita
              </span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
