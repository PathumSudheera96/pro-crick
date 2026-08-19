import Image from 'next/image'
import Link from 'next/link'

const HERO_IMAGE =
  'https://images.pexels.com/photos/30497236/pexels-photo-30497236.jpeg?auto=compress&cs=tinysrgb&w=1400'

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      <Image
        src={HERO_IMAGE}
        alt="Cricket player walking onto the field"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-[58%_center] grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.38)_72%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.08)_38%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="mx-auto flex min-h-screen max-w-[96rem] flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/12 pb-5">
          <Image
            src="/images/pro-crick-512.png"
            alt="Pro-Crick"
            width={170}
            height={120}
            className="h-12 w-auto invert"
          />

          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/72 lg:flex">
            <Link href="/">Home</Link>
            <Link href="/players">Players</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <div className="flex flex-1 items-center py-16 sm:py-20">
          <div className="max-w-5xl">
            <p className="type-accent max-w-xl font-semibold uppercase text-[#c9cdd3]">
              Modern scouting and representation for cricket clubs, players, and agencies.
            </p>
            <h1 className="type-h1 mt-6 max-w-5xl text-white">
              Cricket talent ready for club review.
            </h1>
            <p className="type-lead mt-7 max-w-2xl text-white/70">
              Pro-Crick turns player profiles into decisive scouting views: role, format,
              availability, representative notes, and the next step for serious enquiries.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
