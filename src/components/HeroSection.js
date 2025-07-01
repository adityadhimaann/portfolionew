import React from 'react';
import { Mail } from 'lucide-react';
import heroImg from '../assets/b.jpg';

const HeroSection = ({ scrollToSection }) => (
  <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Aditya
              <br />
              <span className="text-blue-600">Kumar</span>
            </h1>
            <p className="text-xl font-semibold text-blue-700 tracking-wide bg-blue-100 rounded px-3 py-1 inline-block shadow-sm">Web Application Developer</p>
            <p className="text-lg text-gray-700 mt-2">
              Hello there! My name is Aditya and<br />
              I'm a third year B. Tech student at Lovely Professional University.<br />
              I am currently an intern at Larsen and Toubro.
            </p>
          </div>
          <button 
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email me
          </button>
        </div>
        <div className="relative animate-fade-in-right flex items-center justify-center">
          <img
            src={heroImg}
            alt="Aditya Kumar"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-blue-200 hover:scale-105 transition-transform duration-300"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
