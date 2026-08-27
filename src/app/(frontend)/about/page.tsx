import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { PageHero } from '@/components/marketing/PageHero'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

const VALUES = [
  'Trust',
  'Transparency',
  'Partnership',
  'Professionalism',
  'Passion for Cricket',
  'Flexibility',
]

const PLAYER_BENEFITS = [
  {
    title: 'Access to relevant club opportunities',
    description:
      'Players are introduced to clubs where the role, standard, and environment are a better match for their game rather than being pushed toward unsuitable short-term moves.',
  },
  {
    title: 'Guidance through every stage',
    description:
      'From first discussion to active conversations with clubs, Pro-Crick helps players understand expectations, present themselves clearly, and stay prepared for each next step.',
  },
  {
    title: 'A trusted bridge between both sides',
    description:
      'Communication stays more direct and more credible when a player has a structured representative helping both sides stay aligned on timing, fit, and intent.',
  },
  {
    title: 'Long-term development focus',
    description:
      'The aim is not just placement. The focus is on finding cricket environments where a player can perform, grow, and build stronger opportunities over time.',
  },
]

const CLUB_BENEFITS = [
  {
    title: 'Access to a stronger player network',
    description:
      'Clubs gain access to a broader pool of players with different roles, backgrounds, and experience levels, making recruitment more targeted and less reactive.',
  },
  {
    title: 'Shortlisting with cricket context',
    description:
      'Recommendations are shaped by cricket understanding, not just surface-level stats, so clubs can evaluate players with better context around role fit and readiness.',
  },
  {
    title: 'A clearer recruitment process',
    description:
      'Pro-Crick helps reduce friction in outreach, conversations, and decision-making so clubs can move with more confidence and less wasted time.',
  },
  {
    title: 'Partnerships built for fit and reliability',
    description:
      'The objective is to support stronger long-term club-player matches, where expectations are clearer and both sides can build a productive cricket relationship.',
  },
]

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'About Pro-Crick',
  path: '/about',
  summary:
    'Learn about Pro-Crick, the founders behind the platform, and the Sri Lanka-to-UK cricket talent mission.',
})

