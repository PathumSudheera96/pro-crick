export type Testimonial = {
  quote: string
  name: string
  role: string
}

// TODO: replace with a real query against the Testimonials collection once it exists.
const TESTIMONIALS: Testimonial[] = []

export function Testimonials() {
  if (TESTIMONIALS.length === 0) {
    return null
  }

  return (
    <section className="bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          What clubs say
        </h2>

        <ul className="mt-12 grid gap-12 sm:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.name} className="border-t border-white/20 pt-6">
              <p className="text-lg leading-7 text-white/85">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-6 text-sm font-semibold">{testimonial.name}</p>
              <p className="text-sm text-white/60">{testimonial.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
