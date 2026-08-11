import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 86400,
  },
}

export default withPayload(nextConfig)
