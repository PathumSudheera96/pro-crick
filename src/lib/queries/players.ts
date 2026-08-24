import config from '@payload-config'
import { getPayload } from 'payload'
import type { PaginatedDocs } from 'payload'

import type { Player } from '@/payload-types'
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
  const payload = await getPayload({ config })
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
  const payload = await getPayload({ config })

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
