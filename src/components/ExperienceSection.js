import React from 'react';
import { Code } from 'lucide-react';
import cImg from '../assets/c.jpg';

const ExperienceSection = ({ isVisible }) => (
  <section id="experience" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className={`relative transition-all duration-1000 ${
          isVisible.experience ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-100">
            <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
              <img
                src={cImg}
                alt="Experience showcase"
                className="w-60 h-60 md:w-72 md:h-72 object-cover object-center rounded-full border-4 border-white shadow-xl"
                style={{ filter: 'brightness(0.97) saturate(1.08)' }}
              />
            </div>
            <div className="px-8 py-8 text-center">
              <h3 className="text-3xl font-extrabold text-blue-700 mb-2 drop-shadow">Showcasing Real Projects</h3>
              <p className="text-lg text-gray-700 mb-4">A glimpse into my journey of building visually stunning and high-performance web applications.</p>
              <div className="flex justify-center space-x-3 mt-2">
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold shadow">React</span>
                <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold shadow">Tailwind</span>
                <span className="inline-block bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-semibold shadow">UI/UX</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`space-y-8 transition-all duration-1000 delay-300 ${
          isVisible.experience ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
            Next-level creative <span className="text-blue-600">web applications</span>
          </h2>
          <div className="space-y-8 mt-6">
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
              <div>
                <h3 className="font-semibold text-xl text-blue-700">Modern Development</h3>
                <p className="text-gray-700">Building cutting-edge web applications with the latest technologies and frameworks for maximum performance and scalability.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-2 animate-pulse"></div>
              <div>
                <h3 className="font-semibold text-xl text-green-700">Creative Solutions</h3>
                <p className="text-gray-700">Innovative approaches to complex development challenges, always pushing the boundaries of what's possible.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-purple-600 rounded-full mt-2 animate-pulse"></div>
              <div>
                <h3 className="font-semibold text-xl text-purple-700">User-Focused Design</h3>
                <p className="text-gray-700">Creating intuitive and engaging user experiences with a strong focus on UI/UX best practices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
