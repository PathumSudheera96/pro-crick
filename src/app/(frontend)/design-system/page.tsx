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
            The approved direction is modern scouting: mostly white and light gray pages,
            with black sections and leather red accents used for contrast, hierarchy, and action.
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
                Player directory
              </h2>
            </TypeRow>
            <TypeRow label="H3">
              <h3 className="type-h3">
                Featured players
              </h3>
            </TypeRow>
            <TypeRow label="H4">
              <h4 className="type-h4">Verified profile summary</h4>
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
          <Link href="/players" className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium !text-white transition-colors duration-200 hover:bg-accent-hover">
            Primary Button
          </Link>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center border border-foreground px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-foreground hover:!text-white">
            Secondary Button
          </Link>
          <Link href="/apply" className="inline-flex min-h-12 items-center justify-center bg-panel px-6 text-sm font-medium !text-white transition-colors duration-200 hover:bg-black">
            Dark Button
          </Link>
          <button className="inline-flex min-h-12 cursor-not-allowed items-center justify-center border border-hairline bg-surface px-6 text-sm font-medium text-muted" type="button">
            Disabled
          </button>
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
            href="/contact"
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
