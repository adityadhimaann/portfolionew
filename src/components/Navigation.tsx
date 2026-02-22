import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import { SpotlightNavbar, type NavItem } from "@/components/ui/spotlight-navbar";

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Desktop: Logo left, SpotlightNavbar center, toggles right */}
        <div className="hidden md:flex items-center justify-between px-6 pt-4 lg:px-12 pb-3">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl font-bold tracking-tight text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">AK</span>
          </motion.button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <SpotlightNavbar
              items={navItems}
              activeIndex={activeIndex >= 0 ? activeIndex : 0}
              onItemClick={handleNavItemClick}
              defaultActiveIndex={0}
            />
          </div>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile header bar */}
        <div className="flex items-center justify-between px-6 py-4 md:hidden bg-background/80 backdrop-blur-lg border-b border-border/50">
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
        </div>
      </motion.header>

      {/* Mobile menu */}
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
