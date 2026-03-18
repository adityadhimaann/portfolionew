import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";
import { SiOracle, SiMongodb, SiGoogle, SiFreecodecamp } from "react-icons/si";

const certificates = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified",
    issuer: "Oracle",
    period: "Jan 2025 — Apr 2025",
    color: "hsl(0 80% 55%)",
    icon: <SiOracle style={{ fontSize: 24, color: "#F80000" }} />,
  },
  {
    title: "Getting Started with MongoDB Atlas",
    issuer: "MongoDB",
    period: "May 2025 — Jun 2025",
    color: "hsl(120 45% 45%)",
    icon: <SiMongodb style={{ fontSize: 24, color: "#47A248" }} />,
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    period: "Apr 2025 — May 2025",
    color: "hsl(210 80% 55%)",
    icon: <SiGoogle style={{ fontSize: 24, color: "#4285F4" }} />,
  },
  {
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    period: "Aug 2023 — Nov 2023",
    color: "hsl(38 92% 50%)",
    icon: <SiFreecodecamp style={{ fontSize: 24, color: "#ffffff" }} />,
  },
];

const Certificates = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certificates" className="relative py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-bg)" }} />
      <div className="container relative px-6 lg:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Credentials</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
            Certifi<span className="gradient-text">cations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Industry-recognized certifications that validate my expertise.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card group relative overflow-hidden p-6 transition-colors hover:border-primary/50 cursor-default"
            >
              {/* Accent glow */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
                style={{ background: cert.color }}
              />

              <div className="flex items-start gap-4">
                {/* Logo Icon */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                >
                  {cert.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-bold leading-tight text-foreground sm:text-base">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium" style={{ color: cert.color }}>
                    {cert.issuer}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Award size={12} className="text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">{cert.period}</span>
                  </div>
                </div>
              </div>

              {/* Hover accent bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                style={{ background: cert.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
