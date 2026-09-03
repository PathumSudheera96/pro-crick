import type { PaginatedDocs } from 'payload'

import staticPlayersData from '../../../public/player_data/players.json' with { type: 'json' }

import type { Club, Country, Player, PlayingRole } from '@/payload-types'

type StaticPlayerRecord = {
  slug: string
  name: string
  dateOfBirth?: string
  age?: number
  role: string
  nationality: string
  status: string
  battingStyle?: string
  bowlingStyle?: string
  majorTeams?: string
  coachingQualification?: string
  imageUrl?: string
  profileLine?: string
  profileBio?: string
}

const STATIC_TIMESTAMP = '2026-09-01T00:00:00.000Z'
const STATIC_ELIGIBLE_COUNTRY_ID = 90_001
const STATIC_ELIGIBLE_COUNTRY_NAME = 'United Kingdom'
const STATIC_PLAYER_IMAGE_PATH = (slug: string) => `/images/players/${slug}.png`

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const parseStaticDate = (value?: string): string | null => {
  if (!value) {
    return null
  }

  const [day, month, year] = value.split('-')

  if (!day || !month || !year) {
    return null
  }

  return `${year}-${month}-${day}`
}

const mapStaticStatus = (value: string): Player['playerStatus'] => {
  switch (value.trim().toLowerCase()) {
    case 'contracted':
      return 'contracted'
    case 'unavailable':
      return 'unavailable'
    case 'available':
    default:
      return 'available'
  }
}

const mapStaticBattingStyle = (value?: string): Player['battingStyle'] => {
  if (!value) {
    return null
  }

  if (value.startsWith('LH')) {
    return 'left-hand-bat'
  }

  if (value.startsWith('RH')) {
    return 'right-hand-bat'
  }

  return null
}

const mapStaticBowlingStyle = (value?: string): Player['bowlingStyle'] => {
  if (!value) {
    return null
  }

  const normalized = value.toLowerCase()

  if (normalized.includes('ra fast')) return 'right-arm-fast'
  if (normalized.includes('ra medium')) return 'right-arm-medium'
  if (normalized.includes('ra off spin') || normalized.includes('ra off-spin')) {
    return 'right-arm-off-break'
  }
  if (normalized.includes('ra leg spin') || normalized.includes('ra leg-spin')) {
    return 'right-arm-leg-break'
  }
  if (normalized.includes('la fast')) return 'left-arm-fast'
  if (normalized.includes('la medium')) return 'left-arm-medium'
  if (normalized.includes('la orthodox')) return 'left-arm-orthodox'
  if (normalized.includes('la wrist')) return 'left-arm-wrist-spin'

  return null
}

const createCountry = (id: number, name: string): Country => ({
  id,
  createdAt: STATIC_TIMESTAMP,
  name,
  slug: slugify(name),
  sortOrder: id,
  updatedAt: STATIC_TIMESTAMP,
})

const createRole = (id: number, name: string): PlayingRole => ({
  id,
  createdAt: STATIC_TIMESTAMP,
  name,
  slug: slugify(name),
  sortOrder: id,
  updatedAt: STATIC_TIMESTAMP,
})

const createClub = (id: number, name: string): Club => ({
  id,
  createdAt: STATIC_TIMESTAMP,
  name,
  slug: slugify(name),
  sortOrder: id,
  updatedAt: STATIC_TIMESTAMP,
})

const STATIC_COUNTRIES = new Map<string, Country>()
const STATIC_ROLES = new Map<string, PlayingRole>()
const STATIC_CLUBS = new Map<string, Club>()

let nextCountryId = 10_001
let nextRoleId = 20_001
let nextClubId = 30_001

const getOrCreateCountry = (name: string): Country => {
  const existing = STATIC_COUNTRIES.get(name)

  if (existing) {
    return existing
  }

  const country = createCountry(nextCountryId, name)
  nextCountryId += 1
  STATIC_COUNTRIES.set(name, country)
  return country
}

