/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
        {
            source: '/whitepaper',
            destination: '/whitepaper.pdf',
            permanent: false,
        }
    ]
}
}

module.exports = nextConfig

