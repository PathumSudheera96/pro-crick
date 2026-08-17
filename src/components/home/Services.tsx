const SERVICES = [
  {
    name: 'Player Representation',
    description:
      'Ongoing representation for cricketers — profile management, opportunity sourcing, and agency support throughout a player’s career.',
  },
  {
    name: 'Club & Player Connections',
    description:
      'A structured directory that helps clubs and organizations discover players by role, availability, and eligibility.',
  },
  {
    name: 'Overseas Opportunities',
    description:
      'Support for players pursuing contracts and placements abroad, including eligibility and logistics guidance.',
  },
  {
    name: 'Placement Support',
    description:
      'End-to-end support connecting represented players with clubs, from initial enquiry through to signing.',
  },
]

export function Services() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          What we do
        </h2>

        <dl className="mt-12 divide-y divide-hairline border-t border-hairline">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="grid gap-2 py-8 sm:grid-cols-[1fr_1.6fr] sm:gap-10"
            >
              <dt className="font-display text-xl font-medium">{service.name}</dt>
              <dd className="text-base leading-7 text-muted">{service.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
