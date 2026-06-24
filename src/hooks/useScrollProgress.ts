import { useEffect, useRef, useState, type RefObject } from "react";

interface Options {
  /** How much of the viewport the transition spans (0-1). Higher = slower. */
  span?: number;
  /** Easing curve. "easeOutCubic" for soft landings, "linear" for raw scrub. */
  easing?: "linear" | "easeOutCubic" | "easeOutQuart";
}

const easings = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
};

/**
 * Returns scroll progress (0 → 1) for an element as it travels up
 * the viewport. Use this with `lerp(from, to, progress)` to drive
 * any transform (scale, rotate, translate, opacity, blur).
 *
 * Salix / Apple / Linear all use this primitive for the
 * "image grows as you scroll" effect.
 */
export default function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
): [RefObject<T>, number] {
  const { span = 0.75, easing = "easeOutCubic" } = options;
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const ease = easings[easing];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // raw: 0 when element top is at viewport bottom; 1 when at top.
      const raw = 1 - rect.top / vh;
      const clamped = Math.max(0, Math.min(1, raw / span));
      setProgress(ease(clamped));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [span, easing]);

  return [ref, progress];
}

/** Linear interpolation helper */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
