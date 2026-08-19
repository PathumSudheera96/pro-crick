const SERVICES = [
  {
    name: 'Representation',
    description:
      'Profiles are positioned with clarity: role, strengths, availability, and the kind of environment that makes sense for the player.',
  },
  {
    name: 'Shortlisting',
    description:
      'Clubs get a cleaner route from interest to shortlist, with enough context to move beyond a one-line stat summary.',
  },
  {
    name: 'Placement',
    description:
      'From first outreach through contract-stage conversations, Pro-Crick keeps the commercial and communication process disciplined.',
  },
]

export function Services() {
  return (
    <section data-gsap-section className="bg-[#ece5dc]">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p data-gsap-item className="type-accent uppercase text-muted">What the homepage signals</p>
            <h2 data-gsap-item data-gsap-title className="type-h2 mt-4 text-foreground">
              Not a generic roster. An agency front door.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                data-gsap-item
                key={service.name}
                className="flex min-h-[16rem] flex-col justify-between border border-black/10 bg-surface p-6 transition-colors duration-200 hover:bg-[#eef0f3]"
              >
                <dt className="type-h4 text-foreground">
                  {service.name}
                </dt>
                <dd className="type-small mt-6 text-muted">{service.description}</dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-gsap-item className="bg-panel p-7 text-white transition-colors duration-200 hover:bg-[#151515] sm:p-9">
            <p className="type-accent uppercase text-white/45">For clubs and recruiters</p>
            <h3 data-gsap-title className="type-h3 mt-4">
              Every enquiry should begin with substance, not guesswork.
            </h3>
            <p className="type-body mt-4 max-w-2xl text-white/68">
              The homepage sets that tone immediately: editorial player imagery, structured
              player summaries, and a clean path toward reviewing the full directory.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2">
            {[
              'Role clarity',
              'Eligibility notes',
              'Availability windows',
              'Cleaner enquiries',
            ].map((item) => (
              <div data-gsap-item key={item} className="bg-surface px-5 py-6 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80 transition-colors duration-200 hover:bg-[#eef0f3]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
