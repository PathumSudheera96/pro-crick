import { cache } from 'react'
import type { PaginatedDocs } from 'payload'

import type { Player } from '@/payload-types'
import { getPayloadClient } from './payload'
export {
  buildPlayerDirectoryWhere,
  resolvePlayerDirectorySort,
  sanitizeDirectoryFilters,
  type PlayerDirectoryFilters,
  type PlayerDirectorySort,
} from './playerDirectory'
import {
  buildPlayerDirectoryWhere,
  resolvePlayerDirectorySort,
  sanitizeDirectoryFilters,
  type PlayerDirectoryFilters,
} from './playerDirectory'

export const getPublishedPlayers = async (
  filters: PlayerDirectoryFilters,
): Promise<PaginatedDocs<Player>> => {
  const payload = await getPayloadClient()
  const normalized = sanitizeDirectoryFilters(filters)

  return payload.find({
    collection: 'players',
    depth: 2,
    limit: normalized.limit,
    page: normalized.page,
    sort: resolvePlayerDirectorySort(normalized.sort || 'featured'),
    where: buildPlayerDirectoryWhere(normalized),
  })
}

export const getPlayerDirectoryFilterOptions = async () => {
  const payload = await getPayloadClient()

  const [roles, countries] = await Promise.all([
    payload.find({
      collection: 'playing-roles',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'sortOrder',
    }),
    payload.find({
      collection: 'countries',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'sortOrder',
    }),
  ])

  return {
    availabilityOptions: [
      { label: 'Available', value: 'available' },
      { label: 'Contracted', value: 'contracted' },
      { label: 'Unavailable', value: 'unavailable' },
    ],
    countries: countries.docs,
    roles: roles.docs,
  }
}

export const getPublishedPlayerBySlug = cache(async (slug: string): Promise<Player | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'players',
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

export const getPublishedPlayerSlugs = cache(async (): Promise<string[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'players',
    depth: 0,
    limit: 500,
    pagination: false,
    sort: 'slug',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return result.docs.map((player) => player.slug)
})
