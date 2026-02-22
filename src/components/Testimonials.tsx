import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Oracle Cloud Infrastructure 2025 Certified — demonstrating proficiency in cloud architecture, deployment, and management on OCI.",
    name: "Oracle",
    role: "OCI Certification — Jan 2025",
    avatar: "OC",
  },
  {
    quote: "Secured Top 15 amongst 25,000+ participants in the Gromo-AWS-Sarvam AI Challenge, building BhasaVitt — a multilingual AI model for financial literacy.",
    name: "Gromo x AWS",
    role: "Hackathon Achievement — May 2025",
    avatar: "GA",
  },
  {
    quote: "Nominated to register and present Smart Agriculture System idea to the Government of Punjab at Smart India Hackathon 2025.",
    name: "Smart India Hackathon",
    role: "SIH 2025 Nominee — Oct 2025",
    avatar: "SI",
  },
  {
    quote: "Participated and shortlisted for an intensive 6-week technical program focused on Data Science and Machine Learning at IIT Guwahati Summer Analytics.",
    name: "IIT Guwahati",
    role: "Summer Analytics — Apr 2025",
    avatar: "IG",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section className="relative py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container px-6 lg:px-12" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-primary">Achievements</p>
          <h2 className="text-fluid-lg font-display font-bold tracking-tight text-foreground">
            Milestones & <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 text-center md:p-12"
            >
              <Quote className="mx-auto mb-6 h-8 w-8 text-primary/40" />
              <p className="text-lg leading-relaxed text-foreground md:text-xl">
                "{testimonials[current].quote}"
              </p>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                  {testimonials[current].avatar}
                </div>
                <p className="font-display font-semibold text-foreground">{testimonials[current].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
