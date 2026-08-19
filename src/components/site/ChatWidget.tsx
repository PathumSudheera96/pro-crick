'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'

const QUICK_ACTIONS = [
  'I am a player looking for opportunities',
  'I represent a club looking to recruit',
  'I want to enquire about a listed player',
  'I need to speak with Pro-Crick',
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null)

  useEffect(() => {
    const openChat = () => setIsOpen(true)

    window.addEventListener('pro-crick:open-chat', openChat)

    return () => {
      window.removeEventListener('pro-crick:open-chat', openChat)
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) {
      return
    }

    setSubmittedMessage(trimmedMessage)
    setMessage('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {isOpen ? (
        <section
          aria-label="Pro-Crick concierge chat"
          className="mb-3 flex h-[min(34rem,calc(100vh-6rem))] w-[calc(100vw-2.5rem)] max-w-[450px] flex-col overflow-hidden border border-hairline bg-white shadow-[0_24px_70px_rgba(0,0,0,0.2)]"
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
              <p className="type-small text-white/62">Concierge</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="bg-surface px-4 py-3">
              <p className="type-body text-foreground">
                Hi, I am the Pro-Crick concierge. What brings you here today?
              </p>
            </div>

            <div className="mt-5 flex flex-col items-start gap-2.5">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => setSelectedAction(action)}
                  className={`border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                    selectedAction === action
                      ? 'border-accent bg-accent text-white'
                      : 'border-hairline bg-white text-foreground hover:border-foreground/25 hover:bg-surface'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>

            {selectedAction ? (
              <div className="mt-5 border-l-2 border-accent bg-accent-soft/55 px-4 py-3">
                <p className="type-small text-foreground">
                  We can help with that. Send a short note and the Pro-Crick team can
                  route it to the right contact.
                </p>
              </div>
            ) : null}

            {submittedMessage ? (
              <div className="mt-5 bg-panel px-4 py-3 text-white">
                <p className="type-small text-white/62">Your draft message</p>
                <p className="type-small mt-2 text-white">{submittedMessage}</p>
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2.5 border-t border-hairline p-3">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-11 min-w-0 flex-1 border border-hairline px-3 text-sm outline-none transition-colors duration-200 placeholder:text-muted focus:border-accent"
              placeholder="Ask about Pro-Crick..."
              aria-label="Chat message"
            />
            <button
              type="submit"
              className="min-h-11 bg-accent px-5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Send
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? 'Close Pro-Crick concierge' : 'Open Pro-Crick concierge'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
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
