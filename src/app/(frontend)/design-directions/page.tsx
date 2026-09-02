import Image from 'next/image'
import Link from 'next/link'

const plexSansClass = 'font-["Avenir_Next",Avenir,"Segoe_UI",system-ui,sans-serif]'
const plexCondensedClass = 'font-["Arial_Narrow","Helvetica_Neue_Condensed","Franklin_Gothic_Medium",sans-serif]'
const plexMonoClass = 'font-["SFMono-Regular","Menlo","Monaco","Liberation_Mono",monospace]'
const spaceGroteskClass = 'font-["Arial_Narrow","Helvetica_Neue",sans-serif]'
const instrumentSansClass = 'font-["Avenir_Next",Avenir,"Segoe_UI",system-ui,sans-serif]'

const monoPlayers = [
  {
    name: 'D. Shaw',
    role: 'Top order',
    status: 'Available',
    rating: '91',
    image: '/images/stock/pexels-cricket-player-silhouette.jpeg',
  },
  {
    name: 'I. Rehman',
    role: 'Seam all-rounder',
    status: 'Shortlist',
    rating: '87',
    image: '/images/stock/pexels-cricketer-bat-training.jpeg',
  },
  {
    name: 'J. Kapoor',
    role: 'Keeper batter',
    status: 'Reviewing',
    rating: '84',
    image: '/images/stock/pexels-cricket-training-net.jpeg',
  },
]

const signalPlayers = [
  {
    name: 'Noah Hayes',
    role: 'Left arm spin',
    format: 'T20 / ODI',
    image: '/images/stock/pexels-cricketer-bat-training.jpeg',
  },
  {
    name: 'Ravi Perera',
    role: 'Finisher',
    format: 'T20',
    image: '/images/stock/pexels-cricket-player-silhouette.jpeg',
  },
]

export default function DesignDirectionsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/10 px-5 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[96rem] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D71920]">
              Pro-Crick
            </Link>
            <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-6xl">
              Homepage design directions for a modern scouting-led agency.
            </h1>
          </div>
          <p className="max-w-lg text-sm leading-7 text-white/58">
            Two live style routes based on the black and leather-red logo. Each route shows
            a hero, search/data slice, player presentation, and CTA behavior.
          </p>
        </div>
      </section>

      <MonochromePerformance />
      <CricketSignal />
    </main>
  )
}

