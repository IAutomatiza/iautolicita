import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "es-CL" | "plain";
  duration?: number;
  decimals?: number;
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  format = "es-CL",
  duration = 1400,
  decimals = 0,
}: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutQuart
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted =
    format === "es-CL"
      ? display.toLocaleString("es-CL", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : display.toFixed(decimals);

  return (
    <span ref={ref} className="num">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
