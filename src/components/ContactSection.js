
import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import aImg from '../assets/a.jpg';

const ContactSection = ({ isVisible }) => (
  <section id="contact" className="py-20 bg-gray-900 text-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className={`relative transition-all duration-1000 ${
          isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <img
            src={aImg}
            alt="Contact profile"
            className="w-full h-full object-cover shadow-lg"
            style={{ minHeight: '510px', maxHeight: '480px' }}
          />
        </div>
        <div className={`space-y-8 transition-all duration-1000 delay-300 ${
          isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <h2 className="text-4xl font-bold">Get in touch</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            If you want to work together, you can reach me at dhimanaditya56@gmail.com.
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:dhimanaditya56@gmail.com" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-3" />
              Send Email
            </a>
            <div className="flex items-center space-x-3 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/adityadhimaann"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.104.823 2.226 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a
                href="https://instagram.com/adityadhimaann"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a6.25 6.25 0 1 1-6.25 6.25 6.25 6.25 0 0 1 6.25-6.25zm0 1.5a4.75 4.75 0 1 0 4.75 4.75A4.75 4.75 0 0 0 12 5.25zm6.25 1.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25z"/></svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
