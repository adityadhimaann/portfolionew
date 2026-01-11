import React, { useMemo } from 'react';

const OptimizedBackground = ({ isHighPerformance = true }) => {
  // Generate minimal stars for better performance
  const stars = useMemo(() => {
    if (!isHighPerformance) return [];
    
    const starCount = window.innerWidth < 768 ? 30 : 50; // Fewer stars on mobile
    const starArray = [];
    
    for (let i = 0; i < starCount; i++) {
      starArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 4,
        color: ['cyan', 'blue', 'white'][Math.floor(Math.random() * 3)]
      });
    }
    
    return starArray;
  }, [isHighPerformance]);

  const orbs = useMemo(() => {
    if (!isHighPerformance) return [];
    
    return [
      { id: 1, x: 25, y: 25, size: 120, color: 'cyan', opacity: 0.03 },
      { id: 2, x: 75, y: 75, size: 160, color: 'blue', opacity: 0.02 },
      { id: 3, x: 15, y: 80, size: 100, color: 'indigo', opacity: 0.025 },
      { id: 4, x: 85, y: 20, size: 140, color: 'purple', opacity: 0.02 }
    ];
  }, [isHighPerformance]);

  if (!isHighPerformance) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Optimized Stars Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute animate-star-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              backgroundColor: star.color === 'cyan' ? '#00f5ff' : 
                              star.color === 'blue' ? '#4169e1' : '#ffffff',
              borderRadius: '50%',
              transform: 'translateZ(0)', // GPU acceleration
              willChange: 'opacity, transform'
            }}
          />
        ))}
      </div>

      {/* Subtle Gradient Orbs */}
      <div className="absolute inset-0">
        {orbs.map(orb => (
          <div
            key={orb.id}
            className="absolute animate-efficient-pulse"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, ${orb.color === 'cyan' ? 'rgba(6, 182, 212, ' + orb.opacity + ')' :
                                                   orb.color === 'blue' ? 'rgba(59, 130, 246, ' + orb.opacity + ')' :
                                                   orb.color === 'indigo' ? 'rgba(99, 102, 241, ' + orb.opacity + ')' :
                                                   'rgba(147, 51, 234, ' + orb.opacity + ')'} 0%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
              transform: 'translateZ(0)', // GPU acceleration
              willChange: 'opacity'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(OptimizedBackground);
