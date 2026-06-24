import { useEffect, useState } from "react";

interface Props {
  words: string[];
  typeMs?: number;
  pauseMs?: number;
  deleteMs?: number;
  className?: string;
}

/**
 * Inline typewriter — renders the current text + a blinking caret
 * directly inline (no absolute positioning, no placeholder reservation).
 *
 * Trade-off: trailing content shifts a few pixels as the word changes.
 * Win: no overflow / overlap bugs in any viewport. Use cycling words
 * of similar length and place the typewriter at the END of a phrase
 * so trailing static text doesn't reflow lines.
 */
export default function Typewriter({
  words,
  typeMs = 80,
  pauseMs = 1900,
  deleteMs = 40,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const word = words[index % words.length];

    if (phase === "typing") {
      if (text.length < word.length) {
        const t = setTimeout(
          () => setText(word.slice(0, text.length + 1)),
          typeMs
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(word.slice(0, text.length - 1)),
          deleteMs
        );
        return () => clearTimeout(t);
      }
      setIndex((i) => i + 1);
      setPhase("typing");
    }
  }, [phase, text, index, words, typeMs, pauseMs, deleteMs]);

  return (
    <span className={`whitespace-nowrap ${className}`}>
      {text}
      <span
        aria-hidden
        className="inline-block w-[0.06em] h-[0.82em] align-[-0.05em] ml-[2px] bg-current animate-blink"
      />
    </span>
  );
}
