/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["mongodb"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig


