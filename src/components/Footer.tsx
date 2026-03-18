import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="py-12">
      <div className="container flex flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-12">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold gradient-text">AK</span>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aditya Kumar. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", url: "https://github.com/adityadhimaann" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/adityadhimaann" },
            { label: "LeetCode", url: "https://leetcode.com/u/adityadhimaann/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
