import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Palette, Zap, Globe } from "lucide-react";
import ScrambleText from "./ScrambleText";

const services = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "End-to-end web applications built with MERN stack, Spring Boot, and modern frameworks — optimized for performance and scalability.",
  },
  {
    icon: Palette,
    title: "UI/UX & Frontend",
    description: "Responsive, user-centric interfaces with React, TypeScript, and TailwindCSS — from dashboards to interactive web apps.",
  },
  {
    icon: Zap,
    title: "GenAI Integration",
    description: "AI-powered features including conversational assistants, automated assessments, and RAG-based intelligent systems.",
  },
  {
    icon: Globe,
    title: "Cloud & DevOps",
    description: "Deployment and optimization on Oracle Cloud, GCP, Docker, Vercel, and Railway — ensuring high availability and performance.",
  },
];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="services" className="relative py-32">
      {/* Subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-bg)" }} />

      <div className="container relative px-6 lg:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Services</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
            What I <ScrambleText text="Do" className="gradient-text" />
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="glass-card group p-6 text-center transition-shadow duration-300 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <service.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
