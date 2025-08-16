import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Code, Terminal, Zap, Github, ExternalLink } from 'lucide-react';
import heroImg from '../assets/b.png'; // Make sure the path is correct

const HeroSection = ({ scrollToSection }) => {
  const role = 'Full Stack Developer    •    UI/UX Designer    •    Problem Solver';

  return (
    <section id="hero" className="relative min-h-screen flex items-center text-white font-sans">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 z-10">
        <div className="grid lg:grid-cols-5 gap-8 md:gap-16 items-center">
          
          {/* Mobile-First Image Content - Shows first on mobile - Smooth initial load */}
          <div className="lg:col-span-2 lg:order-2 flex items-center justify-center animate-fade-in-right mb-8 lg:mb-0">
            <div className="relative group">
              {/* Outer Glow - Smaller on mobile */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-full blur-xl md:blur-2xl opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-slow"></div>
              
              {/* Border Animation - Responsive */}
              <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition duration-500 animate-spin-slow"></div>
              
              {/* Image Container - Responsive sizing */}
              <div className="relative bg-slate-800 p-1 md:p-2 rounded-full">
                <img
                  src={heroImg}
                  alt="Aditya Kumar"
                  className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-2xl border-2 border-slate-700 group-hover:border-amber-400 transition-all duration-300"
                />
                
                {/* Status Badge - Responsive positioning */}
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-slate-800 p-1.5 md:p-2 rounded-full border border-slate-600 group-hover:border-amber-400 transition-all duration-300">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-300 font-mono">dev</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements - Hidden on very small screens */}
              <div className="hidden sm:block absolute -top-4 md:-top-8 -left-4 md:-left-8 text-cyan-400/60 text-xl md:text-2xl animate-bounce">{'</'}</div>
              <div className="hidden sm:block absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 text-blue-400/60 text-xl md:text-2xl animate-bounce delay-1000">{'>'}</div>
            </div>
          </div>
          
          {/* Text Content - Shows second on mobile with better spacing - Smooth initial load */}
          <div className="lg:col-span-3 lg:order-1 space-y-6 md:space-y-8 animate-fade-in-up">
            
            {/* Terminal Header - Mobile optimized */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-lg p-2 md:p-3 border-b border-slate-700/50">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1 text-center">
                  <span className="text-slate-400 text-xs md:text-sm font-sans">~/portfolio/developer</span>
                </div>
              </div>
            </div>
            
            {/* Terminal Content - Enhanced mobile layout */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-b-lg p-4 sm:p-6 md:p-8 border border-slate-700/50">
              <div className="space-y-4 md:space-y-6">
                <div className="text-cyan-400 text-xs md:text-sm">
                  <span className="text-green-400">$</span> whoami
                </div>
                
                {/* Responsive heading with better mobile scaling */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight">
                  <span className="block text-white mb-4 tracking-wide">Aditya Kumar</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 text-sm sm:text-base md:text-lg lg:text-xl font-normal tracking-wide">
                    {role}
                  </span>
                </h1>
                
                {/* Mobile-optimized description */}
                <div className="text-slate-300 space-y-2">
                  <div className="text-green-400 text-xs md:text-sm">
                    <span className="text-green-400">$</span> cat about.txt
                  </div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl pl-3 md:pl-4 border-l-2 border-cyan-400/50 leading-relaxed">
                    Hello there! I'm a third-year B.Tech student at Lovely Professional University, 
                    currently interning at Larsen & Toubro. I specialize in building modern, 
                    responsive, and user-friendly web applications.
                  </p>
                </div>
                
                {/* Mobile-optimized info section */}
                <div className="text-slate-400 space-y-1 text-xs sm:text-sm">
                  <div><span className="text-cyan-400">location:</span> Lucknow, UP, India</div>
                  <div><span className="text-cyan-400">status:</span> <span className="text-green-400">Available for projects</span></div>
                  <div><span className="text-cyan-400">focus:</span> Full Stack Development</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons - Enhanced mobile layout */}
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/50 text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  ./contact
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('about')}
                className="group bg-slate-800/50 backdrop-blur-sm text-slate-300 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-slate-600 hover:bg-slate-700/50 hover:text-white hover:border-cyan-400 transition-all duration-300 text-sm sm:text-base"
              >
                <span className="flex items-center justify-center">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  View Projects
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
            
            {/* Quick Stats - Mobile responsive with better wrapping */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span>Fast learner</span>
              </div>
              <div className="flex items-center space-x-2">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span>Open source</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
