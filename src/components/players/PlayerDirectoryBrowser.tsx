'use client'

import { useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from 'react'

import { PlayerCard, type PlayerCardData } from '@/components/players/PlayerCard'
import {
  buildPlayersSearch,
  hasActiveDirectoryCriteria,
  sanitizeDirectoryFilters,
  type NormalizedPlayerDirectoryFilters,
} from '@/lib/queries/playerDirectoryShared'

type SelectOption = {
  label: string
  value: string
}

type DirectoryFilterOptions = {
  availabilityOptions: SelectOption[]
  countries: Array<{ id: number | string; name: string }>
  roles: Array<{ id: number | string; name: string }>
}

type DirectoryResponse = {
  error?: string
  page: number
  players: PlayerCardData[]
  totalDocs: number
  totalPages: number
}

type DirectoryFiltersState = NormalizedPlayerDirectoryFilters

type PlayerDirectoryBrowserProps = {
  filterOptions: DirectoryFilterOptions
  initialFilters: DirectoryFiltersState
  initialPage: number
  initialPlayers: PlayerCardData[]
  initialTotalDocs: number
  initialTotalPages: number
}

const buildCountLabel = (
  totalDocs: number,
  filters: DirectoryFiltersState,
) => {
  if (hasActiveDirectoryCriteria(filters)) {
    return `${totalDocs} player${totalDocs === 1 ? '' : 's'} ${
      totalDocs === 1 ? 'matches' : 'match'
    } your criteria`
  }

  return `${totalDocs}+ players and growing`
}

export function PlayerDirectoryBrowser({
  filterOptions,
  initialFilters,
  initialPage,
  initialPlayers,
  initialTotalDocs,
  initialTotalPages,
}: PlayerDirectoryBrowserProps) {
  const [filters, setFilters] = useState(initialFilters)
  const [players, setPlayers] = useState(initialPlayers)
  const [page, setPage] = useState(initialPage)
  const [totalDocs, setTotalDocs] = useState(initialTotalDocs)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [, startTransition] = useTransition()
  const initialRequestRef = useRef(
    buildPlayersSearch({
      ...initialFilters,
      page: initialPage,
    }),
  )
  const deferredQuery = useDeferredValue(filters.query)

  const requestFilters = useMemo(
    () =>
      sanitizeDirectoryFilters({
        ...filters,
        page,
        query: deferredQuery,
      }),
    [deferredQuery, filters, page],
  )

  const requestSearch = useMemo(() => buildPlayersSearch(requestFilters), [requestFilters])

  useEffect(() => {
    if (requestSearch === initialRequestRef.current) {
      const nextUrl = requestSearch ? `/players?${requestSearch}` : '/players'
      window.history.replaceState(null, '', nextUrl)
      return
    }

    const controller = new AbortController()
    const nextUrl = requestSearch ? `/players?${requestSearch}` : '/players'

    setIsLoading(true)
    setError(null)

    void fetch(`/api/players/directory${requestSearch ? `?${requestSearch}` : ''}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as DirectoryResponse

        if (!response.ok) {
          throw new Error(payload.error || 'Service not available at the moment. Please try again shortly.')
        }

        startTransition(() => {
          setPlayers(payload.players)
          setPage(payload.page)
          setTotalDocs(payload.totalDocs)
          setTotalPages(payload.totalPages)
          window.history.replaceState(null, '', nextUrl)
        })
      })
      .catch((fetchError: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Service not available at the moment. Please try again shortly.',
        )
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [requestSearch, startTransition])

  const countLabel = buildCountLabel(totalDocs, requestFilters)

  const updateFilter = (name: keyof DirectoryFiltersState, value: string) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
    setPage(1)
  }

  const clearFilters = () => {
    setFilters(
      sanitizeDirectoryFilters({
        sort: 'featured',
      }),
    )
    setPage(1)
    setError(null)
  }

  return (
    <>
      <div className="border-b border-hairline pb-6">
        <p className="type-accent font-medium uppercase text-accent">Published directory</p>
        <h2 className="type-h3 mt-3 text-foreground">Player scouting directory</h2>
        <p className="type-body mt-3 max-w-3xl text-muted">
          Review published Pro-Crick player profiles in one place and build a shortlist
          with role, nationality, and availability filters.
        </p>
      </div>

      <div className="mt-8">
        <div className="border border-hairline bg-surface p-6">
          <div>
            <label className="type-accent font-medium uppercase text-muted" htmlFor="query">
              Search
            </label>
            <input
              id="query"
              name="query"
              value={filters.query}
              onChange={(event) => updateFilter('query', event.target.value)}
              placeholder="Name, summary, or profile keyword"
              className="mt-2 min-h-12 w-full border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/65 focus:border-accent"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto] xl:items-end">
            <SelectField
              id="role"
              label="Playing role"
              value={filters.role}
              onChange={(value) => updateFilter('role', value)}
              options={filterOptions.roles.map((role) => ({
                label: role.name,
                value: String(role.id),
              }))}
            />

            <SelectField
              id="nationality"
              label="Nationality"
              value={filters.nationality}
              onChange={(value) => updateFilter('nationality', value)}
              options={filterOptions.countries.map((country) => ({
                label: country.name,
                value: String(country.id),
              }))}
            />

            <SelectField
              id="eligibleCountry"
              label="Eligible country"
              value={filters.eligibleCountry}
              onChange={(value) => updateFilter('eligibleCountry', value)}
              options={filterOptions.countries.map((country) => ({
                label: country.name,
                value: String(country.id),
              }))}
            />

            <SelectField
              id="availability"
              label="Availability"
              value={filters.availability}
              onChange={(value) => updateFilter('availability', value)}
              options={filterOptions.availabilityOptions}
            />

            <SelectField
              id="sort"
              label="Sort"
              value={filters.sort}
              onChange={(value) => updateFilter('sort', value)}
              options={[
                { label: 'Featured first', value: 'featured' },
                { label: 'Alphabetical', value: 'alphabetical' },
                { label: 'Recently updated', value: 'recent' },
              ]}
            />

            <div className="flex min-h-12 items-end gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-12 items-center justify-center border border-hairline bg-white px-6 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-surface"
              >
                Clear filters
              </button>
            </div>
          </div>

          <div className="mt-5 border-t border-hairline pt-5">
            <p className="text-[clamp(1.25rem,1.15rem+0.4vw,1.5rem)] font-medium text-foreground">
              {countLabel}
            </p>
          </div>

          {isLoading ? (
            <div className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-hairline border-t-accent" />
              <span>Updating player directory...</span>
            </div>
          ) : null}

          {error ? <p className="type-small mt-4 text-accent">{error}</p> : null}
        </div>

        <div className="relative mt-8">
          {players.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {players.map((player) => (
                <PlayerCard key={player.slug} player={player} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-hairline bg-surface p-10">
              <h3 className="type-h5 text-foreground">No players match these filters.</h3>
              <p className="type-body mt-3 max-w-2xl text-muted">
                Try broadening the role, nationality, or availability selection, or
                clear the keyword search to view more published profiles.
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="pointer-events-none absolute inset-0 bg-white/55" aria-hidden="true" />
          ) : null}

          {totalPages > 1 ? (
            <nav className="mt-10 flex flex-wrap gap-3" aria-label="Player directory pagination">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((nextPage) => {
                return (
                  <button
                    key={nextPage}
                    type="button"
                    aria-current={nextPage === page ? 'page' : undefined}
                    onClick={() => setPage(nextPage)}
                    className={
                      nextPage === page
                        ? 'inline-flex min-h-11 min-w-11 items-center justify-center bg-accent px-4 text-sm font-medium !text-white'
                        : 'inline-flex min-h-11 min-w-11 items-center justify-center border border-hairline px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/25 hover:bg-surface'
                    }
                  >
                    <span className="sr-only">Go to </span>
                    {nextPage}
                  </button>
                )
              })}
            </nav>
          ) : null}
        </div>
      </div>
    </>
  )
}

function SelectField({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string
  label: string
  onChange: (value: string) => void
  options: SelectOption[]
  value: string
}) {
  return (
    <div>
      <label className="type-accent font-medium uppercase text-muted" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={`${id}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
