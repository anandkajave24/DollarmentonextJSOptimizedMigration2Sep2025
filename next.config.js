export default { 
  trailingSlash: true, 
  images: { 
    domains: ['dollarmento.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Hybrid rendering support - removed static export
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', '@radix-ui/react-accordion', '@radix-ui/react-dialog'],
  },
  // Optimized webpack configuration for hybrid rendering
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      maxAsyncRequests: 25,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        recharts: {
          test: /[\\/]node_modules[\\/]recharts[\\/]/,
          name: 'recharts',
          chunks: 'async',
          priority: 10,
        },
        calculator: {
          test: /[\\/]client\/src\/pages\/.*Calculator\.tsx$/,
          name: 'calculator',
          chunks: 'async',
          priority: 5,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    };
    
    return config;
  },
  compress: true,
  // Enable ISR and SSR
  poweredByHeader: false,
  generateEtags: false,
};
