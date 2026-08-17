import Link from 'next/link'

export type FeaturedPlayer = {
  slug: string
  name: string
  role: string
  nationality: string
}

// TODO: replace with a real query against the Players collection once it exists.
const FEATURED_PLAYERS: FeaturedPlayer[] = []

export function FeaturedPlayers() {
  if (FEATURED_PLAYERS.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Featured Players
        </h2>
        <Link href="/players" className="text-sm font-semibold text-accent hover:underline">
          View all players
        </Link>
      </div>

      <ul className="mt-12 grid gap-8 sm:grid-cols-3">
        {FEATURED_PLAYERS.map((player) => (
          <li key={player.slug}>
            <Link href={`/players/${player.slug}`} className="group block">
              <div className="aspect-[3/4] bg-surface" />
              <p className="mt-4 font-display text-lg font-medium group-hover:text-accent">
                {player.name}
              </p>
              <p className="text-sm text-muted">
                {player.role} &middot; {player.nationality}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
