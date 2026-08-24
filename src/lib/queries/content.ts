import { cache } from 'react'

import type { Footer, Header, Page, SiteSetting } from '@/payload-types'

import { getPayloadClient } from './payload'

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
})

export const getHeaderContent = cache(async (): Promise<Header> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'header',
    depth: 1,
  })
})

export const getFooterContent = cache(async (): Promise<Footer> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })
})

export const getPublishedPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
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
