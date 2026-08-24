import config from '@payload-config'
import { getPayload } from 'payload'

type TaxonomySeed = {
  name: string
  slug: string
  description?: string
  sortOrder: number
}

type CountrySeed = TaxonomySeed & {
  isoCode: string
}

type PlayerSeed = {
  fullName: string
  slug: string
  nationalitySlug: string
  primaryRoleSlug: string
  currentClubSlug: string
  eligibleCountrySlugs: string[]
  previousClubSlugs: string[]
  status: 'draft' | 'published' | 'archived'
  playerStatus: 'available' | 'contracted' | 'unavailable'
  featured: boolean
  sortOrder: number
  shortIntroduction: string
  biography: string
  currentLocation: string
  battingStyle: 'right-hand-bat' | 'left-hand-bat'
  bowlingStyle:
    | 'right-arm-fast'
    | 'right-arm-medium'
    | 'right-arm-off-break'
    | 'right-arm-leg-break'
    | 'left-arm-fast'
    | 'left-arm-medium'
    | 'left-arm-orthodox'
    | 'left-arm-wrist-spin'
  statisticsByFormat: Array<{
    format: 'test' | 'odi' | 't20' | 'list-a' | 'first-class'
    matches: number
    runs?: number
    battingAverage?: number
    highestScore?: number
    fifties?: number
    wickets?: number
    bowlingAverage?: number
    bestBowling?: string
    economyRate?: number
  }>
}

const playingRoles: TaxonomySeed[] = [
  { name: 'Batting All-Rounder', slug: 'batting-all-rounder', sortOrder: 1 },
  { name: 'Fast Bowler', slug: 'fast-bowler', sortOrder: 2 },
  { name: 'Wicketkeeper Batter', slug: 'wicketkeeper-batter', sortOrder: 3 },
]

const countries: CountrySeed[] = [
  { name: 'Sri Lanka', slug: 'sri-lanka', isoCode: 'LK', sortOrder: 1 },
  { name: 'United Kingdom', slug: 'united-kingdom', isoCode: 'GB', sortOrder: 2 },
]

const clubs: Array<TaxonomySeed & { countrySlug: string }> = [
  { name: 'Colombo Cricket Club', slug: 'colombo-cricket-club', countrySlug: 'sri-lanka', sortOrder: 1 },
  { name: 'Richmond Cricket Club', slug: 'richmond-cricket-club', countrySlug: 'united-kingdom', sortOrder: 2 },
  { name: 'Yorkshire Development XI', slug: 'yorkshire-development-xi', countrySlug: 'united-kingdom', sortOrder: 3 },
]

const players: PlayerSeed[] = [
  {
    fullName: 'Kasun Jayawardena',
    slug: 'kasun-jayawardena',
    nationalitySlug: 'sri-lanka',
    primaryRoleSlug: 'batting-all-rounder',
    currentClubSlug: 'colombo-cricket-club',
    eligibleCountrySlugs: ['united-kingdom'],
    previousClubSlugs: ['yorkshire-development-xi'],
    status: 'published',
    playerStatus: 'available',
    featured: true,
    sortOrder: 1,
    shortIntroduction:
      'Top-order batting all-rounder with Sri Lankan first-class experience and current UK club availability.',
    biography:
      'Kasun is a technically strong top-order player who contributes useful medium-pace overs and has experience adapting to different playing conditions.',
    currentLocation: 'Colombo, Sri Lanka',
    battingStyle: 'right-hand-bat',
    bowlingStyle: 'right-arm-medium',
    statisticsByFormat: [
      { format: 'first-class', matches: 24, runs: 1438, battingAverage: 39.9, highestScore: 141, fifties: 11, wickets: 28, bowlingAverage: 31.8, bestBowling: '4/29', economyRate: 3.5 },
      { format: 't20', matches: 32, runs: 618, battingAverage: 27.4, highestScore: 78, fifties: 4, wickets: 14, bowlingAverage: 24.2, bestBowling: '3/18', economyRate: 7.1 },
    ],
  },
  {
    fullName: 'Nimesh Perera',
    slug: 'nimesh-perera',
    nationalitySlug: 'sri-lanka',
    primaryRoleSlug: 'fast-bowler',
    currentClubSlug: 'richmond-cricket-club',
    eligibleCountrySlugs: ['united-kingdom'],
    previousClubSlugs: ['colombo-cricket-club'],
    status: 'published',
    playerStatus: 'contracted',
    featured: false,
    sortOrder: 2,
    shortIntroduction:
      'Right-arm fast bowler with new-ball control, lower-order resilience, and current UK club cricket experience.',
    biography:
      'Nimesh focuses on disciplined seam bowling, strong fitness standards, and long-spell consistency across red-ball and white-ball formats.',
    currentLocation: 'Leeds, United Kingdom',
    battingStyle: 'right-hand-bat',
    bowlingStyle: 'right-arm-fast',
    statisticsByFormat: [
      { format: 'first-class', matches: 18, wickets: 67, bowlingAverage: 22.6, bestBowling: '6/41', economyRate: 2.9 },
      { format: 'odi', matches: 12, wickets: 19, bowlingAverage: 25.1, bestBowling: '4/37', economyRate: 4.8 },
    ],
  },
]

