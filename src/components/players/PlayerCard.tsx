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
    <Link
      href={`/players/${player.slug}`}
      className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-colors duration-200 hover:bg-surface"
    >
      <div className="overflow-hidden bg-muted/10">
        {player.imageUrl ? (
          <Image
            src={player.imageUrl}
            alt={player.title}
            width={900}
            height={900}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="aspect-square w-full object-cover object-top grayscale transition duration-300 group-hover:scale-[1.015] group-hover:grayscale-0"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center px-6 text-center text-sm uppercase tracking-[0.14em] text-muted">
            Profile image coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="type-accent font-semibold uppercase text-accent">{player.role}</p>
        <h2 className="mt-2 text-[clamp(1.125rem,1.9vw,1.95rem)] font-medium leading-[1.08] text-foreground">
          {player.title}
        </h2>
        <p className="type-small mt-3 text-muted">{player.nationality}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold uppercase text-accent transition-colors duration-200 group-hover:text-accent-hover">
          View Profile
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
