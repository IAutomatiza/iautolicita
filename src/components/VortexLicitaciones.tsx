import { useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════
   Vórtice de licitaciones — clon del vortex de texto de
   contentarchitecture.dev (vía Mobbin): anillos concéntricos de
   texto mono blanco girando lento hacia el centro sobre panel
   oscuro con puntos, con destellos de caracteres "revueltos".
   Aquí los anillos son datos reales de licitaciones.

   Cada anillo se prerenderiza a un canvas propio y por frame
   solo se dibuja rotado (barato); el revuelto re-renderiza un
   anillo cada tanto. Con movimiento reducido queda estático.
═══════════════════════════════════════════════════════════════ */

const LINEAS = [
  "SCORE DE CALCE 87/100 · CIERRA EN 2 DÍAS · ",
  "2211-14-LP26 MANTENCIÓN DE ÁREAS VERDES · MUNICIPALIDAD DE ANTOFAGASTA · ",
  "LO PAGADO, NO LO ADJUDICADO · ÍTEM POR ÍTEM · ",
  "441.000 LICITACIONES · 7,2M ADJUDICACIONES · 6,4M ÓRDENES DE COMPRA · ",
  "1057-412-LP25 MINSAL · $152,4M ADJUDICADA · OFERTA GANADORA $139,9M · ",
  "LICI LEE LAS BASES Y CITA LA PÁGINA EXACTA · ",
  "2239-77-LE25 JUNAEB · DETECTADA EL DÍA 1 · ",
  "GARANTÍA 5% DEL TOTAL · DECLARACIÓN JURADA · BOLETA DE GARANTÍA · ",
  "MERCADO PÚBLICO EN TIEMPO REAL · 99,94% DE COBERTURA · ",
  "3411-08-LQ25 GORE BIOBÍO · OFERTA ADMISIBLE A LA PRIMERA · ",
  "LICITACIONES · COMPRA ÁGIL · CONVENIO MARCO · ",
  "1,8% BAJO LA MEDIANA · MARGEN INTACTO · ",
];

const GLIFOS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%·—";

export default function VortexLicitaciones() {
  const contRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cont = contRef.current;
    const canvas = canvasRef.current;
    if (!cont || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const FUENTE = '11.5px "Geist Mono", ui-monospace, monospace';
    const R0 = 34; // radio del anillo interior
    const PASO = 33; // separación entre anillos

    let anillos: {
      lienzo: HTMLCanvasElement;
      radio: number;
      angulo: number;
      velocidad: number;
      alfa: number;
      texto: string;
    }[] = [];
    let fondo: HTMLCanvasElement | null = null;
    let W = 0;
    let H = 0;
    let raf = 0;
    let visible = false;
    let ultimoRevuelto = 0;

    const pintarAnillo = (a: (typeof anillos)[number], revolver: boolean) => {
      const lctx = a.lienzo.getContext("2d")!;
      const s = a.lienzo.width / dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, s, s);
      lctx.font = FUENTE;
      lctx.textAlign = "center";
      lctx.textBaseline = "middle";
      lctx.fillStyle = `rgba(255,255,255,${a.alfa})`;

      const anchoChar = lctx.measureText("M").width;
      const pasoAng = anchoChar / a.radio;
      const n = Math.floor((Math.PI * 2) / pasoAng);
      // segmento revuelto: un tramo corto de caracteres al azar
      const iniRev = revolver ? Math.floor(Math.random() * n) : -1;
      const largoRev = 4 + Math.floor(Math.random() * 5);

      for (let i = 0; i < n; i++) {
        let ch = a.texto[i % a.texto.length];
        if (iniRev >= 0 && ((i - iniRev + n) % n) < largoRev && ch !== " ") {
          ch = GLIFOS[Math.floor(Math.random() * GLIFOS.length)];
        }
        const ang = i * pasoAng;
        lctx.save();
        lctx.translate(s / 2 + Math.cos(ang) * a.radio, s / 2 + Math.sin(ang) * a.radio);
        lctx.rotate(ang + Math.PI / 2);
        lctx.fillText(ch, 0, 0);
        lctx.restore();
      }
    };

    const construir = () => {
      const rect = cont.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      // hasta las esquinas, como el original (los anillos se recortan)
      const maxR = Math.hypot(W / 2, H / 2);
      const cuenta = Math.max(6, Math.ceil((maxR - R0) / PASO));

      anillos = [];
      for (let i = 0; i < cuenta; i++) {
        const radio = R0 + i * PASO;
        const s = (radio + 16) * 2;
        const lienzo = document.createElement("canvas");
        lienzo.width = s * dpr;
        lienzo.height = s * dpr;
        const a = {
          lienzo,
          radio,
          angulo: Math.random() * Math.PI * 2,
          // alternar sentido; los interiores giran más rápido
          velocidad: (i % 2 === 0 ? 1 : -1) * (0.05 + 0.10 / (1 + i * 0.35)),
          // brillo alternado como el original
          alfa: i % 3 === 0 ? 0.92 : i % 3 === 1 ? 0.55 : 0.34,
          texto: LINEAS[i % LINEAS.length],
        };
        pintarAnillo(a, false);
        anillos.push(a);
      }

      // fondo: puntos finos en circunferencias intermedias
      fondo = document.createElement("canvas");
      fondo.width = W * dpr;
      fondo.height = H * dpr;
      const fctx = fondo.getContext("2d")!;
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.fillStyle = "rgba(255,255,255,0.13)";
      for (let i = 0; i < cuenta; i++) {
        const r = R0 + i * PASO + PASO / 2;
        const n = Math.floor((Math.PI * 2 * r) / 9);
        for (let j = 0; j < n; j++) {
          const ang = (j / n) * Math.PI * 2;
          fctx.fillRect(W / 2 + Math.cos(ang) * r, H / 2 + Math.sin(ang) * r, 1, 1);
        }
      }
    };

    const dibujar = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (fondo) ctx.drawImage(fondo, 0, 0, W, H);
      for (const a of anillos) {
        const s = a.lienzo.width / dpr;
        ctx.save();
        ctx.translate(W / 2, H / 2);
        ctx.rotate(a.angulo);
        ctx.drawImage(a.lienzo, -s / 2, -s / 2, s, s);
        ctx.restore();
      }
    };

    let tPrevio = 0;
    const paso = (t: number) => {
      raf = requestAnimationFrame(paso);
      const dt = tPrevio ? Math.min((t - tPrevio) / 1000, 0.05) : 0;
      tPrevio = t;
      for (const a of anillos) a.angulo += a.velocidad * dt;
      // cada ~700ms un anillo al azar muestra un tramo revuelto
      if (t - ultimoRevuelto > 700 && anillos.length) {
        ultimoRevuelto = t;
        const a = anillos[Math.floor(Math.random() * anillos.length)];
        pintarAnillo(a, true);
        setTimeout(() => pintarAnillo(a, false), 380);
      }
      dibujar();
    };

    construir();
    dibujar();

    // animar solo cuando está en pantalla
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        cancelAnimationFrame(raf);
        tPrevio = 0;
        if (visible && !quieto) raf = requestAnimationFrame(paso);
      },
      { threshold: 0.05 }
    );
    io.observe(cont);

    const ro = new ResizeObserver(() => {
      construir();
      dibujar();
    });
    ro.observe(cont);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={contRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block" aria-hidden />
    </div>
  );
}
