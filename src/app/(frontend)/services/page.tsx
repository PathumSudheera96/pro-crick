import type { Metadata } from 'next'
import Image from 'next/image'

import { PageHero } from '@/components/marketing/PageHero'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

const PLAYER_SERVICES = [
  {
    title: 'Cricket Talent Representation',
    points: [
      'Professional representation for cricketers seeking club opportunities in the UK and overseas',
      'Guidance throughout the player journey from introduction to placement',
      'Helping players showcase their skills, experience and cricketing profile',
    ],
  },
  {
    title: 'Club Placement & Opportunity Matching',
    points: [
      'Connecting players with suitable cricket clubs based on ability, goals and playing experience',
      'Identifying opportunities that match each player\'s ambitions and career pathway',
      'Creating the right player-club partnerships for long-term success',
    ],
  },
  {
    title: 'Player Profile Development',
    points: [
      'Supporting players in creating professional cricket profiles',
      'Highlighting playing experience, achievements and strengths',
      'Presenting players professionally to clubs and cricket organisations',
    ],
  },
  {
    title: 'Career Guidance & Support',
    points: [
      'Providing advice on overseas cricket pathways',
      'Helping players understand club expectations and opportunities',
      'Supporting players through communication and decision-making processes',
    ],
  },
  {
    title: 'International Cricket Opportunities',
    points: [
      'Access to cricket opportunities across the UK and beyond',
      'Connecting talented players with international cricket networks',
      'Helping players take the next step in their cricket journey',
    ],
  },
]

const CLUB_SERVICES = [
  {
    title: 'Player Recruitment Services',
    points: [
      'Connecting clubs with talented and committed cricketers',
      'Access to a growing network of players from different cricket backgrounds',
      'Helping clubs identify players who fit their team requirements',
    ],
  },
  {
    title: 'Talent Identification & Matching',
    points: [
      'Understanding club needs, playing standards and team culture',
      'Recommending players who align with club expectations',
      'Creating stronger connections between clubs and players',
    ],
  },
  {
    title: 'Overseas Player Support',
    points: [
      'Assisting clubs looking to recruit international players',
      'Providing insight into player backgrounds, experience and capabilities',
      'Supporting smoother communication between clubs and overseas talent',
    ],
  },
  {
    title: 'Partnership & Relationship Management',
    points: [
      'Building professional relationships between clubs and players',
      'Supporting communication throughout the connection process',
      'Creating partnerships focused on long-term success',
    ],
  },
  {
    title: 'Cricket Network Development',
    points: [
      'Helping clubs expand their international cricket connections',
      'Providing access to emerging and experienced talent',
      'Supporting the growth of cricket communities worldwide',
    ],
  },
]

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'Services',
  path: '/services',
  summary:
    'Explore Pro-Crick services for players and clubs, including cricket talent representation, club placement, recruitment support, and international cricket opportunities.',
})

