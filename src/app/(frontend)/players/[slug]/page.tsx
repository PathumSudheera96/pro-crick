import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RegistrationSplitCta } from '@/components/home/RegistrationSplitCta'
import { PlayerCard } from '@/components/players/PlayerCard'
import { PlayerProfileTabs } from '@/components/players/PlayerProfileTabs'
import { ChatOpenButton } from '@/components/site/ChatOpenButton'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { mapPlayerToProfileViewModel } from '@/lib/players/playerProfile'
import { getStaticPlayerImageUrl } from '@/lib/players/staticPlayers'
import { getSiteSettings } from '@/lib/queries/content'
import { getPublishedPlayerBySlug, getRelatedPublishedPlayers } from '@/lib/queries/players'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import type { Club, Country, Media, Player, PlayingRole } from '@/payload-types'

type PlayerPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params
  const [player, siteSettings] = await Promise.all([
    getPublishedPlayerBySlug(slug),
    getSiteSettings().catch(() => null),
  ])

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
    contentTitle: player.fullName,
    path: `/players/${player.slug}`,
    seo: player.seo,
    siteSettings,
    summary: player.shortIntroduction || player.biography,
  })
}

export default async function PlayerProfilePage({ params }: PlayerPageProps) {
  const { slug } = await params
  const player = await getPublishedPlayerBySlug(slug)

  if (!player) {
    notFound()
  }

  const profile = mapPlayerToProfileViewModel(player)
  const relatedPlayers = (await getRelatedPublishedPlayers(player, 4)).map(mapPlayerToCardData)
  const overviewItems = [
    ['Status', profile.status],
    ['Age', profile.age],
    ['Date of Birth', profile.dateOfBirth],
    ['Country', profile.nationality],
    ['Position', profile.currentRole],
    ['Availability', player.availabilityDate ? profile.status : 'Available on request'],
  ]
  const cricketProfileItems = [
    ['Batting Style', formatBattingStyle(player.battingStyle)],
    ['Bowling Style', formatBowlingStyle(player.bowlingStyle)],
    ['Current Club', getNamedRelationship(player.currentClub) || 'Available on request'],
    ['Player Status', formatPlayerStatus(player.playerStatus)],
    ['Eligible Countries', getRelationshipNames(player.eligibleCountries).join(', ') || 'Available on request'],
  ]
  const highlights = player.careerHighlights?.map((item) => item.highlight).filter(Boolean) || []
  const achievements = player.achievements?.map((item) => item.achievement).filter(Boolean) || []
  const mediaLinks = [
    ...(player.playerCv && typeof player.playerCv === 'object' && player.playerCv.url
      ? [{ label: 'Download player CV', url: player.playerCv.url }]
      : []),
    ...(player.youtubeVideos?.map((item) => ({ label: 'YouTube profile', url: item.url })) || []),
    ...(player.vimeoVideos?.map((item) => ({ label: 'Vimeo profile', url: item.url })) || []),
    ...(player.instagramUrl ? [{ label: 'Instagram profile', url: player.instagramUrl }] : []),
    ...(player.espnCricinfoUrl ? [{ label: 'ESPN Cricinfo profile', url: player.espnCricinfoUrl }] : []),
    ...(player.cricbuzzUrl ? [{ label: 'Cricbuzz profile', url: player.cricbuzzUrl }] : []),
  ].filter((item) => item.url)
  const statistics = player.statisticsByFormat?.filter((stat) => stat.format) || []
  const gallery = (player.gallery || []).filter(
    (item): item is Media & { url: string } =>
      Boolean(item) && typeof item === 'object' && 'url' in item && typeof item.url === 'string',
  )
  const tabData = {
    overview: {
      details: overviewItems.map(([label, value]) => ({ label, value })),
      majorTeams: profile.majorTeams,
    },
    cricketProfile: {
      details: cricketProfileItems.map(([label, value]) => ({ label, value })),
      notes: [player.playingExperience || '', profile.profileLine].filter(Boolean),
    },
    biography: {
      achievements,
      content: profile.biography,
      highlights,
    },
    statistics: {
      formats: statistics.map((stat) => ({
        format: formatCricketFormat(stat.format),
        values: [
          { label: 'Matches', value: stat.matches },
          { label: 'Runs', value: stat.runs },
          { label: 'Bat Avg', value: stat.battingAverage },
          { label: 'Highest', value: stat.highestScore },
          { label: '100s', value: stat.hundreds },
          { label: '50s', value: stat.fifties },
          { label: 'Wickets', value: stat.wickets },
          { label: 'Bowl Avg', value: stat.bowlingAverage },
          { label: 'Best Bowl', value: stat.bestBowling },
          { label: 'Economy', value: stat.economyRate },
        ]
          .filter((item) => item.value !== null && item.value !== undefined && item.value !== '')
          .map((item) => ({ label: item.label, value: String(item.value) })),
      })),
    },
    media: {
      gallery: gallery.map((image) => ({
        alt: image.alt || profile.name,
        id: String(image.id),
        url: image.url,
      })),
      links: mediaLinks,
    },
  }
  const howItWorksSteps = [
    {
      description:
        'We review player role, readiness, availability, and the club environment that best matches the profile.',
      title: 'Profile review and positioning',
    },
    {
      description:
        'Clubs receive a clear summary with the practical cricket context needed for faster shortlisting.',
      title: 'Shortlist presentation',
    },
    {
      description:
        'Once interest is confirmed, we help coordinate the next conversation around role fit, timing, and expectations.',
      title: 'Club-player introductions',
    },
    {
      description:
        'The process stays structured through follow-up, helping both sides move toward the right long-term opportunity.',
      title: 'Decision and next steps',
    },
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

              <h1 data-gsap-item data-gsap-title className="mt-8 text-[clamp(2.25rem,5vw,4.875rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground">
                {profile.name}
              </h1>

              <dl data-gsap-item className="mt-10 grid gap-5 text-foreground sm:grid-cols-2">
                <div>
                  <dt className="type-accent font-medium uppercase text-muted">Position</dt>
                  <dd className="type-h5 mt-2 font-medium">{profile.currentRole}</dd>
                </div>
                <div>
                  <dt className="type-accent font-medium uppercase text-muted">Country</dt>
                  <dd className="type-h5 mt-2 font-medium">{profile.nationality}</dd>
                </div>
              </dl>

              <p data-gsap-item className="type-lead mt-8 max-w-xl text-muted">{profile.profileLine}</p>

              <ChatOpenButton
                data-gsap-item
                className="mt-12 inline-flex min-h-14 items-center justify-center bg-accent px-8 text-sm font-medium uppercase tracking-[0.12em] !text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Inquire This Player
              </ChatOpenButton>

              {player.playerCv && typeof player.playerCv === 'object' && player.playerCv.url ? (
                <a
                  data-gsap-item
                  href={player.playerCv.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent"
                >
                  Download player CV
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>

            <div data-gsap-item className="relative mx-auto w-full max-w-[32rem] lg:mr-0">
              <div className="relative overflow-hidden bg-white">
                {profile.imageUrl ? (
                  <Image
                    src={profile.imageUrl}
                    alt={profile.name}
                    width={1200}
                    height={1200}
                    priority
                    loading="eager"
                    className="aspect-square w-full object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 32rem"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-muted/10 px-6 text-center text-sm uppercase tracking-[0.12em] text-muted">
                    Player image coming soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <PlayerProfileTabs data={tabData} />

        <section data-gsap-section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="max-w-3xl">
              <p data-gsap-item className="type-accent font-medium uppercase text-accent">
                How it works
              </p>
              <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 text-foreground">
                A clear four-step route from profile review to the right cricket conversation.
              </h2>
              <p data-gsap-item className="type-body mt-4 text-muted">
                Pro-Crick keeps the process structured for both players and clubs, with role
                clarity, practical shortlisting, and guided introductions.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {howItWorksSteps.map((step, index) => (
                <article
                  key={step.title}
                  data-gsap-item
                  className="border border-hairline bg-white p-7"
                >
                  <div className="flex h-16 w-16 items-center justify-center bg-accent text-white">
                    <span className="text-xl font-medium">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="type-h4 mt-7 text-foreground">{step.title}</h3>
                  <p className="type-body mt-4 text-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {relatedPlayers.length > 0 ? (
          <section data-gsap-section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[90rem]">
              <div className="max-w-3xl border-b border-hairline pb-6">
                <p data-gsap-item className="type-accent font-medium uppercase text-accent">
                  Related players
                </p>
                <h2 data-gsap-item data-gsap-title className="type-h3 mt-3 text-foreground">
                  More profiles with comparable role or nationality context.
                </h2>
                <p data-gsap-item className="type-body mt-4 text-muted">
                  Useful for clubs building a shortlist around similar role fit, availability,
                  or player background.
                </p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {relatedPlayers.map((relatedPlayer) => (
                  <PlayerCard key={relatedPlayer.slug} player={relatedPlayer} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <RegistrationSplitCta />
      </main>
      <Footer />
    </>
  )
}

function mapPlayerToCardData(player: Player) {
  return {
    club: getNamedRelationship(player.currentClub),
    imageUrl: getStaticPlayerImageUrl(player.slug) || getMediaUrl(player.profileImage),
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

function getRelationshipNames(values: (number | Club | Country | PlayingRole)[] | null | undefined) {
  if (!values) {
    return []
  }

  return values.map((value) => getNamedRelationship(value)).filter((value): value is string => Boolean(value))
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

function formatBattingStyle(value: string | null | undefined) {
  switch (value) {
    case 'left-hand-bat':
      return 'Left-hand bat'
    case 'right-hand-bat':
      return 'Right-hand bat'
    default:
      return 'Available on request'
  }
}

function formatBowlingStyle(value: string | null | undefined) {
  switch (value) {
    case 'right-arm-fast':
      return 'Right-arm fast'
    case 'right-arm-medium':
      return 'Right-arm medium'
    case 'right-arm-off-break':
      return 'Right-arm off break'
    case 'right-arm-leg-break':
      return 'Right-arm leg break'
    case 'left-arm-fast':
      return 'Left-arm fast'
    case 'left-arm-medium':
      return 'Left-arm medium'
    case 'left-arm-orthodox':
      return 'Left-arm orthodox'
    case 'left-arm-wrist-spin':
      return 'Left-arm wrist spin'
    default:
      return 'Available on request'
  }
}

function formatCricketFormat(format: string) {
  switch (format) {
    case 'list-a':
      return 'List A'
    case 'first-class':
      return 'First-class'
    default:
      return format.toUpperCase()
  }
}
