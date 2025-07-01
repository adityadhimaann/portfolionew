import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

import gromoImg from '../assets/e.jpeg';
import ltImg from '../assets/d.jpeg';
import sarvamImg from '../assets/f.jpeg';
import extraImg1 from '../assets/a.jpg';
import extraImg2 from '../assets/b.jpg';
import extraImg3 from '../assets/c.jpg';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      className={`min-h-screen bg-gray-100 font-sans flex flex-col items-center justify-center ${isVisible ? 'animate-fadeInSection' : ''}`}
    >
      {/* Custom CSS for Keyframe Animations */}
      <style>
        {`
        @keyframes fadeInSection {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSection {
          animation: fadeInSection 1.1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseMapPin {
          0% {
            transform: scale(1);
            color: #3B82F6;
          }
          50% {
            transform: scale(1.1);
            color: #2563EB;
          }
          100% {
            transform: scale(1);
            color: #3B82F6;
          }
        }
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animate-fadeIn.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-pulseMapPin {
          animation: pulseMapPin 1.5s infinite ease-in-out;
        }
        `}
      </style>

      <div className="relative z-10 flex items-center justify-center w-full pt-8 pb-2">
        <div className="w-full max-w-7xl">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent mb-4">
              My Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Exploring the intersection of technology and innovation across different roles and locations
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Row for Larger Screens */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Gurugram Section */}
          <div className={`relative animate-fadeIn${isVisible ? ' visible' : ''}`}> 
            <div className="flex items-center text-gray-800 mb-4">
              <MapPin className="w-5 h-5 mr-2 animate-pulseMapPin" />
              <span className="text-lg font-medium">Gurugram, Haryana</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] relative">
                <img
                  src={gromoImg}
                  alt="Gromo event"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x450/3B82F6/ffffff?text=Gromo+Event";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Gromo X aws Finarva<br />AI 2025
                </h3>
                <p className="text-lg font-semibold text-gray-700">
                  CTO @gromo
                </p>
              </div>
            </div>
          </div>
          {/* Center Section - L&T */}
          <div className={`relative animate-fadeIn${isVisible ? ' visible' : ''}`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SDE Intern</h2>
              <p className="text-xl font-semibold text-gray-700">@Larsen&Toubro</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] relative">
                <img
                  src={ltImg}
                  alt="L&T Building"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x450/10B981/ffffff?text=L%26T+Building";
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center text-gray-800 mt-4">
              <MapPin className="w-5 h-5 mr-2 animate-pulseMapPin" />
              <span className="text-lg font-medium">Faridabad, Haryana</span>
            </div>
          </div>
          {/* Noida Section */}
          <div className={`relative animate-fadeIn${isVisible ? ' visible' : ''}`} style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}>
            <div className="flex items-center justify-end text-gray-800 mb-4">
              <MapPin className="w-5 h-5 mr-2 animate-pulseMapPin" />
              <span className="text-lg font-medium">Noida, Uttar Pradesh</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] relative">
                <img
                  src={sarvamImg}
                  alt="SarvamAI workspace"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x450/8B5CF6/ffffff?text=SarvamAI+Workspace";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  #building something<br />creative in AI -
                </h3>
                <p className="text-lg font-semibold text-gray-700">
                  @SarvamAI
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Responsive Layout */}
        <div className="lg:hidden space-y-8">
          {/* Mobile: Gurugram */}
          <div className={`bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn${isVisible ? ' visible' : ''}`}> 
            <div className="p-4 border-b">
              <div className="flex items-center text-gray-800">
                <MapPin className="w-5 h-5 mr-2 animate-pulseMapPin" />
                <span className="text-lg font-medium">Gurugram, Haryana</span>
              </div>
            </div>
            <div className="aspect-[4/3] relative">
              <img
                src={gromoImg}
                alt="Gromo event"
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x450/3B82F6/ffffff?text=Gromo+Event";
                  }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Gromo X aws Finarva AI 2025
              </h3>
              <p className="text-lg font-semibold text-gray-700">CTO @gromo</p>
            </div>
          </div>
          {/* Mobile: L&T */}
          <div className={`bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn${isVisible ? ' visible' : ''}`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
            <div className="p-4 text-center border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">SDE Intern</h2>
              <p className="text-xl font-semibold text-gray-700">@Larsen&Toubro</p>
            </div>
            <div className="aspect-[4/3] relative">
              <img
                src={ltImg}
                alt="L&T Building"
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x450/10B981/ffffff?text=L%26T+Building";
                  }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center text-gray-800">
                <MapPin className="w-5 h-5 mr-2 animate-pulseMapPin" />
                <span className="text-lg font-medium">Faridabad, Haryana</span>
              </div>
            </div>
          </div>
          {/* Mobile: SarvamAI */}
          <div className={`bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn${isVisible ? ' visible' : ''}`} style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-end text-gray-800">
                <MapPin className="w-5 h-5 mr-2 animate-pulseMapPin" />
                <span className="text-lg font-medium">Noida, Uttar Pradesh</span>
              </div>
            </div>
            <div className="aspect-[4/3] relative">
              <img
                src={sarvamImg}
                alt="SarvamAI workspace"
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x450/8B5CF6/ffffff?text=SarvamAI+Workspace";
                  }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                #building something creative in AI -
              </h3>
              <p className="text-lg font-semibold text-gray-700">@SarvamAI</p>
            </div>
          </div>
        </div>
        {/* Footer Stats Section - full width, no background, fully embedded */}
        <footer className="relative z-20 mt-14 mb-12 w-full flex justify-center" style={{position:'relative'}}>
          <div className={`w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {[
              { label: "Locations", value: "3+" },
              { label: "Companies", value: "3" },
              { label: "Projects", value: "10+" },
              { label: "Experience", value: "2+ Years" }
            ].map((stat, index) => (
              <div key={index} className={`text-center group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? `${index * 0.1 + 0.2}s` : '0s' }}>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-extrabold text-blue-700 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-semibold tracking-wide uppercase text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutSection;
