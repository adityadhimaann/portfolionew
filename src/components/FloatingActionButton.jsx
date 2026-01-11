import React from 'react';

const FloatingActionButton = ({ scrollToSection }) => (
  <button
    onClick={() => scrollToSection('hero')}
    className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
  >
    ↑
  </button>
);

export default FloatingActionButton;
