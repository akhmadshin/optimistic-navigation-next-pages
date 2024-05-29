/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    deviceSizes: [526, 680, 832, 1080, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 316],
  },
}

module.exports = nextConfig
