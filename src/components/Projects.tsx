import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import ScrambleText from "./ScrambleText";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demo?: string;
  github?: string;
  category: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "SyncRide",
    description: "GenAI-powered bus travel assistant with real-time delay prediction, intercept suggestions, and last-mile planning to reduce missed buses for budget travelers.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "GenAI"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    demo: "https://syncride-d95f4.web.app/",
    github: "https://github.com/adityadhimaann/sync-ride-assist",
    category: "GenAI",
    featured: true,
  },
  {
    title: "UniEd",
    description: "Scalable ed-tech platform with student registration, live lecture streaming via WebRTC, AI-powered assessment tutor, and centralized grading. Generated ₹25,000+ revenue.",
    tags: ["React", "TypeScript", "Node.js", "Socket.IO", "WebRTC", "GenAI"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    demo: "https://www.uniedplatform.vercel.app",
    github: "https://www.github.com/adityadhimaann/unied",
    category: "EdTech",
    featured: true,
    video: "/lkdin.mp4",
  },
  {
    title: "WeChat",
    description: "Real-time chat application with instant messaging, Discover and Share Memories features for enhanced social engagement and dynamic content sharing.",
    tags: ["React Native", "Node.js", "MongoDB", "Socket.IO"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    demo: "https://wechat-dun.vercel.app/",
    github: "https://github.com/adityadhimaann/wechat",
    category: "Mobile",
    featured: true,
  },
  {
    title: "Campus Gateway",
    description: "Enterprise campus management system deployed at L&T for 500+ employees with 99.9% uptime and 65% latency reduction through optimized MySQL queries.",
    tags: ["HTML", "CSS", "JavaScript", "MySQL", "Hyper-V"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "Enterprise",
  },
  
  {
    title: "MediBot",
    description: "AI-powered medical symptom checker chatbot with multilingual support, appointment scheduling, and integration with hospital management systems.",
    tags: ["Python", "FastAPI", "React", "OpenAI", "MongoDB"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    demo: "https://aivaai.vercel.app/",
    github: "https://github.com/adityadhimaann/AIVA",
    category: "HealthTech",
    featured: true,
  },
  
  {
    title: "SmartAgri",
    description: "IoT-powered smart agriculture monitoring system with crop health prediction, weather integration, and automated irrigation scheduling. SIH 2025 nominee.",
    tags: ["React", "Node.js", "Python", "IoT", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    demo: "#",
    github: "#",
    category: "IoT/AgriTech",
    featured: true,
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 2) * 33}%`]);

  return (
    <section id="projects" ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="container px-6 pt-24 lg:px-12" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Work</p>
            <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
              Selected <ScrambleText text="Projects" className="gradient-text" />
            </h2>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="mt-10 flex flex-1 items-center gap-8 px-6 lg:px-12">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref: tiltRef, onMouseMove, onMouseLeave: onTiltLeave } = useTilt(10);

  const handleMouseLeave = () => {
    setIsHovered(false);
    onTiltLeave();
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={(e) => {
        onMouseMove(e);
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      className="glass-card group w-[min(80vw,500px)] flex-shrink-0 cursor-pointer overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image or Video */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.video ? (
          <video
            src={project.video}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: "cover" }}
          />
        ) : (
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Overlay links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center gap-3 bg-background/40 backdrop-blur-sm"
        >
          {project.demo && (
            <a
              href={project.demo}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              aria-label={`View demo of ${project.title}`}
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              className="flex items-center gap-2 rounded-full border border-foreground/20 bg-background/80 px-4 py-2 text-sm font-semibold text-foreground"
              aria-label={`View source of ${project.title}`}
            >
              <Github size={14} /> Code
            </a>
          )}
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
          {project.featured && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Featured
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: isHovered
            ? "linear-gradient(105deg, transparent 40%, hsl(38 92% 55% / 0.05) 45%, transparent 50%)"
            : "none",
        }}
      />
    </div>
  );
};

export default Projects;
