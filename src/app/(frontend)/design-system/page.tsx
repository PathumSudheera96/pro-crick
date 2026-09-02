import Image from 'next/image'
import Link from 'next/link'

import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'

const playerCards = [
  {
    name: 'Dominic Shaw',
    role: 'Top-order batter',
    meta: 'England / Available',
    image:
      'https://images.pexels.com/photos/30497236/pexels-photo-30497236.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Isaac Rehman',
    role: 'Seam all-rounder',
    meta: 'South Africa / Shortlist',
    image:
      'https://images.pexels.com/photos/31625371/pexels-photo-31625371.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'James Kapoor',
    role: 'Wicketkeeper batter',
    meta: 'India / Reviewing',
    image:
      'https://images.pexels.com/photos/18084233/pexels-photo-18084233.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

const iconBoxes = [
  {
    title: 'Verified Profiles',
    body: 'Player summaries built around role, format, eligibility, and representative notes.',
  },
  {
    title: 'Club Shortlists',
    body: 'Structured discovery paths for clubs comparing availability and fit.',
  },
  {
    title: 'Agency Control',
    body: 'A clear CMS-backed foundation for content, players, enquiries, and applications.',
  },
]

const founderCards = [
  {
    name: 'Dilan Perera',
    role: 'Commercial and partnership lead',
    image: '/images/dilan-perera.jpg',
    summary:
      'Sport, coaching, athlete development, business, and marketing experience brought into one practical partnership role.',
  },
  {
    name: 'Nisala Tharaka',
    role: 'Cricket strategy and player pathway lead',
    image: '/images/nisala-tharaka.jpg',
    summary:
      'Senior domestic and overseas cricket experience applied to player evaluation, role fit, and opportunity judgment.',
  },
]

const serviceCards = [
  {
    title: 'Player representation',
    body:
      'Profiles framed around role, readiness, strengths, and the type of club environment where the player can genuinely perform.',
  },
  {
    title: 'Club shortlisting',
    body:
      'Clubs receive more than a one-line stat summary, with enough context to move into a confident shortlist.',
  },
  {
    title: 'Opportunity matching',
    body:
      'The process stays clear from first outreach through next-stage conversation for both players and clubs.',
  },
]

const approachBoxes = [
  {
    title: 'Start With Fit, Not Just Availability',
    body:
      'Every conversation begins with role, standard, readiness, and the kind of club environment where a player can actually contribute.',
  },
  {
    title: 'Present Players With Useful Context',
    body:
      'Profiles help clubs assess more than raw statistics, including pathway, experience, and practical recruitment signals.',
  },
]

export default function DesignSystemPage() {
  return (
    <main className="bg-background text-foreground">
      <NavBar />

      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-[96rem] px-5 py-20 sm:px-8 lg:px-10">
          <p className="type-accent font-semibold uppercase text-accent">Temporary Design System</p>
          <h1 className="type-h1 mt-5 max-w-5xl">
            Pro-Crick interface foundations.
          </h1>
          <p className="type-lead mt-7 max-w-3xl text-muted">
            The approved direction is the live homepage direction: mostly white and light gray
            pages, deep navy contrast sections, cricket red accents, structured cards, and
            typography that keeps natural casing instead of forced uppercase headings.
          </p>
        </div>
      </section>

      <DesignSection title="Color System">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['White', '#FFFFFF', 'Default page background'],
            ['Light gray', '#F5F6F8', 'Section and card surface'],
            ['Black', '#050505', 'Dark contrast sections'],
            ['Leather red', '#D71920', 'Primary CTA and active state'],
            ['Cold silver', '#A6ABB3', 'Muted text and UI support'],
          ].map(([name, value, usage]) => (
            <div key={name} className="border border-hairline bg-white p-4 transition-colors duration-200 hover:bg-surface">
              <div className="h-24 border border-black/10" style={{ backgroundColor: value }} />
              <h3 className="type-h5 mt-4">{name}</h3>
              <p className="type-small mt-1 text-muted">{value}</p>
              <p className="type-small mt-3 text-muted">{usage}</p>
            </div>
          ))}
        </div>
      </DesignSection>

      <DesignSection title="Typography">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <TypeRow label="H1">
              <h1 className="type-h1">
                Cricket talent ready for club review.
              </h1>
            </TypeRow>
            <TypeRow label="H2">
              <h2 className="type-h2">
                Where cricket talent meets the right opportunity.
              </h2>
            </TypeRow>
            <TypeRow label="H3">
              <h3 className="type-h3">
                Structured cricket partnerships
              </h3>
            </TypeRow>
            <TypeRow label="H4">
              <h4 className="type-h4">Cricket understanding shapes every opportunity</h4>
            </TypeRow>
            <TypeRow label="H5">
              <h5 className="type-h5">Availability window</h5>
            </TypeRow>
          </div>

          <div className="space-y-6">
            <div className="border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-surface">
              <p className="type-lead text-foreground">
                Lead paragraph text introduces a page, section, or conversion flow with
                enough context for clubs and players to understand the next action.
              </p>
            </div>
            <div className="border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-surface">
              <p className="type-body text-muted">
                Body text should be direct and functional. It explains role, eligibility,
                availability, and agency process without sounding like a generic sports template.
              </p>
            </div>
            <div className="border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-surface">
              <p className="type-accent font-semibold uppercase text-accent">Section label</p>
              <p className="type-small mt-3 text-muted">
                Small support text covers metadata, card summaries, helper copy, and form guidance.
              </p>
            </div>
          </div>
        </div>
      </DesignSection>

      <DesignSection title="Buttons">
        <div className="flex flex-wrap gap-4">
          <Link href="/players" className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium uppercase tracking-[0.12em] !text-white transition-colors duration-200 hover:bg-accent-hover">
            Primary Button
          </Link>
          <Link href="/contact-us" className="inline-flex min-h-12 items-center justify-center border border-foreground/14 px-6 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground hover:!text-white">
            Secondary Button
          </Link>
          <div className="bg-[#081423] p-4">
            <Link href="/about-us" className="inline-flex min-h-12 items-center justify-center border border-white/24 px-6 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-white hover:bg-white hover:!text-foreground">
              White Outline
            </Link>
          </div>
        </div>
      </DesignSection>

      <DesignSection title="Cards">
        <div className="grid gap-6 lg:grid-cols-3">
          {playerCards.map((player) => (
            <article key={player.name} className="group overflow-hidden border border-hairline bg-white transition-colors duration-200 hover:border-foreground/20 hover:bg-surface">
              <Image
                src={player.image}
                alt={player.name}
                width={900}
                height={900}
                className="aspect-square w-full object-cover grayscale transition-transform duration-300 group-hover:scale-[1.015]"
              />
              <div className="p-5">
                <p className="type-accent font-semibold uppercase text-accent">{player.role}</p>
                <h3 className="type-h3 mt-2">
                  {player.name}
                </h3>
                <p className="type-small mt-3 text-muted">{player.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <ContentCard title="Blog card" body="Use this for news, insight, agency updates, and player feature stories." />
          <ContentCard title="News card" body="Shorter, tighter card for announcements, signings, club notes, and content teasers." />
          <ContentCard title="Fact card" body="Compact presentation of a number, status, or profile attribute." />
        </div>
      </DesignSection>

      <DesignSection title="Forms">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-surface">
            <label className="text-sm font-medium" htmlFor="name">Full name</label>
            <input id="name" className="mt-2 h-12 w-full border border-hairline bg-white px-4 text-base outline-none transition-colors duration-200 focus:border-accent" placeholder="Enter name" />
          </div>
          <div className="border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-surface">
            <label className="text-sm font-medium" htmlFor="role">Playing role</label>
            <select id="role" className="mt-2 h-12 w-full border border-hairline bg-white px-4 text-base outline-none transition-colors duration-200 focus:border-accent">
              <option>Top-order batter</option>
              <option>Seam all-rounder</option>
              <option>Wicketkeeper batter</option>
            </select>
          </div>
          <div className="border border-hairline bg-white p-6 transition-colors duration-200 hover:bg-surface lg:col-span-2">
            <label className="text-sm font-medium" htmlFor="message">Message</label>
            <textarea id="message" className="mt-2 min-h-36 w-full border border-hairline bg-white p-4 text-base outline-none transition-colors duration-200 focus:border-accent" placeholder="Tell us what you are looking for" />
            <p className="type-small mt-3 text-muted">Helper text explains expected input without cluttering the form.</p>
          </div>
        </div>
      </DesignSection>

      <DesignSection title="Boxes">
        <div className="grid gap-6 lg:grid-cols-3">
          {iconBoxes.map((box) => (
            <IconBox key={box.title} title={box.title} body={box.body} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <ImageBox />
          <div className="grid gap-6">
            <FactBox title="Light fact box" value="91" body="Scouting index sample" />
            <FactBox title="Dark fact box" value="Available" body="Player status sample" dark />
          </div>
        </div>
      </DesignSection>

      <DesignSection title="Homepage Patterns">
        <div className="grid gap-6">
          <section className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <article className="relative min-h-[20rem] overflow-hidden border border-black/10 bg-black/8 lg:min-h-[28rem]">
              <Image
                src="https://images.pexels.com/photos/29463867/pexels-photo-29463867/free-photo-of-cricket-batsman-playing-powerful-shot-on-field.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Cricket batsman"
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover object-top"
              />
            </article>

            <div className="flex flex-col">
              <p className="type-accent uppercase text-muted">Services</p>
              <h3 className="type-h3 mt-4 max-w-4xl text-foreground">
                Built to support players, clubs, and better cricket recruitment outcomes.
              </h3>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {serviceCards.map((card) => (
                  <ServiceMiniCard key={card.title} title={card.title} body={card.body} />
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            {founderCards.map((founder) => (
              <FounderMiniCard
                key={founder.name}
                image={founder.image}
                name={founder.name}
                role={founder.role}
                summary={founder.summary}
              />
            ))}
          </section>

          <section className="bg-[#081423] text-white">
            <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="type-accent uppercase text-white/45">Approach</p>
                <h3 className="type-h2 mt-5 max-w-4xl text-white">Structured cricket partnerships.</h3>
                <h4 className="type-h4 mt-5 max-w-3xl text-white">
                  Cricket understanding and clear communication
                  <br />
                  shape every opportunity.
                </h4>
                <p className="type-body mt-8 max-w-2xl text-white/72">
                  The process is built around role fit, readiness, expectations, and the
                  practical conditions that make player-club relationships work over time.
                </p>
                <div className="mt-9">
                  <Link
                    href="/about-us"
                    className="inline-flex min-h-12 items-center justify-center border border-white/24 px-6 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:border-white hover:bg-white hover:!text-foreground"
                  >
                    See How Pro-Crick Works
                  </Link>
                </div>
              </div>

              <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
                {approachBoxes.map((item, index) => (
                  <ApproachMiniBox key={item.title} title={item.title} body={item.body} iconIndex={index} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </DesignSection>

      <DesignSection title="CTA Sections">
        <div className="grid gap-6">
          <CtaBlock
            title="Find players with structured profiles."
            body="Use this light CTA on white or light-gray pages where the next step should feel direct and practical."
            href="/players"
            label="Open Directory"
          />
          <CtaBlock
            title="Start a serious club enquiry."
            body="Use this dark CTA to break long light pages and create a high-contrast conversion moment."
            href="/contact-us"
            label="Submit Enquiry"
            dark
          />
        </div>
      </DesignSection>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
          <h2 className="type-h2 mb-6">Navigation variants</h2>
          <div className="grid gap-6">
            <NavPreview label="Light">
              <NavBar variant="light" />
            </NavPreview>
            <NavPreview label="Dark">
              <NavBar variant="dark" />
            </NavPreview>
            <NavPreview label="Transparent light" image>
              <NavBar variant="transparent-light" />
            </NavPreview>
            <NavPreview label="Transparent dark" image dark>
              <NavBar variant="transparent-dark" />
            </NavPreview>
          </div>

          <h2 className="type-h2 mb-6 mt-14">Footer</h2>
          <div className="overflow-hidden border border-hairline">
            <Footer />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function DesignSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-hairline bg-background py-16">
      <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-10">
        <h2 className="type-h2 mb-8">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

function TypeRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline pt-5">
      <p className="type-small mb-4 font-semibold text-muted">{label}</p>
      {children}
    </div>
  )
}

function NavPreview({
  label,
  children,
  image = false,
  dark = false,
}: {
  label: string
  children: React.ReactNode
  image?: boolean
  dark?: boolean
}) {
  if (!image) {
    return (
      <div>
        <p className="type-accent mb-3 font-semibold uppercase text-muted">{label}</p>
        <div className="overflow-hidden border border-hairline">{children}</div>
      </div>
    )
  }

  return (
    <div>
      <p className="type-accent mb-3 font-semibold uppercase text-muted">{label}</p>
      <div className="relative isolate overflow-hidden border border-hairline">
        <Image
          src="https://images.pexels.com/photos/17628715/pexels-photo-17628715.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 1536px"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className={`absolute inset-0 -z-10 ${dark ? 'bg-black/30' : 'bg-white/20'}`} />
        {children}
        <div className={`px-6 py-10 ${dark ? 'text-white' : 'text-foreground'}`}>
          <p className="type-small max-w-xl">
            Transparent navbar preview with backdrop blur over live image context.
          </p>
        </div>
      </div>
    </div>
  )
}

function ContentCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="border border-hairline bg-white p-6 transition-colors duration-200 hover:border-foreground/20 hover:bg-surface">
      <p className="type-accent font-semibold uppercase text-accent">Content</p>
      <h3 className="type-h4 mt-3">{title}</h3>
      <p className="type-small mt-4 text-muted">{body}</p>
      <Link href="/news" className="mt-6 inline-flex text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover">
        Read more
      </Link>
    </article>
  )
}

function IconBox({ title, body }: { title: string; body: string }) {
  return (
    <article className="border border-hairline bg-white p-6 transition-colors duration-200 hover:border-foreground/20 hover:bg-surface">
      <div className="flex h-12 w-12 items-center justify-center bg-accent text-white">
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h3 className="type-h4 mt-6">{title}</h3>
      <p className="type-small mt-3 text-muted">{body}</p>
    </article>
  )
}

function ImageBox() {
  return (
    <article className="group overflow-hidden border border-hairline bg-white transition-colors duration-200 hover:border-foreground/20 hover:bg-surface">
      <Image
        src="https://images.pexels.com/photos/30497236/pexels-photo-30497236.jpeg?auto=compress&cs=tinysrgb&w=1100"
        alt="Cricket player"
        width={1100}
        height={700}
        className="aspect-[16/10] w-full object-cover grayscale transition-transform duration-300 group-hover:scale-[1.01]"
      />
      <div className="p-6">
        <p className="type-accent font-semibold uppercase text-accent">Image box</p>
        <h3 className="type-h4 mt-3">Editorial cricket photography</h3>
        <p className="type-small mt-3 text-muted">
          Image boxes combine strong photography with short, scannable supporting text.
        </p>
      </div>
    </article>
  )
}

function FactBox({
  title,
  value,
  body,
  dark = false,
}: {
  title: string
  value: string
  body: string
  dark?: boolean
}) {
  return (
    <article
      className={`border p-6 transition-colors duration-200 ${
        dark
          ? 'border-white/12 bg-panel text-white hover:bg-[#151515]'
          : 'border-hairline bg-white text-foreground hover:border-foreground/20 hover:bg-surface'
      }`}
    >
      <p className={`type-accent font-semibold uppercase ${dark ? 'text-white/54' : 'text-muted'}`}>
        {title}
      </p>
      <p className="type-h2 mt-4 text-accent">
        {value}
      </p>
      <p className={`type-small mt-4 ${dark ? 'text-white/62' : 'text-muted'}`}>
        {body}
      </p>
    </article>
  )
}

function CtaBlock({
  title,
  body,
  href,
  label,
  dark = false,
}: {
  title: string
  body: string
  href: string
  label: string
  dark?: boolean
}) {
  return (
    <section
      className={`border p-7 transition-colors duration-200 sm:p-10 ${
        dark
          ? 'border-white/12 bg-panel text-white hover:bg-[#151515]'
          : 'border-hairline bg-surface text-foreground hover:bg-[#eef0f3]'
      }`}
    >
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="type-h2">
            {title}
          </h3>
          <p className={`type-body mt-4 max-w-2xl ${dark ? 'text-white/62' : 'text-muted'}`}>
            {body}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium !text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          {label}
        </Link>
      </div>
    </section>
  )
}

function FounderMiniCard({
  image,
  name,
  role,
  summary,
}: {
  image: string
  name: string
  role: string
  summary: string
}) {
  return (
    <article className="overflow-hidden border border-hairline bg-white lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
      <div className="relative aspect-[1.08] bg-muted/10 lg:aspect-auto lg:min-h-full">
        <Image src={image} alt={name} fill sizes="(min-width: 1024px) 208px, 100vw" className="object-cover object-top" />
      </div>
      <div className="p-6">
        <h3 className="text-[clamp(1rem,1.55vw,1.75rem)] font-medium leading-[1.08] text-foreground">
          {name}
        </h3>
        <p className="type-accent mt-3 font-medium uppercase text-accent">{role}</p>
        <p className="type-body mt-4 text-muted">{summary}</p>
        <div className="mt-5 flex items-center gap-3">
          <SocialDot />
          <SocialDot />
          <SocialDot />
        </div>
      </div>
    </article>
  )
}

function ServiceMiniCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="flex min-h-[16rem] flex-col justify-between border border-black/10 bg-surface p-6 transition-colors duration-200 hover:bg-[#eef0f3]">
      <h4 className="type-h4 text-foreground">{title}</h4>
      <p className="type-small mt-6 text-muted">{body}</p>
    </article>
  )
}

function ApproachMiniBox({
  title,
  body,
  iconIndex,
}: {
  title: string
  body: string
  iconIndex: number
}) {
  return (
    <article className="grid grid-cols-[auto_1fr] gap-4 bg-black/25 px-6 py-6 transition-colors duration-200 hover:bg-white/10">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white">
        <ApproachMiniIcon index={iconIndex} />
      </div>
      <div>
        <p className="text-[clamp(0.95rem,0.9rem+0.2vw,1.05rem)] font-medium text-white/88">{title}</p>
        <p className="type-small mt-4 text-white/66">{body}</p>
      </div>
    </article>
  )
}

function SocialDot() {
  return <span className="inline-flex h-10 w-10 rounded-full border border-hairline bg-white/40" />
}

function ApproachMiniIcon({ index }: { index: number }) {
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

  if (index === 0) {
    return (
      <svg {...commonProps}>
        <path d="M4 12h5l2-5 2 10 2-5h5" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  )
}
