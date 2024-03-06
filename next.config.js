/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'out',
    images: {
      unoptimized: true
  },
  output: 'export',
    optimizeFonts: false
  }
  
  const dns = require("dns");
  dns.setDefaultResultOrder("ipv4first");
  
  
  module.exports = nextConfig
  