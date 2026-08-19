'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export type FeaturedPlayer = {
  slug: string
  name: string
  dateOfBirth: string
  age: number
  role: string
  nationality: string
  status: string
  battingStyle: string
  bowlingStyle: string
  majorTeams: string
  coachingQualification?: string
  imageUrl: string
  profileLine: string
  profileBio?: string
}

const playerImage = (slug: string) => `/player_data/${slug}.png`

const FEATURED_PLAYERS: FeaturedPlayer[] = [
  {
    slug: 'jarrod-mckay',
    name: 'Jarrod McKay',
    dateOfBirth: '08-06-2000',
    age: 26,
    role: 'Bowler (Seam)',
    nationality: 'New Zealander',
    status: 'Available',
    battingStyle: 'RH Lower Order Bat',
    bowlingStyle: 'RA Fast Medium',
    majorTeams:
      'New Zealand XI, New Zealand Development XI, Otago Volts, Otago A, Central Districts Stags, Central Districts A',
    coachingQualification: 'NZC Level 1',
    imageUrl: playerImage('jarrod-mckay'),
    profileLine:
      'Available seam option with New Zealand development pathway experience and senior domestic exposure.',
    profileBio:
      'Jarrod McKay is a towering 6\'5" fast bowler currently contracted with the Otago Volts, renowned for his steep bounce, lively pace reaching 140kph, and the ability to trouble even the most accomplished batters. He broke into first-class cricket in 2019 with Central Districts before moving south to join Otago in 2020. Since then, he has played 25 Plunket Shield matches, 8 Ford Trophy games, and a Super Smash T20, taking 68 first-class wickets with best figures of 4-84. McKay\'s rise was built on strong age-group performances for Nelson and Central Districts, and his early promise saw him line up for the New Zealand XI against Pakistan, Bangladesh, and England. Highly regarded within New Zealand cricket circles, McKay\'s 2024/25 domestic campaign was his best yet, topping the Volts\' first-class wicket tally and finishing sixth overall in the Plunket Shield with 26 wickets at 35.76.',
  },
  {
    slug: 'kasun-wijesinghe',
    name: 'Kasun Wijesinghe',
    dateOfBirth: '14-02-1999',
    age: 27,
    role: 'Batting All-Rounder',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Middle Order Bat',
    bowlingStyle: 'RA Off Spin',
    majorTeams: 'Colombo District, Western Province Development, Sri Lanka Club XI',
    imageUrl: playerImage('kasun-wijesinghe'),
    profileLine:
      'Composed middle-order all-rounder suited to UK club cricket and adaptable batting roles.',
  },
  {
    slug: 'dinesh-ranatunga',
    name: 'Dinesh Ranatunga',
    dateOfBirth: '21-11-1998',
    age: 27,
    role: 'Top-Order Batter',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'LH Top Order Bat',
    bowlingStyle: 'LA Orthodox',
    majorTeams: 'Kandy Province, Central Province Emerging, Hill Country CC',
    imageUrl: playerImage('dinesh-ranatunga'),
    profileLine:
      'Left-handed top-order profile with calm tempo, rotation strength, and leadership potential.',
  },
  {
    slug: 'tharindu-jayasinghe',
    name: 'Tharindu Jayasinghe',
    dateOfBirth: '04-05-2001',
    age: 25,
    role: 'Bowler (Spin)',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Lower Order Bat',
    bowlingStyle: 'RA Leg Spin',
    majorTeams: 'Galle District, Southern Province A, Coastal Cricket Academy',
    imageUrl: playerImage('tharindu-jayasinghe'),
    profileLine:
      'Attacking leg-spin option with wicket-taking value and useful lower-order resistance.',
  },
  {
    slug: 'oshan-fernando',
    name: 'Oshan Fernando',
    dateOfBirth: '30-08-1997',
    age: 28,
    role: 'Wicketkeeper Batter',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Middle Order Bat',
    bowlingStyle: 'N/A',
    majorTeams: 'Negombo CC, Western Province A, Sri Lanka University XI',
    imageUrl: playerImage('oshan-fernando'),
    profileLine:
      'Reliable keeper-batter with strong communication, tempo control, and middle-order finishing.',
  },
  {
    slug: 'malith-perera',
    name: 'Malith Perera',
    dateOfBirth: '17-01-2000',
    age: 26,
    role: 'Bowling All-Rounder',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'LH Lower Order Bat',
    bowlingStyle: 'LA Medium Fast',
    majorTeams: 'Kurunegala District, North Western Province, Provincial Emerging XI',
    imageUrl: playerImage('malith-perera'),
    profileLine:
      'Left-arm seam all-rounder built for new-ball spells, hard lengths, and lower-order impact.',
  },
  {
    slug: 'akila-samarasinghe',
    name: 'Akila Samarasinghe',
    dateOfBirth: '12-12-1996',
    age: 29,
    role: 'Opening Batter',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Opening Bat',
    bowlingStyle: 'RA Medium',
    majorTeams: 'Colts Development, Colombo Cricket League, Western Province XI',
    imageUrl: playerImage('akila-samarasinghe'),
    profileLine:
      'Positive opening batter with powerplay scoring intent and experience against varied attacks.',
  },
  {
    slug: 'nuwan-mendis',
    name: 'Nuwan Mendis',
    dateOfBirth: '19-09-1999',
    age: 26,
    role: 'Bowler (Seam)',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Tail End Bat',
    bowlingStyle: 'RA Fast Medium',
    majorTeams: 'Ragama Development, Western Province Emerging, Club Select XI',
    imageUrl: playerImage('nuwan-mendis'),
    profileLine:
      'Hit-the-deck seam bowler with disciplined channel control and strong overseas-club fit.',
  },
  {
    slug: 'lahiru-gunasekara',
    name: 'Lahiru Gunasekara',
    dateOfBirth: '02-03-2002',
    age: 24,
    role: 'Middle-Order Batter',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Middle Order Bat',
    bowlingStyle: 'RA Off Spin',
    majorTeams: 'Sri Lanka U23 District XI, Central Province Academy, Kandy CC',
    imageUrl: playerImage('lahiru-gunasekara'),
    profileLine:
      'Developing middle-order batter with game awareness, spin options, and strong training habits.',
  },
  {
    slug: 'sachin-de-silva',
    name: 'Sachin de Silva',
    dateOfBirth: '26-07-1998',
    age: 28,
    role: 'Spin All-Rounder',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'LH Middle Order Bat',
    bowlingStyle: 'LA Orthodox',
    majorTeams: 'Galle CC, Southern Province Select, Sri Lanka Club Development XI',
    imageUrl: playerImage('sachin-de-silva'),
    profileLine:
      'Spin all-rounder offering control through middle overs and left-handed batting balance.',
  },
  {
    slug: 'ramesh-karunaratne',
    name: 'Ramesh Karunaratne',
    dateOfBirth: '07-04-1995',
    age: 31,
    role: 'Batting All-Rounder',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Top Order Bat',
    bowlingStyle: 'RA Medium',
    majorTeams: 'Tamil Union Development, Colombo League XI, Mercantile Cricket Select',
    coachingQualification: 'SLC Foundation Coaching',
    imageUrl: playerImage('ramesh-karunaratne'),
    profileLine:
      'Experienced top-order all-rounder with leadership qualities and club environment awareness.',
  },
  {
    slug: 'janith-bandara',
    name: 'Janith Bandara',
    dateOfBirth: '15-10-2001',
    age: 24,
    role: 'Bowler (Seam)',
    nationality: 'Sri Lankan',
    status: 'Available',
    battingStyle: 'RH Lower Order Bat',
    bowlingStyle: 'RA Medium Fast',
    majorTeams: 'Kegalle District, Sabaragamuwa Province, Emerging Club XI',
    imageUrl: playerImage('janith-bandara'),
    profileLine:
      'Young seam profile with repeatable action, improving pace, and strong development upside.',
  },
]

