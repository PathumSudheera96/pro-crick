export function Testimonials() {
  return (
    <section className="bg-panel text-white">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10">
        <div>
          <p className="type-accent uppercase text-white/45">Editorial tone</p>
          <blockquote className="type-h2 mt-5 max-w-4xl">
            “A player profile should feel like a well-briefed recommendation, not a pile of disconnected facts.”
          </blockquote>
          <p className="type-small mt-8 uppercase text-white/55">
            Pro-Crick homepage direction
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
          {[
            'Editorial imagery over template graphics',
            'Clear pathways for clubs and prospective players',
            'Structured proof points without fabricated numbers',
            'Strong CTA hierarchy with restrained visual noise',
          ].map((item) => (
            <div key={item} className="type-small bg-black/25 px-6 py-6 text-white/74 transition-colors duration-200 hover:bg-white/10">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
