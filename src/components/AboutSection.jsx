import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Sparkles, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images properly
import eImage from '../assets/e.jpeg';
import gromoImage from '../assets/gromo.jpeg';
import dImage from '../assets/d.jpeg';
import fImage from '../assets/f.jpeg';
import gdgImage from '../assets/gdg.jpg';
import gdg2Image from '../assets/gdg2.jpg';

// --- Data for the journey cards ---
const journeyData = [
  {
    title: "Gromo X AWS Finarva AI 2025",
    role: "CTO @Gromo",
    location: "Gurugram, Haryana",
    image: eImage,
    link: "https://gromo.com",
    ariaLabel: "Gromo X AWS Finarva AI 2025 CTO at Gromo",
    year: "2025",
    category: "leadership"
  },
  {
    title: "Team Leadership at FinArva AI Hackathon",
    role: "Team Lead | With strong team support",
    location: "Gurugram, Haryana",
    image: gromoImage,
    link: "https://gromo.com",
    ariaLabel: "Team Lead at Gromo",
    year: "2025",
    category: "hackathon"
  },
  {
    title: "SDE Intern",
    role: "@Larsen & Toubro",
    location: "Faridabad, Haryana",
    image: dImage,
    link: "https://www.larsentoubro.com",
    ariaLabel: "SDE Intern at Larsen & Toubro",
    year: "2025",
    category: "internship"
  },
  {
    title: "#building in AI",
    role: "@SarvamAI",
    location: "Noida, Uttar Pradesh",
    image: fImage,
    link: "https://sarvam.ai",
    ariaLabel: "Building something creative in AI at SarvamAI",
    year: "2024",
    category: "project"
  },
  {
    title: "Google Cloud Developers Day",
    role: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    image: gdgImage,
    link: "https://gdg.community.dev/noida/",
    ariaLabel: "Google Cloud Developers Day 2025 at GDG Noida",
    year: "2025",
    category: "event"
  },
  {
    title: "Google Cloud Developers Day",
    role: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    image: gdg2Image,
    link: "https://gdg.community.dev/noida/",
    ariaLabel: "Google Cloud Developers Day at GDG Noida",
    year: "2025",
    category: "event"
  }
];

// --- Reusable Journey Card Sub-Component ---
const JourneyCard = ({ item, isVisible, delay, index, hoveredCard, onCardHover, onCardLeave }) => {
  return (
    <div 
      className={`flex-shrink-0 w-80 sm:w-96 h-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl smooth-animation hover:scale-105 hover:bg-white/15 mx-4 group gpu-accelerated ${hoveredCard === index ? 'ring-2 ring-blue-400/50' : ''} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => onCardHover(index)}
      onMouseLeave={onCardLeave}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-efficient-pulse"></div>
          <span className="text-sm font-medium text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full">
            {item.year}
          </span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
      
      <div className="aspect-w-4 aspect-h-3 mb-4 sm:mb-5 overflow-hidden rounded-lg bg-white/5">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-contain group-hover:scale-105 smooth-animation gpu-accelerated"
          loading="lazy"
        />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
        {item.title}
      </h3>
      
      <p className="text-sm font-semibold text-indigo-400 mb-2">
        {item.role}
      </p>
      
      <div className="flex items-center text-gray-300 mb-4">
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm">{item.location}</span>
      </div>
      
      <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={item.ariaLabel}
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium group"
      >
        <span>View Details</span>
        <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
};

// --- Main AboutSection Component ---
const AboutSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  // Smooth infinite auto-scroll effect for journey cards
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current || !isVisible) return;

    const container = scrollContainerRef.current.parentElement;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 1.2; // Pixels per frame

    const smoothScroll = () => {
      if (!isAutoScrolling || !container || !scrollContainerRef.current) return;

      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const halfWidth = scrollWidth / 2; // Since we duplicate cards
      
      // Increment scroll position smoothly
      container.scrollLeft += scrollSpeed;

      // Seamless infinite loop: reset to start when reaching halfway (end of first set)
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0;
      }

      setScrollPosition(container.scrollLeft);
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling, isVisible]);

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current?.parentElement;
    if (container) {
      const scrollAmount = 384; // Match card width + margins
      const targetPosition = Math.max(0, container.scrollLeft - scrollAmount);
      
      // Smooth scroll animation
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(targetPosition);
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 3000); // Resume auto-scroll after 3 seconds
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current?.parentElement;
    if (container && scrollContainerRef.current) {
      const scrollAmount = 384; // Match card width + margins
      const maxScroll = scrollContainerRef.current.scrollWidth - container.clientWidth;
      const targetPosition = Math.min(maxScroll, container.scrollLeft + scrollAmount);
      
      // Smooth scroll animation
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(targetPosition);
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 3000); // Resume auto-scroll after 3 seconds
    }
  };

  return (
    <>
      <style>
        {`
          .carousel-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <section
        id="about"
        ref={sectionRef}
        className="relative min-h-screen font-sans flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24 transition-colors duration-300"
      >
      
      <div className="w-full max-w-7xl mx-auto z-10">
        <div className={`text-center mb-16 transition-all duration-1000 scroll-animate ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="">
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-slate-300 to-slate-500 bg-clip-text text-transparent mb-4 tracking-tight scroll-animate">
            My Journey in Tech
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed scroll-animate">
            A timeline of my key experiences in development, leadership, and community contribution.
          </p>
        </div>

        {/* Auto-scrolling Journey Carousel */}
        <div className="relative scroll-animate">
          {/* Removed dark gradient side overlays for cleaner background */}
          
          {/* Scroll buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 active:bg-white/30 active:scale-95 transition-all duration-300 shadow-lg hover:scale-110 group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white hover:bg-white/20 active:bg-white/30 active:scale-95 transition-all duration-300 shadow-lg hover:scale-110 group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          {/* Journey cards carousel container */}
          <div 
            className="overflow-x-auto overflow-y-visible py-8 carousel-container scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={scrollContainerRef}
              className="flex gap-0"
              style={{ 
                width: `${journeyData.length * 2 * 384}px`, // Double width for duplicated cards
                willChange: 'transform'
              }}
            >
              {/* First set of cards */}
              {journeyData.map((item, index) => (
                <JourneyCard
                  key={`first-${index}`}
                  item={item}
                  isVisible={isVisible}
                  delay={index * 150}
                  index={index}
                  hoveredCard={hoveredCard}
                  onCardHover={handleCardHover}
                  onCardLeave={handleCardLeave}
                />
              ))}
              {/* Duplicate set of cards for seamless loop */}
              {journeyData.map((item, index) => (
                <JourneyCard
                  key={`second-${index}`}
                  item={item}
                  isVisible={isVisible}
                  delay={index * 150}
                  index={index + journeyData.length}
                  hoveredCard={hoveredCard}
                  onCardHover={handleCardHover}
                  onCardLeave={handleCardLeave}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AboutSection;