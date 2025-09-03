import React from 'react';
import ComprehensiveFooter from './ComprehensiveFooter';

interface ResponsivePageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

/**
 * A wrapper component that provides responsive layout for all pages
 * It centers content and applies max width constraints to prevent
 * empty space in smaller windows
 * 
 * On mobile, it adds extra padding at the bottom to prevent the
 * mobile navigation bar from covering content
 */
export default function ResponsivePageWrapper({ 
  children, 
  className = "",
  showFooter = false
}: ResponsivePageWrapperProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto px-3 md:px-6 py-3 md:py-5 pb-20 md:pb-5 ${className}`}>
      {children}
      {showFooter && <ComprehensiveFooter />}
    </div>
  );
}