
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import QualificationsSection from './components/QualificationsSection';
import ContactSection from './components/ContactSection';
import FloatingActionButton from './components/FloatingActionButton';

const PortfolioWebsite = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
        // Find the section closest to the top and set as active
        const visibleEntries = entries.filter(e => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by boundingClientRect.top
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '-80px 0px 0px 0px' // Adjust for navbar height
      }
    );
    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId); // Immediate feedback
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection isVisible={isVisible} />
      <ExperienceSection isVisible={isVisible} />
      <QualificationsSection isVisible={isVisible} />
      <ContactSection isVisible={isVisible} />
      <FloatingActionButton scrollToSection={scrollToSection} />
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out 0.3s both;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;