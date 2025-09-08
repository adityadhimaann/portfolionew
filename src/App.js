import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FloatingActionButton from './components/FloatingActionButton';
import ContactPopup from './components/ContactPopup';
import OptimizedBackground from './components/OptimizedBackground';
import OptimizedCursorEffect from './components/OptimizedCursorEffect';
import EnhancedChatbot from './components/EnhancedChatbot';
import { createOptimizedObserver, supportsHighPerformance } from './utils/performanceUtils';
import './styles/mobile-enhancements.css';
import './styles/performance-animations.css';

// Lazy load below-the-fold sections
const AboutSection = React.lazy(() => import('./components/AboutSection'));
const ExperienceSection = React.lazy(() => import('./components/ExperienceSection'));
const QualificationsSection = React.lazy(() => import('./components/QualificationsSection'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));

const PortfolioWebsite = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('hero');
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [isHighPerformance, setIsHighPerformance] = useState(true);

  // Check device capabilities
  useEffect(() => {
    setIsHighPerformance(supportsHighPerformance());
    
    const timer = setTimeout(() => {
      setHasInitiallyLoaded(true);
    }, 300); // Reduced delay

    return () => clearTimeout(timer);
  }, []);

  // Optimized intersection observer
  const handleIntersection = useCallback((entries) => {
    const visibilityUpdates = {};
    let activeEntry = null;
    let closestToTop = Infinity;

    entries.forEach((entry) => {
      visibilityUpdates[entry.target.id] = entry.isIntersecting;
      
      // Optimized animation trigger
      if (entry.isIntersecting && hasInitiallyLoaded && entry.target.id !== 'hero') {
        entry.target.classList.add('scroll-animate', 'in-view');
        
        // Staggered animations for child elements
        const animatableElements = entry.target.querySelectorAll('.scroll-animate');
        animatableElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('in-view');
          }, index * 100); // Reduced stagger time
        });
      }

      // Find closest section to top
      if (entry.isIntersecting) {
        const rect = entry.boundingClientRect;
        if (rect.top < closestToTop) {
          closestToTop = rect.top;
          activeEntry = entry;
        }
      }
    });

    setIsVisible(prev => ({ ...prev, ...visibilityUpdates }));
    
    if (activeEntry) {
      setActiveSection(activeEntry.target.id);
    }
  }, [hasInitiallyLoaded]);

  // Setup optimized intersection observer
  useEffect(() => {
    const observer = createOptimizedObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => {
      section.classList.add('scroll-animate'); // Add initial class
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [handleIntersection]);

  // Optimized scroll to section
  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Memoize performance check
  const shouldRenderEffects = useMemo(() => {
    return isHighPerformance && window.innerWidth >= 768;
  }, [isHighPerformance]);

  return (
    <>
      <div className="min-h-screen relative gpu-accelerated">
        {/* Contact Popup */}
        <ContactPopup />
        
        {/* Optimized Background */}
        <OptimizedBackground isHighPerformance={shouldRenderEffects} />
        
        {/* Optimized Cursor Effect */}
        {shouldRenderEffects && <OptimizedCursorEffect />}
        
        {/* Content Layer */}
        <div className="relative z-10 min-h-screen">
          <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
          <HeroSection scrollToSection={scrollToSection} />
          <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading content...</div>}>
            <AboutSection isVisible={isVisible} />
            <ExperienceSection isVisible={isVisible} />
            <QualificationsSection isVisible={isVisible} />
            <ContactSection isVisible={isVisible} />
          </Suspense>
          <FloatingActionButton scrollToSection={scrollToSection} />
        </div>
      </div>
      {/* EnhancedChatbot moved outside all other divs to ensure it stays fixed */}
      <EnhancedChatbot />
    </>
  );
};

export default PortfolioWebsite;
