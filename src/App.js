
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import QualificationsSection from './components/QualificationsSection';
import ContactSection from './components/ContactSection';
import FloatingActionButton from './components/FloatingActionButton';
import './styles/mobile-enhancements.css';

const PortfolioWebsite = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('hero');
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [cursorStars, setCursorStars] = useState([]);

  useEffect(() => {
    // Set initial load flag after a brief delay
    const timer = setTimeout(() => {
      setHasInitiallyLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Cursor star effect for entire website
  useEffect(() => {
    const handleMouseMove = (event) => {
      const newX = event.clientX;
      const newY = event.clientY;

      // Create sparkling stars at cursor position
      const newStar = {
        id: Date.now() + Math.random(),
        x: newX + (Math.random() - 0.5) * 40, // Random spread around cursor
        y: newY + (Math.random() - 0.5) * 40,
        size: Math.random() * 8 + 2, // Random size between 2-10px
        opacity: Math.random() * 0.8 + 0.2, // Random opacity 0.2-1.0
        color: Math.random() < 0.3 ? 'cyan' : Math.random() < 0.6 ? 'blue' : 'white',
        rotation: Math.random() * 360, // Random initial rotation
        duration: Math.random() * 800 + 400, // Quick duration 400-1200ms
        createdAt: Date.now(),
        scale: Math.random() * 0.5 + 0.5 // Random scale 0.5-1.0
      };

      setCursorStars(prev => [...prev.slice(-15), newStar]); // Keep only last 15 stars
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up expired stars
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorStars(prev => prev.filter(star => 
        Date.now() - star.createdAt < star.duration
      ));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          
          // Only add dashing popup animation to non-hero sections and after initial load
          if (entry.isIntersecting && hasInitiallyLoaded && entry.target.id !== 'hero') {
            entry.target.classList.add('animate-dash-in');
            // Add staggered animations to child elements
            const animatableElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatableElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-popup');
              }, index * 150); // Stagger by 150ms
            });
          }
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
  }, [hasInitiallyLoaded]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId); // Immediate feedback
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Layer - Completely fixed, never moves */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}
      >
        {/* Enhanced Flowing Stars Background - Fixed positioning */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary Star Layer - Bright Stars */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute top-32 left-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-teal-300 rounded-full animate-ping opacity-30"></div>
          <div className="absolute bottom-32 left-16 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-40 right-24 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-60 left-2/3 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-30"></div>
          <div className="absolute bottom-60 right-1/4 w-0.5 h-0.5 bg-teal-400 rounded-full animate-pulse opacity-40"></div>
          
          {/* Secondary Star Layer - Medium Stars */}
          <div className="absolute top-16 left-1/2 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-pulse opacity-45 delay-500"></div>
          <div className="absolute top-36 right-1/5 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-35 delay-700"></div>
          <div className="absolute bottom-16 left-1/5 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse opacity-55 delay-300"></div>
          <div className="absolute bottom-36 right-1/2 w-1 h-1 bg-cyan-500 rounded-full animate-ping opacity-30 delay-900"></div>
          <div className="absolute top-72 left-3/4 w-0.5 h-0.5 bg-teal-200 rounded-full animate-pulse opacity-50 delay-600"></div>
          <div className="absolute bottom-72 right-3/4 w-1 h-1 bg-blue-500 rounded-full animate-ping opacity-40 delay-400"></div>
          <div className="absolute top-80 left-1/8 w-0.5 h-0.5 bg-slate-300 rounded-full animate-pulse opacity-60 delay-800"></div>
          <div className="absolute bottom-80 right-1/8 w-1 h-1 bg-cyan-600 rounded-full animate-ping opacity-35 delay-200"></div>
          <div className="absolute top-24 left-3/5 w-0.5 h-0.5 bg-violet-300 rounded-full animate-pulse opacity-50 delay-1000"></div>
          <div className="absolute bottom-24 right-3/5 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40 delay-1200"></div>
          
          {/* Third Star Layer - Dense Background Stars */}
          <div className="absolute top-50 left-1/12 w-0.5 h-0.5 bg-sky-300 rounded-full animate-pulse opacity-35 delay-1400"></div>
          <div className="absolute top-90 right-1/12 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-45 delay-1600"></div>
          <div className="absolute bottom-50 left-3/4 w-0.5 h-0.5 bg-blue-400 rounded-full animate-pulse opacity-40 delay-1800"></div>
          <div className="absolute bottom-90 right-2/3 w-1 h-1 bg-teal-500 rounded-full animate-ping opacity-30 delay-2000"></div>
          <div className="absolute top-100 left-5/6 w-0.5 h-0.5 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-2200"></div>
          
          {/* Fourth Star Layer - Small Twinkling Stars */}
          <div className="absolute top-5 left-1/5 w-0.5 h-0.5 bg-cyan-100 rounded-full animate-pulse opacity-30 delay-100"></div>
          <div className="absolute top-15 right-1/6 w-0.5 h-0.5 bg-blue-200 rounded-full animate-ping opacity-25 delay-300"></div>
          <div className="absolute top-25 left-3/7 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse opacity-35 delay-500"></div>
          <div className="absolute top-35 right-2/7 w-0.5 h-0.5 bg-purple-200 rounded-full animate-ping opacity-30 delay-700"></div>
          <div className="absolute top-45 left-4/7 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse opacity-40 delay-900"></div>
          <div className="absolute top-55 right-3/7 w-0.5 h-0.5 bg-teal-200 rounded-full animate-ping opacity-25 delay-1100"></div>
          <div className="absolute top-65 left-5/7 w-0.5 h-0.5 bg-blue-100 rounded-full animate-pulse opacity-35 delay-1300"></div>
          <div className="absolute top-75 right-4/7 w-0.5 h-0.5 bg-sky-200 rounded-full animate-ping opacity-30 delay-1500"></div>
          <div className="absolute top-85 left-6/7 w-0.5 h-0.5 bg-violet-200 rounded-full animate-pulse opacity-25 delay-1700"></div>
          <div className="absolute top-95 right-5/7 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping opacity-35 delay-1900"></div>
          
          {/* Fifth Star Layer - Middle Area Dense Coverage */}
          <div className="absolute top-1/3 left-1/7 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse opacity-40 delay-2100"></div>
          <div className="absolute top-1/3 right-1/7 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-35 delay-2300"></div>
          <div className="absolute top-2/5 left-2/7 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-pulse opacity-45 delay-2500"></div>
          <div className="absolute top-2/5 right-2/7 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping opacity-30 delay-2700"></div>
          <div className="absolute top-3/5 left-3/7 w-0.5 h-0.5 bg-teal-300 rounded-full animate-pulse opacity-40 delay-2900"></div>
          <div className="absolute top-3/5 right-3/7 w-0.5 h-0.5 bg-sky-300 rounded-full animate-ping opacity-35 delay-3100"></div>
          <div className="absolute top-4/5 left-4/7 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse opacity-30 delay-3300"></div>
          <div className="absolute top-4/5 right-4/7 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping opacity-40 delay-3500"></div>
          
          {/* Sixth Star Layer - Bottom Area Dense Coverage */}
          <div className="absolute bottom-5 left-1/8 w-0.5 h-0.5 bg-violet-100 rounded-full animate-pulse opacity-25 delay-200"></div>
          <div className="absolute bottom-15 right-1/8 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping opacity-30 delay-400"></div>
          <div className="absolute bottom-25 left-2/8 w-0.5 h-0.5 bg-cyan-200 rounded-full animate-pulse opacity-35 delay-600"></div>
          <div className="absolute bottom-35 right-2/8 w-0.5 h-0.5 bg-blue-200 rounded-full animate-ping opacity-25 delay-800"></div>
          <div className="absolute bottom-45 left-3/8 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse opacity-40 delay-1000"></div>
          <div className="absolute bottom-55 right-3/8 w-0.5 h-0.5 bg-purple-200 rounded-full animate-ping opacity-30 delay-1200"></div>
          <div className="absolute bottom-65 left-4/8 w-0.5 h-0.5 bg-teal-200 rounded-full animate-pulse opacity-35 delay-1400"></div>
          <div className="absolute bottom-75 right-4/8 w-0.5 h-0.5 bg-sky-200 rounded-full animate-ping opacity-25 delay-1600"></div>
          <div className="absolute bottom-85 left-5/8 w-0.5 h-0.5 bg-cyan-100 rounded-full animate-pulse opacity-30 delay-1800"></div>
          <div className="absolute bottom-95 right-5/8 w-0.5 h-0.5 bg-blue-100 rounded-full animate-ping opacity-35 delay-2000"></div>
          
          {/* Seventh Star Layer - Random Scattered Small Stars */}
          <div className="absolute top-12 left-1/9 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse opacity-20 delay-150"></div>
          <div className="absolute top-22 right-1/9 w-0.5 h-0.5 bg-cyan-100/30 rounded-full animate-ping opacity-25 delay-350"></div>
          <div className="absolute top-38 left-2/9 w-0.5 h-0.5 bg-blue-100/40 rounded-full animate-pulse opacity-30 delay-550"></div>
          <div className="absolute top-48 right-2/9 w-0.5 h-0.5 bg-indigo-100/30 rounded-full animate-ping opacity-20 delay-750"></div>
          <div className="absolute top-58 left-3/9 w-0.5 h-0.5 bg-purple-100/40 rounded-full animate-pulse opacity-25 delay-950"></div>
          <div className="absolute top-68 right-3/9 w-0.5 h-0.5 bg-teal-100/30 rounded-full animate-ping opacity-30 delay-1150"></div>
          <div className="absolute top-78 left-4/9 w-0.5 h-0.5 bg-sky-100/40 rounded-full animate-pulse opacity-20 delay-1350"></div>
          <div className="absolute top-88 right-4/9 w-0.5 h-0.5 bg-violet-100/30 rounded-full animate-ping opacity-25 delay-1550"></div>
          <div className="absolute top-18 left-5/9 w-0.5 h-0.5 bg-emerald-100/40 rounded-full animate-pulse opacity-30 delay-1750"></div>
          <div className="absolute top-28 right-5/9 w-0.5 h-0.5 bg-cyan-200/30 rounded-full animate-ping opacity-20 delay-1950"></div>
          
          {/* Eighth Star Layer - Floating Stars with Different Sizes */}
          <div className="absolute top-42 left-1/10 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse opacity-50 delay-2150"></div>
          <div className="absolute top-52 right-1/10 w-0.5 h-0.5 bg-blue-300/50 rounded-full animate-ping opacity-40 delay-2350"></div>
          <div className="absolute top-62 left-2/10 w-1 h-1 bg-indigo-400/60 rounded-full animate-pulse opacity-45 delay-2550"></div>
          <div className="absolute top-72 right-2/10 w-0.5 h-0.5 bg-purple-300/50 rounded-full animate-ping opacity-35 delay-2750"></div>
          <div className="absolute bottom-42 left-3/10 w-1 h-1 bg-teal-400/60 rounded-full animate-pulse opacity-50 delay-2950"></div>
          <div className="absolute bottom-52 right-3/10 w-0.5 h-0.5 bg-sky-300/50 rounded-full animate-ping opacity-40 delay-3150"></div>
          <div className="absolute bottom-62 left-4/10 w-1 h-1 bg-violet-400/60 rounded-full animate-pulse opacity-45 delay-3350"></div>
          <div className="absolute bottom-72 right-4/10 w-0.5 h-0.5 bg-emerald-300/50 rounded-full animate-ping opacity-35 delay-3550"></div>
          
          {/* Subtle Gradient Orbs for Depth - Enhanced */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/6 w-28 h-28 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/2 right-1/6 w-36 h-36 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-2500"></div>
          <div className="absolute bottom-3/4 right-1/2 w-44 h-44 bg-sky-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
          
          {/* Additional Flowing Orbs */}
          <div className="absolute top-1/8 left-3/4 w-20 h-20 bg-violet-500/3 rounded-full blur-2xl animate-pulse delay-3500"></div>
          <div className="absolute bottom-1/8 right-3/4 w-48 h-48 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-4000"></div>
          <div className="absolute top-5/8 left-1/8 w-16 h-16 bg-cyan-400/6 rounded-full blur-xl animate-pulse delay-4500"></div>
          <div className="absolute bottom-5/8 right-1/8 w-52 h-52 bg-blue-400/3 rounded-full blur-3xl animate-pulse delay-5000"></div>
          <div className="absolute top-7/8 left-5/8 w-22 h-22 bg-indigo-400/5 rounded-full blur-2xl animate-pulse delay-5500"></div>
          <div className="absolute bottom-7/8 right-5/8 w-30 h-30 bg-purple-400/4 rounded-full blur-3xl animate-pulse delay-6000"></div>
          
          {/* Micro Stars - Ultra Dense Layer */}
          <div className="absolute top-3 left-1/11 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse opacity-15 delay-50"></div>
          <div className="absolute top-7 right-1/11 w-0.5 h-0.5 bg-cyan-100/15 rounded-full animate-ping opacity-20 delay-150"></div>
          <div className="absolute top-13 left-2/11 w-0.5 h-0.5 bg-blue-100/20 rounded-full animate-pulse opacity-15 delay-250"></div>
          <div className="absolute top-17 right-2/11 w-0.5 h-0.5 bg-indigo-100/15 rounded-full animate-ping opacity-20 delay-350"></div>
          <div className="absolute top-23 left-3/11 w-0.5 h-0.5 bg-purple-100/20 rounded-full animate-pulse opacity-15 delay-450"></div>
          <div className="absolute top-27 right-3/11 w-0.5 h-0.5 bg-teal-100/15 rounded-full animate-ping opacity-20 delay-550"></div>
          <div className="absolute top-33 left-4/11 w-0.5 h-0.5 bg-sky-100/20 rounded-full animate-pulse opacity-15 delay-650"></div>
          <div className="absolute top-37 right-4/11 w-0.5 h-0.5 bg-violet-100/15 rounded-full animate-ping opacity-20 delay-750"></div>
          <div className="absolute top-43 left-5/11 w-0.5 h-0.5 bg-emerald-100/20 rounded-full animate-pulse opacity-15 delay-850"></div>
          <div className="absolute top-47 right-5/11 w-0.5 h-0.5 bg-cyan-200/15 rounded-full animate-ping opacity-20 delay-950"></div>
          <div className="absolute top-53 left-6/11 w-0.5 h-0.5 bg-blue-200/20 rounded-full animate-pulse opacity-15 delay-1050"></div>
          <div className="absolute top-57 right-6/11 w-0.5 h-0.5 bg-indigo-200/15 rounded-full animate-ping opacity-20 delay-1150"></div>
          <div className="absolute top-63 left-7/11 w-0.5 h-0.5 bg-purple-200/20 rounded-full animate-pulse opacity-15 delay-1250"></div>
          <div className="absolute top-67 right-7/11 w-0.5 h-0.5 bg-teal-200/15 rounded-full animate-ping opacity-20 delay-1350"></div>
          <div className="absolute top-73 left-8/11 w-0.5 h-0.5 bg-sky-200/20 rounded-full animate-pulse opacity-15 delay-1450"></div>
          <div className="absolute top-77 right-8/11 w-0.5 h-0.5 bg-violet-200/15 rounded-full animate-ping opacity-20 delay-1550"></div>
          <div className="absolute top-83 left-9/11 w-0.5 h-0.5 bg-emerald-200/20 rounded-full animate-pulse opacity-15 delay-1650"></div>
          <div className="absolute top-87 right-9/11 w-0.5 h-0.5 bg-cyan-300/15 rounded-full animate-ping opacity-20 delay-1750"></div>
          <div className="absolute top-93 left-10/11 w-0.5 h-0.5 bg-blue-300/20 rounded-full animate-pulse opacity-15 delay-1850"></div>
          <div className="absolute top-97 right-10/11 w-0.5 h-0.5 bg-indigo-300/15 rounded-full animate-ping opacity-20 delay-1950"></div>
          
          {/* Section-Specific Star Layers - About Section Area (100vh to 200vh) */}
          <div style={{top: '110vh'}} className="absolute left-1/12 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50 delay-100"></div>
          <div style={{top: '115vh'}} className="absolute right-1/12 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-40 delay-300"></div>
          <div style={{top: '120vh'}} className="absolute left-1/6 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-pulse opacity-45 delay-500"></div>
          <div style={{top: '125vh'}} className="absolute right-1/6 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-35 delay-700"></div>
          <div style={{top: '130vh'}} className="absolute left-1/4 w-0.5 h-0.5 bg-teal-300 rounded-full animate-pulse opacity-50 delay-900"></div>
          <div style={{top: '135vh'}} className="absolute right-1/4 w-0.5 h-0.5 bg-sky-300 rounded-full animate-ping opacity-40 delay-1100"></div>
          <div style={{top: '140vh'}} className="absolute left-1/3 w-1 h-1 bg-violet-400 rounded-full animate-pulse opacity-45 delay-1300"></div>
          <div style={{top: '145vh'}} className="absolute right-1/3 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-ping opacity-35 delay-1500"></div>
          <div style={{top: '150vh'}} className="absolute left-2/5 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse opacity-50 delay-1700"></div>
          <div style={{top: '155vh'}} className="absolute right-2/5 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-40 delay-1900"></div>
          <div style={{top: '160vh'}} className="absolute left-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-45 delay-2100"></div>
          <div style={{top: '165vh'}} className="absolute right-1/2 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping opacity-35 delay-2300"></div>
          <div style={{top: '170vh'}} className="absolute left-3/5 w-0.5 h-0.5 bg-teal-400 rounded-full animate-pulse opacity-50 delay-2500"></div>
          <div style={{top: '175vh'}} className="absolute right-3/5 w-0.5 h-0.5 bg-sky-400 rounded-full animate-ping opacity-40 delay-2700"></div>
          <div style={{top: '180vh'}} className="absolute left-2/3 w-1 h-1 bg-violet-300 rounded-full animate-pulse opacity-45 delay-2900"></div>
          <div style={{top: '185vh'}} className="absolute right-2/3 w-0.5 h-0.5 bg-emerald-400 rounded-full animate-ping opacity-35 delay-3100"></div>
          <div style={{top: '190vh'}} className="absolute left-3/4 w-0.5 h-0.5 bg-cyan-500 rounded-full animate-pulse opacity-50 delay-3300"></div>
          <div style={{top: '195vh'}} className="absolute right-3/4 w-0.5 h-0.5 bg-blue-500 rounded-full animate-ping opacity-40 delay-3500"></div>
          
          {/* Experience Section Area (200vh to 300vh) */}
          <div style={{top: '210vh'}} className="absolute left-1/12 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse opacity-40 delay-200"></div>
          <div style={{top: '215vh'}} className="absolute right-1/12 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-50 delay-400"></div>
          <div style={{top: '220vh'}} className="absolute left-1/8 w-0.5 h-0.5 bg-teal-200 rounded-full animate-pulse opacity-35 delay-600"></div>
          <div style={{top: '225vh'}} className="absolute right-1/8 w-0.5 h-0.5 bg-sky-300 rounded-full animate-ping opacity-45 delay-800"></div>
          <div style={{top: '230vh'}} className="absolute left-1/6 w-1 h-1 bg-violet-200 rounded-full animate-pulse opacity-40 delay-1000"></div>
          <div style={{top: '235vh'}} className="absolute right-1/6 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-ping opacity-50 delay-1200"></div>
          <div style={{top: '240vh'}} className="absolute left-1/4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse opacity-35 delay-1400"></div>
          <div style={{top: '245vh'}} className="absolute right-1/4 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-45 delay-1600"></div>
          <div style={{top: '250vh'}} className="absolute left-1/3 w-1 h-1 bg-indigo-500 rounded-full animate-pulse opacity-40 delay-1800"></div>
          <div style={{top: '255vh'}} className="absolute right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-50 delay-2000"></div>
          <div style={{top: '260vh'}} className="absolute left-2/5 w-0.5 h-0.5 bg-teal-500 rounded-full animate-pulse opacity-35 delay-2200"></div>
          <div style={{top: '265vh'}} className="absolute right-2/5 w-0.5 h-0.5 bg-sky-400 rounded-full animate-ping opacity-45 delay-2400"></div>
          <div style={{top: '270vh'}} className="absolute left-1/2 w-1 h-1 bg-violet-500 rounded-full animate-pulse opacity-40 delay-2600"></div>
          <div style={{top: '275vh'}} className="absolute right-1/2 w-0.5 h-0.5 bg-emerald-400 rounded-full animate-ping opacity-50 delay-2800"></div>
          <div style={{top: '280vh'}} className="absolute left-3/5 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse opacity-35 delay-3000"></div>
          <div style={{top: '285vh'}} className="absolute right-3/5 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-45 delay-3200"></div>
          <div style={{top: '290vh'}} className="absolute left-2/3 w-1 h-1 bg-indigo-300 rounded-full animate-pulse opacity-40 delay-3400"></div>
          <div style={{top: '295vh'}} className="absolute right-2/3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-ping opacity-50 delay-3600"></div>
          
          {/* Qualifications Section Area (300vh to 400vh) */}
          <div style={{top: '310vh'}} className="absolute left-1/12 w-1 h-1 bg-teal-400 rounded-full animate-pulse opacity-50 delay-150"></div>
          <div style={{top: '315vh'}} className="absolute right-1/12 w-0.5 h-0.5 bg-sky-200 rounded-full animate-ping opacity-40 delay-350"></div>
          <div style={{top: '320vh'}} className="absolute left-1/8 w-0.5 h-0.5 bg-violet-300 rounded-full animate-pulse opacity-45 delay-550"></div>
          <div style={{top: '325vh'}} className="absolute right-1/8 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping opacity-35 delay-750"></div>
          <div style={{top: '330vh'}} className="absolute left-1/6 w-1 h-1 bg-cyan-200 rounded-full animate-pulse opacity-50 delay-950"></div>
          <div style={{top: '335vh'}} className="absolute right-1/6 w-0.5 h-0.5 bg-blue-200 rounded-full animate-ping opacity-40 delay-1150"></div>
          <div style={{top: '340vh'}} className="absolute left-1/4 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse opacity-45 delay-1350"></div>
          <div style={{top: '345vh'}} className="absolute right-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping opacity-35 delay-1550"></div>
          <div style={{top: '350vh'}} className="absolute left-1/3 w-1 h-1 bg-teal-300 rounded-full animate-pulse opacity-50 delay-1750"></div>
          <div style={{top: '355vh'}} className="absolute right-1/3 w-0.5 h-0.5 bg-sky-300 rounded-full animate-ping opacity-40 delay-1950"></div>
          <div style={{top: '360vh'}} className="absolute left-2/5 w-0.5 h-0.5 bg-violet-400 rounded-full animate-pulse opacity-45 delay-2150"></div>
          <div style={{top: '365vh'}} className="absolute right-2/5 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-ping opacity-35 delay-2350"></div>
          <div style={{top: '370vh'}} className="absolute left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50 delay-2550"></div>
          <div style={{top: '375vh'}} className="absolute right-1/2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping opacity-40 delay-2750"></div>
          <div style={{top: '380vh'}} className="absolute left-3/5 w-0.5 h-0.5 bg-indigo-400 rounded-full animate-pulse opacity-45 delay-2950"></div>
          <div style={{top: '385vh'}} className="absolute right-3/5 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-35 delay-3150"></div>
          <div style={{top: '390vh'}} className="absolute left-2/3 w-1 h-1 bg-teal-500 rounded-full animate-pulse opacity-50 delay-3350"></div>
          <div style={{top: '395vh'}} className="absolute right-2/3 w-0.5 h-0.5 bg-sky-500 rounded-full animate-ping opacity-40 delay-3550"></div>
          
          {/* Contact Section Area (400vh to 500vh) */}
          <div style={{top: '410vh'}} className="absolute left-1/12 w-0.5 h-0.5 bg-violet-200 rounded-full animate-pulse opacity-40 delay-250"></div>
          <div style={{top: '415vh'}} className="absolute right-1/12 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-50 delay-450"></div>
          <div style={{top: '420vh'}} className="absolute left-1/8 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse opacity-35 delay-650"></div>
          <div style={{top: '425vh'}} className="absolute right-1/8 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-45 delay-850"></div>
          <div style={{top: '430vh'}} className="absolute left-1/6 w-1 h-1 bg-indigo-300 rounded-full animate-pulse opacity-40 delay-1050"></div>
          <div style={{top: '435vh'}} className="absolute right-1/6 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping opacity-50 delay-1250"></div>
          <div style={{top: '440vh'}} className="absolute left-1/4 w-0.5 h-0.5 bg-teal-400 rounded-full animate-pulse opacity-35 delay-1450"></div>
          <div style={{top: '445vh'}} className="absolute right-1/4 w-0.5 h-0.5 bg-sky-300 rounded-full animate-ping opacity-45 delay-1650"></div>
          <div style={{top: '450vh'}} className="absolute left-1/3 w-1 h-1 bg-violet-400 rounded-full animate-pulse opacity-40 delay-1850"></div>
          <div style={{top: '455vh'}} className="absolute right-1/3 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-ping opacity-50 delay-2050"></div>
          <div style={{top: '460vh'}} className="absolute left-2/5 w-0.5 h-0.5 bg-cyan-500 rounded-full animate-pulse opacity-35 delay-2250"></div>
          <div style={{top: '465vh'}} className="absolute right-2/5 w-0.5 h-0.5 bg-blue-500 rounded-full animate-ping opacity-45 delay-2450"></div>
          <div style={{top: '470vh'}} className="absolute left-1/2 w-1 h-1 bg-indigo-500 rounded-full animate-pulse opacity-40 delay-2650"></div>
          <div style={{top: '475vh'}} className="absolute right-1/2 w-0.5 h-0.5 bg-purple-500 rounded-full animate-ping opacity-50 delay-2850"></div>
          <div style={{top: '480vh'}} className="absolute left-3/5 w-0.5 h-0.5 bg-teal-300 rounded-full animate-pulse opacity-35 delay-3050"></div>
          <div style={{top: '485vh'}} className="absolute right-3/5 w-0.5 h-0.5 bg-sky-400 rounded-full animate-ping opacity-45 delay-3250"></div>
          <div style={{top: '490vh'}} className="absolute left-2/3 w-1 h-1 bg-violet-300 rounded-full animate-pulse opacity-40 delay-3450"></div>
          <div style={{top: '495vh'}} className="absolute right-2/3 w-0.5 h-0.5 bg-emerald-400 rounded-full animate-ping opacity-50 delay-3650"></div>
          
          {/* Additional Dense Stars for Full Coverage */}
          <div style={{top: '105vh'}} className="absolute left-5/12 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse opacity-25 delay-75"></div>
          <div style={{top: '205vh'}} className="absolute right-5/12 w-0.5 h-0.5 bg-cyan-100/40 rounded-full animate-ping opacity-30 delay-175"></div>
          <div style={{top: '305vh'}} className="absolute left-7/12 w-0.5 h-0.5 bg-blue-100/50 rounded-full animate-pulse opacity-25 delay-275"></div>
          <div style={{top: '405vh'}} className="absolute right-7/12 w-0.5 h-0.5 bg-indigo-100/40 rounded-full animate-ping opacity-30 delay-375"></div>
          <div style={{top: '122vh'}} className="absolute left-3/8 w-0.5 h-0.5 bg-purple-100/50 rounded-full animate-pulse opacity-25 delay-125"></div>
          <div style={{top: '222vh'}} className="absolute right-3/8 w-0.5 h-0.5 bg-teal-100/40 rounded-full animate-ping opacity-30 delay-225"></div>
          <div style={{top: '322vh'}} className="absolute left-5/8 w-0.5 h-0.5 bg-sky-100/50 rounded-full animate-pulse opacity-25 delay-325"></div>
          <div style={{top: '422vh'}} className="absolute right-5/8 w-0.5 h-0.5 bg-violet-100/40 rounded-full animate-ping opacity-30 delay-425"></div>
        </div>
      </div>
      
      {/* Cursor Star Effect - Covers entire website */}
      <div className="hidden md:block pointer-events-none fixed inset-0 z-40">
        {cursorStars.map(star => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: star.x - star.size / 2,
              top: star.y - star.size / 2,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animation: `star-sparkle-fade ${star.duration}ms ease-out forwards`,
              transform: `rotate(${star.rotation}deg) scale(${star.scale})`,
            }}
          >
            {/* Star shape using CSS */}
            <div
              className="absolute inset-0"
              style={{
                background: star.color === 'cyan' 
                  ? 'linear-gradient(45deg, #00f5ff, #87ceeb)' 
                  : star.color === 'blue' 
                    ? 'linear-gradient(45deg, #4169e1, #87cefa)'
                    : 'linear-gradient(45deg, #ffffff, #f0f8ff)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                filter: `drop-shadow(0 0 ${star.size * 0.5}px currentColor)`,
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Scrollable Content Layer - This is what scrolls */}
      <div 
        className="relative z-10 min-h-screen"
        style={{ 
          position: 'relative',
          zIndex: 10
        }}
      >
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection isVisible={isVisible} />
        <ExperienceSection isVisible={isVisible} />
        <QualificationsSection isVisible={isVisible} />
        <ContactSection isVisible={isVisible} />
        <FloatingActionButton scrollToSection={scrollToSection} />
      </div>
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

        @keyframes dash-in {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes popup {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes zoom-in {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
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

        .animate-dash-in {
          animation: dash-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .animate-popup {
          animation: popup 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .animate-zoom-in {
          animation: zoom-in 0.6s ease-out both;
        }

        /* Scroll-triggered elements start invisible but only for non-hero sections */
        section:not(#hero) .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        section:not(#hero) .animate-on-scroll.animate-popup {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero section loads normally without popup effects */
        #hero .animate-on-scroll {
          opacity: 1;
          transform: translateY(0);
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes star-sparkle-fade {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
            filter: brightness(2) saturate(1.5);
          }
          15% {
            transform: scale(1.2) rotate(30deg);
            opacity: 0.9;
            filter: brightness(1.8) saturate(1.3);
          }
          35% {
            transform: scale(1) rotate(60deg);
            opacity: 0.7;
            filter: brightness(1.5) saturate(1.1);
          }
          60% {
            transform: scale(0.8) rotate(120deg);
            opacity: 0.4;
            filter: brightness(1) saturate(0.8);
          }
          85% {
            transform: scale(0.3) rotate(180deg);
            opacity: 0.1;
            filter: brightness(0.5) saturate(0.5);
          }
          100% {
            transform: scale(0) rotate(240deg);
            opacity: 0;
            filter: brightness(0) saturate(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;