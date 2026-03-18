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
  video?: string;
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
    demo: "https://uniedplatform.vercel.app",
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useState(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 2) * 33}%`]);

  // Mobile: simple horizontal scroll layout
  if (isMobile) {
    return (
      <section id="projects" className="relative py-24">
        <div className="container px-6" ref={headerRef}>
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

        <div className="mt-10 flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
          {projects.map((project) => (
            <div key={project.title} className="snap-start flex-shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: sticky scroll-jacking
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
  const { ref: tiltRef, onMouseMove, onMouseLeave: onTiltLeave } = useTilt(15);

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
      className="group w-[min(85vw,500px)] flex-shrink-0 cursor-pointer relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Deep 3D Outer Glow - Replaced with box-shadow for performance */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 50px -10px rgba(245, 158, 11, 0.4)",
          transform: "translateZ(-10px)"
        }}
      />

      {/* Main Glass Container */}
      <div 
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl transition-colors duration-500 group-hover:border-primary/40 group-hover:bg-[#1A1A1A]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image/Video Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-black" style={{ transform: "translateZ(10px)" }}>
          {project.video ? (
            <video
              src={project.video}
              className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}
          
          {/* Richer gradient overlay matching bottom black base */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent pointer-events-none" />

          {/* Overlay links - pushed strongly to the front in 3D */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ transform: "translateZ(60px)" }}
          >
            {project.demo && (
              <a
                href={project.demo}
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-transform hover:scale-105"
                aria-label={`View demo of ${project.title}`}
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-white/20"
                aria-label={`View source of ${project.title}`}
              >
                <Github size={16} /> Code
              </a>
            )}
          </div>
        </div>

        {/* Info Container - pops out strongly! */}
        <div className="p-6 sm:p-8" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            {project.featured && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                Featured
              </span>
            )}
          </div>
          
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-3">
            {project.description}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors group-hover:border-primary/30 group-hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Holographic Shine effect overlay - Optimized */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "linear-gradient(115deg, transparent 20%, rgba(245, 158, 11, 0.1) 40%, rgba(255, 255, 255, 0.05) 50%, rgba(245, 158, 11, 0.1) 60%, transparent 80%)",
            transform: "translateZ(40px)" 
          }}
        />
      </div>
    </div>
  );
};

export default Projects;
