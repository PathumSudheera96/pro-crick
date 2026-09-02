import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { Player } from '@/payload-types'

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

const dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(dirname, '..')
const playerDataDir = path.join(repoRoot, 'public/player_data')

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

const mapStatus = (value: string): Player['playerStatus'] => {
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

const mapBattingStyle = (value?: string): Player['battingStyle'] => {
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

const mapBowlingStyle = (value?: string): Player['bowlingStyle'] => {
  if (!value) {
    return null
  }

  const normalized = value.toLowerCase()

  if (normalized.includes('ra fast')) return 'right-arm-fast'
  if (normalized.includes('ra medium')) return 'right-arm-medium'
  if (normalized.includes('ra off spin')) return 'right-arm-off-break'
  if (normalized.includes('ra leg spin')) return 'right-arm-leg-break'
  if (normalized.includes('la fast')) return 'left-arm-fast'
  if (normalized.includes('la medium')) return 'left-arm-medium'
  if (normalized.includes('la orthodox')) return 'left-arm-orthodox'
  if (normalized.includes('la wrist spin')) return 'left-arm-wrist-spin'

  return null
}

type PayloadClient = Awaited<ReturnType<typeof getPayload>>

const findBySlug = async (
  payload: PayloadClient,
  collection: 'playing-roles' | 'countries' | 'clubs' | 'players',
  slug: string,
) => {
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

const upsertTaxonomy = async (
  payload: PayloadClient,
  collection: 'playing-roles' | 'countries' | 'clubs',
  data: { name: string; slug: string; sortOrder: number },
) => {
  const existing = await findBySlug(payload, collection, data.slug)

  if (existing) {
    return payload.update({
      id: existing.id,
      collection,
      data,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data,
    overrideAccess: true,
  })
}

const getOrCreateMedia = async (payload: PayloadClient, slug: string, recordName: string) => {
  const filename = `${slug}.png`
  const existingResult = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      filename: {
        equals: filename,
      },
    },
  })

  const existing = existingResult.docs[0] ?? null

  if (existing) {
    return existing
  }

  const data = await readFile(path.join(playerDataDir, filename))

  return payload.create({
    collection: 'media',
    data: {
      alt: recordName,
    },
    overrideAccess: true,
    file: {
      data,
      mimetype: 'image/png',
      name: filename,
      size: data.byteLength,
    },
  })
}

const run = async () => {
  const payload = await getPayload({ config })

  const raw = await readFile(path.join(playerDataDir, 'players.json'), 'utf8')
  const records = JSON.parse(raw) as StaticPlayerRecord[]

  const countryIds = new Map<string, number>()
  const roleIds = new Map<string, number>()
  const clubIds = new Map<string, number>()
  let countryOrder = 0
  let roleOrder = 0
  let clubOrder = 0

  const upsertCountry = async (name: string) => {
    const slug = slugify(name)
    const cached = countryIds.get(slug)

    if (cached) {
      return cached
    }

    countryOrder += 1
    const doc = await upsertTaxonomy(payload, 'countries', {
      name,
      slug,
      sortOrder: countryOrder,
    })
    const id = typeof doc.id === 'number' ? doc.id : Number(doc.id)
    countryIds.set(slug, id)
    return id
  }

  const upsertRole = async (name: string) => {
    const slug = slugify(name)
    const cached = roleIds.get(slug)

    if (cached) {
      return cached
    }

    roleOrder += 1
    const doc = await upsertTaxonomy(payload, 'playing-roles', {
      name,
      slug,
      sortOrder: roleOrder,
    })
    const id = typeof doc.id === 'number' ? doc.id : Number(doc.id)
    roleIds.set(slug, id)
    return id
  }

  const upsertClub = async (name: string) => {
    const slug = slugify(name)
    const cached = clubIds.get(slug)

    if (cached) {
      return cached
    }

    clubOrder += 1
    const doc = await upsertTaxonomy(payload, 'clubs', {
      name,
      slug,
      sortOrder: clubOrder,
    })
    const id = typeof doc.id === 'number' ? doc.id : Number(doc.id)
    clubIds.set(slug, id)
    return id
  }

  const eligibleCountryId = await upsertCountry('United Kingdom')

  for (const [index, record] of records.entries()) {
    const nationalityId = await upsertCountry(record.nationality)
    const roleId = await upsertRole(record.role)
    const teams = (record.majorTeams || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
    const teamIds = await Promise.all(teams.map((team) => upsertClub(team)))

    const media = await getOrCreateMedia(payload, record.slug, record.name)
    const mediaId = typeof media.id === 'number' ? media.id : Number(media.id)

    const playerData = {
      battingStyle: mapBattingStyle(record.battingStyle),
      biography: record.profileBio || null,
      bowlingStyle: mapBowlingStyle(record.bowlingStyle),
      currentClub: teamIds[0] ?? null,
      dateOfBirth: parseStaticDate(record.dateOfBirth),
      eligibleCountries: [eligibleCountryId],
      featured: index < 7,
      fullName: record.name,
      nationality: nationalityId,
      playerCategory: 'professional-player' as const,
      playerStatus: mapStatus(record.status),
      playingExperience: record.majorTeams || null,
      previousClubs: teamIds.length > 1 ? teamIds.slice(1) : null,
      primaryRole: roleId,
      profileImage: mediaId,
      shortIntroduction: record.profileLine || null,
      slug: record.slug,
      sortOrder: index + 1,
      status: 'published' as const,
      teamsRepresented: teamIds.length > 0 ? teamIds : null,
      ...(record.coachingQualification
        ? { achievements: [{ achievement: `Coaching qualification: ${record.coachingQualification}` }] }
        : {}),
    }

    const existing = await findBySlug(payload, 'players', record.slug)

    if (existing) {
      await payload.update({
        id: existing.id,
        collection: 'players',
        data: playerData,
        draft: false,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'players',
        data: playerData,
        draft: false,
        overrideAccess: true,
      })
    }
  }

  payload.logger.info(`Seeded ${records.length} curated players into the CMS.`)
  await payload.destroy()
}

try {
  await run()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
