import Image from 'next/image'
import Link from 'next/link'

const HERO_IMAGE =
  'https://images.pexels.com/photos/17628715/pexels-photo-17628715.jpeg?auto=compress&cs=tinysrgb&w=1800'

export function Hero() {
  return (
    <section data-gsap-section className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      <Image
        src={HERO_IMAGE}
        alt="Cricket players celebrating together on the field"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-[54%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.56)_42%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.44)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.04)_42%,rgba(0,0,0,0.42)_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-15 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="mx-auto flex min-h-screen max-w-[96rem] flex-col px-5 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="max-w-5xl">
            <p data-gsap-item className="type-accent max-w-xl font-semibold uppercase text-[#c9cdd3]">
              Modern scouting and representation for cricket clubs, players, and agencies.
            </p>
            <h1 data-gsap-item data-gsap-title className="type-h1 home-hero-title mt-6 max-w-5xl text-white">
              Cricket talent ready for club review.
            </h1>
            <p data-gsap-item className="type-lead mt-7 max-w-2xl text-white/70">
              Pro-Crick turns player profiles into decisive scouting views: role, format,
              availability, representative notes, and the next step for serious enquiries.
            </p>

            <div data-gsap-item className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/players"
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-accent px-8 text-sm font-medium uppercase text-white transition-colors hover:bg-accent-hover"
              >
                Search Players
                <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/24 px-8 text-sm font-medium uppercase text-white transition-colors hover:border-white hover:bg-white/8"
              >
                Club Enquiry
                <ArrowIcon />
              </Link>
            </div>
          </div>
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
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}
