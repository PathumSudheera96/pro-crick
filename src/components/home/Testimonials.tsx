import Link from 'next/link'

const APPROACH_POINTS = [
  {
    title: 'Start with fit, not just availability',
    icon: 'fit',
    description:
      'Every conversation begins with role, standard, readiness, and the kind of club environment where a player can genuinely contribute.',
  },
  {
    title: 'Present players with useful context',
    icon: 'profile',
    description:
      'Profiles are built to help clubs assess more than raw statistics, including playing style, pathway, experience, and practical recruitment signals.',
  },
  {
    title: 'Keep communication direct and professional',
    icon: 'communication',
    description:
      'Players and clubs need clarity around expectations, timing, and next steps. Pro-Crick keeps that process structured from first enquiry onward.',
  },
  {
    title: 'Build for long-term cricket value',
    icon: 'partnership',
    description:
      'The aim is not a one-off introduction. The aim is a partnership that works for the player, the club, and the wider cricket relationship over time.',
  },
]

export function Testimonials() {
  return (
    <section data-gsap-section className="bg-[#081423] text-white">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10">
        <div>
          <p data-gsap-item className="type-accent uppercase text-white/45">Approach</p>
          <h2 data-gsap-item data-gsap-title className="type-h2 mt-5 max-w-4xl text-white">
            Structured cricket partnerships.
          </h2>
          <h3 data-gsap-item className="type-h4 mt-5 max-w-3xl text-white">
            Cricket understanding and clear communication
            <br />
            shape every opportunity.
          </h3>
          <p data-gsap-item className="type-body mt-8 max-w-2xl text-white/72">
            Pro-Crick is built around a more disciplined way to connect players and clubs.
            Instead of pushing profiles forward without context, the process focuses on
            readiness, role fit, expectations, and the practical conditions that make a
            partnership work. That gives clubs a clearer basis for decision-making and gives
            players a better route toward the environments where they can actually develop,
            contribute, and stay valued over time.
          </p>
          <div data-gsap-item className="mt-9">
            <Link
              href="/about-us"
              className="inline-flex min-h-14 items-center justify-center border border-white/24 px-8 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-white hover:bg-white hover:!text-foreground"
            >
              See How Pro-Crick Works
            </Link>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
          {APPROACH_POINTS.map((item) => (
            <div
              data-gsap-item
              key={item.title}
              className="grid grid-cols-[auto_1fr] gap-4 bg-black/25 px-6 py-6 transition-colors duration-200 hover:bg-white/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white">
                <ApproachIcon name={item.icon} />
              </div>
              <div>
                <p className="text-[clamp(0.95rem,0.9rem+0.2vw,1.05rem)] font-medium text-white/88">
                  {item.title}
                </p>
                <p className="type-small mt-4 text-white/66">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ApproachIcon({ name }: { name: string }) {
  const commonProps = {
    'aria-hidden': true,
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'fit':
      return (
        <svg {...commonProps}>
          <path d="M4 12h5l2-5 2 10 2-5h5" />
        </svg>
      )
    case 'profile':
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </svg>
      )
    case 'communication':
      return (
        <svg {...commonProps}>
          <path d="M4 5h16v10H8l-4 4V5Z" />
          <path d="M8 9h8" />
          <path d="M8 12h5" />
        </svg>
      )
    case 'partnership':
      return (
        <svg {...commonProps}>
          <path d="M8.5 12.5 11 15l4.5-4.5" />
          <path d="M7 7h4l1.5 1.5L14 7h3l3 3-8 8-8-8 3-3Z" />
        </svg>
      )
    default:
      return null
  }
}
