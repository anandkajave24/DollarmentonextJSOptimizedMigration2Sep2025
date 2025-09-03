import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

const ScrollToTop: React.FC = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;