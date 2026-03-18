import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Code, Briefcase, Award, Mail, Terminal, Medal } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import { SpotlightNavbar, type NavItem } from "@/components/ui/spotlight-navbar";

type NavItemWithIcon = NavItem & { icon: React.ReactNode };

const navItems: NavItemWithIcon[] = [
  { label: "About", href: "#about", icon: <User size={20} /> },
  { label: "Profiles", href: "#coding-profiles", icon: <Terminal size={20} /> },
  { label: "Projects", href: "#projects", icon: <Code size={20} /> },
  { label: "Services", href: "#services", icon: <Briefcase size={20} /> },
  { label: "Experience", href: "#experience", icon: <Award size={20} /> },
  { label: "Certificates", href: "#certificates", icon: <Medal size={20} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={20} /> },
];

const Navigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Auto-appear on scroll logic
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250); // Near-instant hiding after scrolling stops

      const sections = navItems.map((item) => item.href.slice(1));
      let currentSection = "";
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 300) {
          currentSection = id;
          break;
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = navItems.findIndex(
    (item) => item.href.slice(1) === activeSection
  );

  const handleNavItemClick = (item: NavItem) => {
    scrollTo(item.href);
  };

  const isHero = scrollY < 300;
  const isProjects = activeSection === "projects";
  const isNavbarMode = isHero || isProjects;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex items-center justify-between px-6 pt-4 lg:px-12 pb-3 pointer-events-auto"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-bold tracking-tight text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">AK</span>
          </motion.button>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <ThemeToggle />
          </div>
        </motion.div>

        <div className="absolute left-1/2 -translate-x-1/2 top-4 z-50 hidden md:block pointer-events-auto">
          <AnimatePresence>
            {isNavbarMode && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <SpotlightNavbar
                  items={navItems}
                  activeIndex={activeIndex >= 0 ? activeIndex : 0}
                  onItemClick={handleNavItemClick}
                  defaultActiveIndex={0}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between px-6 py-4 md:hidden bg-background/80 backdrop-blur-lg border-b border-border/50 pointer-events-auto"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-bold tracking-tight text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">AK</span>
          </motion.button>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Desktop Sidebar Mode */}
      <AnimatePresence>
        {!isNavbarMode && (
          <motion.aside
            initial={{ opacity: 0, x: 100, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 100, y: "-50%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed right-0 top-1/2 z-50 hidden md:flex h-[70vh] w-12 items-center justify-end group pointer-events-auto"
          >
            {/* The Auto-Hiding Dock content */}
            <div className={`flex flex-col gap-3 p-3 rounded-full bg-zinc-200/80 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl transition-all duration-100 ease-out group-hover:-translate-x-6 group-hover:opacity-100 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] ${
              isScrolling ? "-translate-x-6 opacity-100 shadow-[0_0_30px_rgba(0,0,0,0.2)]" : "translate-x-[65%] opacity-70"
            }`}>
              {navItems.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`group/btn relative flex items-center justify-center p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-md border border-black/10 dark:border-white/10 text-xs font-semibold text-zinc-900 dark:text-white opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-xl border-l border-border/50 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.href)}
                className="font-display text-3xl font-bold text-foreground"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
