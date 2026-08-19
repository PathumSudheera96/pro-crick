const PROFILE_ITEMS = [
  {
    title: 'Availability-led',
    detail: 'The interface makes timing part of the pitch, not an afterthought.',
  },
  {
    title: 'Role-aware',
    detail: 'Top-order, seam, spin, keeping, and all-round profiles need different framing.',
  },
  {
    title: 'Club-ready',
    detail: 'Profiles are designed to help a club move from interest to conversation quickly.',
  },
  {
    title: 'Agency-backed',
    detail: 'Representation and communication context sit alongside the player presentation.',
  },
]

export function Stats() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-10">
      <div className="grid gap-px overflow-hidden border border-hairline bg-hairline lg:grid-cols-4">
        {PROFILE_ITEMS.map((item) => (
          <div key={item.title} className="bg-surface px-6 py-8 transition-colors duration-200 hover:bg-[#eef0f3]">
            <p className="type-h4 text-accent">
              {item.title}
            </p>
            <p className="type-small mt-4 text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