const findBySlug = async (payload: Awaited<ReturnType<typeof getPayload>>, collection: 'playing-roles' | 'countries' | 'clubs' | 'players', slug: string) => {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] ?? null
}

const upsertPlayingRole = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: {
    description?: string
    name: string
    slug: string
    sortOrder: number
  },
) => {
  const existing = await findBySlug(payload, 'playing-roles', data.slug)

  if (existing) {
    return payload.update({
      id: existing.id,
      collection: 'playing-roles',
      data,
      draft: false,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: 'playing-roles',
    data,
    draft: false,
    overrideAccess: true,
  })
}

const upsertCountry = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: {
    description?: string
    isoCode: string
    name: string
    slug: string
    sortOrder: number
  },
) => {
  const existing = await findBySlug(payload, 'countries', data.slug)

  if (existing) {
    return payload.update({
      id: existing.id,
      collection: 'countries',
      data,
      draft: false,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: 'countries',
    data,
    draft: false,
    overrideAccess: true,
  })
}

const upsertClub = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: {
    country?: number
    description?: string
    name: string
    slug: string
    sortOrder: number
  },
) => {
  const existing = await findBySlug(payload, 'clubs', data.slug)

  if (existing) {
    return payload.update({
      id: existing.id,
      collection: 'clubs',
      data,
      draft: false,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection: 'clubs',
    data,
    draft: false,
    overrideAccess: true,
  })
}

const run = async () => {
  const payload = await getPayload({ config })

  for (const role of playingRoles) {
    await upsertPlayingRole(payload, role)
  }

  for (const country of countries) {
    await upsertCountry(payload, country)
  }

  for (const club of clubs) {
    const country = await findBySlug(payload, 'countries', club.countrySlug)

    await upsertClub(payload, {
      name: club.name,
      slug: club.slug,
      country: country?.id,
      description: club.description,
      sortOrder: club.sortOrder,
    })
  }

  for (const player of players) {
    const nationality = await findBySlug(payload, 'countries', player.nationalitySlug)
    const primaryRole = await findBySlug(payload, 'playing-roles', player.primaryRoleSlug)
    const currentClub = await findBySlug(payload, 'clubs', player.currentClubSlug)
    const eligibleCountries = await Promise.all(
      player.eligibleCountrySlugs.map(async (slug) => (await findBySlug(payload, 'countries', slug))?.id),
    )
    const previousClubs = await Promise.all(
      player.previousClubSlugs.map(async (slug) => (await findBySlug(payload, 'clubs', slug))?.id),
    )

    const existing = await findBySlug(payload, 'players', player.slug)
    const data = {
      biography: player.biography,
      currentClub: currentClub?.id,
      currentLocation: player.currentLocation,
      eligibleCountries: eligibleCountries.filter(Boolean),
      featured: player.featured,
      fullName: player.fullName,
      nationality: nationality?.id,
      playerStatus: player.playerStatus,
      previousClubs: previousClubs.filter(Boolean),
      primaryRole: primaryRole?.id,
      shortIntroduction: player.shortIntroduction,
      slug: player.slug,
      sortOrder: player.sortOrder,
      statisticsByFormat: player.statisticsByFormat,
      status: player.status,
      battingStyle: player.battingStyle,
      bowlingStyle: player.bowlingStyle,
    }

    if (existing) {
      await payload.update({
        id: existing.id,
        collection: 'players',
        data,
        draft: false,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'players',
        data,
        draft: false,
        overrideAccess: true,
      })
    }
  }

  payload.logger.info('Sample players seeded successfully.')
  await payload.destroy()
}

void run()