export default function AboutPage() {
  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="About the agency"
          title="Built to connect cricket talent with the right clubs."
          titleClassName="font-[600]"
          tone="dark"
          backgroundImage="/player_data/akila-samarasinghe.png"
          description="Pro-Crick was created to bridge talented cricketers and serious clubs through transparent, long-term partnerships. Our starting focus is Sri Lankan talent and UK club opportunities, with the ambition to grow into a global cricket network."
          actions={[
            { href: '/players', label: 'Browse players' },
            { href: '/contact', label: 'Contact Pro-Crick', variant: 'secondary' },
          ]}
          aside={
            <div className="grid gap-px overflow-hidden border border-white/16 bg-white/12 backdrop-blur-sm">
              {[
                ['Initial focus', 'Sri Lanka to UK club opportunities'],
                ['Built for', 'Players, clubs, and cricket communities'],
                ['Approach', 'Professional, transparent, flexible'],
              ].map(([label, value]) => (
                <div key={label} className="bg-white/8 p-6">
                  <p className="type-accent font-medium uppercase text-white/58">{label}</p>
                  <p className="type-h5 mt-3 text-white">{value}</p>
                </div>
              ))}
            </div>
          }
        />

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/pro-crick-PNG.png"
                alt="Pro-Crick logo"
                width={720}
                height={405}
                className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px] lg:max-w-[360px]"
              />
            </div>
            <div className="grid gap-6">
              <p className="type-accent font-medium uppercase text-accent">Agency background</p>
              <h2 className="type-h2 mt-4 text-foreground">Where Cricket Connects is a business model, not just a line.</h2>
              <p className="type-body text-muted">
                Founded by cricket enthusiasts with deep understanding of the game, Pro-Crick
                has been shaped through years of research, discussion, and observation around
                what clubs and players actually need from modern cricket recruitment.
              </p>
              <p className="type-body text-muted">
                We focus first on talented Sri Lankan cricketers seeking the right UK club
                environment, while keeping the platform broad enough to support future
                international expansion and long-term cricket partnerships.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="type-accent font-medium uppercase text-accent">Founders</p>
              <h2 className="type-h2 mt-4 text-foreground">Two different lenses. One shared cricket standard.</h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <FounderCard
                email="connect@pro-crick.com"
                facebook="https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr"
                name="Dilan Perera"
                image="/images/1_founder.jpg"
                linkedin="https://www.linkedin.com/company/pro-crick-where-cricket-connects/"
                role="Commercial and partnership lead"
                summary="Dilan brings experience across sport, event management, coaching, athlete development, business, and marketing. His strength is turning cricket knowledge into productive partnerships and positive player experiences."
                quote="Great opportunities happen when the right talent meets the right platform."
              />
              <FounderCard
                email="connect@pro-crick.com"
                facebook="https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr"
                name="Nisala Tharaka"
                image="/images/2_founder.jpg"
                linkedin="https://www.linkedin.com/company/pro-crick-where-cricket-connects/"
                role="Cricket strategy and player pathway lead"
                summary="Nisala brings high-level domestic and overseas cricket experience, including Sri Lanka A representation. He contributes the serious cricket eye behind player evaluation, discipline, and role fit."
                quote="Where cricket knowledge meets opportunity."
              />
            </div>
          </div>
        </section>

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-3">
            <InfoPanel
              eyebrow="Vision"
              title="A trusted global cricket talent network."
              description="We want talented players to access the right opportunities, and clubs to access the right players, through partnerships built on trust, fairness, and shared success."
            />
            <InfoPanel
              eyebrow="Mission"
              title="Create successful cricket partnerships."
              description="Our mission is to connect talented players with suitable clubs through a professional, transparent, and flexible process that respects the needs of both sides."
            />
            <InfoPanel
              eyebrow="Foundation"
              title="Years of research behind the launch."
              description="Pro-Crick is new as a public agency, but its foundation comes from years of involvement in cricket environments, player pathways, club requirements, and international opportunity research."
            />
          </div>
        </section>

        <section className="bg-panel px-5 py-24 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <BenefitSection
              eyebrow="For players"
              title="Support built around ambition, fit, and visibility."
              description="Pro-Crick is designed to give players more than exposure. The process is built to help them find the right cricket environment, communicate professionally, and move toward opportunities with better clarity."
              items={PLAYER_BENEFITS}
            />
          </div>
        </section>

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <BenefitSection
              eyebrow="For clubs"
              title="A cleaner route to committed, suitable talent."
              description="Clubs need more than a list of names. Pro-Crick aims to make recruitment clearer by combining player access with practical cricket understanding and a more reliable communication process."
              items={CLUB_BENEFITS}
              light
            />
          </div>
        </section>

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="max-w-3xl">
              <p className="type-accent font-medium uppercase text-accent">Values and promise</p>
              <h2 className="type-h2 mt-4 text-foreground">We do not just connect. We stay accountable.</h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {VALUES.map((value) => (
                <div key={value} className="border border-hairline bg-surface p-6">
                  <p className="type-h5 text-foreground">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 border border-hairline bg-white p-8 lg:p-10">
              <p className="type-lead max-w-4xl text-foreground">
                Our promise is simple: connect talent with opportunity and build partnerships
                where cricket thrives.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function FounderCard({
  email,
  facebook,
  image,
  linkedin,
  name,
  quote,
  role,
  summary,
}: {
  email: string
  facebook: string
  image: string
  linkedin: string
  name: string
  quote: string
  role: string
  summary: string
}) {
  return (
    <article className="overflow-hidden border border-hairline bg-white">
      <div className="relative aspect-[1.02] bg-muted/10">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-7 lg:p-8">
        <h3 className="text-[clamp(1rem,1.55vw,1.75rem)] font-medium leading-[1.08] text-foreground">
          {name}
        </h3>
        <p className="type-accent mt-3 font-medium uppercase text-accent">{role}</p>
        <p className="type-body mt-5 text-muted">{summary}</p>
        <div className="mt-5 flex items-center gap-3">
          <SocialLink href={`mailto:${email}`} label={`Email ${name}`}>
            <EmailIcon />
          </SocialLink>
          <SocialLink href={linkedin} label={`${name} on LinkedIn`}>
            <LinkedinIcon />
          </SocialLink>
          <SocialLink href={facebook} label={`${name} on Facebook`}>
            <FacebookIcon />
          </SocialLink>
        </div>
        <p className="type-small mt-8 border-t border-hairline pt-5 font-medium uppercase tracking-[0.14em] text-foreground/72">
          {quote}
        </p>
      </div>
    </article>
  )
}

function SocialLink({
  children,
  href,
  label,
}: {
  children: ReactNode
  href: string
  label: string
}) {
  const external = !href.startsWith('mailto:')

  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:border-foreground/24 hover:bg-surface hover:text-accent"
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.02c0 1.1.9 2 2.02 2a2.01 2.01 0 1 0 .03-4.02ZM20.8 12.85c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.72c.04.76 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.39 1.9-1.39 1.34 0 1.88 1.02 1.88 2.53V20H20.8v-7.15Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7h2.35l.35-2.73H13.5V9.54c0-.8.22-1.34 1.37-1.34h1.46V5.74c-.25-.03-1.11-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v2.03H8.36V14h2.37v7h2.77Z" />
    </svg>
  )
}

function InfoPanel({
  description,
  eyebrow,
  title,
}: {
  description: string
  eyebrow: string
  title: string
}) {
  return (
    <article className="border border-hairline bg-surface p-7">
      <p className="type-accent font-medium uppercase text-accent">{eyebrow}</p>
      <h3 className="type-h4 mt-4 text-foreground">{title}</h3>
      <p className="type-body mt-4 text-muted">{description}</p>
    </article>
  )
}

function BenefitSection({
  description,
  eyebrow,
  items,
  light = false,
  title,
}: {
  description: string
  eyebrow: string
  items: Array<{ title: string; description: string }>
  light?: boolean
  title: string
}) {
  return (
    <div>
      <div className="max-w-3xl">
        <p className={`type-accent font-medium uppercase ${light ? 'text-accent' : 'text-white/48'}`}>
          {eyebrow}
        </p>
        <h2 className={`type-h2 mt-4 ${light ? 'text-foreground' : 'text-white'}`}>{title}</h2>
        <p className={`type-body mt-6 max-w-2xl ${light ? 'text-muted' : 'text-white/72'}`}>
          {description}
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className={`border p-7 ${
              light
                ? 'border-hairline bg-surface'
                : 'border-white/14 bg-white/6 backdrop-blur-sm'
            }`}
          >
            <h3 className={`type-h5 ${light ? 'text-foreground' : 'text-white'}`}>{item.title}</h3>
            <p className={`type-body mt-4 ${light ? 'text-muted' : 'text-white/72'}`}>
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
