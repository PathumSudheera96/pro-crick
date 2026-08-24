export function Testimonials() {
  return (
    <section data-gsap-section className="bg-panel text-white">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10">
        <div>
          <p data-gsap-item className="type-accent uppercase text-white/45">Approach</p>
          <blockquote data-gsap-item data-gsap-title className="type-h2 mt-5 max-w-4xl">
            “We do not simply connect players and clubs. We build partnerships that create lasting value.”
          </blockquote>
          <p data-gsap-item className="type-small mt-8 uppercase text-white/55">
            Pro-Crick working principle
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
          {[
            'Professional communication between player and club',
            'Structured profiles with practical recruitment context',
            'A starting focus on Sri Lankan talent and UK pathways',
            'Long-term relationships over one-off transactions',
          ].map((item) => (
            <div data-gsap-item key={item} className="type-small bg-black/25 px-6 py-6 text-white/74 transition-colors duration-200 hover:bg-white/10">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
