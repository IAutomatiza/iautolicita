import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════
        // SISTEMA DE COLOR — 3 TIERS + 2 FUNCIONALES
        //
        // TIER 1 — Neutrales warm stone (toda la estructura)
        //   ink-*    backgrounds, hairlines, borders
        //   cream-*  text scale (dark on light)
        //
        // TIER 2 — Azul institucional (signature voice)
        //   brand-*  full scale, usado para chat IA y headers
        //   amber-*  alias legacy (renderea azul, 275 usos en código)
        //
        // TIER 3 — Gold editorial (UN solo warm accent, disciplinado)
        //   gold-*   live indicators, key numbers, editorial italic moments
        //   Inspirado en Bloomberg/NYT — calidez sin ser naranjo gritón
        //
        // FUNCIONALES (no decorativos, semánticos):
        //   sage     éxito, deltas positivos
        //   ruby     error, riesgo (renombrado desde oxblood)
        // ═══════════════════════════════════════════════════════════

        ink: {
          950: "#FAFAF9", // page bg (lightest warm)
          900: "#F5F5F4", // section subtle bg
          800: "#EDEBE9", // raised surface
          700: "#E7E5E4", // hairline strong
          600: "#D6D3D1", // border default
          500: "#A8A29E", // muted border
        },
        cream: {
          50: "#0A0A0A",  // primary text
          100: "#1F1F1F", // strong text
          200: "#404040", // body text
          300: "#737373", // secondary
          400: "#A8A29E", // tertiary / captions
        },
        brand: {
          50: "#EFF4FF",
          100: "#DBE6FE",
          200: "#BAD0FC",
          300: "#8AB2F9",
          400: "#5790F5",
          500: "#2D6FEC",
          600: "#0064E0", // primary brand blue
          700: "#0052B4",
          800: "#063F88",
          900: "#0B3470",
        },
        // Legacy alias — renderea azul, 275 usos. No tocar.
        amber: {
          50: "#EBF3FF",
          100: "#D2E4FE",
          200: "#A6C8FC",
          300: "#6FA3F8",
          400: "#0064E0", // = brand-600
          500: "#0052B4",
          600: "#063F88",
        },
        // Editorial gold — Tier 3, usar con disciplina
        gold: {
          50:  "#FBF6E8",
          100: "#F4E7B8",
          200: "#EAD082",
          300: "#DDB755",
          400: "#C49B2C", // primary gold — live indicators
          500: "#9E7A1B", // dark gold — print/editorial headlines
          600: "#735812",
        },
        // Funcional success
        sage: {
          400: "#16A34A",
          500: "#15803D",
        },
        // Funcional error (renombrado desde oxblood para claridad)
        ruby: {
          400: "#D80027",
          500: "#A60020",
        },
      },
      fontFamily: {
        condensed: ['"Anton"', "Impact", "sans-serif"],
        display: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      letterSpacing: {
        "tightest": "-0.045em",
        "tighter-2": "-0.03em",
      },
      fontSize: {
        "display-xs": ["2.25rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-sm": ["3rem", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-md": ["4rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-lg": ["5.5rem", { lineHeight: "0.96", letterSpacing: "-0.045em" }],
        "display-xl": ["7.5rem", { lineHeight: "0.94", letterSpacing: "-0.05em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "marquee": "marquee 55s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "blink": "blink 1.1s steps(2, start) infinite",
        "border-beam": "borderBeam 8s linear infinite",
        "draw-bar": "drawBar 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-y": "scrollY 18s linear infinite",
        "halo-pulse": "haloPulse 3s ease-in-out infinite",
        "cinematic-fade-in": "cinematicFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-shadow": "lineShadow 15s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        borderBeam: {
          "100%": { offsetDistance: "100%" },
        },
        drawBar: {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        scrollY: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        haloPulse: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.08)" },
        },
        lineShadow: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% -100%" },
        },
        cinematicFadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.97)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0)" },
        },
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.04) 1px, transparent 1px)",
        "grid-strong":
          "linear-gradient(to right, rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.06) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} satisfies Config;
