import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero } from '@/components/marketing/PageHero'
import { PlayerCard } from '@/components/players/PlayerCard'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import {
  getPlayerDirectoryFilterOptions,
  getPublishedPlayers,
  sanitizeDirectoryFilters,
  type PlayerDirectoryFilters,
} from '@/lib/queries/players'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import type { Club, Country, Media, Player, PlayingRole } from '@/payload-types'

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
  const filters = sanitizeDirectoryFilters({
    availability: readSearchParam(params.availability),
    eligibleCountry: readSearchParam(params.eligibleCountry),
    nationality: readSearchParam(params.nationality),
    page: readPageParam(params.page),
    query: readSearchParam(params.query),
    role: readSearchParam(params.role),
    sort: readSortParam(params.sort),
  })

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
            { href: '/contact', label: 'Start a club enquiry' },
            { href: '/apply', label: 'Apply as a player', variant: 'secondary' },
          ]}
          aside={
            <div className="grid gap-px overflow-hidden border border-hairline bg-hairline">
              {[
                ['Published players', String(results.totalDocs)],
                ['Current page', `${results.page} of ${results.totalPages}`],
                ['Primary focus', 'Sri Lankan talent and UK club fit'],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-6">
                  <p className="type-accent font-medium uppercase text-muted">{label}</p>
                  <p className="type-h5 mt-3 text-foreground">{value}</p>
                </div>
              ))}
            </div>
          }
        />

        <section className="bg-background px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <aside className="self-start border border-hairline bg-surface p-6">
              <form action="/players" className="grid gap-5">
                <div>
                  <label className="type-accent font-medium uppercase text-muted" htmlFor="query">
                    Search
                  </label>
                  <input
                    id="query"
                    name="query"
                    defaultValue={filters.query || ''}
                    placeholder="Name, summary, or profile keyword"
                    className="mt-2 min-h-12 w-full border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/65 focus:border-accent"
                  />
                </div>

                <SelectField
                  id="role"
                  label="Playing role"
                  name="role"
                  defaultValue={filters.role || ''}
                  options={filterOptions.roles.map((role) => ({
                    label: role.name,
                    value: String(role.id),
                  }))}
                />

                <SelectField
                  id="nationality"
                  label="Nationality"
                  name="nationality"
                  defaultValue={filters.nationality || ''}
                  options={filterOptions.countries.map((country) => ({
                    label: country.name,
                    value: String(country.id),
                  }))}
                />

                <SelectField
                  id="eligibleCountry"
                  label="Eligible country"
                  name="eligibleCountry"
                  defaultValue={filters.eligibleCountry || ''}
                  options={filterOptions.countries.map((country) => ({
                    label: country.name,
                    value: String(country.id),
                  }))}
                />

                <SelectField
                  id="availability"
                  label="Availability"
                  name="availability"
                  defaultValue={filters.availability || ''}
                  options={filterOptions.availabilityOptions}
                />

                <SelectField
                  id="sort"
                  label="Sort"
                  name="sort"
                  defaultValue={filters.sort || 'featured'}
                  options={[
                    { label: 'Featured first', value: 'featured' },
                    { label: 'Alphabetical', value: 'alphabetical' },
                    { label: 'Recently updated', value: 'recent' },
                  ]}
                />

                <button className="inline-flex min-h-13 items-center justify-center bg-accent px-6 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover">
                  Apply filters
                </button>
              </form>
            </aside>

            <div>
              <div className="flex flex-col gap-3 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="type-accent font-medium uppercase text-accent">Published directory</p>
                  <h2 className="type-h3 mt-3 text-foreground">
                    {results.totalDocs} player{results.totalDocs === 1 ? '' : 's'} available to review
                  </h2>
                </div>
                <p className="type-small max-w-xl text-muted">
                  Search is server-driven, so important filter states stay linkable and
                  scalable as the player pool grows.
                </p>
              </div>

              {players.length > 0 ? (
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {players.map((player) => (
                    <PlayerCard key={player.slug} player={player} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 border border-dashed border-hairline bg-surface p-10">
                  <h3 className="type-h5 text-foreground">No players match these filters.</h3>
                  <p className="type-body mt-3 max-w-2xl text-muted">
                    Try broadening the role, nationality, or availability selection, or
                    clear the keyword search to view more published profiles.
                  </p>
                </div>
              )}

              {results.totalPages > 1 ? (
                <nav className="mt-10 flex flex-wrap gap-3" aria-label="Player directory pagination">
                  {Array.from({ length: results.totalPages }, (_, index) => index + 1).map((page) => {
                    const href = buildPlayersHref(filters, page)

                    return (
                      <Link
                        key={page}
                        href={href}
                        className={
                          page === results.page
                            ? 'inline-flex min-h-11 min-w-11 items-center justify-center bg-accent px-4 text-sm font-medium text-white'
                            : 'inline-flex min-h-11 min-w-11 items-center justify-center border border-hairline px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/25 hover:bg-surface'
                        }
                      >
                        {page}
                      </Link>
                    )
                  })}
                </nav>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function SelectField({
  defaultValue,
  id,
  label,
  name,
  options,
}: {
  defaultValue: string
  id: string
  label: string
  name: string
  options: { label: string; value: string }[]
}) {
  return (
    <div>
      <label className="type-accent font-medium uppercase text-muted" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className="mt-2 min-h-12 w-full border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={`${name}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function readPageParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function readSortParam(value: string | string[] | undefined): PlayerDirectoryFilters['sort'] {
  const raw = readSearchParam(value)
  if (raw === 'alphabetical' || raw === 'recent' || raw === 'featured') {
    return raw
  }

  return 'featured'
}

function buildPlayersHref(filters: Required<PlayerDirectoryFilters>, page: number) {
  const params = new URLSearchParams()

  if (filters.query) params.set('query', filters.query)
  if (filters.role) params.set('role', filters.role)
  if (filters.nationality) params.set('nationality', filters.nationality)
  if (filters.eligibleCountry) params.set('eligibleCountry', filters.eligibleCountry)
  if (filters.availability) params.set('availability', filters.availability)
  if (filters.sort) params.set('sort', filters.sort)
  if (page > 1) params.set('page', String(page))

  const search = params.toString()
  return search ? `/players?${search}` : '/players'
}

function mapPlayerToCardData(player: Player) {
  return {
    club: getNamedRelationship(player.currentClub),
    imageUrl: getMediaUrl(player.profileImage),
    introduction: player.shortIntroduction,
    nationality: getNamedRelationship(player.nationality) || 'Nationality on request',
    role: getNamedRelationship(player.primaryRole) || 'Cricket player',
    slug: player.slug,
    status: formatPlayerStatus(player.playerStatus),
    title: player.fullName,
  }
}

function getNamedRelationship(
  value: number | Club | Country | PlayingRole | null | undefined,
): string | null {
  if (value && typeof value === 'object' && 'name' in value && typeof value.name === 'string') {
    return value.name
  }

  return null
}

function getMediaUrl(value: number | Media | null | undefined) {
  if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
    return value.url
  }

  return null
}

function formatPlayerStatus(status: Player['playerStatus']) {
  switch (status) {
    case 'contracted':
      return 'Contracted'
    case 'unavailable':
      return 'Unavailable'
    case 'available':
    default:
      return 'Available'
  }
}
