/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com']
  },
  async rewrites() {
    return [
      {
        source: '/financial-calculators/:path*',
        destination: '/financial-calculators/:path*'
      },
      {
        source: '/learning-hub/:path*', 
        destination: '/learning-hub/:path*'
      },
      {
        source: '/market-data/:path*',
        destination: '/market-data/:path*'
      }
    ]
  }
}

export default nextConfig