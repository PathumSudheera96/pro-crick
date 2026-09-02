'use client'

import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { PlayerCard, type PlayerCardData } from '@/components/players/PlayerCard'

export function FeaturedPlayers({ players }: { players: PlayerCardData[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [activePage, setActivePage] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const maxStartIndex = Math.max(0, players.length - visibleCards)
  const slideStarts = Array.from(
    { length: Math.ceil(players.length / visibleCards) },
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_34rem] lg:items-center lg:gap-10">
          <div className="flex max-w-5xl flex-col items-start gap-7">
            <h2 data-gsap-item data-gsap-title className="type-h2 max-w-4xl leading-[0.98] text-foreground">
              Where cricket talent meets the right opportunity.
            </h2>
            <p data-gsap-item className="type-body max-w-3xl text-muted">
              Pro-Crick bridges talented cricketers and cricket clubs through transparent,
              long-term partnerships. Our initial focus is connecting Sri Lankan players
              with clubs across the United Kingdom, while building toward a trusted global
              cricket talent network.
            </p>
            <Link
              href="/about-us"
              data-gsap-item
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent transition-colors duration-200 hover:text-accent-hover"
            >
              About Pro-Crick
              <ArrowIcon />
            </Link>
          </div>

          <div data-gsap-item className="flex justify-center lg:justify-end">
            <Image
              src="/images/pro-crick-PNG.png"
              alt="Pro-Crick logo"
              width={720}
              height={720}
              className="h-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[34rem]"
            />
          </div>
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

          {players.length > 0 ? (
            <>
              <div className="mt-10 overflow-hidden">
                <ul ref={trackRef} className="featured-player-track flex items-stretch gap-5">
                  {players.map((player) => (
                    <li data-gsap-item key={player.slug} className="featured-player-slide h-auto">
                      <PlayerCard player={player} />
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
            </>
          ) : (
            <div data-gsap-item className="mt-10 border border-white/20 px-6 py-16 text-center">
              <p className="type-body mx-auto max-w-2xl text-white/80">
                No players have been published yet. Check back soon or browse the directory
                for the latest available profiles.
              </p>
            </div>
          )}

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
