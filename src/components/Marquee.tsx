import { motion } from "framer-motion";

const items = [
  "React", "TypeScript", "Next.js", "Three.js", "Framer Motion",
  "Tailwind CSS", "Node.js", "PostgreSQL", "GraphQL", "Docker",
  "AWS", "Figma", "WebGL", "GSAP",
];

const Marquee = () => {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-lg font-bold uppercase tracking-wider text-muted-foreground/30"
          >
            {item} <span className="mx-4 text-primary/30">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