export default function ServicesPage() {
  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="Services"
          title="Connecting cricket talent with the right opportunities."
          description="Pro-Crick supports both sides of the cricket pathway: players looking for the right club environment and clubs looking for committed, suitable talent. Our services are built around representation, matching, profile development, and long-term cricket relationships."
          tone="dark"
          titleClassName="font-[600]"
          backgroundImage="/images/WhatsApp Image 2026-08-31 at 05.50.03.jpeg"
          actions={[
            { href: '/contact', label: 'Talk to Pro-Crick' },
            { href: '/players', label: 'View player directory', variant: 'secondary' },
          ]}
        />

        <AudienceServices
          accent="For players"
          title="Connecting talent with opportunities."
          description="For players, Pro-Crick provides professional support that helps cricket talent become easier to understand, evaluate, and connect with the right clubs."
          image="/images/WhatsApp Image 2026-08-31 at 05.50.04.jpeg"
          imageAlt="Cricketer celebrating during a match"
          services={PLAYER_SERVICES}
          variant="centered"
        />

        <section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
            <div className="relative min-h-[22rem] overflow-hidden border border-black/10 bg-black/8 sm:min-h-[28rem] lg:min-h-full">
              <Image
                src="/images/WhatsApp Image 2026-08-31 at 05.50.04.jpeg"
                alt="Cricketer celebrating during a match"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="type-accent font-medium uppercase text-accent">How players benefit</p>
              <h2 className="type-h3 mt-4 text-foreground">A clearer pathway from profile to placement.</h2>
              <p className="type-body mt-5 max-w-2xl text-muted">
                The player journey is strongest when ability, ambition, availability, and club
                expectations are presented together. Pro-Crick helps turn that information into a
                professional pathway.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {['Representation', 'Profile development', 'Opportunity matching'].map((item) => (
                  <div
                    key={item}
                    className="border border-accent/25 bg-white px-5 py-4 transition-colors duration-200 hover:border-accent/45 hover:bg-background"
                  >
                    <p className="text-base font-medium leading-tight text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AudienceServices
          accent="For clubs"
          title="Finding the right cricket talent."
          description="For clubs, Pro-Crick creates a more focused recruitment route by understanding team needs, player suitability, and the quality of the long-term partnership."
          image="/images/WhatsApp Image 2026-08-31 at 05.50.03.jpeg"
          imageAlt="Cricketer bowling during a match"
          imageSide="right"
          services={CLUB_SERVICES}
          variant="centeredNoNumbers"
        />

        <section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="bg-white p-8 lg:p-10">
              <p className="type-accent font-medium uppercase text-accent">Our service standard</p>
              <h2 className="type-h3 mt-4 text-foreground">Professional support for both sides of the cricket relationship.</h2>
              <p className="type-body mt-5 max-w-3xl text-muted">
                Every player and every club has a different need. Pro-Crick keeps the process
                practical by combining cricket knowledge, clear communication, and structured
                matching so introductions can become lasting partnerships.
              </p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden border border-black/10 bg-black/8 lg:min-h-[520px]">
              <Image
                src="/images/WhatsApp Image 2026-08-31 at 05.44.25.jpeg"
                alt="Cricket team celebrating together"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function AudienceServices({
  accent,
  description,
  image,
  imageAlt,
  imageSide = 'left',
  services,
  title,
  variant = 'withImage',
}: {
  accent: string
  description: string
  image: string
  imageAlt: string
  imageSide?: 'left' | 'right'
  services: Array<{
    title: string
    points: string[]
  }>
  title: string
  variant?: 'withImage' | 'centered' | 'centeredNoNumbers'
}) {
  const imagePosition = imageSide === 'right' ? 'object-right' : 'object-center'
  const imageOrder = imageSide === 'right' ? 'lg:order-2' : ''

  if (variant === 'centered' || variant === 'centeredNoNumbers') {
    const hideNumbers = variant === 'centeredNoNumbers'

    return (
      <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[90rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="type-accent font-medium uppercase text-accent">{accent}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,8vw,3.5rem)] font-medium leading-[1.02] text-foreground sm:text-[clamp(2rem,3.4vw,3.5rem)]">
              {title}
            </h2>
            <p className="type-body mx-auto mt-6 max-w-3xl text-muted">{description}</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[76rem] gap-5 lg:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                isWide={services.length % 2 === 1 && index === services.length - 1}
                number={String(index + 1).padStart(2, '0')}
                points={service.points}
                title={service.title}
                prominentNumber={!hideNumbers}
                showNumber={!hideNumbers}
                variant={hideNumbers ? 'outlined' : 'default'}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className={`relative min-h-[24rem] overflow-hidden border border-black/10 bg-black/8 lg:min-h-[38rem] ${imageOrder}`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className={`object-cover ${imagePosition}`}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-white/10" />
        </div>

        <div className="flex flex-col">
          <div className="max-w-3xl">
            <p className="type-accent font-medium uppercase text-accent">{accent}</p>
            <h2 className="type-h3 mt-4 text-foreground">{title}</h2>
            <p className="type-body mt-6 max-w-2xl text-muted">{description}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                isWide={services.length % 2 === 1 && index === services.length - 1}
                number={String(index + 1).padStart(2, '0')}
                points={service.points}
                title={service.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  isWide = false,
  number,
  points,
  prominentNumber = false,
  showNumber = true,
  title,
  variant = 'default',
}: {
  isWide?: boolean
  number: string
  points: string[]
  prominentNumber?: boolean
  showNumber?: boolean
  title: string
  variant?: 'default' | 'outlined'
}) {
  return (
    <article
      className={`h-full border p-6 text-foreground transition-colors duration-200 lg:p-8 ${
        variant === 'outlined'
          ? 'border-accent/25 bg-white hover:border-accent/45 hover:bg-background'
          : 'border-hairline bg-surface hover:border-foreground/20 hover:bg-[#eef0f3]'
      } ${
        isWide ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`grid h-full gap-4 ${showNumber ? (prominentNumber ? 'sm:grid-cols-[5rem_1fr]' : 'sm:grid-cols-[3.25rem_1fr]') : ''}`}>
        {showNumber ? (
          <span
            className={
              prominentNumber
                ? 'text-[clamp(2.125rem,4vw,3.875rem)] font-semibold leading-none text-accent'
                : 'type-h5 font-medium text-accent'
            }
          >
            {number}
          </span>
        ) : null}
        <div>
          <h3 className="text-[clamp(1.125rem,1rem+0.65vw,1.625rem)] font-medium leading-[1.12] text-foreground">
            {title}
          </h3>
          <ul className="mt-5 grid gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-muted">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <CheckIcon />
                </span>
                <span className="type-body">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
    >
      <path d="m5 12 4.2 4.2L19 6.5" />
    </svg>
  )
}