const HOMEPAGE_PLAYERS = FEATURED_PLAYERS.slice(0, 7)

export function FeaturedPlayers() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [activePage, setActivePage] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const maxStartIndex = Math.max(0, HOMEPAGE_PLAYERS.length - visibleCards)
  const slideStarts = Array.from(
    { length: Math.ceil(HOMEPAGE_PLAYERS.length / visibleCards) },
    (_, index) => Math.min(index * visibleCards, maxStartIndex),
  ).filter((startIndex, index, starts) => starts.indexOf(startIndex) === index)
  const pageCount = Math.max(1, slideStarts.length)
  const activeStartIndex = slideStarts[Math.min(activePage, pageCount - 1)] ?? 0

  useEffect(() => {
    const updateVisibleCards = () => {
      const nextVisibleCards = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1

      setVisibleCards(nextVisibleCards)
      setActivePage(0)
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)

    return () => {
      window.removeEventListener('resize', updateVisibleCards)
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const firstSlide = track?.children[0] as HTMLElement | undefined

    if (!track || !firstSlide) {
      return
    }

    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0')
    const slideWidth = firstSlide.getBoundingClientRect().width

    gsap.to(track, {
      x: -(slideWidth + gap) * activeStartIndex,
      duration: 0.55,
      ease: 'power3.out',
    })
  }, [activeStartIndex, visibleCards])

  return (
    <section>
      <div data-gsap-section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-10">
        <div className="flex max-w-5xl flex-col items-start gap-7">
          <h2 data-gsap-item data-gsap-title className="type-h2 max-w-4xl text-foreground">
            Where cricket talent meets the right opportunity.
          </h2>
          <p data-gsap-item className="type-body max-w-3xl text-muted">
            Pro-Crick bridges talented cricketers and cricket clubs through transparent,
            long-term partnerships. Our initial focus is connecting Sri Lankan players
            with clubs across the United Kingdom, while building toward a trusted global
            cricket talent network.
          </p>
          <Link
            href="/about"
            data-gsap-item
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            About Pro-Crick
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <div data-gsap-section className="bg-accent px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[90rem]">
          <div className="border-t border-white/24 pt-12">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <p data-gsap-item className="type-accent font-semibold uppercase text-white/72">
                Featured players
              </p>
              <h3 data-gsap-item data-gsap-title className="type-h3 mt-4 max-w-3xl text-white">
                Player profiles prepared for serious club conversations.
              </h3>
              <p data-gsap-item className="type-body mt-6 max-w-2xl text-white/78">
                A preview of how Pro-Crick presents player fit, role, availability,
                and agency context for faster club review.
              </p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden">
            <ul ref={trackRef} className="featured-player-track flex items-stretch gap-5">
              {HOMEPAGE_PLAYERS.map((player) => (
                <li data-gsap-item key={player.slug} className="featured-player-slide h-auto">
                  <Link
                    href={`/players/${player.slug}`}
                    className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-colors duration-200 hover:bg-surface"
                  >
                    <div className="overflow-hidden">
                      <Image
                        src={player.imageUrl}
                        alt={player.name}
                        width={900}
                        height={900}
                        className="aspect-square w-full object-cover object-top grayscale transition duration-300 group-hover:scale-[1.015] group-hover:grayscale-0"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="type-accent font-semibold uppercase text-accent">
                        {player.role}
                      </p>
                      <h4 className="mt-2 text-[clamp(1.125rem,1.9vw,1.95rem)] font-medium leading-[1.08] text-foreground">
                        {player.name}
                      </h4>
                      <p className="type-small mt-3 text-muted">
                        {player.nationality}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold uppercase text-accent transition-colors duration-200 group-hover:text-accent-hover">
                        View Profile
                        <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-gsap-item className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous featured players"
              onClick={() =>
                setActivePage((currentPage) => (currentPage - 1 + pageCount) % pageCount)
              }
              className="inline-flex h-11 w-11 items-center justify-center border border-white/72 text-white transition-colors duration-200 hover:border-white hover:bg-white/12"
            >
              <ArrowIcon direction="left" />
            </button>
            <div className="flex items-center gap-2 px-2" aria-label="Featured player slider pagination">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to featured player group ${index + 1}`}
                  aria-current={activePage === index ? 'true' : undefined}
                  onClick={() => setActivePage(index)}
                  className={`h-2.5 rounded-full transition-[width,background-color] duration-200 ${
                    activePage === index ? 'w-7 bg-white' : 'w-2.5 bg-white/35 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next featured players"
              onClick={() => setActivePage((currentPage) => (currentPage + 1) % pageCount)}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/72 text-white transition-colors duration-200 hover:border-white hover:bg-white/12"
            >
              <ArrowIcon />
            </button>
          </div>

          <div data-gsap-item className="mt-12 flex justify-center">
            <Link
              href="/players"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-7 text-sm font-medium uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:bg-surface"
            >
              View Directory
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={direction === 'left' ? 'rotate-180' : undefined}
    >
      <path d="M3.25 8.5h10.5M9.5 4.25l4.25 4.25-4.25 4.25" />
    </svg>
  )
}
