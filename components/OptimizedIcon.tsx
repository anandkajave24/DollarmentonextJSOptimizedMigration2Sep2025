import React from 'react';
import { LucideIcon } from 'lucide-react';

// Dynamic icon loading to reduce bundle size
interface OptimizedIconProps {
  name: string;
  className?: string;
  size?: number;
}

const iconCache: { [key: string]: LucideIcon } = {};

export const OptimizedIcon = React.memo(({ name, className = '', size = 24 }: OptimizedIconProps) => {
  const [IconComponent, setIconComponent] = React.useState<LucideIcon | null>(null);

  React.useEffect(() => {
    if (iconCache[name]) {
      setIconComponent(() => iconCache[name]);
      return;
    }

    // Dynamic import of specific icon
    import('lucide-react').then((icons) => {
      const icon = (icons as any)[name];
      if (icon) {
        iconCache[name] = icon;
        setIconComponent(() => icon);
      }
    });
  }, [name]);

  if (!IconComponent) {
    // Fallback while loading
    return <div className={`${className} inline-block`} style={{ width: size, height: size }} />;
  }

  return <IconComponent className={className} size={size} />;
});

OptimizedIcon.displayName = 'OptimizedIcon';