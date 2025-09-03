import { lazy, Suspense } from 'react';

// Simple chart skeleton for loading state
const ChartSkeleton = () => (
  <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

// Simple wrapper for lazy-loaded charts
export function LazyChart({ children, height = 300 }: { children: React.ReactNode; height?: number }) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <div style={{ width: '100%', height }}>
        {children}
      </div>
    </Suspense>
  );
}

// Export chart skeleton for reuse
export { ChartSkeleton };