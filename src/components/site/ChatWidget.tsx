'use client'

import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ContactEnquiryForm } from '@/components/site/ContactEnquiryForm'

type ChatView = 'chooser' | 'enquiry'
type OpenChatDetail = {
  playerSlug?: string
  view?: ChatView
}

const DEFAULT_WHATSAPP_NUMBER = '+447424116701'

const buildWhatsAppUrl = (value?: string | null) => {
  const normalizedNumber = (value || DEFAULT_WHATSAPP_NUMBER).replace(/[^\d]/g, '')
  return `https://wa.me/${normalizedNumber}`
}

export function ChatWidget({ whatsAppNumber }: { whatsAppNumber?: string | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [playerSlug, setPlayerSlug] = useState<string | undefined>(undefined)
  const [view, setView] = useState<ChatView>('chooser')
  const [isRendered, setIsRendered] = useState(false)
  const panelRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const whatsAppUrl = buildWhatsAppUrl(whatsAppNumber)

  useEffect(() => {
    const openChat = (event: Event) => {
      const detail = (event as CustomEvent<OpenChatDetail>).detail

      setIsRendered(true)
      setIsOpen(true)
      setPlayerSlug(detail?.playerSlug)
      setView(detail?.view || 'chooser')
    }

    window.addEventListener('pro-crick:open-chat', openChat)

    return () => {
      window.removeEventListener('pro-crick:open-chat', openChat)
    }
  }, [])

  const openChooser = () => {
    setPlayerSlug(undefined)
    setView('chooser')
  }

  useLayoutEffect(() => {
    if (!isRendered || !bodyRef.current || !contentRef.current) {
      return
    }

    const nextHeight = contentRef.current.getBoundingClientRect().height

    gsap.killTweensOf(bodyRef.current)
    gsap.killTweensOf(contentRef.current)

    gsap.to(bodyRef.current, {
      duration: 0.32,
      ease: 'power2.out',
      height: nextHeight,
    })

    gsap.fromTo(
      contentRef.current,
      {
        autoAlpha: 0,
        y: 18,
      },
      {
        autoAlpha: 1,
        duration: 0.34,
        ease: 'power2.out',
        y: 0,
      },
    )
  }, [isRendered, playerSlug, view])

  useLayoutEffect(() => {
    if (!isRendered || !panelRef.current) {
      return
    }

    gsap.killTweensOf(panelRef.current)

    gsap.fromTo(
      panelRef.current,
      {
        autoAlpha: 0,
        y: 28,
      },
      {
        autoAlpha: 1,
        duration: 0.34,
        ease: 'power2.out',
        y: 0,
      },
    )
  }, [isRendered])

  const closePanel = () => {
    if (!panelRef.current) {
      setIsOpen(false)
      setIsRendered(false)
      return
    }

    gsap.killTweensOf(panelRef.current)
    gsap.to(panelRef.current, {
      autoAlpha: 0,
      duration: 0.26,
      ease: 'power2.in',
      y: 24,
      onComplete: () => {
        setIsOpen(false)
        setIsRendered(false)
      },
    })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {isRendered ? (
        <section
          ref={panelRef}
          aria-label="Pro-Crick contact options"
          className="mb-3 flex w-[calc(100vw-2.5rem)] max-w-[450px] flex-col overflow-hidden border border-hairline bg-white shadow-[0_24px_70px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center gap-3 bg-panel px-4 py-4 text-white">
            <div className="flex h-11 w-11 items-center justify-center bg-black">
              <Image
                src="/images/pro-crick-SVG-cropped.svg"
                alt=""
                width={70}
                height={50}
                className="h-6 w-auto invert"
              />
            </div>
            <div>
              <p className="text-base font-medium uppercase tracking-[0.12em]">Pro-Crick</p>
              <p className="type-small text-white/62">
                {view === 'chooser' ? 'Contact options' : 'Enquiry form'}
              </p>
            </div>
          </div>

          <div ref={bodyRef} className="overflow-hidden">
            <div
              ref={contentRef}
              className={view === 'chooser' ? 'px-4 py-5' : 'max-h-[min(34rem,calc(100vh-10rem))] overflow-y-auto px-4 py-5'}
            >
              {view === 'chooser' ? (
                <>
                  <div className="bg-surface px-4 py-3">
                    <p className="type-body text-foreground">
                      Choose how you want to get in touch with Pro-Crick.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-hairline bg-white p-5 transition-colors duration-200 hover:border-foreground/25 hover:bg-surface"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface text-foreground/78">
                          <Image
                            src="/images/whatsapp-logo-variant-svgrepo-com.svg"
                            alt=""
                            width={22}
                            height={22}
                            className="h-5 w-5"
                          />
                        </div>
                        <div>
                          <p className="type-accent font-medium uppercase text-accent">WhatsApp</p>
                          <h2 className="mt-3 text-[clamp(0.875rem,1vw,1rem)] font-semibold leading-[1.2] text-foreground">
                            Reach Us via WhatsApp
                          </h2>
                          <p className="type-small mt-3 text-muted">
                            Open a WhatsApp conversation for quicker direct contact.
                          </p>
                        </div>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => setView('enquiry')}
                      className="border border-hairline bg-white p-5 text-left transition-colors duration-200 hover:border-foreground/25 hover:bg-surface"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface text-foreground/78">
                          <Image
                            src="/images/mail-svgrepo-com.svg"
                            alt=""
                            width={22}
                            height={22}
                            className="h-5 w-5"
                          />
                        </div>
                        <div>
                          <p className="type-accent font-medium uppercase text-accent">Enquiry</p>
                          <h2 className="mt-3 text-[clamp(0.875rem,1vw,1rem)] font-semibold leading-[1.2] text-foreground">
                            Send a detailed enquiry
                          </h2>
                          <p className="type-small mt-3 text-muted">
                            Send your role, timing, player, or club requirement through the site.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3 border-b border-hairline pb-4">
                    <div>
                      <p className="type-accent font-medium uppercase text-accent">Enquiry</p>
                      <p className="type-small mt-2 text-muted">
                        {playerSlug
                          ? 'This enquiry will be linked to the selected player profile.'
                          : 'Send a general enquiry to the Pro-Crick team.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openChooser}
                      className="text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent"
                    >
                      Back
                    </button>
                  </div>

                  <div className="pt-5">
                    <ContactEnquiryForm playerSlug={playerSlug} />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? 'Close Pro-Crick contact panel' : 'Open Pro-Crick contact panel'}
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            closePanel()
            return
          }

          setPlayerSlug(undefined)
          setView('chooser')
          setIsRendered(true)
          setIsOpen(true)
        }}
        className="ml-auto flex h-[3.25rem] w-[3.25rem] items-center justify-center bg-panel text-white transition-colors duration-200 hover:bg-[#171717] sm:h-16 sm:w-16"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </div>
  )
}

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 34 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M17 6.5c-6.1 0-10.8 4.1-10.8 9.6 0 2.7 1.1 5.1 3.1 6.8l-1.2 5 5.5-2.6c1.1.3 2.2.4 3.4.4 6.1 0 10.8-4.1 10.8-9.6S23.1 6.5 17 6.5Z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 34 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M9 9l16 16M25 9 9 25" />
    </svg>
  )
}
