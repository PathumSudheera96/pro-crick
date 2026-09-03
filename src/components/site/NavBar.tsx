'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Players', href: '/players' },
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/our-services' },
  { label: 'Contact', href: '/contact-us' },
]

const SOCIAL_ITEMS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/pro__crick?igsh=MWdsajd4Y2R2NG45NQ%3D%3D&utm_source=qr', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pro-crick-where-cricket-connects/', icon: LinkedinIcon },
  { label: 'X', href: 'https://x.com/pro__crick?s=11', icon: XIcon },
]

type NavBarVariant = 'light' | 'dark' | 'transparent-light' | 'transparent-dark'

const variantClasses: Record<NavBarVariant, string> = {
  light: 'border-hairline bg-white text-foreground',
  dark: 'border-white/12 bg-panel text-white',
  'transparent-light': 'border-black/10 bg-white/70 text-foreground backdrop-blur-xl',
  'transparent-dark': 'border-white/10 bg-black/25 text-white backdrop-blur-xl',
}

export function NavBar({
  variant = 'light',
  overlay = false,
  inverted,
}: {
  variant?: NavBarVariant
  overlay?: boolean
  inverted?: boolean
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const resolvedVariant = inverted ? 'dark' : variant
  const isDark = resolvedVariant === 'dark' || resolvedVariant === 'transparent-dark'
  const isFixed = overlay && isScrolled
  const mainRowHeight = isFixed ? 'h-16' : 'h-[4.75rem]'
  const logoHeight = isFixed ? 'h-10' : 'h-11'
  const ctaHeight = isFixed ? 'min-h-10' : 'min-h-11'
  const mainRowClasses = isFixed ? 'border-white/10 bg-panel text-white' : variantClasses[resolvedVariant]

  useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 96)
    }

    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrolledState)
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className={overlay ? 'absolute inset-x-0 top-0 z-30' : 'relative z-30'}>
      <div className="border-b border-white/10 bg-panel text-white">
        <div className="mx-auto flex h-8 max-w-[96rem] items-center justify-between gap-5 px-5 transition-[height] duration-300 sm:px-8 lg:px-10">
          <a
            href="mailto:connect@pro-crick.com"
            className="type-accent font-medium text-white/68 transition-colors duration-200 hover:text-white"
          >
            connect@pro-crick.com
          </a>

          <div className="flex items-center gap-3">
            {SOCIAL_ITEMS.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-7 w-7 items-center justify-center text-white/62 transition-colors duration-200 hover:text-white"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-[height,background-color,border-color,backdrop-filter] duration-300 ${mainRowClasses} ${
          isFixed ? 'fixed inset-x-0 top-0 z-30' : 'relative z-20'
        }`}
      >
        <div className={`mx-auto flex ${mainRowHeight} max-w-[96rem] items-center gap-8 px-5 transition-[height] duration-300 sm:px-8 lg:px-10`}>
          <Link href="/" aria-label="Pro-Crick home" className="flex items-center">
            <Image
              src={
                isDark
                  ? '/images/pro-crick-logo-light.PNG'
                  : '/images/pro-crick-SVG-cropped.svg'
              }
              alt="Pro-Crick"
              width={170}
              height={120}
              className={`${logoHeight} w-auto transition-[height] duration-300`}
              priority
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 text-base font-medium lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 ${isDark ? 'text-white/72 hover:text-white' : 'text-foreground/68 hover:text-accent'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/players"
            className={`ml-auto hidden ${ctaHeight} items-center justify-center bg-accent px-5 text-sm font-medium !text-white transition-[min-height,background-color] duration-300 hover:bg-accent-hover sm:inline-flex lg:ml-0`}
          >
            Player Directory
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`ml-auto inline-flex h-11 w-11 items-center justify-center border transition-colors duration-200 lg:hidden ${
              isDark
                ? 'border-white/18 text-white hover:border-white/36 hover:bg-white/8'
                : 'border-foreground/14 text-foreground hover:border-foreground/30 hover:bg-surface'
            }`}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-50 lg:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/48 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute right-0 top-0 flex h-dvh w-[min(88vw,25rem)] flex-col bg-white text-foreground shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-[4.75rem] items-center justify-between border-b border-hairline px-5 sm:px-8">
            <Link
              href="/"
              aria-label="Pro-Crick home"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/pro-crick-logo-light.PNG"
                alt="Pro-Crick"
                width={170}
                height={120}
                className="h-11 w-auto"
                priority
              />
            </Link>

            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center border border-foreground/14 text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-surface"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="grid gap-px border-b border-hairline bg-hairline" aria-label="Touch navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="bg-white px-6 py-5 text-[clamp(1.25rem,4vw,1.75rem)] font-medium leading-none text-foreground transition-colors duration-200 hover:bg-surface hover:text-accent sm:px-8"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="grid gap-6 px-6 py-7 sm:px-8">
            <Link
              href="/players"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium uppercase tracking-[0.12em] !text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Player Directory
            </Link>

            <a
              href="mailto:connect@pro-crick.com"
              className="type-small font-medium text-muted transition-colors duration-200 hover:text-accent"
            >
              connect@pro-crick.com
            </a>
          </div>

          <div className="mt-auto border-t border-hairline px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              {SOCIAL_ITEMS.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center border border-hairline text-foreground transition-colors duration-200 hover:border-foreground/24 hover:bg-surface hover:text-accent"
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.2 8.3V6.6c0-.8.5-1 1-1h2.2V2h-3c-3.3 0-4.1 2-4.1 4v2.3H7.6V12h2.7v10h4.1V12h2.8l.4-3.7h-3.4Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect width="16" height="16" x="4" y="4" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.8 8.9H3.2V21h3.6V8.9ZM5 3a2.1 2.1 0 1 0 0 4.2A2.1 2.1 0 0 0 5 3Zm16 11c0-3.4-1.8-5.4-4.7-5.4-1.7 0-2.8.9-3.3 1.8V8.9H9.5V21h3.6v-6.4c0-1.7.8-2.7 2.2-2.7 1.3 0 2.1.9 2.1 2.7V21H21v-7Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="m13.8 10.5 6.7-7.5h-1.6l-5.8 6.5L8.5 3H3.2l7 9.9L3.2 21h1.6l6.1-7 4.9 7h5.3l-7.3-10.5Zm-2.2 2.4-.7-1L5.3 4.2h2.4l4.5 6.3.7 1 5.9 8.3h-2.4l-4.8-6.9Z" />
    </svg>
  )
}
