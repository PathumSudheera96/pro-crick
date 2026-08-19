import Image from 'next/image'
import Link from 'next/link'

const CTA_IMAGE =
  'https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg?auto=compress&cs=tinysrgb&w=1400'

export function Cta() {
  return (
    <section data-gsap-section className="mx-auto max-w-[90rem] px-5 pb-10 pt-24 sm:px-8 lg:px-10">
      <div className="grid overflow-hidden border border-hairline bg-surface lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-7 sm:p-10 lg:p-14">
          <p data-gsap-item className="type-accent uppercase text-muted">Final call to action</p>
          <h2 data-gsap-item data-gsap-title className="type-h2 mt-4 max-w-2xl text-foreground">
            Build the homepage around authority, not noise.
          </h2>
          <p data-gsap-item className="type-body mt-5 max-w-xl text-muted">
            This version keeps the scope tight: one homepage only, stronger visual
            hierarchy, and placeholder imagery/copy that can be replaced once the client
            approves real content.
          </p>
          <div data-gsap-item className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent-foreground transition-colors hover:bg-accent-hover"
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

        <div data-gsap-item className="relative min-h-[20rem]">
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
