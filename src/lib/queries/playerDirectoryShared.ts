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

export type NormalizedPlayerDirectoryFilters = {
  availability: string
  eligibleCountry: string
  limit: number
  nationality: string
  page: number
  query: string
  role: string
  sort: PlayerDirectorySort
}

const DEFAULT_LIMIT = 12

const readSearchParam = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value
}

const readPageParam = (value: string | string[] | undefined) => {
  const raw = readSearchParam(value)
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

const readSortParam = (value: string | string[] | undefined): PlayerDirectoryFilters['sort'] => {
  const raw = readSearchParam(value)
  if (raw === 'alphabetical' || raw === 'recent' || raw === 'featured') {
    return raw
  }

  return 'featured'
}

export const sanitizeDirectoryFilters = (
  filters: PlayerDirectoryFilters,
): NormalizedPlayerDirectoryFilters => {
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

export const parseDirectoryFilters = (params: Record<string, string | string[] | undefined>) => {
  return sanitizeDirectoryFilters({
    availability: readSearchParam(params.availability),
    eligibleCountry: readSearchParam(params.eligibleCountry),
    nationality: readSearchParam(params.nationality),
    page: readPageParam(params.page),
    query: readSearchParam(params.query),
    role: readSearchParam(params.role),
    sort: readSortParam(params.sort),
  })
}

export const buildPlayersSearch = (filters: NormalizedPlayerDirectoryFilters) => {
  const params = new URLSearchParams()

  if (filters.query) params.set('query', filters.query)
  if (filters.role) params.set('role', filters.role)
  if (filters.nationality) params.set('nationality', filters.nationality)
  if (filters.eligibleCountry) params.set('eligibleCountry', filters.eligibleCountry)
  if (filters.availability) params.set('availability', filters.availability)
  if (filters.sort) params.set('sort', filters.sort)
  if (filters.page > 1) params.set('page', String(filters.page))

  return params.toString()
}

export const hasActiveDirectoryCriteria = (filters: NormalizedPlayerDirectoryFilters) => {
  return Boolean(
    filters.query ||
      filters.role ||
      filters.nationality ||
      filters.eligibleCountry ||
      filters.availability,
  )
}
