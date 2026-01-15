/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Danger: skips type errors during build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**', // allow any path under this host
      },
      {
        protocol: 'http',
        hostname: 'localhost', // for your API routes if needed
        port: '3000',
        pathname: '/api/inventory/images/[itemId]', // adjust as necessary
      },
    ],
  },
};

module.exports = nextConfig;
