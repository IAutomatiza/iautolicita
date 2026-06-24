import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view above `threshold`.
 * Honors `prefers-reduced-motion` by snapping to "in view" immediately.
 *
 * Returns [ref, inView]. Attach the ref to whatever should reveal.
 */
export default function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.18
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
