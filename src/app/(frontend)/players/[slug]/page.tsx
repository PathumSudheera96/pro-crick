import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import players from '../../../../../public/player_data/players.json'
import { ChatOpenButton } from '@/components/site/ChatOpenButton'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

type Player = {
  slug: string
  name: string
  dateOfBirth: string
  age: number
  role: string
  nationality: string
  status: string
  battingStyle: string
  bowlingStyle: string
  majorTeams: string
  coachingQualification?: string
  imageUrl: string
  profileLine: string
  profileBio: string
}

type PlayerPageProps = {
  params: Promise<{
    slug: string
  }>
}

const PLAYER_DATA = players as Player[]

export function generateStaticParams() {
  return PLAYER_DATA.map((player) => ({
    slug: player.slug,
  }))
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params
  const player = getPlayer(slug)

  if (!player) {
    return {
      title: 'Player Not Found | Pro-Crick',
      robots: {
        follow: false,
        index: false,
      },
    }
  }

  return buildSeoMetadata({
    contentTitle: player.name,
    path: `/players/${player.slug}`,
    summary: player.profileLine,
  })
}

export default async function PlayerProfilePage({ params }: PlayerPageProps) {
  const { slug } = await params
  const player = getPlayer(slug)

  if (!player) {
    notFound()
  }

  const detailItems = [
    ['Status', player.status],
    ['Age', String(player.age)],
    ['Date of Birth', player.dateOfBirth],
    ['Batting Style', player.battingStyle],
    ['Bowling Style', player.bowlingStyle],
    ['Coaching', player.coachingQualification ?? 'Available on request'],
  ]

  return (
    <>
      <NavBar variant="light" />
      <main>
        <section data-gsap-section className="overflow-hidden bg-surface px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="max-w-2xl">
              <Link
                href="/players"
                data-gsap-item
                className="type-accent inline-flex items-center gap-2 font-medium uppercase text-muted transition-colors duration-200 hover:text-foreground"
              >
                <span aria-hidden="true">←</span>
                Player Directory
              </Link>

              <div data-gsap-item className="mt-12 flex items-center gap-4">
                <span className="h-px w-12 bg-foreground" />
                <p className="type-accent font-medium uppercase text-foreground">Player profile</p>
              </div>

              <h1 data-gsap-item data-gsap-title className="mt-8 text-[clamp(2.25rem,5vw,4.875rem)] font-medium leading-[0.96] tracking-[-0.06em] text-foreground">
                {player.name}
              </h1>

              <dl data-gsap-item className="mt-10 grid gap-5 text-foreground sm:grid-cols-2">
                <div>
                  <dt className="type-accent font-medium uppercase text-muted">Position</dt>
                  <dd className="type-h5 mt-2 font-medium">{player.role}</dd>
                </div>
                <div>
                  <dt className="type-accent font-medium uppercase text-muted">Country</dt>
                  <dd className="type-h5 mt-2 font-medium">{player.nationality}</dd>
                </div>
              </dl>

              <p data-gsap-item className="type-lead mt-8 max-w-xl text-muted">{player.profileLine}</p>

              <ChatOpenButton
                data-gsap-item
                className="mt-12 inline-flex min-h-14 items-center justify-center bg-accent px-8 text-sm font-medium uppercase tracking-[0.12em] !text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Inquire This Player
              </ChatOpenButton>
            </div>

            <div data-gsap-item className="relative mx-auto w-full max-w-[32rem] lg:mr-0">
              <div className="relative overflow-hidden bg-white">
                <Image
                  src={player.imageUrl}
                  alt={player.name}
                  width={1200}
                  height={1200}
                  priority
                  loading="eager"
                  className="aspect-square w-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 32rem"
                />
              </div>
            </div>
          </div>
        </section>

        <section data-gsap-section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p data-gsap-item className="type-accent font-medium uppercase text-accent">Profile summary</p>
              <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 max-w-xl text-foreground">
                Built for club review.
              </h2>
            </div>

            <div>
              <div className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
                {detailItems.map(([label, value]) => (
                  <div data-gsap-item key={label} className="bg-white p-6">
                    <p className="type-accent font-medium uppercase text-muted">{label}</p>
                    <p className="type-h5 mt-3 font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                <div data-gsap-item>
                  <p className="type-accent font-medium uppercase text-muted">Major teams</p>
                  <p className="type-body mt-3 text-foreground">{player.majorTeams}</p>
                </div>
                <div data-gsap-item>
                  <p className="type-accent font-medium uppercase text-muted">Biography</p>
                  <p className="type-body mt-3 text-muted">{player.profileBio}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function getPlayer(slug: string) {
  return PLAYER_DATA.find((player) => player.slug === slug)
}
