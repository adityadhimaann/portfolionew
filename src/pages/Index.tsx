import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import AdBanner from "@/components/AdBanner";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import CodingProfiles from "@/components/LeetCodeStats";
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

      <div className="relative min-h-screen">
        <Navigation />
        <main className="relative">
          {/* Unified background attaching all sections across the entire website */}
          <div className="pointer-events-none absolute w-full h-full inset-0" style={{ background: "var(--gradient-bg)" }} />
          <Hero />
          <Marquee />
          <About />
          <CodingProfiles />
          <BentoGrid />
          <Projects />
          <Services />
          <AdBanner />
          <Experience />
          <Certificates />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
