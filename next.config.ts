import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/__/auth/:path*',
        destination: '/firebase-auth/:path*',
      },
    ];
  },
};

export default nextConfig;
