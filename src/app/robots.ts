import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/seo/metadata'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    host: siteUrl,
    rules: [
      {
        allow: '/',
        disallow: ['/admin', '/api', '/_next'],
        userAgent: '*',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
