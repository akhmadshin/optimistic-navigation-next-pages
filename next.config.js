/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  assetPrefix: './',
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
