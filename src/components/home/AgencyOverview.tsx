import Link from 'next/link'

const FOCUS_POINTS = [
  'Sri Lankan player pathways to UK club opportunities',
  'Professional player presentation and shortlist clarity',
  'Long-term, trust-led recruitment relationships',
]

export function AgencyOverview() {
  return (
    <section data-gsap-section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p data-gsap-item className="type-accent font-medium uppercase text-accent">
            Agency overview
          </p>
          <h2 data-gsap-item data-gsap-title className="type-h2 mt-4 text-foreground">
            Pro-Crick is designed for serious cricket partnerships.
          </h2>
        </div>

        <div>
          <p data-gsap-item className="type-lead max-w-3xl text-muted">
            We connect talented cricketers and clubs through structured profiles, transparent
            communication, and a people-first process that values fit as much as exposure.
            Our launch focus is Sri Lankan talent and UK club cricket, with a long-term view
            toward a wider global network.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {FOCUS_POINTS.map((point) => (
              <div key={point} data-gsap-item className="border border-hairline bg-surface p-5">
                <p className="type-small font-medium uppercase tracking-[0.14em] text-foreground/78">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div data-gsap-item className="mt-10">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent"
            >
              Learn more about the agency
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
