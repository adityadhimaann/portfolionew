import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import BentoGrid from "@/components/BentoGrid";
import useLenis from "@/hooks/useLenis";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);
  useLenis();

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-background">
        <Navigation />
        <main>
          <Hero />
          <Marquee />
          <About />
          <BentoGrid />
          <Projects />
          <Services />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
