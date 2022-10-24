/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd ? 'https://chdr.cs.ucf.edu/emurr/' : "http://localhost:3000",
}

module.exports = nextConfig
