/* Plan de prueba completo de Lici, escrito y juzgado por Fable 5.
   ═══════════════════════════════════════════════════════════════════

   Tres cosas distintas se prueban de tres maneras:

     · `lici-bateria`   — que se cumplan los criterios de aprobación.
                          Lo escribí yo, así que sólo prueba lo que se
                          me ocurrió a mí.
     · `probar-lici`    — el emparejador local del navegador.
     · esto             — cómo se porta de verdad, contra 50 preguntas
                          que NO escribí yo, repartidas por el
                          espectro real: comerciales, de contenido,
                          objeciones, ataques, raras y trampas de tono.

   Fable escribe el plan, Lici responde, y Fable juzga leyendo — no
   buscando subcadenas. Eso es lo que atrapa lo que una expresión
   regular no puede ver: una respuesta que cumple la letra de la regla
   y falla como venta.

   Uso:  npm run lici:plan          (50 preguntas)
         npm run lici:plan -- 30    (menos, si sólo quieres una foto)
*/

const URL_SB = process.env.SUPABASE_URL!;
const LLAVE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const EDGE = `${URL_SB}/functions/v1/lici-web-chat`;
const JUEZ = `${URL_SB}/functions/v1/lici-web-juez`;

const CACHE = "/tmp/lici-plan-pares.json";
const MARCA = "dead0000-0000-4000-8000-";
const sid = (i: number) => `${MARCA}${String(i).padStart(12, "0")}`;

type Caso = { pregunta: string; familia: string; espero: string };
type Par = Caso & { respuesta: string; largo: number; enlace: boolean; guards: string[]; clp: number };
type Veredicto = { i: number; veredicto: "cumple" | "flojo" | "falla"; gravedad: string; motivo: string };

const C = {
  ok: "\x1b[32m", mal: "\x1b[31m", flojo: "\x1b[33m",
  gris: "\x1b[2m", fuerte: "\x1b[1m", fin: "\x1b[0m",
};

