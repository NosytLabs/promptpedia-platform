/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  experimental: {
    serverActions: true,
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
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      { source: '/sitemap.xml', headers: [{ key: 'Content-Type', value: 'application/xml' }] },
      { source: '/robots.txt', headers: [{ key: 'Content-Type', value: 'text/plain' }] },
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

  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
  },
}