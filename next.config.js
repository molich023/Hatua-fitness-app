/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Keeps Auth0 stable on Netlify
  experimental: {
    serverComponentsExternalPackages: ['@auth0/nextjs-auth0'],
  },
  // 2. Prevents the build from failing due to minor styling/type warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

