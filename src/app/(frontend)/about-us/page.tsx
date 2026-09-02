import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { RegistrationSplitCta } from '@/components/home/RegistrationSplitCta'
import { PageHero } from '@/components/marketing/PageHero'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

const VALUES = [
  {
    title: 'Trust',
    description:
      'Players and clubs should feel confident that conversations, expectations, and introductions are handled with care.',
  },
  {
    title: 'Transparency',
    description:
      'We aim to keep decisions, opportunities, and communication clear so neither side is left guessing.',
  },
  {
    title: 'Partnership',
    description:
      'The goal is not a quick transaction. It is to help both sides move toward the right long-term fit.',
  },
  {
    title: 'Professionalism',
    description:
      'Every profile, discussion, and recommendation should reflect a serious standard worthy of the game.',
  },
  {
    title: 'Passion for Cricket',
    description:
      'Cricket understanding sits at the centre of the agency, shaping how players are assessed and presented.',
  },
  {
    title: 'Flexibility',
    description:
      'Different players and clubs need different solutions, so the process stays practical rather than rigid.',
  },
]

const PLAYER_BENEFITS = [
  {
    title: 'Access to relevant club opportunities',
  },
  {
    title: 'Guidance through every stage',
  },
  {
    title: 'A trusted bridge between both sides',
  },
  {
    title: 'Long-term development focus',
  },
]

