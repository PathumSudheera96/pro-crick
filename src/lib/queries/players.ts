import { cache } from 'react'
import type { PaginatedDocs } from 'payload'

import type { Player } from '@/payload-types'
import {
  getStaticPlayerApplicationFormOptions,
  getStaticPlayerDirectoryFilterOptions,
  getStaticPublishedPlayerBySlug,
  getStaticPublishedPlayerSlugs,
  getStaticPublishedPlayers,
  getStaticRelatedPublishedPlayers,
} from '@/lib/players/staticPlayers'
import { getPayloadClient } from './payload'
export {
  buildPlayersSearch,
  buildPlayerDirectoryWhere,
  hasActiveDirectoryCriteria,
  parseDirectoryFilters,
  resolvePlayerDirectorySort,
  sanitizeDirectoryFilters,
  type NormalizedPlayerDirectoryFilters,
  type PlayerDirectoryFilters,
  type PlayerDirectorySort,
} from './playerDirectory'
import {
  buildPlayerDirectoryWhere,
  resolvePlayerDirectorySort,
  sanitizeDirectoryFilters,
  type NormalizedPlayerDirectoryFilters,
  type PlayerDirectoryFilters,
} from './playerDirectory'

export const getPublishedPlayers = async (
  filters: PlayerDirectoryFilters,
): Promise<PaginatedDocs<Player>> => {
  const normalized: NormalizedPlayerDirectoryFilters = sanitizeDirectoryFilters(filters)

  try {
    const payload = await getPayloadClient()

    return payload.find({
      collection: 'players',
      depth: 2,
      limit: normalized.limit,
      page: normalized.page,
      sort: resolvePlayerDirectorySort(normalized.sort || 'featured'),
      where: buildPlayerDirectoryWhere(normalized),
    })
  } catch {
    return getStaticPublishedPlayers(normalized)
  }
}

export const getPlayerDirectoryFilterOptions = async () => {
  try {
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
  } catch {
    return getStaticPlayerDirectoryFilterOptions()
  }
}

export const getPlayerApplicationFormOptions = cache(async () => {
  try {
    const payload = await getPayloadClient()

    const [roles, countries, clubs] = await Promise.all([
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
      payload.find({
        collection: 'clubs',
        depth: 0,
        limit: 200,
        pagination: false,
        sort: 'sortOrder',
      }),
    ])

    return {
      clubs: clubs.docs.map((club) => ({
        label: club.name,
        value: club.slug,
      })),
      countries: countries.docs.map((country) => ({
        label: country.name,
        value: country.slug,
      })),
      roles: roles.docs.map((role) => ({
        label: role.name,
        value: role.slug,
      })),
    }
  } catch {
    return getStaticPlayerApplicationFormOptions()
  }
})

export const getPublishedPlayerBySlug = cache(async (slug: string): Promise<Player | null> => {
  try {
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
  } catch {
    return getStaticPublishedPlayerBySlug(slug)
  }
})

export const getPublishedPlayerSlugs = cache(async (): Promise<string[]> => {
  try {
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
  } catch {
    return getStaticPublishedPlayerSlugs()
  }
})

const getRelationId = (value: number | { id?: number | string } | null | undefined): number | string | null => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'id' in value) {
    return value.id ?? null
  }

  return null
}

export const getRelatedPublishedPlayers = cache(
  async (player: Player, limit = 3): Promise<Player[]> => {
    try {
      const payload = await getPayloadClient()
      const roleId = getRelationId(player.primaryRole)
      const nationalityId = getRelationId(player.nationality)

      if (!roleId && !nationalityId) {
        return []
      }

      const matchingSignals = []

      if (roleId) {
        matchingSignals.push({
          primaryRole: {
            equals: roleId,
          },
        })
      }

      if (nationalityId) {
        matchingSignals.push({
          nationality: {
            equals: nationalityId,
          },
        })
      }

      const result = await payload.find({
        collection: 'players',
        depth: 2,
        limit,
        pagination: false,
        sort: ['-featured', 'sortOrder', 'fullName'],
        where: {
          and: [
            {
              status: {
                equals: 'published',
              },
            },
            {
              slug: {
                not_equals: player.slug,
              },
            },
            {
              or: matchingSignals,
            },
          ],
        },
      })

      return result.docs
    } catch {
      return getStaticRelatedPublishedPlayers(player, limit)
    }
  },
)

export const getHomepageFeaturedPlayers = async (limit = 7): Promise<Player[]> => {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'players',
      depth: 2,
      limit,
      pagination: false,
      sort: ['-featured', 'sortOrder', 'fullName'],
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return result.docs
  } catch {
    return getStaticPublishedPlayers({}).docs.slice(0, limit)
  }
}
