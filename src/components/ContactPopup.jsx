import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Phone, Mail } from 'lucide-react';

const ContactPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds when the page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsSliding(true), 100);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsSliding(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your web development services.");
    window.open(`https://wa.me/916306580926?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:dhimanaditya56@gmail.com?subject=Web Development Inquiry', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 max-w-[calc(100vw-1rem)] sm:max-w-none">
      <div 
        className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-700 w-64 sm:w-72 lg:w-80 transform transition-all duration-500 ease-out ${
          isSliding ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors z-10 p-1 touch-manipulation"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Header with animated gradient */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="text-white" size={18} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
              Want to build your website or any work?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Let's bring your ideas to life!
            </p>
          </div>

          {/* Contact options */}
          <div className="space-y-2">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm"
            >
              <Phone size={14} className="sm:w-4 sm:h-4" />
              <span className="font-medium">+91 6306580926</span>
            </button>

            {/* Email */}
            <button
              onClick={handleEmail}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm"
            >
              <Mail size={14} className="sm:w-4 sm:h-4" />
              <span className="font-medium truncate">dhimanaditya56@gmail.com</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
      </div>
    </div>
  );
};

export default ContactPopup;
