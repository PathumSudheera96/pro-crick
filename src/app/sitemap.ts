import type { MetadataRoute } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'

import { isBackendUnavailableError } from '@/lib/backendAvailability'
import { buildAbsoluteUrl } from '@/lib/seo/metadata'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>()

  entries.set(buildAbsoluteUrl('/'), {
    changeFrequency: 'weekly',
    priority: 1,
    url: buildAbsoluteUrl('/'),
  })

  try {
    const payload = await getPayload({ config })
    const [pages, players, news] = await Promise.all([
      payload.find({
        collection: 'pages',
        depth: 0,
        limit: 200,
        overrideAccess: true,
        pagination: false,
        sort: 'slug',
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
      payload.find({
        collection: 'players',
        depth: 0,
        limit: 500,
        overrideAccess: true,
        pagination: false,
        sort: 'slug',
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
      payload.find({
        collection: 'news',
        depth: 0,
        limit: 500,
        overrideAccess: true,
        pagination: false,
        sort: '-publishedAt',
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
    ])

    for (const page of pages.docs) {
      const path = page.slug === 'home' ? '/' : `/${page.slug}`
      const url = buildAbsoluteUrl(path)

      entries.set(url, {
        changeFrequency: 'weekly',
        lastModified: page.publishedAt || page.updatedAt,
        priority: path === '/' ? 1 : 0.8,
        url,
      })
    }

    for (const player of players.docs) {
      const url = buildAbsoluteUrl(`/players/${player.slug}`)

      entries.set(url, {
        changeFrequency: 'weekly',
        lastModified: player.publishedAt || player.updatedAt,
        priority: 0.7,
        url,
      })
    }

    for (const item of news.docs) {
      const url = buildAbsoluteUrl(`/news/${item.slug}`)

      entries.set(url, {
        changeFrequency: 'monthly',
        lastModified: item.publishedAt || item.updatedAt,
        priority: 0.6,
        url,
      })
    }
  } catch (error) {
    if (!isBackendUnavailableError(error)) {
      throw error
    }
  }

  return [...entries.values()]
}
