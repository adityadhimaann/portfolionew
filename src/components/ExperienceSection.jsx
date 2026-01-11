import React, { useState, useEffect, useRef } from 'react';
import { Code, Zap, Palette, Users, Terminal, Rocket, GitBranch, Database } from 'lucide-react';

const ExperienceSection = ({ isVisible }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isTechStackAutoScrolling, setIsTechStackAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const techStackScrollRef = useRef(null);

  const codeSnippet = "const developer = { passion: 'infinite', skills: 'evolving' };";

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < codeSnippet.length) {
          setTypedText(codeSnippet.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 35); // faster typing

      return () => clearInterval(typeInterval);
    }
  }, [isVisible]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 450);
    return () => clearInterval(cursorInterval);
  }, []);

  // Smooth infinite auto-scroll for mobile project cards
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

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

      // Seamless infinite loop: reset to start when reaching halfway
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling]);

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  // Smooth infinite auto-scroll for tech stack badges
  useEffect(() => {
    if (!isTechStackAutoScrolling || !techStackScrollRef.current) return;

    const container = techStackScrollRef.current.parentElement;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 0.8; // Slower speed for tech stack

    const smoothScroll = () => {
      if (!isTechStackAutoScrolling || !container || !techStackScrollRef.current) return;

      const scrollWidth = techStackScrollRef.current.scrollWidth;
      const halfWidth = scrollWidth / 2; // Since we duplicate badges
      
      // Increment scroll position smoothly
      container.scrollLeft += scrollSpeed;

      // Seamless infinite loop: reset to start when reaching halfway
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTechStackAutoScrolling]);

  const handleTechStackMouseEnter = () => {
    setIsTechStackAutoScrolling(false);
  };

  const handleTechStackMouseLeave = () => {
    setIsTechStackAutoScrolling(true);
  };

  const techStack = [
    { name: 'React', color: 'from-blue-400 to-blue-600' },
    { name: 'Next.js', color: 'from-gray-600 to-gray-800' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'Tailwind', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Node.js', color: 'from-green-500 to-green-700' },
    { name: 'Python', color: 'from-yellow-500 to-yellow-600' }
  ];

  const projects = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Performance-First Apps',
      description: 'Architecting high-performance web applications with advanced optimization techniques and cutting-edge frameworks.',
      gradient: 'from-purple-500 to-pink-500',
      stats: '99% Perf Score'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Design Systems',
      description: 'Building scalable design systems and component libraries that maintain consistency across large applications.',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '50+ Components'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Full-Stack Solutions',
      description: 'End-to-end development from database design to responsive frontends, creating seamless user experiences.',
      gradient: 'from-green-500 to-emerald-500',
      stats: '20+ APIs Built'
    }
  ];

  return (
    <section id="experience" className="relative min-h-screen pr-12 pl-12 optimize-rendering">
      <div className="relative z-10 container mx-auto px-6 py-32">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-6">
            <Terminal className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm font-mono text-blue-300">Developer Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Crafting Digital Excellence
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Building next-generation web applications with cutting-edge technologies, exceptional performance, and pixel-perfect design.
          </p>
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-xs text-gray-400 font-mono">main.js</span>
            </div>
            <div className="font-mono text-green-400 text-lg">
              {typedText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </div>
          </div>
          <div 
            className="overflow-x-auto scrollbar-hide py-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={handleTechStackMouseEnter}
            onMouseLeave={handleTechStackMouseLeave}
            onTouchStart={handleTechStackMouseEnter}
            onTouchEnd={handleTechStackMouseLeave}
          >
            <div 
              ref={techStackScrollRef}
              className="flex gap-3 justify-center"
              style={{ 
                width: 'max-content',
                willChange: 'transform'
              }}
            >
              {/* First set of badges */}
              {techStack.map((tech, index) => (
                <div
                  key={`first-${index}`}
                  className={`px-4 py-2 bg-gradient-to-r ${tech.color} rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap`}
                >
                  {tech.name}
                </div>
              ))}
              {/* Duplicate set of badges for seamless loop */}
              {techStack.map((tech, index) => (
                <div
                  key={`second-${index}`}
                  className={`px-4 py-2 bg-gradient-to-r ${tech.color} rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
          <style>
            {`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        </div>
        {/* Projects Grid - Desktop: Grid, Mobile: Auto-scroll carousel */}
        <div className="mb-20">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700 hover:border-gray-600 hover:-translate-y-2 transition-all duration-300"
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-xl mb-4 text-white`}>{project.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                    <span className="text-sm font-semibold text-blue-400">{project.stats}</span>
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Auto-scroll Carousel */}
          <div className="md:hidden relative">
            <style>
              {`
                .carousel-container::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div 
              className="overflow-x-auto overflow-y-visible py-4 carousel-container scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseEnter}
              onTouchEnd={handleMouseLeave}
            >
              <div 
                ref={scrollContainerRef}
                className="flex gap-0"
                style={{ 
                  width: `${projects.length * 2 * 320}px`, // Double width for duplicated cards
                  willChange: 'transform'
                }}
              >
                {/* First set of cards */}
                {projects.map((project, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-72 mx-4 group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`} />
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-xl mb-4 text-white`}>{project.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                        <span className="text-sm font-semibold text-blue-400">{project.stats}</span>
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set of cards for seamless loop */}
                {projects.map((project, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-72 mx-4 group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`} />
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-xl mb-4 text-white`}>{project.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                        <span className="text-sm font-semibold text-blue-400">{project.stats}</span>
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-gray-500">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Skills & Expertise */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Technical Expertise</h2>
            <div className="space-y-4">
              {[{ skill: 'Frontend Development', level: 95, color: 'from-blue-500 to-cyan-500' }, { skill: 'Backend Architecture', level: 88, color: 'from-green-500 to-emerald-500' }, { skill: 'UI/UX Design', level: 92, color: 'from-purple-500 to-pink-500' }, { skill: 'DevOps & Deployment', level: 85, color: 'from-orange-500 to-red-500' }].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-medium text-sm">{item.skill}</span>
                    <span className="text-blue-400 font-bold text-sm">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-gray-700">
              <div className="flex items-center mb-4">
                <Code className="w-7 h-7 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Code Philosophy</h3>
              </div>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p>Performance-first approach with optimized, scalable solutions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <GitBranch className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Clean, maintainable code following industry best practices</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p>User-centric design with accessibility and usability in mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;