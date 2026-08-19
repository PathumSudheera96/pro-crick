'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  {
    value: 12,
    suffix: '',
    title: 'Player profiles',
  },
  {
    value: 6,
    suffix: '',
    title: 'Role categories',
  },
  {
    value: 2,
    suffix: '',
    title: 'Registration pathways',
  },
  {
    value: 24,
    suffix: 'h',
    title: 'Enquiry routing target',
  },
]

export function Stats() {
  return (
    <section data-gsap-section className="bg-accent px-5 py-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[90rem] gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <article
            data-gsap-item
            key={stat.title}
            className="text-center"
          >
            <p className="type-h2 text-white">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </p>
            <h3 className="type-accent mt-4 font-medium uppercase text-white/78">
              {stat.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  )
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setDisplayValue(value))

      return () => {
        cancelAnimationFrame(frame)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        const duration = 1200
        const start = performance.now()

        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setDisplayValue(Math.round(value * easedProgress))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
        observer.disconnect()
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [value])

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {displayValue}
      {suffix}
    </span>
  )
}
