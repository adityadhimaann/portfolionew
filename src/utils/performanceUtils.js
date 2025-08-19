// Performance optimization utilities

// Throttle function for scroll events
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce function for input events
export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Request animation frame throttle
export const rafThrottle = (func) => {
  let rafId = null;
  return function (...args) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
};

// Check if device supports high performance animations
export const supportsHighPerformance = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const hasGoodConnection = !connection || connection.effectiveType === '4g';
  const hasGoodHardware = window.devicePixelRatio <= 2;
  
  return hasGoodConnection && hasGoodHardware && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Intersection observer with performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '-20px 0px',
    ...options
  };

  return new IntersectionObserver(
    throttle(callback, 100), // Throttle callbacks
    defaultOptions
  );
};

// Memory management for animations
export const cleanupAnimation = (element, animationClass) => {
  if (element) {
    element.classList.remove(animationClass);
    // Force reflow to ensure cleanup
    // eslint-disable-next-line no-unused-vars
    const _ = element.offsetHeight; // assign to avoid unused expression
  }
};
