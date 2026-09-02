import { cache } from 'react'

import type { News } from '@/payload-types'

import { getPayloadClient } from './payload'

export const getLatestPublishedNews = cache(
  async (limit = 3): Promise<News[]> => {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'news',
      depth: 1,
      limit,
      overrideAccess: true,
      pagination: false,
      sort: '-publishedAt',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return result.docs
  },
)

export const getPublishedNewsBySlug = cache(async (slug: string): Promise<News | null> => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 1,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return result.docs[0] || null
})
