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
    },
    async rewrites() {
        return [
            {
                source: '/feed',
                destination:'https://medium.com/feed/@howreanetwork'
            }
        ]
    }
}

module.exports = nextConfig

