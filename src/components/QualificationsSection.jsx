import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  GraduationCap, Briefcase, Code, Star, Cpu, PenTool, Database, Terminal, 
  Award, Calendar, MapPin, Zap, BookOpen, Target, Trophy, Palette, Cloud, 
  Settings, ChevronLeft, ChevronRight, Play, Pause, Layers, Box, Server,
  Globe, GitBranch, Smartphone, Monitor, Braces, FileText, Workflow,
  TestTube, Container, Hexagon, Flame
} from 'lucide-react';

// Enhanced Data with better structure
const educationData = [
  {
    id: 'lpu-btech',
    degree: "Bachelor of Technology, CSE",
    institution: "Lovely Professional University",
    period: "2023 – 2027",
    status: "Current",
    location: "Punjab, India",
    icon: <GraduationCap />,
    description: "Specializing in Computer Science and Engineering with focus on Full Stack Development",
    grade: "Current CGPA: 7.1/10",
    color: "cyan"
  },
  {
    id: 'lt-internship',
    degree: "Software Engineering Internship",
    institution: "Larsen & Toubro",
    period: "June 2025 – July 2025",
    status: "Active",
    location: "Faridabad, Haryana",
    icon: <Briefcase />,
    description: "Working on enterprise-level applications and gaining hands-on industry experience",
    grade: "Performance: Excellent",
    color: "green"
  }
];

const skillsData = [
  { id: 'react', name: "React & Next.js", icon: <Layers />, level: 90, category: "frontend", description: "Building modern web applications" },
  { id: 'node', name: "Node.js & Express", icon: <Server />, level: 85, category: "backend", description: "Server-side development" },
  { id: 'javascript', name: "JavaScript (ES6+)", icon: <Braces />, level: 95, category: "language", description: "Core programming language" },
  { id: 'typescript', name: "TypeScript", icon: <FileText />, level: 80, category: "language", description: "Type-safe development" },
  { id: 'tailwind', name: "Tailwind CSS", icon: <Palette />, level: 90, category: "frontend", description: "Utility-first CSS framework" },
  { id: 'uiux', name: "UI/UX Design", icon: <Monitor />, level: 75, category: "design", description: "User interface design" },
  { id: 'mongodb', name: "MongoDB & SQL", icon: <Database />, level: 85, category: "database", description: "Database management" },
  { id: 'git', name: "Git & GitHub", icon: <GitBranch />, level: 90, category: "tools", description: "Version control systems" },
  { id: 'docker', name: "Docker", icon: <Container />, level: 70, category: "devops", description: "Containerization platform" },
  { id: 'aws', name: "AWS", icon: <Cloud />, level: 65, category: "cloud", description: "Cloud computing services" },
  { id: 'python', name: "Python", icon: <Terminal />, level: 88, category: "language", description: "Versatile programming language" },
  { id: 'java', name: "Java", icon: <Hexagon />, level: 82, category: "language", description: "Object-oriented programming" },
  { id: 'graphql', name: "GraphQL", icon: <Globe />, level: 78, category: "backend", description: "Query language for APIs" },
  { id: 'redux', name: "Redux", icon: <Box />, level: 85, category: "frontend", description: "State management library" },
  { id: 'firebase', name: "Firebase", icon: <Flame />, level: 80, category: "cloud", description: "Backend-as-a-Service platform" },
  { id: 'webpack', name: "Webpack", icon: <Settings />, level: 72, category: "tools", description: "Module bundler" },
  { id: 'jest', name: "Jest & Testing", icon: <TestTube />, level: 75, category: "tools", description: "Testing frameworks" },
  { id: 'kubernetes', name: "Kubernetes", icon: <Workflow />, level: 68, category: "devops", description: "Container orchestration" },
];

const achievements = [
  { 
    id: 'gromo-aws',
    title: "Finalist (Top 10/25,000+) in Gromo-AWS-Sarvam AI Challenge", 
    year: "2025", 
    icon: <Trophy />,
    description: "Built BhasaVitt, a multilingual AI model helping illiterate people understand financial services"
  },
  { 
    id: 'dsa',
    title: "Strong foundation in Data Structures and Algorithms", 
    icon: <Star />,
    description: "LeetCode and CodeChef expert"
  },
  { 
    id: 'hackspark',
    title: "Top 5 in HackSpark 2025", 
    year: "2025", 
    icon: <Trophy />,
    description: "National 24-hour hackathon"
  },
  { 
    id: 'sih',
    title: "Selected for Smart India Hackathon 2025", 
    year: "2025", 
    icon: <Award />,
    description: "Representing university (top 1% of applicants)"
  },
];

