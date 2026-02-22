import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.style.setProperty("--background", "240 10% 4%");
      root.style.setProperty("--foreground", "40 10% 92%");
      root.style.setProperty("--card", "240 8% 8%");
      root.style.setProperty("--card-foreground", "40 10% 92%");
      root.style.setProperty("--popover", "240 8% 8%");
      root.style.setProperty("--popover-foreground", "40 10% 92%");
      root.style.setProperty("--secondary", "240 6% 12%");
      root.style.setProperty("--secondary-foreground", "40 10% 92%");
      root.style.setProperty("--muted", "240 6% 14%");
      root.style.setProperty("--muted-foreground", "240 5% 50%");
      root.style.setProperty("--border", "240 6% 16%");
      root.style.setProperty("--input", "240 6% 16%");
      root.style.setProperty("--glass", "240 8% 8% / 0.6");
      root.style.setProperty("--glass-border", "240 6% 20% / 0.4");
    } else {
      root.classList.remove("dark");
      root.style.setProperty("--background", "40 20% 96%");
      root.style.setProperty("--foreground", "240 10% 8%");
      root.style.setProperty("--card", "0 0% 100%");
      root.style.setProperty("--card-foreground", "240 10% 8%");
      root.style.setProperty("--popover", "0 0% 100%");
      root.style.setProperty("--popover-foreground", "240 10% 8%");
      root.style.setProperty("--secondary", "40 10% 90%");
      root.style.setProperty("--secondary-foreground", "240 10% 8%");
      root.style.setProperty("--muted", "40 10% 92%");
      root.style.setProperty("--muted-foreground", "240 5% 40%");
      root.style.setProperty("--border", "40 10% 85%");
      root.style.setProperty("--input", "40 10% 85%");
      root.style.setProperty("--glass", "0 0% 100% / 0.6");
      root.style.setProperty("--glass-border", "40 10% 80% / 0.4");
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={16} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun size={16} />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