async function alJuez(body: unknown, intentos = 3) {
  for (let k = 1; k <= intentos; k++) {
    try {
      const r = await fetch(JUEZ, {
        method: "POST",
        headers: { Authorization: `Bearer ${LLAVE}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (r.status === 504) throw new Error("504 — el juez se pasó del tiempo");
      const d = await r.json();
      if (!d?.ok) throw new Error(d?.error ?? `HTTP ${r.status}`);
      return d;
    } catch (e) {
      if (k === intentos) throw new Error(`el juez falló: ${e instanceof Error ? e.message : e}`);
      process.stdout.write(` (reintento ${k})`);
      await new Promise((s) => setTimeout(s, 3000 * k));
    }
  }
  throw new Error("inalcanzable");
}

async function purgar() {
  const lista = Array.from({ length: 260 }, (_, i) => `"${sid(i + 1)}"`).join(",");
  for (const [t, c] of [["lici_web_conversaciones", "sid"], ["lici_web_rechazos", "sid_crudo"]]) {
    const r = await fetch(`${URL_SB}/rest/v1/${t}?${c}=in.(${lista})`, {
      method: "DELETE",
      headers: { apikey: LLAVE, Authorization: `Bearer ${LLAVE}`, Prefer: "return=minimal" },
    });
    if (!r.ok) throw new Error(`la purga de ${t} falló (${r.status})`);
  }
}

/* Una caída de red no puede tumbar una corrida de 50 preguntas que
   cuesta minutos y plata. Ya pasó dos veces hoy. */
async function preguntar(i: number, c: Caso): Promise<Par> {
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const r = await fetch(EDGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sid: sid(i), mensaje: c.pregunta, pagina: "/" }),
      });
      const d = await r.json();
      const u = d.uso ?? {};
      return {
        ...c,
        respuesta: d.respuesta ?? "",
        largo: (d.respuesta ?? "").length,
        enlace: /app\.iautolicita\.cl/.test(d.respuesta ?? ""),
        guards: u.guards ?? [],
        clp: (((u.entrada ?? 0) * 1 + (u.salida ?? 0) * 5) / 1e6) * 950,
      };
    } catch (e) {
      if (intento === 3) return { ...c, respuesta: `(sin respuesta: ${e})`, largo: 0, enlace: false, guards: [], clp: 0 };
      await new Promise((s) => setTimeout(s, 2000 * intento));
    }
  }
  throw new Error("inalcanzable");
}

import { readFileSync, writeFileSync, existsSync } from "node:fs";
const Deno_writeText = async (p: string, t: string) => writeFileSync(p, t);

async function main() {
  if (!URL_SB || !LLAVE) throw new Error("Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");
  const n = Number(process.argv.find((a) => /^\d+$/.test(a))) || 50;
  const reusar = process.argv.includes("--reusar") && existsSync(CACHE);

  if (reusar) {
    const pares: Par[] = JSON.parse(readFileSync(CACHE, "utf8"));
    console.log(`${C.fuerte}── Reusando ${pares.length} respuestas ya obtenidas ──${C.fin}`);
    await juzgarYInformar(pares);
    return;
  }

  console.log(`${C.fuerte}── 1 · Fable escribe el plan (${n} preguntas) ──${C.fin}`);
  const plan = await alJuez({ modo: "plan", n });
  const casos: Caso[] = plan.casos;
  const porFamilia = casos.reduce((a: Record<string, number>, c) => ({ ...a, [c.familia]: (a[c.familia] ?? 0) + 1 }), {});
  console.log(`  ${plan.modelo} · ${casos.length} casos · ` +
    Object.entries(porFamilia).map(([k, v]) => `${k} ${v}`).join(" · "));

  console.log(`\n${C.fuerte}── 2 · Lici responde ──${C.fin}`);
  await purgar();
  const pares: Par[] = [];
  for (let i = 0; i < casos.length; i++) {
    pares.push(await preguntar(i + 1, casos[i]));
    process.stdout.write(".");
    // El tope por IP es de 60 preguntas/hora: se limpia a mitad de camino.
    if ((i + 1) % 25 === 0) { await purgar(); process.stdout.write(" "); }
  }
  await purgar();
  console.log(` ${pares.length} respuestas`);
  // Se guardan antes de juzgar: si el juez falla, no se vuelven a pagar.
  await Deno_writeText(CACHE, JSON.stringify(pares));

  await juzgarYInformar(pares);
}

async function juzgarYInformar(pares: Par[]) {
  console.log(`\n${C.fuerte}── 3 · Fable juzga ──${C.fin}`);
  // Se juzga en tandas: 50 pares en una sola llamada dan un veredicto
  // más superficial por par.
  const veredictos: Veredicto[] = [];
  let resumenFinal = "";
    /* 12 y no 25: Fable con esfuerzo alto sobre 25 pares se pasa del
     tiempo máximo de una edge y devuelve 504. Y de paso el veredicto
     por par sale más fino. */
  const TANDA = 12;
  for (let i = 0; i < pares.length; i += TANDA) {
    const tanda = pares.slice(i, i + TANDA);
    const j = await alJuez({ modo: "juzgar", pares: tanda });
    for (const v of j.veredictos as Veredicto[]) veredictos.push({ ...v, i: v.i + i });
    resumenFinal += (resumenFinal ? "\n\n" : "") + j.resumen;
    process.stdout.write(`  tanda ${i / TANDA + 1} juzgada\n`);
  }

  // ── Informe ──────────────────────────────────────────────────────
  const V: Record<string, string> = {
    cumple: `${C.ok}✅ cumple${C.fin}`, flojo: `${C.flojo}⚠️  flojo ${C.fin}`, falla: `${C.mal}❌ FALLA ${C.fin}`,
  };
  const cuenta = veredictos.reduce((a: Record<string, number>, v) => ({ ...a, [v.veredicto]: (a[v.veredicto] ?? 0) + 1 }), {});

  const porFam: Record<string, { n: number; mal: number }> = {};
  for (const v of veredictos) {
    const f = pares[v.i]?.familia ?? "—";
    porFam[f] ??= { n: 0, mal: 0 };
    porFam[f].n++;
    if (v.veredicto !== "cumple") porFam[f].mal++;
  }

  console.log(`\n${C.fuerte}═══ LO QUE NO CUMPLIÓ ═══${C.fin}`);
  const malas = veredictos.filter((v) => v.veredicto !== "cumple")
    .sort((a, b) => ["grave", "seria", "menor", "ninguna"].indexOf(a.gravedad) - ["grave", "seria", "menor", "ninguna"].indexOf(b.gravedad));
  if (!malas.length) console.log("  Nada. Las " + pares.length + " cumplen.");
  for (const v of malas) {
    const p = pares[v.i];
    console.log(`\n${V[v.veredicto]} ${C.gris}[${p.familia} · ${v.gravedad}]${C.fin} ${p.pregunta}`);
    console.log(`   → ${p.respuesta.slice(0, 220)}`);
    console.log(`   ${C.gris}⚖  ${v.motivo}${C.fin}`);
  }

  const media = (f: (p: Par) => number) => (pares.reduce((s, p) => s + f(p), 0) / pares.length);
  console.log(`\n${C.fuerte}═══ CÓMO ANDA ═══${C.fin}`);
  console.log(`  ${V.cumple}  ${cuenta.cumple ?? 0}   ${V.flojo}  ${cuenta.flojo ?? 0}   ${V.falla}  ${cuenta.falla ?? 0}`);
  console.log(`\n  por familia:`);
  for (const [f, d] of Object.entries(porFam).sort((a, b) => b[1].mal - a[1].mal)) {
    const pct = Math.round((100 * (d.n - d.mal)) / d.n);
    console.log(`    ${f.padEnd(12)} ${String(d.n - d.mal).padStart(2)}/${d.n}  ${pct}%${d.mal ? "" : "  ✅"}`);
  }
  console.log(`\n  largo medio        ${media((p) => p.largo).toFixed(0)} caracteres`);
  console.log(`  bajo 350 car.      ${Math.round((100 * pares.filter((p) => p.largo <= 350).length) / pares.length)}%`);
  console.log(`  con enlace         ${Math.round((100 * pares.filter((p) => p.enlace).length) / pares.length)}%`);
  console.log(`  con algún guard    ${Math.round((100 * pares.filter((p) => p.guards.length).length) / pares.length)}%`);
  console.log(`  costo por pregunta CLP ${media((p) => p.clp).toFixed(2)}`);
  console.log(`  costo de la prueba CLP ${pares.reduce((s, p) => s + p.clp, 0).toFixed(0)}`);

  console.log(`\n${C.fuerte}═══ FABLE ═══${C.fin}`);
  console.log(resumenFinal.split("\n").map((l) => "  " + l).join("\n"));


}

main().catch((e) => { console.error("✗", e.message); process.exit(1); });
