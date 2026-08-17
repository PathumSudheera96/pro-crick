const STATS = [
  'Players Represented',
  'Countries',
  'Partner Clubs',
  'Years of Experience',
]

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className="grid grid-cols-2 divide-x divide-y divide-hairline border border-hairline sm:grid-cols-4 sm:divide-y-0">
        {STATS.map((label) => (
          <div key={label} className="flex flex-col gap-2 px-6 py-10 text-center">
            <span className="font-display text-4xl font-medium tabular-nums text-accent sm:text-5xl">
              —
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