function MonochromePerformance() {
  return (
    <section className={`${plexSansClass} bg-[#050505] text-white`}>
      <div className="mx-auto max-w-[96rem] px-5 py-16 sm:px-8 lg:px-10">
        <DirectionHeader
          label="Direction 01"
          title="Monochrome Performance"
          summary="A sharp scouting interface: black, white, silver, and leather red. Best fit if the player database is the product signal."
          colors={[
            ['Black', '#050505'],
            ['White', '#FFFFFF'],
            ['Leather red', '#D71920'],
            ['Cold silver', '#C9CDD3'],
          ]}
          fonts="IBM Plex Sans Condensed / IBM Plex Sans / IBM Plex Mono"
        />

        <div className="mt-10 overflow-hidden border border-white/12 bg-white">
          <div className="grid min-h-[42rem] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative bg-[#090909] p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between border-b border-white/12 pb-5">
                <Image
                  src="/images/pro-crick-SVG-cropped.svg"
                  alt="Pro-Crick"
                  width={150}
                  height={106}
                  className="h-10 w-auto invert"
                />
                <div className="hidden gap-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/55 sm:flex">
                  <span>Players</span>
                  <span>Roles</span>
                  <span>Apply</span>
                </div>
              </div>

              <div className="pt-14">
                <p className={`${plexMonoClass} text-xs uppercase tracking-[0.22em] text-[#C9CDD3]`}>
                  Player index / verified availability
                </p>
                <h2
                  className={`${plexCondensedClass} mt-5 max-w-2xl text-6xl font-semibold uppercase leading-[0.86] tracking-normal text-white sm:text-8xl`}
                >
                  Talent ready for club review.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/62">
                  Player profiles read like shortlists: role, format, conditions, location,
                  and representative notes in one decisive view.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/players"
                  className="inline-flex items-center justify-center bg-[#D71920] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white"
                >
                  Search Players
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center border border-white/18 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white"
                >
                  Club Enquiry
                </Link>
              </div>
            </div>

            <div className="bg-[#F5F6F8] p-5 text-[#050505] sm:p-7 lg:p-9">
              <div className="grid gap-3 border-b border-black/10 pb-5 sm:grid-cols-4">
                {['Role', 'Country', 'Availability', 'Format'].map((filter) => (
                  <button
                    key={filter}
                    className="flex h-12 items-center justify-between border border-black/12 bg-white px-4 text-left text-xs font-bold uppercase tracking-[0.18em]"
                    type="button"
                  >
                    {filter}
                    <span className="text-[#D71920]">+</span>
                  </button>
                ))}
              </div>

              <div className="mt-7 grid gap-4">
                {monoPlayers.map((player) => (
                  <article
                    key={player.name}
                    className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 border border-black/10 bg-white p-3"
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      width={220}
                      height={220}
                      className="aspect-square object-cover grayscale"
                    />
                    <div>
                      <h3 className={`${plexCondensedClass} text-3xl font-semibold uppercase leading-none`}>
                        {player.name}
                      </h3>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-black/48">
                        {player.role} / {player.status}
                      </p>
                    </div>
                    <div className={`${plexMonoClass} border-l border-black/10 pl-4 text-right`}>
                      <p className="text-4xl font-semibold text-[#D71920]">{player.rating}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-black/42">Index</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-px overflow-hidden bg-black/12 sm:grid-cols-3">
                {['Verified', 'Available', 'Represented'].map((item) => (
                  <div key={item} className="bg-[#050505] px-4 py-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CricketSignal() {
  return (
    <section className={`${instrumentSansClass} bg-[#F8F9F7] text-[#08100D]`}>
      <div className="mx-auto max-w-[96rem] px-5 py-16 sm:px-8 lg:px-10">
        <DirectionHeader
          label="Direction 02"
          title="Cricket Signal"
          summary="A more expressive scouting brand: black and red from the logo, with field green as the only added color."
          colors={[
            ['Ink', '#08100D'],
            ['White', '#FFFFFF'],
            ['Leather red', '#C51622'],
            ['Field green', '#0B5D3B'],
          ]}
          fonts="Space Grotesk / Instrument Sans"
          light
        />

        <div className="mt-10 overflow-hidden border border-[#08100D]/14 bg-[#08100D]">
          <div className="grid min-h-[42rem] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative p-6 text-white sm:p-8 lg:p-10">
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/12 pb-5">
                  <Image
                    src="/images/pro-crick-SVG-cropped.svg"
                    alt="Pro-Crick"
                    width={150}
                    height={106}
                    className="h-10 w-auto invert"
                  />
                  <span className="rounded-none bg-[#C51622] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                    Live board
                  </span>
                </div>

                <div className="grid gap-8 pt-12 lg:grid-cols-[0.8fr_1fr]">
                  <div>
                    <h2
                      className={`${spaceGroteskClass} text-5xl font-semibold leading-[0.95] tracking-normal sm:text-7xl`}
                    >
                      The next shortlist starts here.
                    </h2>
                    <p className="mt-6 max-w-md text-base leading-8 text-white/62">
                      A modern cricket-facing UI with field intelligence, sharp contrast,
                      and faster pathways from profile discovery to player conversation.
                    </p>
                  </div>

                  <div className="grid content-start gap-3">
                    {['Open to UK league cricket', 'Spin option wanted', 'Travel ready from May'].map(
                      (item, index) => (
                        <div
                          key={item}
                          className="grid grid-cols-[3.5rem_1fr] items-center border border-white/12 bg-white/[0.04]"
                        >
                          <span className={`${spaceGroteskClass} flex h-16 items-center justify-center bg-[#0B5D3B] text-xl font-semibold`}>
                            0{index + 1}
                          </span>
                          <span className="px-5 text-sm font-semibold">{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-12 grid gap-px overflow-hidden bg-white/14 sm:grid-cols-3">
                  {[
                    ['Role match', 'All-rounder'],
                    ['Window', 'May-Sept'],
                    ['Market', 'Overseas'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0B5D3B] p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/54">{label}</p>
                      <p className={`${spaceGroteskClass} mt-2 text-2xl font-semibold`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-7 lg:p-9">
              <div className="flex items-center justify-between border-b border-[#08100D]/12 pb-5">
                <p className={`${spaceGroteskClass} text-2xl font-semibold`}>Player signal</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C51622]">Updated today</p>
              </div>

              <div className="mt-6 grid gap-5">
                {signalPlayers.map((player) => (
                  <article key={player.name} className="overflow-hidden border border-[#08100D]/12">
                    <div className="relative">
                      <Image
                        src={player.image}
                        alt={player.name}
                        width={900}
                        height={620}
                        className="h-64 w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08100D] to-transparent p-5 text-white">
                        <h3 className={`${spaceGroteskClass} text-3xl font-semibold`}>
                          {player.name}
                        </h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/64">
                          {player.role} / {player.format}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-[#08100D]/12 text-sm font-semibold">
                      <button className="bg-white px-4 py-4 text-left" type="button">
                        View profile
                      </button>
                      <button className="bg-[#C51622] px-4 py-4 text-left text-white" type="button">
                        Enquire
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="grid border-t border-white/12 bg-[#0B5D3B] text-white lg:grid-cols-[1fr_auto]">
            <div className="p-6 sm:p-8">
              <h3 className={`${spaceGroteskClass} text-4xl font-semibold tracking-normal`}>
                Green gives cricket context. Red keeps the leather-ball signal.
              </h3>
            </div>
            <Link
              href="/contact-us"
              className="flex items-center justify-center bg-[#C51622] px-8 py-6 text-sm font-bold uppercase tracking-[0.2em]"
            >
              Test this route
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function DirectionHeader({
  label,
  title,
  summary,
  colors,
  fonts,
  light = false,
}: {
  label: string
  title: string
  summary: string
  colors: Array<[string, string]>
  fonts: string
  light?: boolean
}) {
  return (
    <div className={`grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end ${light ? 'text-[#08100D]' : 'text-white'}`}>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D71920]">{label}</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">{title}</h2>
        <p className={`mt-4 max-w-2xl text-sm leading-7 ${light ? 'text-[#08100D]/62' : 'text-white/58'}`}>
          {summary}
        </p>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap gap-3">
          {colors.map(([name, value]) => (
            <div
              key={name}
              className={`flex items-center gap-3 border px-3 py-2 ${light ? 'border-[#08100D]/12 bg-white' : 'border-white/12 bg-white/[0.04]'}`}
            >
              <span className="h-5 w-5 border border-black/10" style={{ backgroundColor: value }} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                {name} {value}
              </span>
            </div>
          ))}
        </div>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-[#08100D]/55' : 'text-white/45'}`}>
          Fonts: {fonts}
        </p>
      </div>
    </div>
  )
}
