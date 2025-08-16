import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Code, Star, Cpu, PenTool, Database, Terminal, Award, Calendar, MapPin, Zap, BookOpen, Target, Trophy } from 'lucide-react';

// Enhanced Data for Education & Skills
const educationData = [
  {
    degree: "Bachelor of Technology, CSE",
    institution: "Lovely Professional University",
    period: "2023 – 2027",
    status: "Current",
    location: "Punjab, India",
    icon: <GraduationCap />,
    description: "Specializing in Computer Science and Engineering with focus on Full Stack Development",
    grade: "Current CGPA: 7.1/10"
  },
  {
    degree: "Software Engineering Internship",
    institution: "Larsen & Toubro",
    period: "2025 – Present",
    status: "Active",
    location: "Faridabad, Haryana",
    icon: <Briefcase />,
    description: "Working on enterprise-level applications and gaining hands-on industry experience",
    grade: "Performance: Excellent"
  }
];

const skillsData = [
  { name: "React & Next.js", icon: <Code />, level: 90, category: "frontend" },
  { name: "Node.js & Express", icon: <Cpu />, level: 85, category: "backend" },
  { name: "JavaScript (ES6+)", icon: <Code />, level: 95, category: "language" },
  { name: "TypeScript", icon: <Code />, level: 80, category: "language" },
  { name: "Tailwind CSS", icon: <PenTool />, level: 90, category: "frontend" },
  { name: "UI/UX Design", icon: <PenTool />, level: 75, category: "design" },
  { name: "MongoDB & SQL", icon: <Database />, level: 85, category: "database" },
  { name: "Git & GitHub", icon: <Code />, level: 90, category: "tools" },
  { name: "Docker", icon: <Cpu />, level: 70, category: "devops" },
  { name: "AWS", icon: <Cpu />, level: 65, category: "cloud" },
  { name: "Python", icon: <Terminal />, level: 88, category: "language" },
  { name: "Java", icon: <Terminal />, level: 82, category: "language" },
  { name: "GraphQL", icon: <Database />, level: 78, category: "backend" },
  { name: "Redux", icon: <Code />, level: 85, category: "frontend" },
  { name: "Firebase", icon: <Cpu />, level: 80, category: "cloud" },
  { name: "Webpack", icon: <PenTool />, level: 72, category: "tools" },
  { name: "Jest & Testing", icon: <Code />, level: 75, category: "tools" },
  { name: "Kubernetes", icon: <Cpu />, level: 68, category: "devops" },
];

const achievements = [
  { title: "Hackathon Finalist", year: "2025", icon: <Trophy /> },
  { title: "Leetcode & CodeChef Expert", icon: <Star /> },
];

const QualificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

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

  // Auto-scroll effect for skills
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const scroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        setScrollPosition(prev => {
          const newPosition = prev + 0.3; // Reduced from 1 to 0.3 for slower speed
          if (newPosition >= maxScroll) {
            return 0;
          }
          return newPosition;
        });
      }
    };

    const startAnimation = () => {
      animationRef.current = requestAnimationFrame(() => {
        scroll();
        setTimeout(() => startAnimation(), 50); // Added 50ms delay between frames
      });
    };

    // Start animation after a delay
    const timeoutId = setTimeout(startAnimation, 2000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(timeoutId);
    };
  }, [isAutoScrolling, isVisible]);

  // Update scroll position
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const filteredSkills = activeSkillCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeSkillCategory);

  const skillCategories = [
    { id: 'all', name: 'All', icon: <Target /> },
    { id: 'frontend', name: 'Frontend', icon: <Code /> },
    { id: 'backend', name: 'Backend', icon: <Cpu /> },
    { id: 'language', name: 'Languages', icon: <Terminal /> },
    { id: 'tools', name: 'Tools', icon: <PenTool /> },
    { id: 'design', name: 'Design', icon: <PenTool /> },
    { id: 'cloud', name: 'Cloud', icon: <Cpu /> },
    { id: 'devops', name: 'DevOps', icon: <Cpu /> },
  ];

  return (
    <section
      id="qualifications"
      ref={sectionRef}
      className="relative min-h-screen font-sans py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12"
    >
      
      <div className="max-w-7xl w-full mx-auto z-10">
        
        {/* Terminal Header */}
        <div className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out animate-on-scroll ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-lg p-3 border-b border-slate-700/50 animate-on-scroll">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 text-center">
                <span className="text-slate-400 text-sm font-sans">~/portfolio/qualifications</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-b-lg p-8 border border-slate-700/50 animate-on-scroll">
            <div className="text-center space-y-4">
              <div className="text-cyan-400 text-sm animate-on-scroll">
                <span className="text-green-400">$</span> cat qualifications.md
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white animate-on-scroll">
                <span className="text-cyan-400">{'<'}</span>
                My Qualifications
                <span className="text-cyan-400">{' />'}</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 animate-on-scroll">
                <span className="text-green-400">// </span>
                Academic background and technical expertise
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 xl:gap-16 animate-on-scroll items-start">
          
          {/* Left Column: Education & Achievements */}
          <div className={`col-span-1 lg:col-span-2 space-y-6 sm:space-y-8 transition-all duration-1000 ease-out animate-on-scroll ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            
            {/* Education Section */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-4">
                <div className="text-cyan-400 bg-slate-800 p-1.5 sm:p-2 rounded-lg">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-cyan-400">education</span>
                <span className="text-slate-500">[]</span>
              </h3>
              
              <div className="space-y-4">
                {educationData.map((edu, index) => (
                  <div key={index} className="group bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden">
                    <div className="p-3 sm:p-6">
                      <div className="flex items-start gap-2 sm:gap-4">
                        <div className="text-cyan-400 bg-slate-700 p-2 sm:p-3 rounded-lg group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300 flex-shrink-0">
                          <div className="w-4 h-4 sm:w-5 sm:h-5">
                            {edu.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                            <h4 className="font-bold text-base sm:text-lg text-white truncate">{edu.degree}</h4>
                            <span className={`px-2 py-1 text-xs font-mono rounded-full inline-block w-fit ${
                              edu.status === 'Current' || edu.status === 'Active' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                            }`}>
                              {edu.status}
                            </span>
                          </div>
                          <p className="text-slate-300 font-medium mb-1 text-sm sm:text-base">{edu.institution}</p>
                          <p className="text-xs sm:text-sm text-slate-400 mb-2">{edu.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {edu.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {edu.location}
                            </span>
                          </div>
                          <p className="text-xs text-cyan-400 mt-2 font-mono">{edu.grade}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <Award className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-yellow-400">achievements</span>
              </h3>
              <div className="grid gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <div className="text-yellow-400 flex-shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6">
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-semibold text-sm sm:text-base">{achievement.title}</h4>
                      <p className="text-slate-400 text-xs sm:text-sm">{achievement.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className={`col-span-1 lg:col-span-3 space-y-6 sm:space-y-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            
            <div className="space-y-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-3 sm:gap-4">
                  <div className="text-cyan-400 bg-slate-800 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                    <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-cyan-400 text-sm sm:text-base md:text-lg">technical_skills</span>
                    <span className="text-slate-500 text-xs sm:text-sm hidden sm:inline">.filter()</span>
                  </div>
                </h3>
              </div>
              
              {/* Skill Categories Filter */}
              <div className="flex flex-row flex-nowrap overflow-x-auto gap-2 pb-2 scrollbar-hide">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveSkillCategory(category.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-sans text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                      activeSkillCategory === category.id
                        ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400'
                    }`}
                  >
                    <div className="w-3 h-3 sm:w-4 sm:h-4">
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Auto-Scrolling Skills Carousel */}
              <div className="relative overflow-hidden rounded-lg bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 w-full max-w-full">
                <div
                  ref={scrollContainerRef}
                  className="flex gap-4 sm:gap-5 py-4 px-3 overflow-x-auto scrollbar-hide w-full"
                  style={{
                    scrollBehavior: 'smooth',
                    transform: 'translateZ(0)', // Hardware acceleration
                  }}
                >
                  {/* Duplicate skills for infinite scroll effect */}
                  {[...filteredSkills, ...filteredSkills].map((skill, index) => (
                    <div
                      key={`${skill.name}-${index}`}
                      className="group flex-shrink-0 w-72 sm:w-80 lg:w-84 bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 p-4 sm:p-5 relative overflow-hidden"
                      onMouseEnter={() => setHoveredSkill(index)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Animated background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                            <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors flex-shrink-0 group-hover:scale-110 transform transition-transform duration-300">
                              <div className="w-6 h-6 sm:w-7 sm:h-7">
                                {skill.icon}
                              </div>
                            </div>
                            <span className="text-white font-medium text-sm sm:text-base lg:text-lg truncate group-hover:text-cyan-100 transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-cyan-400 font-mono text-sm sm:text-base flex-shrink-0 ml-3 group-hover:text-cyan-300 transition-colors">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Enhanced Skill Progress Bar */}
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${(index % filteredSkills.length) * 100}ms`
                            }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Enhanced Category Tag */}
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs sm:text-sm text-slate-500 font-sans bg-slate-900/30 px-3 py-1.5 rounded">
                            .{skill.category}
                          </span>
                          {hoveredSkill === index && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400 animate-fade-in">
                              <Zap className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                              <span className="hidden sm:inline font-mono">proficient</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Floating particles effect on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute top-1/2 right-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-bounce delay-500"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Gradient overlays for visual effect */}
                <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10"></div>
                <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10"></div>
              </div>
              
              {/* Skills count indicator */}
              <div className="text-center">
                <span className="text-xs sm:text-sm text-slate-500 font-sans bg-slate-800/30 px-4 py-2 rounded-full">
                  {filteredSkills.length} skills loaded
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(6, 182, 212, 0.2); }
          50% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 0 0 30px rgba(6, 182, 212, 0.2); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        /* Custom scrollbar hiding */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth hardware acceleration */
        .skills-carousel {
          transform: translateZ(0);
          will-change: transform;
        }
        
        /* Enhanced hover effects */
        .skill-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skill-card:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default QualificationsSection;