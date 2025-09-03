import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

interface ConfettiCelebrationProps {
  show: boolean;
  duration?: number;
  onComplete?: () => void;
  particleCount?: number;
  colors?: string[];
}

export function ConfettiCelebration({
  show,
  duration = 5000,
  onComplete,
  particleCount = 200,
  colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
}: ConfettiCelebrationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={particleCount}
      colors={colors}
      gravity={0.2}
      confettiSource={{
        x: width / 2,
        y: height / 3,
        w: 0,
        h: 0
      }}
    />
  );
}

export default ConfettiCelebration;