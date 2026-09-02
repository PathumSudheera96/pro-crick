import type { Metadata } from 'next'

import { PageHero } from '@/components/marketing/PageHero'
import { PlayerDirectoryBrowser } from '@/components/players/PlayerDirectoryBrowser'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { mapPlayerToCardData } from '@/lib/players/playerCards'
import {
  getPlayerDirectoryFilterOptions,
  getPublishedPlayers,
  parseDirectoryFilters,
} from '@/lib/queries/players'
import { buildSeoMetadata } from '@/lib/seo/metadata'

type PlayersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'Player Directory',
  path: '/players',
  summary:
    'Browse the Pro-Crick player directory by role, nationality, availability, and opportunity fit.',
})

export const dynamic = 'force-dynamic'

export default async function PlayersPage({ searchParams }: PlayersPageProps) {
  const params = await searchParams
  const filters = parseDirectoryFilters(params)

  const [results, filterOptions] = await Promise.all([
    getPublishedPlayers(filters),
    getPlayerDirectoryFilterOptions(),
  ])

  const players = results.docs.map(mapPlayerToCardData)

  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="Player directory"
          title="Search players with role clarity, availability, and real scouting context."
          description="This directory is built for clubs, recruiters, and serious cricket conversations. Filter the published player pool by role, nationality, availability, and eligible country to build a faster shortlist."
          actions={[
            { href: '/contact-us', label: 'Start a club enquiry' },
            { href: '/apply', label: 'Apply as a player', variant: 'secondary' },
          ]}
        />

        <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <PlayerDirectoryBrowser
              filterOptions={filterOptions}
              initialFilters={filters}
              initialPage={results.page ?? 1}
              initialPlayers={players}
              initialTotalDocs={results.totalDocs}
              initialTotalPages={results.totalPages}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
