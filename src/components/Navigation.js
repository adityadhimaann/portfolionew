import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, GraduationCap, Mail } from 'lucide-react';

const Navigation = ({ activeSection, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Show background after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'qualifications', label: 'Skills', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleNavClick = (section) => {
    scrollToSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-lg sm:text-xl font-bold text-white font-sans">
              <span className="text-cyan-400">$</span> aditya.dev
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === id 
                      ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30' 
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Mobile Menu */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900/90 backdrop-blur-lg border-l border-slate-700/30 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-20">
            <div className="space-y-4">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`group w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    activeSection === id 
                      ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 shadow-lg shadow-cyan-400/10' 
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="capitalize font-medium text-lg">{label}</span>
                  {activeSection === id && (
                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Mobile Footer */}
            <div className="mt-12 pt-6 border-t border-slate-700/50">
              <p className="text-slate-400 text-sm text-center font-mono">
                <span className="text-cyan-400">$</span> Ready to collaborate?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
