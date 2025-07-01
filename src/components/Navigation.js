import React from 'react';

const Navigation = ({ activeSection, scrollToSection }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">Hi there!</div>
        <div className="hidden md:flex space-x-8">
          {['hero', 'about', 'experience', 'qualifications', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize transition-colors duration-300 ${
                activeSection === section ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;
