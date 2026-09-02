import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { News } from '@/payload-types'

type NewsSeed = {
  title: string
  slug: string
  excerpt: string
  imagePath: string
  imageName: string
  paragraphs: string[]
}

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicImagesDir = path.resolve(dirname, '../public/images')

const seeds: NewsSeed[] = [
  {
    title: 'Pro-Crick opens the player directory to UK club scouting',
    slug: 'player-directory-opens-uk-scouting',
    excerpt:
      'Clubs can now review structured player profiles built around role, readiness, availability, and environment fit, with a direct route to a serious enquiry.',
    imagePath: path.join(publicImagesDir, 'WhatsApp Image 2026-08-31 at 05.50.04.jpeg'),
    imageName: 'news-player-directory.jpg',
    paragraphs: [
      'Pro-Crick has opened its structured player directory to UK clubs looking for committed, suitable cricket talent. Every published profile presents a player around role, readiness, availability, and the kind of club environment where they can actually perform.',
      'The directory is designed to move conversations beyond a single line of statistics. Clubs can review a player\u2019s cricket background, current availability, and pathway in one place, then take the next step through a direct, structured enquiry.',
      'For players, the directory creates a clearer route to visibility with serious clubs \u2014 without losing the context that makes an introduction credible. Pro-Crick continues to focus on transparent, long-term partnerships rather than short-term transactions.',
    ],
  },
  {
    title: 'Player applications reopen for the new season',
    slug: 'player-applications-reopen',
    excerpt:
      'Cricketers looking for the right overseas club environment can register a profile and be matched through a transparent, role-first process.',
    imagePath: path.join(publicImagesDir, 'WhatsApp Image 2026-08-31 at 05.44.25.jpeg'),
    imageName: 'news-player-applications.jpg',
    paragraphs: [
      'Cricketers preparing for the next chapter of their journey can now apply to join the Pro-Crick network for the upcoming season. The application covers playing role, experience, statistics, and the type of club environment each player is looking for.',
      'Every application is reviewed with cricket context in mind. The goal is to understand the player behind the numbers \u2014 strengths, pathway, and the level at which they can genuinely contribute \u2014 before any introduction is made.',
      'Approved players are added to the directory and considered for suitable UK club opportunities as they arise. The process stays transparent at every stage, with clear communication on what happens next.',
    ],
  },
  {
    title: 'Transparency becomes the standard for player\u2013club introductions',
    slug: 'transparency-standard-introductions',
    excerpt:
      'Pro-Crick continues to build partnerships around clear communication and long-term fit rather than quick, one-sided transactions.',
    imagePath: path.join(publicImagesDir, 'WhatsApp Image 2026-08-31 at 05.50.03.jpeg'),
    imageName: 'news-transparency-standard.jpg',
    paragraphs: [
      'Clear communication is the foundation of every Pro-Crick introduction. Players know what is being shared and with whom, while clubs receive profiles and context that help them shortlist with confidence.',
      'The standard applies on both sides of the relationship. Availability windows, eligibility notes, and realistic expectations are presented up front, so time is not wasted on conversations that cannot move forward.',
      'Pro-Crick was built on the belief that the right introduction can become a lasting cricket partnership. Keeping the process transparent is how that trust is earned \u2014 one conversation at a time.',
    ],
  },
]

const lexicalTextNode = (text: string) => ({
  type: 'text',
  version: 1,
  text,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
})

const lexicalParagraph = (text: string) => ({
  type: 'paragraph',
  version: 1,
  direction: null,
  format: '',
  indent: 0,
  textFormat: 0,
  children: [lexicalTextNode(text)],
})

const buildLexicalContent = (paragraphs: string[]): News['content'] => ({
  root: {
    type: 'root',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: paragraphs.map(lexicalParagraph),
  },
})

const getMediaByFilename = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
) => {
  const result = await payload.find({
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

  return result.docs[0] ?? null
}

const upsertNewsImage = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  seed: NewsSeed,
) => {
  const existing = await getMediaByFilename(payload, seed.imageName)

  if (existing) {
    return existing
  }

  const data = await readFile(seed.imagePath)

  return payload.create({
    collection: 'media',
    data: {
      alt: seed.title,
    },
    overrideAccess: true,
    file: {
      data,
      mimetype: 'image/jpeg',
      name: seed.imageName,
      size: data.byteLength,
    },
  })
}

const findNewsBySlug = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
) => {
  const result = await payload.find({
    collection: 'news',
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

const run = async () => {
  const payload = await getPayload({ config })

  for (const seed of seeds) {
    const image = await upsertNewsImage(payload, seed)
    const data = {
      content: buildLexicalContent(seed.paragraphs),
      excerpt: seed.excerpt,
      featuredImage: image?.id ?? null,
      status: 'published' as const,
      slug: seed.slug,
      title: seed.title,
    }
    const existing = await findNewsBySlug(payload, seed.slug)

    if (existing) {
      await payload.update({
        id: existing.id,
        collection: 'news',
        data,
        draft: false,
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'news',
        data,
        draft: false,
        overrideAccess: true,
      })
    }
  }

  payload.logger.info('Sample news seeded successfully.')
  await payload.destroy()
}

try {
  await run()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
