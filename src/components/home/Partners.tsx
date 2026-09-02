export type Partner = {
  name: string
  logoUrl: string
  linkUrl?: string
}

// Static single partner for now. Replace with a query against the Partners
// collection once multiple partners need to be presented.
const PARTNERS: Partner[] = [
  {
    name: 'Boundary X',
    logoUrl: '/images/boundryX.jpg',
    linkUrl: 'https://www.boundaryx.store/',
  },
]

const BOUNDARY_X_DESCRIPTION = [
  'Boundary X is an Australian cricket brand established in 2025, built on a passion for quality, performance and customisation.',
  'We provide high-quality cricket equipment for players of all levels, from juniors and local club cricketers through to first-class and international players.',
  'Specialising in English Willow cricket bats, custom profiles, personalised laser engraving, protective equipment and apparel, we give players the freedom to make their gear their own.',
  'We\u2019re a growing brand that continues to develop, improve and push the boundaries of what we can offer cricketers.',
]

export function Partners() {
  if (PARTNERS.length === 0) {
    return null
  }

  return (
    <section id="partners" data-gsap-section className="border-t border-hairline bg-background">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div
            data-gsap-item
            className="flex items-center justify-center border border-black/8 bg-white p-10 sm:p-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PARTNERS[0].logoUrl}
              alt={`${PARTNERS[0].name} logo`}
              className="h-auto w-full max-w-[24rem] object-contain"
            />
          </div>

          <div>
            <p data-gsap-item className="type-accent font-medium uppercase text-accent">
              Our partner
            </p>
            <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 text-foreground">
              {PARTNERS[0].name}
            </h2>
            <div className="mt-6 grid gap-4">
              {BOUNDARY_X_DESCRIPTION.map((paragraph) => (
                <p data-gsap-item key={paragraph} className="type-body text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <p
              data-gsap-item
              className="type-accent mt-8 font-semibold uppercase tracking-[0.18em] text-accent"
            >
              Boundary X — Beyond the Boundary.
            </p>
            {PARTNERS[0].linkUrl ? (
              <div data-gsap-item className="mt-8">
                <a
                  href={PARTNERS[0].linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-foreground bg-transparent px-6 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:!text-white"
                >
                  Visit Boundary X
                  <ExternalArrowIcon />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExternalArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}
