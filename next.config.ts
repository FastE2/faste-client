import { withAeo } from 'aeo.js/next'
import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@iconify/react',
      '@radix-ui/react-icons',
      '@tanstack/react-query',
      'date-fns',
      'recharts',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: false,
}

export default withAeo(nextConfig as any)