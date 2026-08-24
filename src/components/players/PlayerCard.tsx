import Image from 'next/image'
import Link from 'next/link'

export type PlayerCardData = {
  club?: string | null
  imageUrl?: string | null
  introduction?: string | null
  nationality: string
  role: string
  slug: string
  status: string
  title: string
}

export function PlayerCard({ player }: { player: PlayerCardData }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-hairline bg-white transition-colors duration-200 hover:border-foreground/18 hover:bg-surface">
      <div className="relative aspect-[0.9] overflow-hidden bg-muted/10">
        {player.imageUrl ? (
          <Image
            src={player.imageUrl}
            alt={player.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm uppercase tracking-[0.14em] text-muted">
            Profile image coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="type-accent inline-flex items-center bg-accent-soft px-3 py-1 font-medium uppercase text-accent">
            {player.status}
          </span>
          <span className="type-accent font-medium uppercase text-muted">{player.nationality}</span>
        </div>

        <h2 className="type-h5 mt-5 text-foreground">{player.title}</h2>
        <p className="type-small mt-2 font-medium uppercase tracking-[0.12em] text-foreground/78">
          {player.role}
        </p>

        <p className="type-small mt-4 text-muted">
          {player.introduction || 'Professional player summary coming soon.'}
        </p>

        {player.club ? (
          <p className="type-small mt-5 text-foreground">
            <span className="font-medium">Current club:</span> {player.club}
          </p>
        ) : null}

        <Link
          href={`/players/${player.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent"
        >
          View profile
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
