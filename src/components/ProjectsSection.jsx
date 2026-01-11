import React, { useState, useEffect, useRef } from 'react';
import { Code, ExternalLink, Github, Rocket, Database, MessageSquare, Video, Brain, ShoppingCart } from 'lucide-react';
import lkdinVideo from '../assets/lkdin.mp4';
import mamtaImg from '../assets/mamta.png';
import mamta2Img from '../assets/mamta2.png';
import uniedLogo from '../assets/UniEdlogo.png';

const ProjectsSection = ({ isVisible }) => {
  const [activeProject, setActiveProject] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);

  const projects = [
    {
      id: 'unied',
      title: 'UniEd - Unified Education Platform',
      description: 'Developed a full-stack LMS with real-time collaboration for students, faculty, and administrators.',
      features: [
        'Implemented instant messaging, live notifications, and virtual classrooms using Socket.IO and WebRTC',
        'Integrated an AI assessment tutor using GPT-4o and ElevenLabs for TTS to provide real-time interviewing and feedback'
      ],
      technologies: ['ReactJS', 'TypeScript', 'NodeJS', 'MongoDB', 'Socket.IO', 'WebRTC', 'GPT-4o'],
      liveLink: 'https://uniedplatform.vercel.app',
      githubLink: null,
      logo: uniedLogo,
      gradient: 'from-purple-500 to-pink-500',
      highlights: ['Real-time Collaboration', 'AI Tutor', 'Virtual Classrooms'],
      video: lkdinVideo,
      isVideo: true
    },
    {
      id: 'mamta',
      title: 'Mamta Restaurant - Food Ordering Platform',
      description: 'Built a full-stack restaurant ordering platform with React.js and Node.js, enabling real-time order tracking.',
      features: [
        'Managing 500+ daily orders efficiently with optimized backend architecture',
        'Real-time order tracking and status updates for seamless customer experience'
      ],
      technologies: ['ReactJS', 'NodeJS', 'Express', 'MongoDB'],
      liveLink: null,
      githubLink: 'https://github.com/adityadhimaann/mamta-bhojnalayaa',
      icon: <ShoppingCart className="w-6 h-6" />,
      gradient: 'from-orange-500 to-red-500',
      highlights: ['500+ Daily Orders', 'Real-time Tracking', 'Full-Stack'],
      image: mamtaImg,
      image2: mamta2Img,
      isVideo: false
    }
  ];

  // Smooth infinite auto-scroll for mobile
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current.parentElement;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 1.2;

    const smoothScroll = () => {
      if (!isAutoScrolling || !container || !scrollContainerRef.current) return;

      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const halfWidth = scrollWidth / 2;
      
      container.scrollLeft += scrollSpeed;

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

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6">
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30 mb-6">
            <Code className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-sm font-mono text-green-300">Projects / Open-Source</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Building innovative solutions with modern technologies and best practices.
          </p>
        </div>

        {/* Projects Grid - Desktop: Grid, Mobile: Auto-scroll carousel */}
        <div className="mb-20">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-400/60 transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setActiveProject(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`} />
                <div className="relative z-10">
                  {/* Project Image/Video/Screenshot */}
                  {project.isVideo && project.video ? (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
                      <video 
                        src={project.video} 
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ) : project.image && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
                      <img 
                        src={project.image} 
                        alt={`${project.title} screenshot`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Icon/Logo and Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 flex-shrink-0 ${project.logo ? '' : `bg-gradient-to-r ${project.gradient}`} rounded-xl`}>
                      {project.logo ? (
                        <img src={project.logo} alt={`${project.title} logo`} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-white">{project.icon}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-2 mb-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/60 hover:bg-green-500/20 border border-gray-700 hover:border-green-400 rounded-lg transition-all duration-300"
                        aria-label="View live project"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-green-400" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/60 hover:bg-blue-500/20 border border-gray-700 hover:border-blue-400 rounded-lg transition-all duration-300"
                        aria-label="View GitHub repository"
                      >
                        <Github className="w-4 h-4 text-gray-400 hover:text-blue-400" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-800/60 text-green-400 rounded-md border border-gray-700"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Auto-scroll Carousel */}
          <div className="md:hidden relative">
            <style>
              {`
                .projects-carousel::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div 
              className="overflow-x-auto overflow-y-visible py-4 projects-carousel scroll-smooth"
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
                  width: `${projects.length * 2 * 320}px`,
                  willChange: 'transform'
                }}
              >
                {/* First set of cards */}
                {projects.map((project, index) => (
                  <div
                    key={`first-${project.id}`}
                    className="flex-shrink-0 w-80 mx-4 group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`} />
                    <div className="relative z-10">
                      {/* Project Image/Video */}
                      {project.isVideo && project.video ? (
                        <div className="mb-3 rounded-lg overflow-hidden border border-gray-700">
                          <video 
                            src={project.video} 
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ) : project.image && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-gray-700">
                          <img 
                            src={project.image} 
                            alt={`${project.title} screenshot`}
                            className="w-full h-40 object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 flex-shrink-0 ${project.logo ? '' : `bg-gradient-to-r ${project.gradient}`} rounded-xl`}>
                          {project.logo ? (
                            <img src={project.logo} alt={`${project.title} logo`} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-white">{project.icon}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/60 border border-gray-700 rounded-lg"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/60 border border-gray-700 rounded-lg"
                          >
                            <Github className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3 leading-relaxed text-sm">{project.description}</p>
                      <ul className="space-y-2 mb-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.highlights.map((highlight, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-800/60 text-green-400 rounded-md border border-gray-700">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-700/50">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {projects.map((project, index) => (
                  <div
                    key={`second-${project.id}`}
                    className="flex-shrink-0 w-80 mx-4 group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300`} />
                    <div className="relative z-10">
                      {/* Project Image/Video */}
                      {project.isVideo && project.video ? (
                        <div className="mb-3 rounded-lg overflow-hidden border border-gray-700">
                          <video 
                            src={project.video} 
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-40 object-cover"
                          />
                        </div>
                      ) : project.image && (
                        <div className="mb-3 rounded-lg overflow-hidden border border-gray-700">
                          <img 
                            src={project.image} 
                            alt={`${project.title} screenshot`}
                            className="w-full h-40 object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 flex-shrink-0 ${project.logo ? '' : `bg-gradient-to-r ${project.gradient}`} rounded-xl`}>
                          {project.logo ? (
                            <img src={project.logo} alt={`${project.title} logo`} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-white">{project.icon}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      </div>
                      <div className="flex gap-2 mb-3">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/60 border border-gray-700 rounded-lg"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/60 border border-gray-700 rounded-lg"
                          >
                            <Github className="w-4 h-4 text-gray-400" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3 leading-relaxed text-sm">{project.description}</p>
                      <ul className="space-y-2 mb-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.highlights.map((highlight, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-800/60 text-green-400 rounded-md border border-gray-700">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-700/50">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
