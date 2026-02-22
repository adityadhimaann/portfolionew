import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState("");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) {
      setHidden(true);
      return;
    }

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setHovered(true);
        setLabel(interactive.getAttribute("data-cursor") || "");
      }
    };

    const out = () => {
      setHovered(false);
      setLabel("");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden mix-blend-difference md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            width: hovered ? 56 : clicking ? 14 : 32,
            height: hovered ? 56 : clicking ? 14 : 32,
            borderRadius: "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/40 bg-foreground/5"
        >
          {label && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          animate={{
            width: hovered ? 4 : 6,
            height: hovered ? 4 : 6,
            opacity: hovered ? 0.5 : 1,
          }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        />
      </motion.div>

      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
