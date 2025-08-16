import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, Github, Instagram, Linkedin, Code, Terminal, Zap, Coffee } from 'lucide-react';

// You can keep using require if it works for your setup
const aImg = require('../assets/a.jpg');

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendStatus(null);
    try {
      const serviceID = 'service_hwudj9v';
      const templateID = 'template_6qv3vkm';
      const userID = 'OoxmLqCS3D2VgNTfw';
      await emailjs.send(serviceID, templateID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, userID);
      setSendStatus('🚀Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSendStatus('Failed to send message. Please try again.');
      console.error('EmailJS error:', error);
    }
    setSending(false);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-screen font-sans flex items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      
      <div className="max-w-6xl mx-auto w-full z-10 animate-on-scroll">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Enhanced Image with Developer Theme */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ease-out animate-on-scroll ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative max-w-md mx-auto lg:max-w-none animate-on-scroll">
              {/* Terminal Window Frame */}
              <div className="bg-slate-800 rounded-t-lg p-2 sm:p-3 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 text-center">
                    <span className="text-slate-400 text-xs sm:text-sm font-mono">developer.profile</span>
                  </div>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative bg-slate-800 rounded-b-lg p-3 sm:p-4 border-2 border-slate-700 hover:border-cyan-400 transition-all duration-300">
                <img
                  src={aImg}
                  alt="Aditya Dhiman"
                  className="w-full h-auto object-cover rounded-lg shadow-2xl border border-slate-600"
                  style={{ maxHeight: '400px' }}
                />
                
                {/* Code Overlay - Mobile Optimized */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-cyan-400/50">
                  <div className="text-cyan-400 text-xs font-mono">
                    <div className="flex items-center space-x-1">
                      <Terminal className="w-2 h-2 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">./contact --status</span>
                      <span className="sm:hidden">online</span>
                    </div>
                    <div className="text-green-400 mt-1 hidden sm:block">✓ online</div>
                  </div>
                </div>
                
                {/* Animated Status Indicator */}
                <div className="absolute -bottom-2 -right-2 bg-slate-800 p-2 sm:p-3 rounded-full shadow-lg border border-slate-600 group hover:border-cyan-400 transition-all duration-300">
                  <div className="relative text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <Code className="w-4 h-4 sm:w-6 sm:h-6"/>
                    <span className="absolute -top-1 -right-1 flex h-2 w-2 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-cyan-500"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enhanced Form */}
          <div className={`order-1 lg:order-2 space-y-6 sm:space-y-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            
            {/* Header with Developer Accent */}
            <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="text-cyan-400">
                  <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-green-400 font-mono text-xs sm:text-sm">
                  $ contact
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-sans leading-tight">
                <span className="text-cyan-400">{'<'}</span>
                Let's Connect
                <span className="text-cyan-400">{' />'}</span>
              </h2>
              
              <p className="text-base sm:text-lg text-slate-300 font-sans">
                <span className="text-green-400">// </span>
                Ready to build something amazing together? Drop me a line.
              </p>
            </div>

            {/* Enhanced Form */}
            <div className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-3 sm:p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-white placeholder-slate-400 font-sans text-sm sm:text-base"
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
                    className="w-full p-3 sm:p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-white placeholder-slate-400 font-sans text-sm sm:text-base"
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
                  rows="4" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 sm:p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all text-white placeholder-slate-400 font-sans resize-none text-sm sm:text-base"
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
                disabled={sending}
                className={`group w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-sans font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/50 text-sm sm:text-base ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  {sending ? 'Sending...' : 'Execute Send()'}
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              {sendStatus && (
                <div className={`mt-2 text-xs sm:text-sm font-sans text-center ${sendStatus.includes('🚀') ? 'text-green-400' : 'text-red-400'}`}>{sendStatus}</div>
              )}
            </div>
            
            {/* Enhanced Social Links & Info */}
            <div className="pt-4 sm:pt-6 border-t border-slate-700">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3 text-slate-400 font-sans">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-cyan-400" />
                  <span className="text-xs sm:text-sm">Lucknow, Uttar Pradesh, India</span>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <a 
                    href="https://github.com/adityadhimaann" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 sm:p-2.5 bg-slate-800 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:bg-slate-700"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 sm:p-2.5 bg-slate-800 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:bg-slate-700"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a 
                    href="https://instagram.com/adityadhimaann" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 sm:p-2.5 bg-slate-800 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:bg-slate-700"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
              
              {/* Status Bar */}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-500">
                <div className="flex items-center space-x-3 sm:space-x-4">
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