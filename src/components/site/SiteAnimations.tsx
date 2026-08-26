'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function SiteAnimations() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sections = gsap.utils.toArray<HTMLElement>('[data-gsap-section]')
    const titleRestores = new Set<() => void>()

    if (prefersReducedMotion) {
      gsap.set('[data-gsap-item], [data-gsap-title]', { autoAlpha: 1, clearProps: 'transform' })
      return
    }

    const context = gsap.context(() => {
      sections.forEach((section) => {
        const titleSplits = gsap.utils.toArray<HTMLElement>('[data-gsap-title]', section).map(
          (title) => splitTitleIntoWords(title, titleRestores),
        )
        const titleWords = titleSplits.flatMap((split) => split.words)
        const items = gsap
          .utils
          .toArray<HTMLElement>('[data-gsap-item]', section)
          .filter((item) => !item.matches('[data-gsap-title]'))

        if (items.length === 0 && titleWords.length === 0) {
          return
        }

        if (titleWords.length > 0) {
          gsap.fromTo(
            titleWords,
            {
              autoAlpha: 0,
              yPercent: 115,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.72,
              ease: 'power3.out',
              stagger: 0.045,
              onComplete: () => {
                titleSplits.forEach((split) => split.restore())
              },
              onInterrupt: () => {
                titleSplits.forEach((split) => split.restore())
              },
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                once: true,
              },
            },
          )
        }

        if (items.length > 0) {
          gsap.fromTo(
            items,
            {
              autoAlpha: 0,
              y: 28,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.78,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                once: true,
              },
            },
          )
        }
      })
    })

    return () => {
      context.revert()
      titleRestores.forEach((restoreTitle) => restoreTitle())
    }
  }, [])

  return null
}

function splitTitleIntoWords(title: HTMLElement, titleRestores: Set<() => void>) {
  const originalContent = title.innerHTML
  const label = title.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  const words = label.split(' ').filter(Boolean)

  if (words.length === 0) {
    return {
      words: [] as HTMLElement[],
      restore: () => {},
    }
  }

  title.setAttribute('aria-label', label)
  title.innerHTML = words
    .map(
      (word) =>
        `<span aria-hidden="true" class="inline-block overflow-hidden align-bottom"><span class="inline-block will-change-transform">${escapeHtml(word)}</span></span>`,
    )
    .join(' ')

  let restored = false
  const restore = () => {
    if (restored) {
      return
    }
    restored = true
    title.innerHTML = originalContent
    title.removeAttribute('aria-label')
    titleRestores.delete(restore)
  }

  titleRestores.add(restore)

  return {
    words: gsap.utils.toArray<HTMLElement>('span span', title),
    restore,
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
