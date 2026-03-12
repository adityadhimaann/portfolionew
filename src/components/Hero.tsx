import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { LightLines } from "@/components/ui/light-lines";

const HeroScene = lazy(() => import("./HeroScene"));

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const name = "Aditya Kumar";
  const title = "Full Stack Developer";

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated amber light lines background */}
      <div className="absolute inset-0 z-0">
        <LightLines lineCount={6} speed={0.8} />
      </div>

      {/* 3D Particle Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Gradient orbs */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow"
      />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse-glow animation-delay-200"
      />

      <motion.div style={{ opacity }} className="container relative z-10 px-6 text-center lg:px-12">
        {/* Profile image – all screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/60 via-primary/20 to-transparent blur-md" />
            <img
              src="/adidevworks.jpeg"
              alt="Aditya Kumar"
              className="relative h-72 w-72 rounded-full object-cover border-2 border-primary/30 shadow-xl"
            />
          </div>
        </motion.div>

        <h1 className="text-fluid-xl font-display font-extrabold tracking-tight w-full max-w-full overflow-visible px-2">
          <FlipFadeText
            words={["Aditya Kumar"]}
            interval={4000}
            className="min-h-0 w-full"
            textClassName="text-fluid-xl font-display font-extrabold tracking-tight text-foreground !text-2xl xs:!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl"
            letterDuration={0.6}
            staggerDelay={0.08}
            exitStaggerDelay={0.04}
          />
        </h1>

        <div className="mt-4 overflow-hidden">
          <motion.h2
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-fluid-md font-display font-medium text-muted-foreground"
          >
            {title}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Building scalable, user-centric web applications with modern technologies, GenAI integration, and clean architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 md:gap-4"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-primary px-4 py-2 text-xs md:px-7 md:py-3 md:text-sm font-semibold text-primary-foreground shadow-lg whitespace-nowrap"
          >
            View Work
          </motion.a>
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-border px-4 py-2 text-xs md:px-7 md:py-3 md:text-sm font-semibold text-foreground whitespace-nowrap"
          >
            About Me
          </motion.a>
          <motion.a
            href="/AdityaCV_SDE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs md:px-7 md:py-3 md:text-sm font-semibold text-primary shadow-lg whitespace-nowrap"
          >
            View Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
