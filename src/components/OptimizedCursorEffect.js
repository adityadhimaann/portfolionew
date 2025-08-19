import React, { useState, useEffect, useCallback } from 'react';
import { rafThrottle, supportsHighPerformance } from '../utils/performanceUtils';

const OptimizedCursorEffect = () => {
  const [stars, setStars] = useState([]);
  const [isHighPerformance, setIsHighPerformance] = useState(true);

  // Check device capabilities on mount
  useEffect(() => {
    setIsHighPerformance(supportsHighPerformance());
  }, []);

  // Optimized mouse move handler with RAF throttling
  const handleMouseMove = useCallback(
    rafThrottle((event) => {
      if (!isHighPerformance || window.innerWidth < 768) return; // Disable on mobile
      
      const { clientX, clientY } = event;
      
      // Only create star occasionally (every 3rd movement)
      if (Math.random() > 0.7) {
        const newStar = {
          id: Date.now() + Math.random(),
          x: clientX + (Math.random() - 0.5) * 20,
          y: clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 4 + 2,
          color: ['#00f5ff', '#4169e1', '#ffffff'][Math.floor(Math.random() * 3)],
          createdAt: Date.now()
        };

        setStars(prev => [...prev.slice(-8), newStar]); // Keep only 8 stars max
      }
    }),
    [isHighPerformance]
  );

  // Cleanup expired stars efficiently
  useEffect(() => {
    if (!isHighPerformance) return;

    const interval = setInterval(() => {
      setStars(prev => prev.filter(star => Date.now() - star.createdAt < 800));
    }, 200);

    return () => clearInterval(interval);
  }, [isHighPerformance]);

  // Event listeners
  useEffect(() => {
    if (!isHighPerformance) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isHighPerformance]);

  // Don't render on mobile or low-performance devices
  if (!isHighPerformance || window.innerWidth < 768) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute animate-cursor-star"
          style={{
            left: star.x - star.size / 2,
            top: star.y - star.size / 2,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            transform: 'translateZ(0)', // GPU acceleration
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(OptimizedCursorEffect);
