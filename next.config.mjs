/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rlmg-dev2.com',
                port: '',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: 'directus',
                port: '8055',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: '208.72.236.236',
                port: '8055',
                pathname: '/assets/**/**',
            }
        ],
    }
};

export default nextConfig;
