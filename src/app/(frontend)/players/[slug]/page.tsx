import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactEnquiryForm } from '@/components/site/ContactEnquiryForm'
import { ChatOpenButton } from '@/components/site/ChatOpenButton'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { mapPlayerToProfileViewModel } from '@/lib/players/playerProfile'
import { getSiteSettings } from '@/lib/queries/content'
import { getPublishedPlayerBySlug } from '@/lib/queries/players'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import type { Media } from '@/payload-types'

type PlayerPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params
  const [player, siteSettings] = await Promise.all([getPublishedPlayerBySlug(slug), getSiteSettings()])

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

  const detailItems = [
    ['Status', profile.status],
    ['Age', profile.age],
    ['Date of Birth', profile.dateOfBirth],
    ['Batting Style', formatBattingStyle(player.battingStyle)],
    ['Bowling Style', formatBowlingStyle(player.bowlingStyle)],
    ['Availability', player.availabilityDate ? profile.status : 'Available on request'],
  ]
  const highlights = player.careerHighlights?.map((item) => item.highlight).filter(Boolean) || []
  const achievements = player.achievements?.map((item) => item.achievement).filter(Boolean) || []
  const videos = [
    ...(player.youtubeVideos?.map((item) => ({ label: 'YouTube', url: item.url })) || []),
    ...(player.vimeoVideos?.map((item) => ({ label: 'Vimeo', url: item.url })) || []),
  ]
  const statistics = player.statisticsByFormat?.filter((stat) => stat.format) || []
  const gallery = (player.gallery || []).filter(
    (item): item is Media => Boolean(item) && typeof item === 'object' && 'url' in item,
  )

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
                  <p className="type-body mt-3 text-foreground">{profile.majorTeams}</p>
                </div>
                <div data-gsap-item>
                  <p className="type-accent font-medium uppercase text-muted">Biography</p>
                  <p className="type-body mt-3 text-muted">{profile.biography}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {statistics.length > 0 ? (
          <section data-gsap-section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[90rem]">
              <p data-gsap-item className="type-accent font-medium uppercase text-accent">
                Playing record
              </p>
              <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 text-foreground">
                Structured format-by-format statistics.
              </h2>

              <div className="mt-10 grid gap-5 xl:grid-cols-2">
                {statistics.map((stat) => (
                  <article key={stat.id || stat.format} data-gsap-item className="border border-hairline bg-white p-6">
                    <p className="type-accent font-medium uppercase text-accent">
                      {formatCricketFormat(stat.format)}
                    </p>
                    <div className="mt-5 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        ['Matches', stat.matches],
                        ['Runs', stat.runs],
                        ['Bat Avg', stat.battingAverage],
                        ['Highest', stat.highestScore],
                        ['100s', stat.hundreds],
                        ['50s', stat.fifties],
                        ['Wickets', stat.wickets],
                        ['Bowl Avg', stat.bowlingAverage],
                        ['Best Bowl', stat.bestBowling],
                        ['Economy', stat.economyRate],
                      ]
                        .filter(([, value]) => value !== null && value !== undefined && value !== '')
                        .map(([label, value]) => (
                          <div key={`${stat.format}-${label}`} className="bg-white p-4">
                            <p className="type-accent font-medium uppercase text-muted">{label}</p>
                            <p className="type-body mt-2 font-medium text-foreground">{String(value)}</p>
                          </div>
                        ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {highlights.length > 0 || achievements.length > 0 ? (
          <section data-gsap-section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-2">
              {highlights.length > 0 ? (
                <div data-gsap-item className="border border-hairline bg-surface p-7">
                  <p className="type-accent font-medium uppercase text-accent">Career highlights</p>
                  <ul className="mt-5 grid gap-3">
                    {highlights.map((item) => (
                      <li key={item} className="type-body flex gap-3 text-muted">
                        <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {achievements.length > 0 ? (
                <div data-gsap-item className="border border-hairline bg-surface p-7">
                  <p className="type-accent font-medium uppercase text-accent">Achievements</p>
                  <ul className="mt-5 grid gap-3">
                    {achievements.map((item) => (
                      <li key={item} className="type-body flex gap-3 text-muted">
                        <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {videos.length > 0 || gallery.length > 0 ? (
          <section data-gsap-section className="bg-panel px-5 py-24 text-white sm:px-8 lg:px-10">
            <div className="mx-auto max-w-[90rem]">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p data-gsap-item className="type-accent font-medium uppercase text-white/48">
                    Media and profile links
                  </p>
                  <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 text-white">
                    Extra material for club review and due diligence.
                  </h2>
                </div>

                <div className="grid gap-5">
                  {videos.length > 0 ? (
                    <div data-gsap-item className="border border-white/12 bg-black/20 p-6">
                      <p className="type-accent font-medium uppercase text-white/48">Video links</p>
                      <ul className="mt-5 grid gap-3">
                        {videos.map((video) => (
                          <li key={video.url}>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noreferrer"
                              className="type-body inline-flex items-center gap-2 text-white/74 transition-colors hover:text-white"
                            >
                              {video.label} profile
                              <span aria-hidden="true">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {gallery.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {gallery.map((image) => (
                        <div key={image.id} data-gsap-item className="overflow-hidden border border-white/12 bg-black/20">
                          {image.url ? (
                            <Image
                              src={image.url}
                              alt={image.alt || profile.name}
                              width={1200}
                              height={900}
                              className="aspect-[1.1] w-full object-cover"
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section data-gsap-section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p data-gsap-item className="type-accent font-medium uppercase text-accent">
                Player enquiry
              </p>
              <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 text-foreground">
                Ask about availability, role fit, or next-stage discussions.
              </h2>
              <p data-gsap-item className="type-body mt-4 max-w-lg text-muted">
                Reference this player directly and include the timing, format, or club context
                you are recruiting for. The enquiry will be routed into the Pro-Crick CMS.
              </p>
            </div>

            <div data-gsap-item className="border border-hairline bg-white p-7 sm:p-9">
              <ContactEnquiryForm playerSlug={player.slug} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
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
