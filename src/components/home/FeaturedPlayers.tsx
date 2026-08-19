import Image from 'next/image'
import Link from 'next/link'

export type FeaturedPlayer = {
  slug: string
  name: string
  role: string
  nationality: string
  imageUrl: string
  profileLine: string
}

const FEATURED_PLAYERS: FeaturedPlayer[] = [
  {
    slug: 'dominic-shaw',
    name: 'Dominic Shaw',
    role: 'Top-order batter',
    nationality: 'England',
    imageUrl:
      'https://images.pexels.com/photos/18084233/pexels-photo-18084233.jpeg?auto=compress&cs=tinysrgb&w=900',
    profileLine: 'Composed shot-maker built for long-format structure and white-ball tempo.',
  },
  {
    slug: 'isaac-rehman',
    name: 'Isaac Rehman',
    role: 'Seam bowling all-rounder',
    nationality: 'South Africa',
    imageUrl:
      'https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg?auto=compress&cs=tinysrgb&w=900',
    profileLine: 'Athletic seam option with lower-order hitting and adaptable overseas fit.',
  },
  {
    slug: 'james-kapoor',
    name: 'James Kapoor',
    role: 'Wicketkeeper batter',
    nationality: 'India',
    imageUrl:
      'https://images.pexels.com/photos/30497236/pexels-photo-30497236.jpeg?auto=compress&cs=tinysrgb&w=900',
    profileLine: 'Explosive middle-order keeper profile prepared for short-format opportunity.',
  },
]

export function FeaturedPlayers() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-10">
      <div className="grid gap-5 lg:grid-cols-[0.62fr_1fr] lg:items-end">
        <h2 className="type-h2 text-foreground">
          Featured player presentation built for club decisions.
        </h2>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <p className="type-body max-w-2xl text-muted">
            These are placeholder profiles for layout and tone. The final directory will
            pull structured data from Payload once the player collection is in place.
          </p>
          <Link
            href="/players"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            Full Directory
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <ul className="mt-14 grid gap-8 lg:grid-cols-3">
        {FEATURED_PLAYERS.map((player) => (
          <li key={player.slug}>
            <Link
              href={`/players/${player.slug}`}
              className="group block overflow-hidden border border-hairline bg-white transition-colors duration-200 hover:border-foreground/20 hover:bg-surface"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={player.imageUrl}
                  alt={player.name}
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="type-accent uppercase text-white/48">
                    {player.nationality}
                  </p>
                  <p className="type-h4 mt-3">
                    {player.name}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="type-accent font-semibold uppercase text-accent">
                    {player.role}
                  </p>
                  <ArrowIcon />
                </div>
                <p className="type-small text-muted">{player.profileLine}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.25 8.5h10.5M9.5 4.25l4.25 4.25-4.25 4.25" />
    </svg>
  )
}
