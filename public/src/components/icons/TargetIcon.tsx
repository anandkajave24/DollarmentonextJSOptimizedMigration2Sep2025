import React from "react";

interface TargetIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

export function TargetIcon({ className = "", size = "md", color = "currentColor" }: TargetIconProps) {
  const sizeClass = 
    size === "sm" ? "w-4 h-4" : 
    size === "md" ? "w-6 h-6" : 
    size === "lg" ? "w-8 h-8" : 
    size === "xl" ? "w-12 h-12" : "w-6 h-6";
    
  return (
    <svg 
      className={`${sizeClass} ${className}`}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" fill="#ffACAC" opacity="0.3" />
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      
      {/* Middle circle */}
      <circle cx="12" cy="12" r="6.5" fill="#ff8080" opacity="0.5" />
      <circle cx="12" cy="12" r="6.5" stroke={color} strokeWidth="1.5" fill="none" />
      
      {/* Inner circle */}
      <circle cx="12" cy="12" r="3" fill="#ff5252" opacity="0.8" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      
      {/* Bullseye */}
      <circle cx="12" cy="12" r="1" fill={color} />
      
      {/* Arrow */}
      <path 
        d="M19.5 4.5L12 12" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M19 4L21 2L22 3L20 5L19 4Z" 
        fill={color} 
        stroke={color} 
        strokeWidth="0.5" 
      />
    </svg>
  );
}