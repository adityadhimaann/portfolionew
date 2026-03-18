import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "Dec 2025 — Present",
    role: "Freelancer — Full Stack Developer",
    company: "Upwork",
    description: "Delivering web app development, UI/UX design, and full-stack solutions across diverse project types including EdTech platforms, dashboards, and interactive web applications.",
    achievements: ["Multiple client projects", "End-to-end SDLC management", "Scalable & responsive apps"],
  },
  {
    period: "Jun 2025 — Jul 2025",
    role: "Web Application Developer",
    company: "Larsen & Toubro — Technology Services",
    description: "Designed and deployed a scalable Campus Gateway system used by 500+ employees, achieving 99.9% uptime with optimized backend performance.",
    achievements: ["500+ employees served", "65% latency reduction", "Full-stack on IIS & Hyper-V"],
  },
  {
    period: "Aug 2023 — Jun 2027",
    role: "B.Tech — Computer Science & Engineering",
    company: "Lovely Professional University",
    description: "Pursuing Bachelor of Technology in CSE with a focus on DSA, system design, and full-stack development. CGPA: 7.34.",
    achievements: ["CGPA: 7.34", "SIH 2025 Nominee", "IIT Guwahati Analytics"],
  },
];

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative pt-8 pb-32">
      <div className="container relative px-6 lg:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Experience</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
            Career <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              className={`relative mb-12 pl-16 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
                className={`absolute top-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background ${
                  i % 2 === 0 ? "left-0 md:-right-6 md:left-auto" : "left-0 md:-left-6"
                }`}
              >
                <Briefcase className="h-5 w-5 text-primary" />
              </motion.div>

              <div className="glass-card p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{exp.period}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">{exp.role}</h3>
                <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                <div className={`mt-4 flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                  {exp.achievements.map((a) => (
                    <span key={a} className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
