import Link from 'next/link'

import { PageHero } from '@/components/marketing/PageHero'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'

const EXPLORE_LINKS = [
  {
    eyebrow: 'Players',
    title: 'Browse the player directory',
    href: '/players',
  },
  {
    eyebrow: 'Services',
    title: 'See how Pro-Crick supports both sides',
    href: '/our-services',
  },
  {
    eyebrow: 'Enquiries',
    title: 'Start a conversation with Pro-Crick',
    href: '/contact-us',
  },
]

export function NotFoundContent() {
  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          centered
          eyebrow="Error 404"
          title="Gone for a duck."
          titleClassName="font-[600]"
          description="The page you were looking for is not in play — it may have moved, changed name, or never entered the game. Let&apos;s get you back on track."
          actions={[
            { href: '/', label: 'Back to Home' },
            { href: '/contact-us', label: 'Contact Us', variant: 'secondary' },
          ]}
        />

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <p className="type-accent font-medium uppercase text-accent">Keep exploring</p>
            <div className="mt-6 grid gap-px overflow-hidden border border-hairline bg-hairline md:grid-cols-3">
              {EXPLORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col justify-between gap-8 bg-white p-7 transition-colors duration-200 hover:bg-surface lg:p-8"
                >
                  <p className="type-accent font-medium uppercase text-accent">{link.eyebrow}</p>
                  <div className="flex items-start justify-between gap-6">
                    <p className="type-h5 text-foreground">{link.title}</p>
                    <ArrowIcon className="mt-1 shrink-0 text-foreground/40 transition-colors duration-200 group-hover:text-accent" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M4 12h15m0 0-6-6m6 6-6 6" />
    </svg>
  )
}
