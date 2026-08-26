import type { ReactNode } from 'react'
import Link from 'next/link'

type PageHeroAction = {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  aside,
  tone = 'light',
}: {
  eyebrow: string
  title: string
  description: string
  actions?: PageHeroAction[]
  aside?: ReactNode
  tone?: 'dark' | 'light'
}) {
  const isDark = tone === 'dark'

  return (
    <section
      data-gsap-section
      className={
        isDark
          ? 'bg-panel px-5 pb-16 pt-36 text-white sm:px-8 lg:px-10'
          : 'bg-surface px-5 pb-16 pt-36 text-foreground sm:px-8 lg:px-10'
      }
    >
      <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="max-w-4xl">
          <p
            data-gsap-item
            className={`type-accent font-medium uppercase ${isDark ? 'text-white/50' : 'text-accent'}`}
          >
            {eyebrow}
          </p>
          <h1
            data-gsap-item
            data-gsap-title
            className={`mt-5 text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.06em] ${isDark ? 'text-white' : 'text-foreground'}`}
          >
            {title}
          </h1>
          <p
            data-gsap-item
            className={`type-lead mt-7 max-w-2xl ${isDark ? 'text-white/72' : 'text-muted'}`}
          >
            {description}
          </p>

          {actions.length > 0 ? (
            <div data-gsap-item className="mt-10 flex flex-col gap-4 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className={
                    action.variant === 'secondary'
                      ? `inline-flex min-h-14 items-center justify-center border px-8 text-sm font-medium uppercase tracking-[0.12em] transition-colors ${
                          isDark
                            ? 'border-white/20 text-white hover:border-white hover:bg-white/8'
                            : 'border-foreground/14 text-foreground hover:border-foreground/30'
                        }`
                      : 'inline-flex min-h-14 items-center justify-center bg-accent px-8 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover'
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {aside ? <div data-gsap-item>{aside}</div> : null}
      </div>
    </section>
  )
}
