import React from 'react';
import bannerImage from '../assets/adiXdevbanner.png';

const BannerSection = () => {
  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src={bannerImage} 
            alt="AdiXdev Banner" 
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {/* Optional overlay gradient for better text visibility if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
