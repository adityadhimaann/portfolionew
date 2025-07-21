import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

// --- Data for the journey cards ---
const journeyData = [
  {
    title: "Gromo X AWS Finarva AI 2025",
    role: "CTO @Gromo",
    location: "Gurugram, Haryana",
    image: require('../assets/e.jpeg'),
    link: "https://gromo.com",
    ariaLabel: "Gromo X AWS Finarva AI 2025 CTO at Gromo"
  },
  // --- NEW ITEM ADDED HERE ---
  {
    title: "Team Leadership at FinArva AI Hackathon",
    role: "Team Lead | With strong team support",
    location: "Gurugram, Haryana",
    image: require('../assets/gromo.jpeg'), // Using the new image
    link: "https://gromo.com",
    ariaLabel: "Team Lead at Gromo"
  },
  // --- End of new item ---
  {
    title: "SDE Intern",
    role: "@Larsen & Toubro",
    location: "Faridabad, Haryana",
    image: require('../assets/d.jpeg'),
    link: "https://www.larsentoubro.com",
    ariaLabel: "SDE Intern at Larsen & Toubro"
  },
  {
    title: "#building in AI",
    role: "@SarvamAI",
    location: "Noida, Uttar Pradesh",
    image: require('../assets/f.jpeg'),
    link: "https://sarvam.ai",
    ariaLabel: "Building something creative in AI at SarvamAI"
  },
  {
    title: "Google Cloud Developers Day",
    role: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    image: require('../assets/gdg.jpg'),
    link: "https://gdg.community.dev/noida/",
    ariaLabel: "Google Cloud Developers Day 2025 at GDG Noida"
  },
  {
    title: "Google Cloud Developers Day",
    role: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    image: require('../assets/gdg2.jpg'),
    link: "https://gdg.community.dev/noida/",
    ariaLabel: "Google Cloud Developers Day at GDG Noida"
  }
];

// --- Reusable Journey Card Sub-Component ---
const JourneyCard = ({ item, isVisible, delay }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const xRot = (mouseY / height - 0.5) * -15;
    const yRot = (mouseX / width - 0.5) * 15;

    setRotation({ x: xRot, y: yRot });
    setGlowPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.ariaLabel}
        className="block group"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Card outer shell with styles for both modes */}
        <div className="relative rounded-2xl p-1 bg-slate-200 dark:bg-gradient-to-br dark:from-slate-700/50 dark:via-slate-800/50 dark:to-slate-900/50 h-full shadow-lg dark:shadow-2xl dark:shadow-slate-950/50">
          <div
            className="absolute inset-[-1px] rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(99, 102, 241, 0.3), transparent 80%)`,
            }}
          ></div>
          {/* Card inner content area with styles for both modes */}
          <div className="relative bg-white dark:bg-slate-900 w-full h-full rounded-xl overflow-hidden p-4 sm:p-5 border border-slate-200 dark:border-slate-800">
            <div className="aspect-w-4 aspect-h-3 mb-4 sm:mb-5 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                style={{ maxHeight: '220px', width: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h3>
              <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">{item.role}</p>
              <div className="flex items-center text-slate-500 dark:text-slate-400 pt-2">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{item.location}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

// --- Main AboutSection Component ---
const AboutSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24 overflow-hidden transition-colors duration-300"
    >
      {/* Background patterns adjusted for both modes */}
      <div className="absolute inset-0 z-0 h-full w-full bg-slate-50 dark:bg-slate-900 bg-[linear-gradient(to_right,#80808011_1px,transparent_1px),linear-gradient(to_bottom,#80808011_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute -top-1/4 left-0 z-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#d1d5db,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#1e40af22,transparent)]"></div>
      
      <div className="w-full max-w-7xl mx-auto z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:via-slate-300 dark:to-slate-500 bg-clip-text text-transparent mb-4 tracking-tight">
            My Journey in Tech
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A timeline of my key experiences in development, leadership, and community contribution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {journeyData.map((item, index) => (
            <JourneyCard
              key={index}
              item={item}
              isVisible={isVisible}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;