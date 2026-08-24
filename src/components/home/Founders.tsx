const FOUNDERS = [
  {
    name: 'Dilan Perera',
    role: 'Commercial and partnership lead',
    summary:
      'Brings experience across sport, coaching, athlete development, business, and marketing, with a people-first approach to talent opportunity.',
  },
  {
    name: 'Nisala Tharaka',
    role: 'Cricket strategy and player pathway lead',
    summary:
      'Brings senior domestic and overseas cricket experience, adding the serious cricket perspective behind player evaluation and opportunity fit.',
  },
]

export function Founders() {
  return (
    <section data-gsap-section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[90rem]">
        <div className="max-w-3xl">
          <p data-gsap-item className="type-accent font-medium uppercase text-accent">
            Founders
          </p>
          <h2 data-gsap-item data-gsap-title className="type-h2 mt-4 text-foreground">
            The agency is grounded in both cricket knowledge and partnership discipline.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <article key={founder.name} data-gsap-item className="border border-hairline bg-white p-7 lg:p-8">
              <p className="type-accent font-medium uppercase text-accent">{founder.role}</p>
              <h3 className="type-h3 mt-4 text-foreground">{founder.name}</h3>
              <p className="type-body mt-5 text-muted">{founder.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
