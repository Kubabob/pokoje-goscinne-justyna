import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'pokoje-justyna.pl',
            //     pathname: '/api/media/**',
            // },
            ...[NEXT_PUBLIC_SERVER_URL].filter(Boolean).map((item) => {
                const url = new URL(item)

                return {
                    hostname: url.hostname,
                    protocol: url.protocol.replace(':', ''),
                    pathname: '/api/media/**',
                }
            }),
        ],
        unoptimized: process.env.NODE_ENV === 'development',
    },
    reactStrictMode: true,
    redirects,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
        ]
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                tls: false,
            }
        }
        return config
    },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
