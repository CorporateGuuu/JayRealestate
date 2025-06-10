import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Performance optimizations
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance and build optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Optimize for Netlify deployment
  trailingSlash: true,
  // Bundle analyzer for production builds
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer')({
          enabled: true,
        }))()
      );
      return config;
    },
  }),
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Exclude mobile app from build
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  // Exclude mobile-app directory from TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint configuration for production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
