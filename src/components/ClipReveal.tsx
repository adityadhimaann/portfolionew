import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const clipPaths = {
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0 0 0 0)" },
  down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0 0)" },
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0 0 0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0)" },
};

const ClipReveal = ({ children, className = "", direction = "up" }: ClipRevealProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const paths = clipPaths[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: paths.hidden, opacity: 0 }}
      animate={inView ? { clipPath: paths.visible, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ClipReveal;
