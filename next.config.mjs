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
            }
        ],
    }
};

export default nextConfig;
