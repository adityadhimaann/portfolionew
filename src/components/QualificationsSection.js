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
    grade: "Current CGPA: 7/10"
  },
  {
    degree: "Software Engineering Internship",
    institution: "Larsen & Toubro",
    period: "2024 – Present",
    status: "Active",
    location: "Remote",
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
];

const achievements = [
  { title: "Dean's List", year: "2024", icon: <Award /> },
  { title: "Hackathon Winner", year: "2024", icon: <Trophy /> },
  { title: "Open Source Contributor", year: "2023-24", icon: <Star /> },
];

const QualificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

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

  const filteredSkills = activeSkillCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeSkillCategory);

  const skillCategories = [
    { id: 'all', name: 'All', icon: <Target /> },
    { id: 'frontend', name: 'Frontend', icon: <Code /> },
    { id: 'backend', name: 'Backend', icon: <Cpu /> },
    { id: 'language', name: 'Languages', icon: <Terminal /> },
    { id: 'tools', name: 'Tools', icon: <PenTool /> },
  ];

  return (
    <section
      id="qualifications"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-mono flex items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d420_1px,transparent_1px),linear-gradient(to_bottom,#06b6d420_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-cyan-400/20 text-6xl animate-float">{'<skills>'}</div>
        <div className="absolute bottom-20 right-10 text-blue-400/20 text-6xl animate-float-delayed">{'</skills>'}</div>
        <div className="absolute top-1/2 left-5 text-green-400/20 text-4xl animate-bounce-slow">{'{ }'}</div>
        <div className="absolute top-1/3 right-5 text-purple-400/20 text-5xl animate-pulse-slow">{'[ ]'}</div>
      </div>
      
      <div className="max-w-6xl w-full mx-auto z-10">
        
        {/* Terminal Header */}
        <div className={`mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-lg p-3 border-b border-slate-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 text-center">
                <span className="text-slate-400 text-sm">~/portfolio/qualifications</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-b-lg p-8 border border-slate-700/50">
            <div className="text-center space-y-4">
              <div className="text-cyan-400 text-sm">
                <span className="text-green-400">$</span> cat qualifications.md
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                <span className="text-cyan-400">{'<'}</span>
                My Qualifications
                <span className="text-cyan-400">{' />'}</span>
              </h2>
              <p className="text-lg text-slate-300">
                <span className="text-green-400">// </span>
                Academic background and technical expertise
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 xl:gap-16">
          
          {/* Left Column: Education & Achievements */}
          <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            
            {/* Education Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                <div className="text-cyan-400 bg-slate-800 p-2 rounded-lg">
                  <BookOpen />
                </div>
                <span className="text-cyan-400">education</span>
                <span className="text-slate-500">[]</span>
              </h3>
              
              <div className="space-y-4">
                {educationData.map((edu, index) => (
                  <div key={index} className="group bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-cyan-400 bg-slate-700 p-3 rounded-lg group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300">
                          {edu.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg text-white">{edu.degree}</h4>
                            <span className={`px-2 py-1 text-xs font-mono rounded-full ${
                              edu.status === 'Current' || edu.status === 'Active' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                            }`}>
                              {edu.status}
                            </span>
                          </div>
                          <p className="text-slate-300 font-medium mb-1">{edu.institution}</p>
                          <p className="text-sm text-slate-400 mb-2">{edu.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
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
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Award className="text-yellow-400" />
                <span className="text-yellow-400">achievements</span>
              </h3>
              <div className="grid gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700 p-4 flex items-center gap-3">
                    <div className="text-yellow-400">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{achievement.title}</h4>
                      <p className="text-slate-400 text-sm">{achievement.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className={`lg:col-span-3 space-y-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                <div className="text-cyan-400 bg-slate-800 p-2 rounded-lg">
                  <Terminal />
                </div>
                <span className="text-cyan-400">technical_skills</span>
                <span className="text-slate-500">.filter()</span>
              </h3>
              
              {/* Skill Categories Filter */}
              <div className="flex flex-wrap gap-2">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveSkillCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                      activeSkillCategory === category.id
                        ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="grid gap-4">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 p-4"
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                          {skill.icon}
                        </div>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-cyan-400 font-mono text-sm">{skill.level}%</span>
                    </div>
                    
                    {/* Skill Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                    
                    {/* Skill Category Tag */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-slate-500 font-mono">
                        .{skill.category}
                      </span>
                      {hoveredSkill === index && (
                        <div className="flex items-center gap-1 text-xs text-cyan-400">
                          <Zap className="w-3 h-3" />
                          <span>proficient</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Animations */}
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
      `}</style>
    </section>
  );
};

export default QualificationsSection;