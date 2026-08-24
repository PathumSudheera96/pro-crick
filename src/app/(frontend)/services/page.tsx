import type { Metadata } from 'next'

import { PageHero } from '@/components/marketing/PageHero'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

const SERVICE_PILLARS = [
  {
    title: 'Player representation',
    description:
      'We position players around role fit, readiness, character, and opportunity, so clubs review a serious profile instead of isolated stats.',
  },
  {
    title: 'Club shortlisting',
    description:
      'We help clubs identify players who match their level, timing, culture, and tactical need, reducing wasted outreach and unclear recruitment conversations.',
  },
  {
    title: 'Overseas opportunity support',
    description:
      'For Sri Lankan and internationally mobile players, we support the path toward the right environment in UK club cricket and future overseas opportunities.',
  },
  {
    title: 'Partnership coordination',
    description:
      'We keep communication disciplined between player, club, and agency so next steps, expectations, and timing stay clear.',
  },
]

const SERVICE_PROCESS = [
  'Understand the player or club requirement in detail',
  'Review role fit, playing context, and opportunity timing',
  'Present a shortlist or pathway with practical supporting information',
  'Coordinate introductions, enquiries, and next-stage conversations',
]

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'Services',
  path: '/services',
  summary:
    'Explore Pro-Crick services for clubs, players, recruitment support, and overseas cricket opportunities.',
})

export default function ServicesPage() {
  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="Services"
          title="Structured support for cricket recruitment, representation, and opportunity."
          description="Pro-Crick is built to serve both sides of the cricket relationship: players seeking the right platform and clubs seeking the right people. Every service is designed to keep the process clear, professional, and measurable."
          actions={[
            { href: '/contact', label: 'Talk to Pro-Crick' },
            { href: '/players', label: 'View player directory', variant: 'secondary' },
          ]}
        />

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="max-w-3xl">
              <p className="type-accent font-medium uppercase text-accent">What we do</p>
              <h2 className="type-h2 mt-4 text-foreground">Not generic marketing language. Practical cricket services.</h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {SERVICE_PILLARS.map((service) => (
                <article key={service.title} className="border border-hairline bg-surface p-7 lg:p-8">
                  <h3 className="type-h4 text-foreground">{service.title}</h3>
                  <p className="type-body mt-4 text-muted">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-panel px-5 py-24 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="type-accent font-medium uppercase text-white/48">How we work</p>
              <h2 className="type-h3 mt-4 text-white">A disciplined process for better cricket decisions.</h2>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/12 bg-white/12">
              {SERVICE_PROCESS.map((step, index) => (
                <div key={step} className="grid gap-4 bg-black/20 p-6 sm:grid-cols-[4rem_1fr]">
                  <span className="type-h4 text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <p className="type-body text-white/74">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-2">
            <div className="border border-hairline bg-white p-8">
              <p className="type-accent font-medium uppercase text-accent">For players</p>
              <h2 className="type-h3 mt-4 text-foreground">Find the right club, not just any opening.</h2>
              <p className="type-body mt-5 text-muted">
                We focus on player fit, development environment, and long-term relationship
                value rather than chasing disconnected opportunities.
              </p>
            </div>

            <div className="border border-hairline bg-white p-8">
              <p className="type-accent font-medium uppercase text-accent">For clubs</p>
              <h2 className="type-h3 mt-4 text-foreground">Review talent with better context.</h2>
              <p className="type-body mt-5 text-muted">
                Clubs need player information that supports action. We organise the profile,
                status, role, and conversation pathway so recruitment decisions can move faster.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
