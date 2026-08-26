import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

const FOUNDERS = [
  {
    name: 'Dilan Perera',
    role: 'Commercial and partnership lead',
    image: '/images/1_founder.jpg',
    email: 'connect@pro-crick.com',
    linkedin: 'https://www.linkedin.com/company/pro-crick-where-cricket-connects/',
    facebook: 'https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr',
    summary:
      'Brings experience across sport, coaching, athlete development, business, and marketing, with a people-first approach to talent opportunity.',
  },
  {
    name: 'Nisala Tharaka',
    role: 'Cricket strategy and player pathway lead',
    image: '/images/2_founder.jpg',
    email: 'connect@pro-crick.com',
    linkedin: 'https://www.linkedin.com/company/pro-crick-where-cricket-connects/',
    facebook: 'https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr',
    summary:
      'Brings senior domestic and overseas cricket experience, adding the serious cricket perspective behind player evaluation and opportunity fit.',
  },
]

export function Founders() {
  return (
    <section data-gsap-section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1300px]">
        <div>
          <p data-gsap-item className="type-accent font-medium uppercase text-accent">
            Founders
          </p>
          <h2 data-gsap-item className="type-h2 mt-4 text-foreground" style={{ lineHeight: 1.08 }}>
            The agency is grounded in both cricket knowledge
            <br />
            and partnership discipline.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <article
              key={founder.name}
              data-gsap-item
              className="overflow-hidden border border-hairline bg-white lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]"
            >
              <div className="relative aspect-[1.08] bg-muted/10 lg:aspect-auto lg:min-h-full">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  sizes="(min-width: 1024px) 208px, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 lg:p-6">
                <h3 className="text-[clamp(1rem,1.55vw,1.75rem)] font-medium leading-[1.08] text-foreground">
                  {founder.name}
                </h3>
                <p className="type-accent mt-3 font-medium uppercase text-accent">{founder.role}</p>
                <p className="type-body mt-4 text-muted">{founder.summary}</p>
                <div className="mt-5 flex items-center gap-3">
                  <SocialLink href={`mailto:${founder.email}`} label={`Email ${founder.name}`}>
                    <EmailIcon />
                  </SocialLink>
                  <SocialLink href={founder.linkedin} label={`${founder.name} on LinkedIn`}>
                    <LinkedinIcon />
                  </SocialLink>
                  <SocialLink href={founder.facebook} label={`${founder.name} on Facebook`}>
                    <FacebookIcon />
                  </SocialLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
