import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from "lucide-react";
import ScrambleText from "./ScrambleText";

interface Activity {
  id: number;
  year: string;
  category: string;
  title: string;
  subtitle: string;
  location: string;
  images?: string[];
  image?: string;
  link?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    year: "2025",
    category: "hackathon",
    title: "Team Leadership at FinArva AI Hackathon",
    subtitle: "Team Lead | With strong team support",
    location: "Gurugram, Haryana",
    image: "/e.jpeg",
    link: "#",
  },
  {
    id: 2,
    year: "2025",
    category: "internship",
    title: "SDE Intern",
    subtitle: "@Larsen & Toubro",
    location: "Faridabad, Haryana",
    images: ["/d.jpeg", "/b.jpg", "/a.jpg"],
    link: "#",
  },
  {
    id: 3,
    year: "2024",
    category: "project",
    title: "#building in AI",
    subtitle: "@SarvamAI",
    location: "Noida, Uttar Pradesh",
    image: "/c.jpg",
    link: "#",
  },
  {
    id: 4,
    year: "2025",
    category: "event",
    title: "Google Cloud Developers Day",
    subtitle: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    images: ["/gdg.jpg", "/gdg2.jpg"],
    link: "#",
  },
  {
    id: 5,
    year: "2025",
    category: "leadership",
    title: "Gromo X AWS Finarva AI 2025",
    subtitle: "CTO @Gromo",
    location: "Gurugram, Haryana",
    images: ["/gromo.jpeg", "/b.png"],
    link: "#",
  },
  
  {
    id: 7,
    year: "2024",
    category: "event",
    title: "IIT Guwahati Summer Analytics",
    subtitle: "@IIT Guwahati",
    location: "Online",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    id: 8,
    year: "2025",
    category: "hackathon",
    title: "Smart India Hackathon 2025",
    subtitle: "SIH 2025 Nominee",
    location: "India",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    link: "#",
  },
];

const categoryColors: Record<string, string> = {
  hackathon: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  internship: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  project: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  event: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  leadership: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  certification: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const dotColors: Record<string, string> = {
  hackathon: "bg-violet-400",
  internship: "bg-blue-400",
  project: "bg-emerald-400",
  event: "bg-amber-400",
  leadership: "bg-rose-400",
  certification: "bg-cyan-400",
};

const CARD_WIDTH = 380;
const CARD_GAP = 24;

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = CARD_WIDTH + CARD_GAP;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container px-6 lg:px-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-8 mb-12"
        >
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">About</p>
            <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
              Building digital<br />
              <ScrambleText text="experiences" className="gradient-text" />
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

          {/* Mobile arrows (overlaid on carousel) */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm text-foreground transition-all hover:border-primary disabled:opacity-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm text-foreground transition-all hover:border-primary disabled:opacity-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {activities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 group"
                style={{ width: CARD_WIDTH, scrollSnapAlign: "start" }}
              >
                <div className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]">
                  {/* Top bar with year + category */}
                  <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${dotColors[activity.category] || "bg-gray-400"}`} />
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-foreground">
                        {activity.year}
                      </span>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-medium ${categoryColors[activity.category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
                      {activity.category}
                    </span>
                  </div>

                  {/* Image or slider for Google Cloud Developers Day */}
                  <div className="mx-4 overflow-hidden rounded-xl bg-white/[0.05] aspect-[4/3]">
                    {activity.images ? (
                      <Carousel images={activity.images} />
                    ) : (
                      <img
                        src={activity.image}
                        alt={activity.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 pt-4 space-y-2">
                    <h3 className="font-display text-lg font-bold text-foreground leading-tight line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="text-sm font-medium text-primary/80">
                      {activity.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{activity.location}</span>
                    </div>

                    {activity.link && (
                      <a
                        href={activity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Details
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll indicator dots */}
        <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
          {activities.map((a) => (
            <div key={a.id} className="h-1.5 w-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images]);
  // Define different animation variants
  // No animation, only blur transition
  const [blur, setBlur] = useState(false);
  useEffect(() => {
    setBlur(true);
    const timeout = setTimeout(() => setBlur(false), 400);
    return () => clearTimeout(timeout);
  }, [index]);
  return (
    <img
      key={images[index]}
      src={images[index]}
      alt="SDE Intern Slide"
      className={`h-full w-full object-cover transition-all duration-400 group-hover:scale-105 ${blur ? 'blur-sm' : ''}`}
    />
  );
}
