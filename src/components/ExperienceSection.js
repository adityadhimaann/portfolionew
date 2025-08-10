import React, { useState, useEffect } from 'react';
import { Code, Zap, Palette, Users, Terminal, Rocket, GitBranch, Database } from 'lucide-react';

const ExperienceSection = ({ isVisible }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

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
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [isVisible]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const techStack = [
    { name: 'React', color: 'from-blue-400 to-blue-600', icon: '⚛️' },
    { name: 'Next.js', color: 'from-gray-600 to-gray-800', icon: '▲' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700', icon: 'TS' },
    { name: 'Tailwind', color: 'from-cyan-400 to-cyan-600', icon: '🎨' },
    { name: 'Node.js', color: 'from-green-500 to-green-700', icon: '🟢' },
    { name: 'Python', color: 'from-yellow-500 to-yellow-600', icon: '🐍' }
  ];

  const projects = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Performance-First Apps",
      description: "Architecting high-performance web applications with advanced optimization techniques and cutting-edge frameworks.",
      gradient: "from-purple-500 to-pink-500",
      stats: "99% Performance Score"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Design Systems",
      description: "Building scalable design systems and component libraries that maintain consistency across large applications.",
      gradient: "from-blue-500 to-cyan-500",
      stats: "50+ Components"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Full-Stack Solutions",
      description: "End-to-end development from database design to responsive frontends, creating seamless user experiences.",
      gradient: "from-green-500 to-emerald-500",
      stats: "20+ APIs Built"
    }
  ];

  return (
    <section id="experience" className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-6">
            <Terminal className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm font-mono text-blue-300">Developer Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Crafting Digital
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Building next-generation web applications with cutting-edge technologies, 
            exceptional performance, and pixel-perfect design.
          </p>

          {/* Typing Animation */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">main.js</span>
            </div>
            <div className="font-mono text-green-400 text-lg">
              {typedText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className={`px-4 py-2 bg-gradient-to-r ${tech.color} rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="mr-2">{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:transform hover:-translate-y-2 ${
                activeCard === index ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onMouseEnter={() => setActiveCard(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-xl mb-6 text-white`}>
                  {project.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-400">
                    {project.stats}
                  </span>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills & Expertise */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Technical Expertise
            </h2>
            <div className="space-y-6">
              {[
                { skill: 'Frontend Development', level: 95, color: 'from-blue-500 to-cyan-500' },
                { skill: 'Backend Architecture', level: 88, color: 'from-green-500 to-emerald-500' },
                { skill: 'UI/UX Design', level: 92, color: 'from-purple-500 to-pink-500' },
                { skill: 'DevOps & Deployment', level: 85, color: 'from-orange-500 to-red-500' }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-medium">{item.skill}</span>
                    <span className="text-blue-400 font-bold">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: isVisible ? `${item.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Code Philosophy</h3>
              </div>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p>Performance-first approach with optimized, scalable solutions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <GitBranch className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <p>Clean, maintainable code following industry best practices</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p>User-centric design with accessibility and usability in mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;