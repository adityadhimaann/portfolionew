import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import Navigation from './components/Navigation.jsx';
import HeroSection from './components/HeroSection.jsx';
import FloatingActionButton from './components/FloatingActionButton.jsx';
import ContactPopup from './components/ContactPopup.jsx';
import OptimizedBackground from './components/OptimizedBackground.jsx';
import OptimizedCursorEffect from './components/OptimizedCursorEffect.jsx';
import EnhancedChatbot from './components/EnhancedChatbot.jsx';
import { createOptimizedObserver, supportsHighPerformance } from './utils/performanceUtils';
import './styles/mobile-enhancements.css';
import './styles/performance-animations.css';

// Lazy load below-the-fold sections with preloading
const AboutSection = React.lazy(() => import('./components/AboutSection.jsx'));
const ExperienceSection = React.lazy(() => import('./components/ExperienceSection.jsx'));
const QualificationsSection = React.lazy(() => import('./components/QualificationsSection.jsx'));
const ContactSection = React.lazy(() => import('./components/ContactSection.jsx'));

// Preload components after initial render
const preloadComponents = () => {
  import('./components/AboutSection.jsx');
  import('./components/ExperienceSection.jsx');
  import('./components/QualificationsSection.jsx');
  import('./components/ContactSection.jsx');
};

const PortfolioWebsite = () => {
  const [isVisible, setIsVisible] = useState({
    hero: true,
    about: true,
    experience: true,
    qualifications: true,
    contact: true
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [isHighPerformance, setIsHighPerformance] = useState(true);

  // Check device capabilities
  useEffect(() => {
    setIsHighPerformance(supportsHighPerformance());
    
    // Preload lazy components immediately
    preloadComponents();
    
    const timer = setTimeout(() => {
      setHasInitiallyLoaded(true);
    }, 100); // Reduced delay for faster initial load

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
    let observer = null;
    
    // Small delay to ensure DOM is ready and lazy components are loaded
    const timeoutId = setTimeout(() => {
      observer = createOptimizedObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      });

      const sections = document.querySelectorAll('section[id], div[id]');
      sections.forEach((section) => {
        section.classList.add('scroll-animate'); // Add initial class
        observer.observe(section);
      });
    }, 500); // Increased delay to ensure lazy components are loaded

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
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
      {/* Fixed Background Layer - Never scrolls */}
      <div className="fixed inset-0 z-0">
        <OptimizedBackground isHighPerformance={shouldRenderEffects} />
      </div>
      
      {/* Fixed Cursor Effect */}
      {shouldRenderEffects && <OptimizedCursorEffect />}
      
      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen">
        {/* Contact Popup */}
        <ContactPopup />
        
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
        <HeroSection scrollToSection={scrollToSection} />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-slate-400">Loading content...</p>
            </div>
          </div>
        }>
          <AboutSection isVisible={isVisible} />
          <ExperienceSection isVisible={isVisible} />
          <QualificationsSection isVisible={isVisible} />
          <ContactSection isVisible={isVisible} />
        </Suspense>
        <FloatingActionButton scrollToSection={scrollToSection} />
      </div>
      
      {/* EnhancedChatbot - Fixed position */}
      <EnhancedChatbot />
    </>
  );
};

export default PortfolioWebsite;
