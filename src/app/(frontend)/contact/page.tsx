import type { Metadata } from 'next'

import { PageHero } from '@/components/marketing/PageHero'
import { ContactEnquiryForm } from '@/components/site/ContactEnquiryForm'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'Contact',
  path: '/contact',
  summary:
    'Contact Pro-Crick for player enquiries, club recruitment discussions, and partnership conversations.',
})

export default function ContactPage() {
  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="Contact Pro-Crick"
          title="Start the conversation with the right cricket brief."
          description="If you are a club looking for talent or a stakeholder exploring a cricket partnership, send the practical details. We will route the enquiry with structure and respond with the right next step."
        />

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-6">
              <div className="border border-hairline bg-surface p-6">
                <p className="type-accent font-medium uppercase text-accent">Email</p>
                <p className="type-h5 mt-3 text-foreground">connect@pro-crick.com</p>
              </div>
              <div className="border border-hairline bg-surface p-6">
                <p className="type-accent font-medium uppercase text-accent">Typical use cases</p>
                <ul className="mt-4 grid gap-3">
                  {[
                    'Club recruitment enquiries',
                    'Player-specific scouting requests',
                    'Representation and partnership discussions',
                    'Overseas opportunity conversations',
                  ].map((item) => (
                    <li key={item} className="type-small flex gap-3 text-muted">
                      <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-hairline bg-surface p-7 sm:p-9">
              <div className="max-w-2xl">
                <p className="type-accent font-medium uppercase text-accent">Enquiry form</p>
                <h2 className="type-h3 mt-4 text-foreground">Tell us what you need and who it is for.</h2>
                <p className="type-body mt-4 text-muted">
                  Include the role, timing, club context, and whether you are asking about a
                  specific player. That gives us enough to route the enquiry properly.
                </p>
              </div>

              <div className="mt-8">
                <ContactEnquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
