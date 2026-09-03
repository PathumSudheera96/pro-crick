import Image from 'next/image'
import Link from 'next/link'

const CTA_IMAGE = '/images/happy-action-2.jpg'

export function Cta() {
  return (
    <section data-gsap-section className="mx-auto max-w-[90rem] px-5 pb-10 pt-24 sm:px-8 lg:px-10">
      <div className="grid overflow-hidden border border-hairline bg-surface lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 p-7 sm:p-10 lg:order-1 lg:p-14">
          <p data-gsap-item className="type-accent uppercase text-muted">Next step</p>
          <h2 data-gsap-item data-gsap-title className="type-h2 mt-4 max-w-4xl text-foreground">
            Ready to move from interest to a real cricket conversation?
          </h2>
          <p data-gsap-item className="type-body mt-5 max-w-xl text-muted">
            Whether you are a club looking for the right player or a cricketer seeking the
            right environment, Pro-Crick is designed to keep the next step clear.
          </p>
          <div data-gsap-item className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] !text-white transition-colors hover:bg-accent-hover"
            >
              Enquire Now
              <ArrowIcon />
            </Link>
            <Link
              href="/players"
              className="inline-flex items-center justify-center gap-2 border border-foreground/12 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:border-foreground/35"
            >
              Browse Profiles
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div data-gsap-item className="order-1 relative min-h-[20rem] lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-surface/20" />
          <Image
            src={CTA_IMAGE}
            alt="Cricket player with bat"
            width={1400}
            height={1100}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
