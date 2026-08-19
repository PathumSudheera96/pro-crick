export function Introduction() {
  return (
    <section data-gsap-section className="border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[90rem] px-5 py-7 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <p data-gsap-item className="type-accent uppercase text-muted">
            Trusted by clubs, scouts, and player networks
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg font-semibold text-foreground/82 sm:grid-cols-4 sm:text-xl">
            {['MIDLAND CC', 'NORTHGATE XI', 'REDWELL SPORT', 'SOUTHERN LEAGUE'].map(
              (partner) => (
                <span data-gsap-item key={partner}>{partner}</span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
