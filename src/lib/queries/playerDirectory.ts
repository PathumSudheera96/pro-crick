import type { Sort, Where } from 'payload'

export type PlayerDirectorySort = 'featured' | 'alphabetical' | 'recent'

export type PlayerDirectoryFilters = {
  availability?: string | null
  eligibleCountry?: string | null
  limit?: number
  nationality?: string | null
  page?: number
  query?: string | null
  role?: string | null
  sort?: PlayerDirectorySort | null
}

const DEFAULT_LIMIT = 12

export const sanitizeDirectoryFilters = (filters: PlayerDirectoryFilters): Required<PlayerDirectoryFilters> => {
  return {
    availability: filters.availability ?? '',
    eligibleCountry: filters.eligibleCountry ?? '',
    limit: Math.max(1, Math.min(filters.limit ?? DEFAULT_LIMIT, 48)),
    nationality: filters.nationality ?? '',
    page: Math.max(1, filters.page ?? 1),
    query: filters.query?.trim() ?? '',
    role: filters.role ?? '',
    sort: filters.sort ?? 'featured',
  }
}

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
