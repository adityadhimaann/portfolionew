import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LightLinesProps {
  children?: ReactNode;
  className?: string;
  /** Number of vertical lines */
  lineCount?: number;
  /** Base amber color for the glow — CSS color string */
  color?: string;
  /** Speed multiplier for the pulse animation */
  speed?: number;
}

/**
 * Animated vertical light-line grid with ambient amber glow.
 * Renders a <canvas> behind `children`.
 */
export function LightLines({
  children,
  className,
  lineCount = 5,
  color = "rgba(217, 169, 56, 0.12)", // amber-500 @ 12 %
  speed = 1,
}: LightLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let destroyed = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    /* -------- animation state -------- */
    interface Orb {
      x: number; // 0-1 normalised x along line
      y: number; // current pixel y
      vy: number; // velocity
      radius: number;
      alpha: number;
      phase: number; // sin offset for pulse
    }

    const orbs: Orb[] = [];

    // create 2-3 orbs per line
    for (let l = 0; l < lineCount; l++) {
      const orbsPerLine = 2 + Math.floor(Math.random() * 2);
      for (let o = 0; o < orbsPerLine; o++) {
        orbs.push({
          x: (l + 0.5) / lineCount, // centre of each column
          y: Math.random() * 2000,
          vy: -(20 + Math.random() * 40) * speed, // move upward
          radius: 60 + Math.random() * 100,
          alpha: 0.08 + Math.random() * 0.12,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let prev = performance.now();

    const draw = (now: number) => {
      if (destroyed) return;
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;

      const w = canvas.width / (Math.min(window.devicePixelRatio, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio, 2));

      ctx.clearRect(0, 0, w, h);

      /* --- vertical lines --- */
      for (let i = 0; i < lineCount; i++) {
        const lx = ((i + 0.5) / lineCount) * w;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, h);
        ctx.strokeStyle = "rgba(217, 169, 56, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* --- glowing orbs travelling along lines --- */
      for (const orb of orbs) {
        orb.y += orb.vy * dt;
        // wrap around
        if (orb.y < -orb.radius * 2) orb.y = h + orb.radius;
        if (orb.y > h + orb.radius * 2) orb.y = -orb.radius;

        const pulse = 0.7 + 0.3 * Math.sin(now * 0.001 * speed + orb.phase);
        const px = orb.x * w;
        const py = orb.y;

        // radial glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, orb.radius * pulse);
        grad.addColorStop(0, `rgba(217, 169, 56, ${orb.alpha * pulse})`);
        grad.addColorStop(0.5, `rgba(217, 169, 56, ${orb.alpha * pulse * 0.3})`);
        grad.addColorStop(1, "rgba(217, 169, 56, 0)");

        ctx.beginPath();
        ctx.arc(px, py, orb.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // bright core dot
        const coreGrad = ctx.createRadialGradient(px, py, 0, px, py, 4);
        coreGrad.addColorStop(0, `rgba(255, 210, 80, ${0.8 * pulse})`);
        coreGrad.addColorStop(1, "rgba(255, 210, 80, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      /* --- horizontal scan line (subtle) --- */
      const scanY = ((now * 0.03 * speed) % (h + 200)) - 100;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, "rgba(217, 169, 56, 0)");
      scanGrad.addColorStop(0.5, "rgba(217, 169, 56, 0.03)");
      scanGrad.addColorStop(1, "rgba(217, 169, 56, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [lineCount, color, speed]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
