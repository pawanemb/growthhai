/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    workerThreads: true,
    cpus: 1
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'media.licdn.com'],
  },
  typescript: {
    // Don't run TypeScript during production builds
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't run ESLint during production builds
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
