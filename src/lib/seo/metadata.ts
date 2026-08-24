import type { Metadata } from 'next'

import type { Media, Page, Player, SiteSetting } from '@/payload-types'

type SeoGroup = NonNullable<Page['seo']> | NonNullable<Player['seo']> | null | undefined
type SiteSettingsLike = Pick<
  SiteSetting,
  'companyName' | 'defaultOgImage' | 'defaultSeoDescription' | 'defaultSeoTitle' | 'siteName'
>

const FALLBACK_SITE_NAME = 'Pro-Crick'
const FALLBACK_DESCRIPTION = 'Professional cricket talent connection platform and player agency.'

const stripMarkup = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

export const getSiteUrl = (): string => {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000'
}

export const buildAbsoluteUrl = (pathname: string): string => {
  return new URL(pathname, `${getSiteUrl()}/`).toString()
}

const summarizeText = (value: string | null | undefined, maxLength = 160): string | undefined => {
  if (!value) {
    return undefined
  }

  const sanitized = stripMarkup(value)

  if (!sanitized) {
    return undefined
  }

  if (sanitized.length <= maxLength) {
    return sanitized
  }

  return `${sanitized.slice(0, maxLength - 1).trimEnd()}…`
}

const resolveMediaUrl = (media: number | Media | null | undefined): string | undefined => {
  if (!media || typeof media === 'number' || !media.url) {
    return undefined
  }

  return buildAbsoluteUrl(media.url)
}

export const buildSeoMetadata = ({
  contentTitle,
  path,
  seo,
  siteSettings,
  summary,
}: {
  contentTitle: string
  path: string
  seo?: SeoGroup
  siteSettings?: SiteSettingsLike | null
  summary?: string | null
}): Metadata => {
  const siteName = siteSettings?.siteName || FALLBACK_SITE_NAME
  const metaTitle = seo?.metaTitle || `${contentTitle} | ${siteName}`
  const metaDescription =
    seo?.metaDescription ||
    summarizeText(summary) ||
    siteSettings?.defaultSeoDescription ||
    FALLBACK_DESCRIPTION
  const canonical = seo?.canonicalUrl || buildAbsoluteUrl(path)
  const ogTitle = seo?.ogTitle || metaTitle
  const ogDescription = seo?.ogDescription || metaDescription
  const ogImage = resolveMediaUrl(seo?.ogImage) || resolveMediaUrl(siteSettings?.defaultOgImage)
  const index = seo?.index ?? true
  const follow = seo?.follow ?? true

  return {
    alternates: {
      canonical,
    },
    description: metaDescription,
    openGraph: {
      description: ogDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
      siteName,
      title: ogTitle,
      type: 'website',
      url: canonical,
    },
    robots: {
      follow,
      index,
    },
    title: metaTitle,
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
      title: ogTitle,
    },
  }
}
