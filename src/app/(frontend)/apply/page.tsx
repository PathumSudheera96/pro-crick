import type { Metadata } from 'next'

import { PageHero } from '@/components/marketing/PageHero'
import { PlayerApplicationForm } from '@/components/site/PlayerApplicationForm'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { getPlayerApplicationFormOptions } from '@/lib/queries/players'
import { buildSeoMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'Apply',
  path: '/apply',
  summary:
    'Submit a player application to Pro-Crick with your cricket background, profile details, and supporting media.',
})

export const dynamic = 'force-dynamic'

export default async function ApplyPage() {
  const options = await getPlayerApplicationFormOptions()

  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="Player application"
          title="Present your cricket profile with the right structure from the start."
          description="Use this form to share your playing role, background, profile summary, and supporting material. Pro-Crick will review the application before deciding the next step."
          actions={[
            { href: '/players', label: 'Browse players' },
            { href: '/contact', label: 'Contact Pro-Crick', variant: 'secondary' },
          ]}
          aside={
            <div className="grid gap-px overflow-hidden border border-hairline bg-hairline">
              {[
                ['Format', 'Three-step submission flow'],
                ['Uploads', 'Profile photo and PDF CV supported'],
                ['Review', 'Applications enter the CMS for assessment'],
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
          <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-6">
              <div className="border border-hairline bg-surface p-6">
                <p className="type-accent font-medium uppercase text-accent">What to prepare</p>
                <ul className="mt-4 grid gap-3">
                  {[
                    'A short cricket biography and role summary',
                    'Teams played for and notable experience',
                    'Key statistics you want clubs to review',
                    'Optional links, profile photo, and PDF CV',
                  ].map((item) => (
                    <li key={item} className="type-small flex gap-3 text-muted">
                      <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-hairline bg-surface p-6">
                <p className="type-accent font-medium uppercase text-accent">What happens next</p>
                <p className="type-body mt-4 text-muted">
                  Pro-Crick reviews each submission before it is considered for representation,
                  introductions, or future player database inclusion. Submission does not mean
                  automatic publication.
                </p>
              </div>
            </div>

            <div className="border border-hairline bg-surface p-7 sm:p-9">
              <div className="max-w-2xl">
                <p className="type-accent font-medium uppercase text-accent">Application form</p>
                <h2 className="type-h3 mt-4 text-foreground">
                  Build a profile that clubs can review with more clarity.
                </h2>
                <p className="type-body mt-4 text-muted">
                  Keep the details practical. The strongest applications explain playing role,
                  experience level, current environment, and what sort of opportunity you are
                  aiming toward next.
                </p>
              </div>

              <div className="mt-8">
                <PlayerApplicationForm
                  clubs={options.clubs}
                  countries={options.countries}
                  roles={options.roles}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
