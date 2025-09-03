import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Preload and cache critical routes for instant navigation
export const useInstantNavigation = () => {
  const router = useRouter();

  useEffect(() => {
    // Critical routes to preload immediately
    const criticalRoutes = [
      '/financial-calculators',
      '/learning',
      '/investment-market-menu',
      '/financial-management',
      '/401k-calculator',
      '/budget-buddy',
      '/emi-calculator',
      '/roth-ira-calculator',
      '/tax-calculator'
    ];

    // Preload all critical routes
    criticalRoutes.forEach(route => {
      router.prefetch(route);
    });

    // Preload on hover for instant clicks
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          router.prefetch(url.pathname);
        }
      }
    };

    // Add hover prefetching
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, [router]);
};