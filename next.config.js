/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,  // Reduce memory, save 30MB builds
  
  webpackDevMiddleware: (config) => {
    config.allowedHosts = 'all';
    return config;
  },
  
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,  // 1 year cache for immutable images
    unoptimized: false,  // Use Next.js Image Optimization
  },
  
  experimental: {
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
      // API routes: 60s cache with SWR for 24h (serve stale while revalidating)
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, max-age=60, stale-while-revalidate=86400' },
        ],
      },
      // Prompts page: 3h cache (regenerates 3x daily max)
      {
        source: '/prompts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=10800, stale-while-revalidate=86400' },
        ],
      },
      // Blog: 48h cache (blog posts don't change often, huge savings)
      {
        source: '/blog/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=172800, stale-while-revalidate=604800' },
        ],
      },
      // Static pages: 24h cache (tools, templates, cheatsheet)
      {
        source: '/:path(tools|templates|cheatsheet)?',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      // Immutable assets: 1 year
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Security headers (allow iframe for Replit proxy)
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
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
    maxInactiveAge: 1000 * 60 * 60 * 24,  // Keep pages cached 24h
    pagesBufferLength: 3,  // Minimal pre-generation
  },

  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
  },
}

module.exports = nextConfig
