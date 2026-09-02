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
  titleClassName = '',
  backgroundImage,
}: {
  eyebrow: string
  title: string
  description: string
  actions?: PageHeroAction[]
  aside?: ReactNode
  tone?: 'dark' | 'light'
  titleClassName?: string
  backgroundImage?: string
}) {
  const isDark = tone === 'dark'
  const hasBackgroundImage = Boolean(backgroundImage)
  const backgroundImageStyle = backgroundImage
    ? `url("${encodeURI(backgroundImage)}")`
    : undefined

  return (
    <section
      data-gsap-section
      className={
        `relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:px-10 ${
          isDark ? 'bg-panel text-white' : 'bg-surface text-foreground'
        }`
      }
    >
      {hasBackgroundImage ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: backgroundImageStyle }}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${
              isDark ? 'bg-[#04101c]/72' : 'bg-white/62'
            }`}
          />
        </>
      ) : null}

      <div className="relative z-10 mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
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
            className={`mt-5 text-[clamp(2.25rem,11vw,6rem)] font-semibold leading-[0.98] tracking-0 sm:text-[clamp(2.8rem,6vw,6rem)] sm:leading-[0.92] sm:tracking-[-0.04em] ${isDark ? 'text-white' : 'text-foreground'} ${titleClassName}`}
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