const getOrCreateRole = (name: string): PlayingRole => {
  const existing = STATIC_ROLES.get(name)

  if (existing) {
    return existing
  }

  const role = createRole(nextRoleId, name)
  nextRoleId += 1
  STATIC_ROLES.set(name, role)
  return role
}

const getOrCreateClub = (name: string): Club => {
  const existing = STATIC_CLUBS.get(name)

  if (existing) {
    return existing
  }

  const club = createClub(nextClubId, name)
  nextClubId += 1
  STATIC_CLUBS.set(name, club)
  return club
}

const STATIC_ELIGIBLE_COUNTRY = createCountry(
  STATIC_ELIGIBLE_COUNTRY_ID,
  STATIC_ELIGIBLE_COUNTRY_NAME,
)

const STATIC_PLAYERS: Player[] = (staticPlayersData as StaticPlayerRecord[]).map((record, index) => {
  const nationality = getOrCreateCountry(record.nationality)
  const primaryRole = getOrCreateRole(record.role)
  const teams = (record.majorTeams || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  const currentClub = teams[0] ? getOrCreateClub(teams[0]) : null
  const teamClubs = teams.map((team) => getOrCreateClub(team))

  return {
    id: index + 1,
    fullName: record.name,
    slug: record.slug,
    profileImage: {
      id: 40_001 + index,
      alt: record.name,
      createdAt: STATIC_TIMESTAMP,
      filename: `${record.slug}.png`,
      mimeType: 'image/png',
      title: record.name,
      updatedAt: STATIC_TIMESTAMP,
      url: STATIC_PLAYER_IMAGE_PATH(record.slug),
    },
    shortIntroduction: record.profileLine || null,
    biography: record.profileBio || null,
    dateOfBirth: parseStaticDate(record.dateOfBirth),
    nationality,
    currentLocation: 'Sri Lanka',
    playerCategory: 'professional-player',
    primaryRole,
    battingStyle: mapStaticBattingStyle(record.battingStyle),
    bowlingStyle: mapStaticBowlingStyle(record.bowlingStyle),
    currentClub,
    previousClubs: teamClubs.length > 1 ? teamClubs.slice(1) : null,
    teamsRepresented: teamClubs.length > 0 ? teamClubs : null,
    careerHighlights: null,
    achievements: record.coachingQualification
      ? [{ achievement: `Coaching qualification: ${record.coachingQualification}`, id: `achievement-${record.slug}` }]
      : null,
    playingExperience: record.majorTeams || null,
    playerStatus: mapStaticStatus(record.status),
    eligibleCountries: [STATIC_ELIGIBLE_COUNTRY],
    statisticsByFormat: null,
    gallery: null,
    playerCv: null,
    youtubeVideos: null,
    vimeoVideos: null,
    instagramUrl: null,
    espnCricinfoUrl: null,
    cricbuzzUrl: null,
    featured: index < 7,
    sortOrder: index + 1,
    status: 'published',
    publishedAt: STATIC_TIMESTAMP,
    seo: {
      follow: true,
      index: true,
    },
    updatedAt: STATIC_TIMESTAMP,
    createdAt: STATIC_TIMESTAMP,
  }
})

const getRelationshipId = (value: number | { id: number | string } | null | undefined): string => {
  if (typeof value === 'number' || typeof value === 'string') {
    return String(value)
  }

  if (value && typeof value === 'object') {
    return String(value.id)
  }

  return ''
}

export const getStaticPublishedPlayers = (filters: {
  availability?: string | null
  eligibleCountry?: string | null
  limit?: number
  nationality?: string | null
  page?: number
  query?: string | null
  role?: string | null
  sort?: 'featured' | 'alphabetical' | 'recent' | null
}): PaginatedDocs<Player> => {
  const availability = filters.availability?.trim() || ''
  const eligibleCountry = filters.eligibleCountry?.trim() || ''
  const nationality = filters.nationality?.trim() || ''
  const query = filters.query?.trim().toLowerCase() || ''
  const role = filters.role?.trim() || ''
  const page = Math.max(1, filters.page ?? 1)
  const limit = Math.max(1, filters.limit ?? 12)
  const sort = filters.sort || 'featured'

  let docs = STATIC_PLAYERS.filter((player) => {
    if (availability && player.playerStatus !== availability) {
      return false
    }

    if (role && getRelationshipId(player.primaryRole) !== role) {
      return false
    }

    if (nationality && getRelationshipId(player.nationality) !== nationality) {
      return false
    }

    if (
      eligibleCountry &&
      !player.eligibleCountries?.some((country) => getRelationshipId(country) === eligibleCountry)
    ) {
      return false
    }

    if (query) {
      const haystack = [
        player.fullName,
        player.shortIntroduction,
        player.biography,
        typeof player.primaryRole === 'object' ? player.primaryRole.name : '',
        typeof player.nationality === 'object' ? player.nationality.name : '',
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(query)) {
        return false
      }
    }

    return true
  })

  if (sort === 'alphabetical') {
    docs = [...docs].sort((a, b) => a.fullName.localeCompare(b.fullName))
  } else if (sort === 'recent') {
    docs = [...docs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  } else {
    docs = [...docs].sort((a, b) => {
      const featuredRank = Number(Boolean(b.featured)) - Number(Boolean(a.featured))

      if (featuredRank !== 0) {
        return featuredRank
      }

      return a.sortOrder - b.sortOrder || a.fullName.localeCompare(b.fullName)
    })
  }

  const totalDocs = docs.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * limit
  const pagedDocs = docs.slice(start, start + limit)

  return {
    docs: pagedDocs,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
    limit,
    nextPage: safePage < totalPages ? safePage + 1 : null,
    page: safePage,
    pagingCounter: start + 1,
    prevPage: safePage > 1 ? safePage - 1 : null,
    totalDocs,
    totalPages,
  }
}

export const getStaticPlayerDirectoryFilterOptions = () => ({
  availabilityOptions: [
    { label: 'Available', value: 'available' },
    { label: 'Contracted', value: 'contracted' },
    { label: 'Unavailable', value: 'unavailable' },
  ],
  countries: Array.from(STATIC_COUNTRIES.values()).sort((a, b) => a.name.localeCompare(b.name)),
  roles: Array.from(STATIC_ROLES.values()).sort((a, b) => a.name.localeCompare(b.name)),
})

export const getStaticPlayerApplicationFormOptions = () => ({
  clubs: Array.from(STATIC_CLUBS.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((club) => ({
      label: club.name,
      value: club.slug,
    })),
  countries: Array.from(STATIC_COUNTRIES.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => ({
      label: country.name,
      value: country.slug,
    })),
  roles: Array.from(STATIC_ROLES.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((role) => ({
      label: role.name,
      value: role.slug,
    })),
})

export const getStaticPublishedPlayerBySlug = (slug: string): Player | null => {
  return STATIC_PLAYERS.find((player) => player.slug === slug) || null
}

export const getStaticPublishedPlayerSlugs = (): string[] => {
  return STATIC_PLAYERS.map((player) => player.slug)
}

export const getStaticPlayerImageUrl = (slug: string): string | null => {
  return STATIC_PLAYERS.some((player) => player.slug === slug) ? STATIC_PLAYER_IMAGE_PATH(slug) : null
}

export const getStaticRelatedPublishedPlayers = (player: Player, limit = 3): Player[] => {
  const roleId = getRelationshipId(player.primaryRole)
  const nationalityId = getRelationshipId(player.nationality)

  return STATIC_PLAYERS.filter((candidate) => {
    if (candidate.slug === player.slug) {
      return false
    }

    return (
      getRelationshipId(candidate.primaryRole) === roleId ||
      getRelationshipId(candidate.nationality) === nationalityId
    )
  }).slice(0, limit)
}
