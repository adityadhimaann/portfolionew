import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Github, Instagram, Linkedin, Code, Terminal, Zap, Coffee } from 'lucide-react';

// You can keep using require if it works for your setup
const aImg = require('../assets/a.jpg');

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-mono flex items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent"></div>
        
        {/* Floating Code Symbols */}
        <div className="absolute top-20 left-10 text-cyan-400/20 text-6xl font-mono animate-bounce">{'<'}</div>
        <div className="absolute top-40 right-20 text-green-400/20 text-4xl font-mono animate-pulse delay-1000">{'>'}</div>
        <div className="absolute bottom-32 left-20 text-blue-400/20 text-5xl font-mono animate-bounce delay-500">{'{ }'}</div>
        <div className="absolute bottom-20 right-10 text-purple-400/20 text-3xl font-mono animate-pulse delay-1500">{'[ ]'}</div>
      </div>
      
      <div className="max-w-6xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Enhanced Image with Developer Theme */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative">
              {/* Terminal Window Frame */}
              <div className="bg-slate-800 rounded-t-lg p-3 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 text-center">
                    <span className="text-slate-400 text-sm font-mono">developer.profile</span>
                  </div>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative bg-slate-800 rounded-b-lg p-4 border-2 border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <img
                  src={aImg}
                  alt="Aditya Dhiman"
                  className="w-full h-auto object-cover rounded-lg shadow-2xl border border-slate-600"
                  style={{ maxHeight: '500px' }}
                />
                
                {/* Code Overlay */}
                <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-cyan-400/50">
                  <div className="text-cyan-400 text-xs font-mono">
                    <div className="flex items-center space-x-1">
                      <Terminal className="w-3 h-3" />
                      <span>./contact --status</span>
                    </div>
                    <div className="text-green-400 mt-1">✓ online</div>
                  </div>
                </div>
                
                {/* Animated Status Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-slate-800 p-3 rounded-full shadow-lg border border-slate-600 group hover:border-cyan-400 transition-all duration-300">
                  <div className="relative text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <Code className="w-6 h-6"/>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enhanced Form */}
          <div className={`space-y-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            
            {/* Header with Developer Accent */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-cyan-400">
                  <Terminal className="w-8 h-8" />
                </div>
                <div className="text-green-400 font-mono text-sm">
                  $ contact --init
                </div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white font-mono">
                <span className="text-cyan-400">{'<'}</span>
                Let's Connect
                <span className="text-cyan-400">{' />'}</span>
              </h2>
              
              <p className="text-lg text-slate-300 font-mono">
                <span className="text-green-400">// </span>
                Ready to build something amazing together? Drop me a line.
              </p>
            </div>

            {/* Enhanced Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-white placeholder-slate-400 font-mono"
                  />
                  <div className="absolute top-0 left-3 -translate-y-1/2 bg-slate-900 px-2 text-xs text-cyan-400 font-mono">
                    name
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="your@email.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-white placeholder-slate-400 font-mono"
                  />
                  <div className="absolute top-0 left-3 -translate-y-1/2 bg-slate-900 px-2 text-xs text-cyan-400 font-mono">
                    email
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <textarea 
                  name="message" 
                  placeholder="Your message here..." 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-white placeholder-slate-400 font-mono resize-none"
                ></textarea>
                <div className="absolute top-0 left-3 -translate-y-1/2 bg-slate-900 px-2 text-xs text-cyan-400 font-mono">
                  message
                </div>
                {isTyping && (
                  <div className="absolute bottom-3 right-3 text-cyan-400 text-xs font-mono flex items-center space-x-1">
                    <span className="animate-pulse">●</span>
                    <span>typing...</span>
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                onClick={handleSubmit}
                className="group w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <Terminal className="w-5 h-5 mr-3" />
                  Execute Send()
                  <Send className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
            
            {/* Enhanced Social Links & Info */}
            <div className="pt-6 border-t border-slate-700">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-3 text-slate-400 font-mono">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                  <span className="text-sm">Lucknow, Uttar Pradesh, India</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <a 
                    href="https://github.com/adityadhimaann" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-slate-800 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:bg-slate-700"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-slate-800 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:bg-slate-700"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com/adityadhimaann" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-slate-800 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:bg-slate-700"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              {/* Status Bar */}
              <div className="mt-6 flex items-center justify-between text-xs font-mono text-slate-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Available for projects</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Coffee className="w-3 h-3" />
                    <span>Fueled by coffee</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>Fast response time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;