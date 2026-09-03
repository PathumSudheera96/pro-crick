'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useState, type ReactNode } from 'react'

type FounderProfile = {
  cricinfo?: string
  email: string
  facebook: string
  fullBiography: readonly string[]
  image: string
  linkedin?: string
  name: string
  preview: string
  quote: string
  role: string
}

export function FounderProfiles({ founders }: { founders: readonly FounderProfile[] }) {
  const [activeFounder, setActiveFounder] = useState<FounderProfile | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!activeFounder) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsClosing(true)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeFounder])

  useEffect(() => {
    if (!isClosing) {
      return
    }

    const timeout = window.setTimeout(() => {
      setIsVisible(false)
      setActiveFounder(null)
      setIsClosing(false)
    }, 220)

    return () => window.clearTimeout(timeout)
  }, [isClosing])

  useEffect(() => {
    if (!activeFounder) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeFounder])

  const openFounder = (founder: FounderProfile) => {
    setActiveFounder(founder)
    setIsClosing(false)
    setIsVisible(false)
  }

  const closeFounder = () => {
    setIsClosing(true)
    setIsVisible(false)
  }

  return (
    <>
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {founders.map((founder) => (
          <FounderCard
            key={founder.name}
            founder={founder}
            onReadMore={() => openFounder(founder)}
          />
        ))}
      </div>

      {activeFounder ? (
        <FounderModal
          founder={activeFounder}
          isClosing={isClosing}
          isVisible={isVisible}
          onClose={closeFounder}
        />
      ) : null}
    </>
  )
}

function FounderCard({
  founder,
  onReadMore,
}: {
  founder: FounderProfile
  onReadMore: () => void
}) {
  return (
    <article className="overflow-hidden border border-hairline bg-white">
      <div className="relative aspect-[1.02] bg-muted/10">
        <Image
          src={founder.image}
          alt={founder.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-7 lg:p-8">
        <h3 className="text-[clamp(1rem,1.55vw,1.75rem)] font-medium leading-[1.08] text-foreground">
          {founder.name}
        </h3>
        <p className="type-accent mt-3 font-medium uppercase text-accent">{founder.role}</p>
        <p className="type-body mt-5 text-muted">{founder.preview}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onReadMore}
            className="inline-flex min-h-11 items-center justify-center border border-foreground bg-foreground px-5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent hover:border-accent"
          >
            Read more
          </button>
          <SocialLink href={`mailto:${founder.email}`} label={`Email ${founder.name}`}>
            <EmailIcon />
          </SocialLink>
          {founder.linkedin ? (
            <SocialLink href={founder.linkedin} label={`${founder.name} on LinkedIn`}>
              <LinkedinIcon />
            </SocialLink>
          ) : null}
          {founder.cricinfo ? (
            <SocialLink href={founder.cricinfo} label={`${founder.name} on Cricinfo`}>
              <CricinfoIcon />
            </SocialLink>
          ) : null}
          <SocialLink href={founder.facebook} label={`${founder.name} on Facebook`}>
            <FacebookIcon />
          </SocialLink>
        </div>
        <p className="type-small mt-8 border-t border-hairline pt-5 font-medium uppercase tracking-[0.14em] text-foreground/72">
          {founder.quote}
        </p>
      </div>
    </article>
  )
}

function FounderModal({
  founder,
  isClosing,
  isVisible,
  onClose,
}: {
  founder: FounderProfile
  isClosing: boolean
  isVisible: boolean
  onClose: () => void
}) {
  const titleId = useId()
  const isOpen = isVisible && !isClosing

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6">
      <button
        type="button"
        aria-label="Close founder biography"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden border border-white/12 bg-white shadow-2xl transition-all duration-200 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-6">
          <div>
            <p className="type-accent font-medium uppercase text-accent">Founder profile</p>
            <h3 id={titleId} className="type-h4 mt-2 text-foreground">
              {founder.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center border border-hairline text-foreground transition-colors hover:border-foreground/24 hover:bg-surface hover:text-accent"
            aria-label={`Close ${founder.name} biography`}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="grid max-h-[calc(90vh-5rem)] overflow-y-auto lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[20rem] bg-surface lg:min-h-full">
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="p-5 sm:p-6 lg:p-8">
            <p className="type-accent font-medium uppercase text-accent">{founder.role}</p>
            <div className="mt-6 grid gap-5">
              {founder.fullBiography.map((paragraph) => (
                <p key={paragraph} className="type-body text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="type-small mt-8 border-t border-hairline pt-5 font-medium uppercase tracking-[0.14em] text-foreground/72">
              {founder.quote}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLink href={`mailto:${founder.email}`} label={`Email ${founder.name}`}>
                <EmailIcon />
              </SocialLink>
              {founder.linkedin ? (
                <SocialLink href={founder.linkedin} label={`${founder.name} on LinkedIn`}>
                  <LinkedinIcon />
                </SocialLink>
              ) : null}
              {founder.cricinfo ? (
                <SocialLink href={founder.cricinfo} label={`${founder.name} on Cricinfo`}>
                  <CricinfoIcon />
                </SocialLink>
              ) : null}
              <SocialLink href={founder.facebook} label={`${founder.name} on Facebook`}>
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialLink({
  children,
  href,
  label,
}: {
  children: ReactNode
  href: string
  label: string
}) {
  const external = !href.startsWith('mailto:')

  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-foreground transition-colors hover:border-foreground/24 hover:bg-surface hover:text-accent"
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}

function EmailIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function CricinfoIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5h16" />
      <path d="M4 12h10" />
      <path d="M4 17.5h7" />
      <path d="M17.5 14.5v5" />
      <path d="M15 17h5" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.02c0 1.1.9 2 2.02 2a2.01 2.01 0 1 0 .03-4.02ZM20.8 12.85c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.72c.04.76 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.39 1.9-1.39 1.34 0 1.88 1.02 1.88 2.53V20H20.8v-7.15Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7h2.35l.35-2.73H13.5V9.54c0-.8.22-1.34 1.37-1.34h1.46V5.74c-.25-.03-1.11-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v2.03H8.36V14h2.37v7h2.77Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
