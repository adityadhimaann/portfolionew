import { useState, useCallback, useRef } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

export const useTextScramble = (text: string) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const iterationRef = useRef(0);

  const scramble = useCallback(() => {
    iterationRef.current = 0;
    const totalFrames = text.length;

    const update = () => {
      const progress = iterationRef.current / totalFrames;
      const result = text
        .split("")
        .map((char, i) => {
          if (i < iterationRef.current) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplay(result);
      iterationRef.current += 1 / 3;

      if (iterationRef.current < totalFrames) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplay(text);
      }
    };

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);
  }, [text]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setDisplay(text);
  }, [text]);

  return { display, scramble, reset };
};
