export type Partner = {
  name: string
  logoUrl: string
  linkUrl?: string
}

// TODO: replace with a real query against the Partners collection once it exists.
const PARTNERS: Partner[] = []

export function Partners() {
  if (PARTNERS.length === 0) {
    return null
  }

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <p className="type-accent text-center font-semibold uppercase text-muted">
          Partners
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 grayscale">
          {PARTNERS.map((partner) => (
            <li key={partner.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logoUrl} alt={partner.name} className="h-8 w-auto" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
