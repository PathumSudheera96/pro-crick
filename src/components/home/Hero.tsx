import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-white">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[140%] w-[60%] -translate-y-1/2 opacity-[0.08]"
        viewBox="0 0 400 800"
        fill="none"
      >
        <path
          d="M200 0 C160 120 160 200 200 320 C240 440 240 520 200 640 C170 720 170 760 200 800"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="2 14"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
        <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
          Cricket talent, represented with intent.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-white/70 sm:text-xl">
          Pro-Crick is a professional player agency — curating and placing
          cricketers with clubs and opportunities worldwide.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/players"
            className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Find a Player
            <ArrowIcon />
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/5"
          >
            Apply to Join
            <ArrowIcon />
          </Link>
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
