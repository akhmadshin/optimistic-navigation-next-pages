/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: '/blog-next-pages',
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
