/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,  // Reduce memory, save 30MB builds
  
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,  // 1 year cache for immutable images
    unoptimized: false,  // Use Next.js Image Optimization
  },
  
  experimental: {
    serverActions: true,
    optimizePackageImports: ['lucide-react'],  // Only import used icons
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, max-age=60' },
        ],
      },
      {
        source: '/prompts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
      {
        source: '/blog/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/library', destination: '/prompts', permanent: true },
      { source: '/techniques', destination: '/blog', permanent: true },
      { source: '/enhance', destination: '/generate', permanent: true },
      { source: '/resources', destination: '/blog', permanent: true },
    ];
  },

  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,  // 1 hour page retention
    pagesBufferLength: 5,  // Reduce pre-generation
  },

  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
  },
}