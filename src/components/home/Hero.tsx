'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeroSlide = {
  image: string
  imageAlt: string
  title: string
  description: string
  primaryAction: {
    href: string
    label: string
  }
  secondaryAction: {
    href: string
    label: string
  }
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/images/stock/pexels-cricket-celebration.jpeg',
    imageAlt: 'Cricket players celebrating together on the field',
    title: 'Connect the right cricket talent with the right club environment.',
    description:
      'Pro-Crick helps clubs and players connect through structured profiles built around role, readiness, and availability.',
    primaryAction: {
      href: '/players',
      label: 'Search Players',
    },
    secondaryAction: {
      href: '/contact-us',
      label: 'Club Enquiry',
    },
  },
  {
    image: '/images/stock/pexels-cricket-batsman-shot.jpeg',
    imageAlt: 'Cricket batsman playing an attacking shot on the field',
    title: 'Present players with more than just stats and availability.',
    description:
      'Profiles show role, readiness, and environment fit so clubs can assess the person behind the numbers.',
    primaryAction: {
      href: '/players',
      label: 'Browse Profiles',
    },
    secondaryAction: {
      href: '/about-us',
      label: 'How We Work',
    },
  },
  {
    image: '/images/stock/pexels-cricketer-bat-training.jpeg',
    imageAlt: 'Cricketer holding a bat during training',
    title: 'Move from first interest to a serious cricket conversation.',
    description:
      'Pro-Crick supports clubs and players through clearer recruitment, with introductions built for stronger partnerships.',
    primaryAction: {
      href: '/contact-us',
      label: 'Start Enquiry',
    },
    secondaryAction: {
      href: '/our-services',
      label: 'View Services',
    },
  },
]

const AUTO_ADVANCE_MS = 7000

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_SLIDES.length)
    }, AUTO_ADVANCE_MS)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === activeSlide

        return (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={isActive ? undefined : true}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-[54%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.56)_42%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.44)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.04)_42%,rgba(0,0,0,0.42)_100%)]" />
          </div>
        )
      })}

      <div className="absolute inset-0 -z-10 opacity-15 [background-image:linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[96rem] flex-col px-5 sm:px-8 lg:px-10">
        <div className="flex flex-1 items-center pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <Image
              src="/images/pro-crick-SVG-light.svg"
              alt="Pro-Crick"
              width={220}
              height={115}
              className="h-[11.25rem] w-auto sm:h-[13.125rem]"
            />
            <h1 className="type-h1 home-hero-title mt-8 max-w-5xl text-white">
              {HERO_SLIDES[activeSlide]?.title}
            </h1>
            <p className="type-lead mt-7 max-w-2xl text-white/70">
              {HERO_SLIDES[activeSlide]?.description}
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={HERO_SLIDES[activeSlide]?.primaryAction.href ?? '/players'}
                className="inline-flex min-h-14 items-center justify-center gap-3 bg-accent px-8 text-sm font-medium uppercase !text-white transition-colors hover:bg-accent-hover"
              >
                {HERO_SLIDES[activeSlide]?.primaryAction.label}
                <ArrowIcon />
              </Link>
              <Link
                href={HERO_SLIDES[activeSlide]?.secondaryAction.href ?? '/contact-us'}
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/24 px-8 text-sm font-medium uppercase text-white transition-colors hover:border-white hover:bg-white/8"
              >
                {HERO_SLIDES[activeSlide]?.secondaryAction.label}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 pb-10">
          <div className="flex items-center gap-3" aria-label="Homepage hero slider pagination">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show hero slide ${index + 1}`}
                aria-current={activeSlide === index ? 'true' : undefined}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'w-9 bg-white' : 'w-2.5 bg-white/35 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous hero slide"
              onClick={() =>
                setActiveSlide((currentSlide) =>
                  currentSlide === 0 ? HERO_SLIDES.length - 1 : currentSlide - 1,
                )
              }
              className="inline-flex h-11 w-11 items-center justify-center border border-white/72 text-white transition-colors duration-200 hover:border-white hover:bg-white/12"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next hero slide"
              onClick={() =>
                setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_SLIDES.length)
              }
              className="inline-flex h-11 w-11 items-center justify-center border border-white/72 text-white transition-colors duration-200 hover:border-white hover:bg-white/12"
            >
              <ChevronRightIcon />
            </button>
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

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11 4-5 5 5 5" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 4 5 5-5 5" />
    </svg>
  )
}
