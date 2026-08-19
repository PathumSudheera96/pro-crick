const WHY_CHOOSE_ITEMS = [
  {
    title: 'Player-first representation',
    description:
      'We position each player around role, readiness, character, and the environments where they can perform.',
    icon: 'profile',
  },
  {
    title: 'Club-ready shortlists',
    description:
      'Clubs receive clear, practical player information that supports faster review and better recruitment decisions.',
    icon: 'shortlist',
  },
  {
    title: 'International opportunity focus',
    description:
      'Our process is built for players and clubs navigating opportunities across local and overseas cricket markets.',
    icon: 'global',
  },
  {
    title: 'Structured player data',
    description:
      'Profiles are organized around availability, nationality, playing role, styles, teams, and representative context.',
    icon: 'data',
  },
  {
    title: 'Transparent communication',
    description:
      'We keep expectations, timelines, and next steps clear between players, clubs, and agency stakeholders.',
    icon: 'communication',
  },
  {
    title: 'Premium presentation',
    description:
      'Photography, profile framing, and content hierarchy are shaped to help serious cricket talent stand out.',
    icon: 'presentation',
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[90rem]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="type-accent font-semibold uppercase text-accent">Why choose us</p>
          <h2 className="type-h2 mt-4 text-foreground">
            Built for clear cricket decisions.
          </h2>
          <p className="type-body mx-auto mt-6 max-w-2xl text-muted">
            Pro-Crick gives players and clubs a cleaner route from profile discovery to
            serious recruitment conversations.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <article
              key={item.title}
              className="border border-hairline bg-white p-6 transition-colors duration-200 hover:border-foreground/20 hover:bg-surface"
            >
              <div className="flex h-12 w-12 items-center justify-center bg-accent text-white">
                <WhyChooseIcon name={item.icon} />
              </div>
              <h3 className="type-h5 mt-6 font-medium text-foreground">{item.title}</h3>
              <p className="type-small mt-3 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseIcon({ name }: { name: string }) {
  const commonProps = {
    'aria-hidden': true,
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'profile':
      return (
        <svg {...commonProps}>
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
      )
    case 'shortlist':
      return (
        <svg {...commonProps}>
          <path d="M8 6h11" />
          <path d="M8 12h11" />
          <path d="M8 18h11" />
          <path d="m3.5 6 1 1 2-2" />
          <path d="m3.5 12 1 1 2-2" />
          <path d="m3.5 18 1 1 2-2" />
        </svg>
      )
    case 'global':
      return (
        <svg {...commonProps}>
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
          <path d="M3 12h18" />
          <path d="M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9" />
          <path d="M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9" />
        </svg>
      )
    case 'data':
      return (
        <svg {...commonProps}>
          <path d="M5 5h14v14H5z" />
          <path d="M9 9h6" />
          <path d="M9 13h6" />
          <path d="M9 17h3" />
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
    default:
      return (
        <svg {...commonProps}>
          <path d="M12 3 4 7l8 4 8-4-8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 17 8 4 8-4" />
        </svg>
      )
  }
}
