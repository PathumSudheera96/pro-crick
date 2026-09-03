import type { Sort, Where } from 'payload'

import {
  sanitizeDirectoryFilters,
  type PlayerDirectoryFilters,
  type PlayerDirectorySort,
} from './playerDirectoryShared.ts'

export {
  buildPlayersSearch,
  hasActiveDirectoryCriteria,
  parseDirectoryFilters,
  sanitizeDirectoryFilters,
  type NormalizedPlayerDirectoryFilters,
  type PlayerDirectoryFilters,
  type PlayerDirectorySort,
} from './playerDirectoryShared.ts'

export const resolvePlayerDirectorySort = (sort: PlayerDirectorySort): Sort => {
  switch (sort) {
    case 'alphabetical':
      return 'fullName'
    case 'recent':
      return '-updatedAt'
    case 'featured':
    default:
      return ['-featured', 'sortOrder', 'fullName']
  }
}

export const buildPlayerDirectoryWhere = (input: PlayerDirectoryFilters): Where => {
  const filters = sanitizeDirectoryFilters(input)
  const and: NonNullable<Where['and']> = [
    {
      status: {
        equals: 'published',
      },
    },
  ]

  if (filters.query) {
    and.push({
      or: [
        {
          fullName: {
            like: filters.query,
          },
        },
        {
          shortIntroduction: {
            like: filters.query,
          },
        },
        {
          biography: {
            like: filters.query,
          },
        },
      ],
    })
  }

  if (filters.role) {
    and.push({
      primaryRole: {
        equals: filters.role,
      },
    })
  }

  if (filters.nationality) {
    and.push({
      nationality: {
        equals: filters.nationality,
      },
    })
  }

  if (filters.availability) {
    and.push({
      playerStatus: {
        equals: filters.availability,
      },
    })
  }

  if (filters.eligibleCountry) {
    and.push({
      eligibleCountries: {
        in: [filters.eligibleCountry],
      },
    })
  }

  return {
    and,
  }
}
