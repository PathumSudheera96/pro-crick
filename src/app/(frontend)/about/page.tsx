import type { Metadata } from 'next'

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
  'Access to cricket clubs and opportunities in the UK and beyond',
  'Professional guidance throughout the process',
  'A trusted connection between player and club',
  'Support in finding the right environment to develop',
  'Transparent communication throughout every stage',
  'Opportunities to showcase talent internationally',
]

const CLUB_BENEFITS = [
  'Access to a wider network of quality cricketers',
  'Players from different experience levels and backgrounds',
  'A streamlined connection process',
  'Understanding of club requirements and culture',
  'Reliable communication and professional support',
  'Partnerships built for long-term success',
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
          description="Pro-Crick was created to bridge talented cricketers and serious clubs through transparent, long-term partnerships. Our starting focus is Sri Lankan talent and UK club opportunities, with the ambition to grow into a global cricket network."
          actions={[
            { href: '/players', label: 'Browse players' },
            { href: '/contact', label: 'Contact Pro-Crick', variant: 'secondary' },
          ]}
          aside={
            <div className="grid gap-px overflow-hidden border border-hairline bg-hairline">
              {[
                ['Initial focus', 'Sri Lanka to UK club opportunities'],
                ['Built for', 'Players, clubs, and cricket communities'],
                ['Approach', 'Professional, transparent, flexible'],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-6">
                  <p className="type-accent font-medium uppercase text-muted">{label}</p>
                  <p className="type-h5 mt-3 text-foreground">{value}</p>
                </div>
              ))}
            </div>
          }
        />

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="type-accent font-medium uppercase text-accent">Agency background</p>
              <h2 className="type-h3 mt-4 text-foreground">Where Cricket Connects is a business model, not just a line.</h2>
            </div>
            <div className="grid gap-6">
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
          <div className="mx-auto max-w-[90rem]">
            <div className="max-w-3xl">
              <p className="type-accent font-medium uppercase text-accent">Founders</p>
              <h2 className="type-h2 mt-4 text-foreground">Two different lenses. One shared cricket standard.</h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <FounderCard
                name="Dilan Perera"
                role="Commercial and partnership lead"
                summary="Dilan brings experience across sport, event management, coaching, athlete development, business, and marketing. His strength is turning cricket knowledge into productive partnerships and positive player experiences."
                quote="Great opportunities happen when the right talent meets the right platform."
              />
              <FounderCard
                name="Nisala Tharaka"
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
          <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-2">
            <BenefitList
              eyebrow="For players"
              title="Support built around ambition, fit, and visibility."
              items={PLAYER_BENEFITS}
            />
            <BenefitList
              eyebrow="For clubs"
              title="A cleaner route to committed, suitable talent."
              items={CLUB_BENEFITS}
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
  name,
  quote,
  role,
  summary,
}: {
  name: string
  quote: string
  role: string
  summary: string
}) {
  return (
    <article className="border border-hairline bg-white p-7 lg:p-8">
      <p className="type-accent font-medium uppercase text-accent">{role}</p>
      <h3 className="type-h3 mt-4 text-foreground">{name}</h3>
      <p className="type-body mt-5 text-muted">{summary}</p>
      <p className="type-small mt-8 border-t border-hairline pt-5 font-medium uppercase tracking-[0.14em] text-foreground/72">
        {quote}
      </p>
    </article>
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

function BenefitList({
  eyebrow,
  items,
  title,
}: {
  eyebrow: string
  items: string[]
  title: string
}) {
  return (
    <div>
      <p className="type-accent font-medium uppercase text-white/48">{eyebrow}</p>
      <h2 className="type-h3 mt-4 max-w-xl text-white">{title}</h2>
      <ul className="mt-8 grid gap-3">
        {items.map((item) => (
          <li key={item} className="type-body flex gap-3 text-white/72">
            <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