const skillCategories = [
  { id: 'all', name: 'All', icon: <Target />, color: 'cyan' },
  { id: 'frontend', name: 'Frontend', icon: <Code />, color: 'blue' },
  { id: 'backend', name: 'Backend', icon: <Database />, color: 'green' },
  { id: 'language', name: 'Languages', icon: <Terminal />, color: 'purple' },
  { id: 'tools', name: 'Tools', icon: <Settings />, color: 'orange' },
  { id: 'design', name: 'Design', icon: <Palette />, color: 'pink' },
  { id: 'cloud', name: 'Cloud', icon: <Cloud />, color: 'indigo' },
  { id: 'devops', name: 'DevOps', icon: <Cpu />, color: 'red' }
];

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '50px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Enhanced skill card component
const SkillCard = React.memo(({ skill, index, isVisible, isHovered, onHover }) => {
  return (
    <div
      className="group flex items-center gap-1 sm:gap-2 bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 p-2 sm:p-3 relative overflow-hidden cursor-pointer min-w-max w-full flex-shrink-0"
      style={{ maxWidth: '100%' }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} skill`}
    >
      {/* Subtle hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 w-full">
        {/* Icon */}
        <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors flex-shrink-0 flex items-center justify-center">
          <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            {skill.icon}
          </div>
        </div>
        
        {/* Skill Name */}
        <span className="text-white font-medium text-xs sm:text-sm group-hover:text-cyan-100 transition-colors whitespace-nowrap translate-y-px">
          {skill.name}
        </span>
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

const QualificationsSection = () => {
  const [sectionRef, isVisible] = useIntersectionObserver(0.1);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isAchievementsAutoScrolling, setIsAchievementsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const achievementsScrollRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Filtered skills based on active category
  const filteredSkills = activeSkillCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeSkillCategory);

  // Auto-scroll logic with performance optimization
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current || filteredSkills.length === 0) return;

    let startTime = null;
    const scrollSpeed = 30; // pixels per second
    
    const scroll = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const container = scrollContainerRef.current;
      
      if (container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScrollLeft = (elapsed * scrollSpeed / 1000) % (maxScroll + container.clientWidth);
        
        container.scrollLeft = newScrollLeft;
      }
      
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    // Start scrolling after delay
    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(scroll);
    }, 2000);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(timeoutId);
    };
  }, [isAutoScrolling, filteredSkills.length, isVisible]);

  // Scroll controls
  const handleScrollControl = useCallback((direction) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = 300;
    
    setIsAutoScrolling(false);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScrolling(prev => !prev);
  }, []);

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveSkillCategory(categoryId);
    setCurrentSkillIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  // Smooth infinite auto-scroll for achievements on mobile
  useEffect(() => {
    if (!isAchievementsAutoScrolling || !achievementsScrollRef.current) return;

    const container = achievementsScrollRef.current.parentElement;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 1.2; // Pixels per frame

    const smoothScroll = () => {
      if (!isAchievementsAutoScrolling || !container || !achievementsScrollRef.current) return;

      const scrollWidth = achievementsScrollRef.current.scrollWidth;
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
  }, [isAchievementsAutoScrolling]);

  const handleAchievementsMouseEnter = () => {
    setIsAchievementsAutoScrolling(false);
  };

  const handleAchievementsMouseLeave = () => {
    setIsAchievementsAutoScrolling(true);
  };

  return (
    <section
      id="qualifications"
      ref={sectionRef}
      className="relative min-h-screen font-sans py-16 sm:py-20 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden"
      role="main"
      aria-label="Qualifications and Skills"
    >
      {/* Background Pattern - Using same pattern as other sections */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Enhanced Terminal Header */}
        <div className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-t-xl p-4 border-b border-slate-700/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/30" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/30" />
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/30" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-slate-400 text-sm font-mono">~/portfolio/qualifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-slate-600 rounded-sm" />
                <div className="w-4 h-2 border-b border-slate-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-b-xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="text-cyan-400 text-sm font-mono">
                <span className="text-green-400">$</span> cat qualifications.json
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  My Qualifications
                </span>
                
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-mono max-w-2xl mx-auto">
                <span className="text-green-400">// </span>
                Academic excellence meets technical expertise in modern development
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Education & Achievements */}
          <div className={`col-span-1 lg:col-span-2 space-y-6 sm:space-y-8 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
          }`}>
            
            {/* Education Section */}
            <div className="space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <div className="text-cyan-400 bg-slate-800/60 p-2.5 rounded-xl shadow-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-cyan-400 font-mono">education[]</span>
              </h2>
              
              <div className="space-y-5">
                {educationData.map((edu, index) => (
                  <article 
                    key={edu.id} 
                    className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className={`text-${edu.color}-400 bg-slate-700/60 p-2.5 sm:p-3 rounded-xl group-hover:bg-${edu.color}-400 group-hover:text-slate-900 transition-all duration-300 flex-shrink-0 shadow-lg`}>
                          <div className="w-5 h-5">
                            {edu.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col gap-2 mb-3">
                            <h3 className="font-bold text-base sm:text-lg text-white break-words">
                              {edu.degree}
                            </h3>
                            <span className={`px-3 py-1 text-xs font-mono rounded-full inline-block w-fit shadow-sm ${
                              edu.status === 'Current' || edu.status === 'Active' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                            }`}>
                              {edu.status}
                            </span>
                          </div>
                          <p className="text-slate-300 font-semibold mb-2 text-sm sm:text-base break-words">
                            {edu.institution}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-400 mb-3 leading-relaxed">
                            {edu.description}
                          </p>
                          <div className="flex flex-col gap-2 text-xs text-slate-500 mb-2">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="break-words">{edu.period}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="break-words">{edu.location}</span>
                            </span>
                          </div>
                          <p className="text-xs text-cyan-400 font-mono bg-slate-900/30 px-3 py-1.5 rounded-md inline-block break-words">
                            {edu.grade}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className={`col-span-1 lg:col-span-3 space-y-8 transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
          }`}>
            
            <div className="space-y-6">
              
              {/* Skills Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                  <div className="text-cyan-400 bg-slate-800/60 p-2.5 rounded-xl shadow-lg">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-cyan-400 font-mono">skills.filter()</span>
                </h2>
                
                {/* Scroll Controls - Enhanced for mobile */}
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    onClick={() => handleScrollControl('left')}
                    className="p-2.5 bg-slate-800/80 border border-slate-600 rounded-xl text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-700/80 transition-all duration-300 shadow-lg"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleAutoScroll}
                    className={`p-2.5 border rounded-xl transition-all duration-300 shadow-lg ${
                      isAutoScrolling 
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' 
                        : 'bg-slate-800/80 border-slate-600 text-slate-300 hover:text-cyan-400 hover:border-cyan-400'
                    }`}
                    aria-label={isAutoScrolling ? 'Pause auto-scroll' : 'Resume auto-scroll'}
                  >
                    {isAutoScrolling ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleScrollControl('right')}
                    className="p-2.5 bg-slate-800/80 border border-slate-600 rounded-xl text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-700/80 transition-all duration-300 shadow-lg"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide" role="tablist">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap shadow-lg min-w-fit flex-shrink-0 ${
                      activeSkillCategory === category.id
                        ? `bg-${category.color}-500 text-slate-900 shadow-${category.color}-500/25`
                        : 'bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400'
                    }`}
                    role="tab"
                    aria-selected={activeSkillCategory === category.id}
                    aria-label={`Filter by ${category.name}`}
                  >
                    <div className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0">
                      {category.icon}
                    </div>
                    <span className="xs:inline translate-y-px">{category.name}</span>
                    <span className="text-xs opacity-70 hidden sm:inline ml-1 translate-y-px">
                      ({activeSkillCategory === category.id ? filteredSkills.length : 
                        skillsData.filter(skill => category.id === 'all' || skill.category === category.id).length})
                    </span>
                  </button>
                ))}
              </div>

              {/* Skills Grid/Carousel */}
              <div className="relative">
                {/* Mobile: Horizontal scroll carousel */}
                <div className="block lg:hidden">
                  <div
                    ref={scrollContainerRef}
                    className="flex gap-2 py-4 px-2 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ 
                      scrollbarWidth: 'none', 
                      msOverflowStyle: 'none',
                      scrollBehavior: 'smooth'
                    }}
                    role="tabpanel"
                  >
                    {/* All skills for mobile - with fixed spacing */}
                    {filteredSkills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className="flex-shrink-0 min-w-max mr-3"
                        style={{ width: 'auto' }}
                      >
                        <SkillCard
                          skill={skill}
                          index={index}
                          isVisible={isVisible}
                          isHovered={hoveredSkill === index}
                          onHover={setHoveredSkill}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile scroll indicators */}
                  <div className="flex justify-center mt-3 space-x-1">
                    {filteredSkills.length > 3 && (
                      <>
                        <div className="w-2 h-2 bg-cyan-400/30 rounded-full" />
                        <div className="w-6 h-2 bg-cyan-400 rounded-full" />
                        <div className="w-2 h-2 bg-cyan-400/30 rounded-full" />
                      </>
                    )}
                  </div>
                </div>

                {/* Desktop: Grid layout showing all skills */}
                <div className="hidden lg:block">
                  <div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 py-4"
                    role="tabpanel"
                  >
                    {filteredSkills.map((skill, index) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        index={index}
                        isVisible={isVisible}
                        isHovered={hoveredSkill === index}
                        onHover={setHoveredSkill}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Skills Summary */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-3 text-sm text-slate-400 bg-slate-800/40 px-6 py-3 rounded-full border border-slate-700/50">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>{filteredSkills.length} skills loaded</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                {activeSkillCategory !== 'all' && (
                  <p className="text-xs text-slate-500 font-mono">
                    Filtered by: {skillCategories.find(cat => cat.id === activeSkillCategory)?.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Centered Achievements Section */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-700/30">
          <div className={`space-y-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-3">
              <Award className="text-yellow-400 w-6 h-6" />
              <span className="text-yellow-400 font-mono">achievements[]</span>
            </h2>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement) => (
                <article 
                  key={achievement.id}
                  className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-700 hover:border-yellow-400/60 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl mb-4 text-white">
                      {achievement.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                      {achievement.title}
                    </h3>
                    <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                      {achievement.description}
                    </p>
                    {achievement.year && (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                        <span className="text-sm font-semibold text-yellow-400">{achievement.year}</span>
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-slate-500">Achieved</span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile Auto-scroll Carousel */}
            <div className="md:hidden relative">
              <style>
                {`
                  .achievements-carousel::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <div 
                className="overflow-x-auto overflow-y-visible py-4 achievements-carousel scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                onMouseEnter={handleAchievementsMouseEnter}
                onMouseLeave={handleAchievementsMouseLeave}
                onTouchStart={handleAchievementsMouseEnter}
                onTouchEnd={handleAchievementsMouseLeave}
              >
                <div 
                  ref={achievementsScrollRef}
                  className="flex gap-0"
                  style={{ 
                    width: `${achievements.length * 2 * 320}px`, // Double width for duplicated cards
                    willChange: 'transform'
                  }}
                >
                  {/* First set of cards */}
                  {achievements.map((achievement, index) => (
                    <article 
                      key={`first-${achievement.id}`}
                      className="flex-shrink-0 w-72 mx-4 group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-700"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300" />
                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl mb-4 text-white">
                          {achievement.icon}
                        </div>
                        <h3 className="text-base font-bold text-white mb-3 leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                          {achievement.description}
                        </p>
                        {achievement.year && (
                          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                            <span className="text-sm font-semibold text-yellow-400">{achievement.year}</span>
                            <div className="flex space-x-2 items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-xs text-slate-500">Achieved</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                  {/* Duplicate set of cards for seamless loop */}
                  {achievements.map((achievement, index) => (
                    <article 
                      key={`second-${achievement.id}`}
                      className="flex-shrink-0 w-72 mx-4 group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-700"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300" />
                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl mb-4 text-white">
                          {achievement.icon}
                        </div>
                        <h3 className="text-base font-bold text-white mb-3 leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-slate-400 mb-4 leading-relaxed text-sm">
                          {achievement.description}
                        </p>
                        {achievement.year && (
                          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                            <span className="text-sm font-semibold text-yellow-400">{achievement.year}</span>
                            <div className="flex space-x-2 items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-xs text-slate-500">Achieved</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Improve focus states for accessibility */
        button:focus-visible,
        [role="button"]:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:inline {
            display: inline;
          }
        }
        
        /* Mobile-first responsive adjustments */
        @media (max-width: 475px) {
          .xs\\:inline {
            display: none;
          }
          
          /* Make buttons more compact on very small screens */
          [role="tablist"] button {
            min-width: 2.5rem;
            justify-content: center;
          }
          
          /* Hide text labels on very small screens, show only icons */
          [role="tablist"] button span:not(.opacity-70) {
            display: none;
          }
        }
        
        /* Enhanced mobile scrolling */
        @media (max-width: 1023px) {
          /* Ensure smooth scrolling on mobile */
          .scrollbar-hide {
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch;
          }
          
          /* Add scroll snap for skill cards */
          .scrollbar-hide > div {
            scroll-snap-align: start;
          }
          
          /* Better touch targets for mobile */
          .group {
            min-height: 44px;
            touch-action: manipulation;
          }
          
          /* Optimize mobile skill card spacing */
          .flex-shrink-0 {
            max-width: calc(100vw - 4rem);
          }
        }
        
        /* Desktop grid optimizations */
        @media (min-width: 1024px) {
          /* Ensure consistent height for skill cards in grid */
          .grid > div {
            height: auto;
            min-height: auto;
          }
          
          /* Better hover effects for desktop grid */
          .grid .group:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          }
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default QualificationsSection;