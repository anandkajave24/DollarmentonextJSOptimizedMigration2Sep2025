interface SmartLifeManagerIconProps {
  className?: string;
  size?: number;
}

export function SmartLifeManagerIcon({ className = "", size = 24 }: SmartLifeManagerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Clipboard background */}
      <rect
        x="6"
        y="4"
        width="20"
        height="26"
        rx="3"
        fill="white"
        stroke="currentColor"
        strokeWidth="3"
      />
      
      {/* Clipboard clip */}
      <rect
        x="11"
        y="1"
        width="10"
        height="6"
        rx="2"
        fill="white"
        stroke="currentColor"
        strokeWidth="3"
      />
      
      {/* Text lines */}
      <rect x="10" y="12" width="12" height="2" rx="1" fill="currentColor" />
      <rect x="10" y="16" width="10" height="2" rx="1" fill="currentColor" />
      <rect x="10" y="20" width="11" height="2" rx="1" fill="currentColor" />
      <rect x="10" y="24" width="8" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}