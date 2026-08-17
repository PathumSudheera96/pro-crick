import Link from 'next/link'

export function Cta() {
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <h2 className="font-display max-w-md text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Have a player in mind, or a club looking to recruit?
        </h2>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center border border-accent-foreground/40 px-8 py-4 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-accent-foreground hover:bg-white/10"
        >
          Enquire Now
        </Link>
      </div>
    </section>
  )
}
