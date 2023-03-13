/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['t-d-h.tech'],
    },
    async redirects() {
        return [
            {
                source: '/whitepaper',
                destination: '/whitepaper.pdf',
                permanent: false,
            },
            {
                source: '/pitch',
                destination: '/pitchdeck.pdf',
                permanent: false,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/feed',
                destination: 'https://medium.com/feed/@howreanetwork'
            },
            {
                source: '/scrape',
                destination: 'https://bscscan.com/token/0x1c86738cAbcd4E37910468119ddF78817dC2125d'
            }
        ]
    }
}

module.exports = nextConfig