const CLUB_BENEFITS = [
  {
    title: 'Access to a stronger player network',
  },
  {
    title: 'Shortlisting with cricket context',
  },
  {
    title: 'A clearer recruitment process',
  },
  {
    title: 'Partnerships built for fit and reliability',
  },
]

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'About Pro-Crick',
  path: '/about-us',
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
          backgroundImage="/images/players/akila-samarasinghe.png"
          description="Pro-Crick was created to bridge talented cricketers and serious clubs through transparent, long-term partnerships. Our starting focus is Sri Lankan talent and UK club opportunities, with the ambition to grow into a global cricket network."
          actions={[
            { href: '/players', label: 'Browse players' },
            { href: '/contact-us', label: 'Contact Pro-Crick', variant: 'secondary' },
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
                image="/images/dilan-perera.jpg"
                linkedin="https://www.linkedin.com/company/pro-crick-where-cricket-connects/"
                role="Commercial and partnership lead"
                summary="Dilan brings experience across sport, event management, coaching, athlete development, business, and marketing. His strength is turning cricket knowledge into productive partnerships and positive player experiences."
                quote="Great opportunities happen when the right talent meets the right platform."
              />
              <FounderCard
                email="connect@pro-crick.com"
                facebook="https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr"
                name="Nisala Tharaka"
                image="/images/nisala-tharaka.jpg"
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

        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#e24a4f_0%,#bf2732_42%,#7f111b_100%)] px-5 py-24 text-white sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 left-1/2 right-0 hidden lg:block">
            <Image
              src="https://images.pexels.com/photos/29463867/pexels-photo-29463867/free-photo-of-cricket-batsman-playing-powerful-shot-on-field.jpeg?auto=compress&cs=tinysrgb&w=1800"
              alt="Cricket player batting during a match"
              fill
              unoptimized
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex items-center lg:pr-10">
              <BenefitSection
                eyebrow="For players"
                title="Support built around ambition, fit, and visibility."
                description={
                  <>
                    <p>
                      Pro-Crick is built to help players move beyond generic exposure, with clearer
                      presentation, stronger club alignment, and a process that supports better
                      decisions around timing, fit, and opportunity for growth.
                    </p>
                  </>
                }
              items={PLAYER_BENEFITS}
              ctaClassName="!text-[#bf2732] hover:!text-[#bf2732]"
            />
          </div>
            <div className="hidden min-h-[560px] lg:block" />
          </div>
        </section>

        <section className="relative overflow-hidden bg-panel px-5 py-24 text-white sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 left-0 right-1/2 hidden lg:block">
            <Image
              src="/images/players/jarrod-mckay.png"
              alt="Cricket player ready during a match"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-2 lg:items-center">
            <div className="hidden min-h-[560px] lg:block" />
            <div className="flex items-center justify-end lg:pl-10">
              <BenefitSection
                eyebrow="For clubs"
                title="A cleaner route to committed, suitable talent."
                description={
                  <>
                    <p>
                      Pro-Crick helps clubs move beyond scattered outreach by combining stronger
                      player access, practical cricket context, and clearer communication through a
                      recruitment process built for faster, better-informed decisions.
                    </p>
                  </>
                }
                items={CLUB_BENEFITS}
              />
            </div>
          </div>
        </section>

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="max-w-5xl">
              <p className="type-accent font-medium uppercase text-accent">Values and promise</p>
              <h2 className="type-h2 mt-4 text-foreground">
                The standard behind every introduction, conversation, and placement.
              </h2>
              <p className="type-body mt-6 max-w-2xl text-muted">
                Pro-Crick is built around a few simple principles that shape how we represent players,
                support clubs, and protect the quality of every cricket partnership we help create.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {VALUES.map((value) => (
                <div key={value.title} className="border border-hairline bg-surface p-6 lg:p-7">
                  <p className="type-h5 text-foreground">{value.title}</p>
                  <p className="type-body mt-4 text-muted">{value.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline lg:grid-cols-[1.1fr_0.9fr]">
              <div className="bg-white p-8 lg:p-10">
                <p className="type-accent font-medium uppercase text-accent">Our promise</p>
                <h3 className="type-h3 mt-4 text-foreground">
                  We do not just make introductions. We stay responsible for the quality of the match.
                </h3>
                <p className="type-body mt-5 max-w-3xl text-muted">
                  That means presenting players with proper context, helping clubs shortlist with more
                  confidence, and treating every opportunity as the start of a relationship rather than
                  the end of a process.
                </p>
              </div>
              <div className="bg-surface p-8 lg:p-10">
                <p className="type-small font-medium uppercase tracking-[0.14em] text-foreground/56">
                  What that means in practice
                </p>
                <div className="mt-6 grid gap-5">
                  {[
                    'Clearer player presentation',
                    'More credible club conversations',
                    'Better alignment around fit and timing',
                    'Longer-term cricket partnerships',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-foreground">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <CheckIcon />
                      </span>
                      <p className="text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <RegistrationSplitCta />
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
      <p className="text-[clamp(1rem,0.92rem+0.4vw,1.125rem)] font-medium uppercase tracking-[0.12em] text-accent">
        {eyebrow}
      </p>
      <h3 className="type-h4 mt-4 text-foreground">{title}</h3>
      <p className="type-body mt-4 text-muted">{description}</p>
    </article>
  )
}

function BenefitSection({
  ctaClassName,
  description,
  eyebrow,
  items,
  light = false,
  title,
}: {
  ctaClassName?: string
  description: ReactNode
  eyebrow: string
  items: Array<{ title: string; description?: string }>
  light?: boolean
  title: string
}) {
  const titleOnlyItems = items.every((item) => !item.description)

  return (
    <div className="relative z-10">
      <div className="max-w-3xl">
        <h3
          className={`text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] font-medium ${
            light ? 'text-accent' : 'text-white'
          }`}
        >
          {eyebrow}
        </h3>
        <h2 className={`type-h2 mt-5 ${light ? 'text-foreground' : 'text-white'}`}>{title}</h2>
        {titleOnlyItems ? (
          <h4 className={`type-h5 mt-10 ${light ? 'text-foreground' : 'text-white'}`}>
            What you will get:
          </h4>
        ) : null}
        <div className={`${titleOnlyItems ? 'mt-5 grid gap-x-4 gap-y-7 md:grid-cols-2' : 'mt-10 grid gap-5 md:grid-cols-2'}`}>
          {items.map((item) => (
            <div
              key={item.title}
              className={
                titleOnlyItems
                  ? `flex items-start gap-3 ${
                      light ? 'text-foreground' : 'text-white'
                    }`
                  : `border p-7 ${
                      light
                        ? 'border-hairline bg-surface'
                        : 'border-white/14 bg-white/6 backdrop-blur-sm'
                    }`
              }
            >
              {titleOnlyItems ? (
                <>
                  <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    light ? 'bg-accent text-white' : 'bg-white text-[#bf2732]'
                  }`}>
                    <CheckIcon />
                  </span>
                  <p className={`text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] font-medium ${
                    light ? 'text-foreground' : 'text-white'
                  }`}>
                    {item.title}
                  </p>
                </>
              ) : (
                <>
                  <h3 className={`type-h5 ${light ? 'text-foreground' : 'text-white'}`}>{item.title}</h3>
                  <p className={`type-body mt-4 ${light ? 'text-muted' : 'text-white/72'}`}>
                    {item.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <div className={`type-body mt-6 max-w-2xl ${light ? 'text-muted' : 'text-white/72'}`}>
          {description}
        </div>
        {!light ? (
          <div className="mt-8">
            <Link
              href="/apply"
              className={`inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-white/90 ${ctaClassName ?? '!text-[#111111] hover:!text-[#111111]'}`}
            >
              Register as a Player
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4.2 4.2L19 6.5" />
    </svg>
  )
}
