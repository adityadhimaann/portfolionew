import { useRef, useCallback } from "react";

export const useTilt = (intensity = 15) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      ref.current.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.03, 1.03, 1.03)`;
      ref.current.style.transition = "transform 0.1s ease-out";
    },
    [intensity]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    ref.current.style.transition = "transform 0.5s ease-out";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};
