import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { ServiceUnavailableNotice } from '@/components/site/ServiceUnavailableNotice'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { isBackendUnavailableError } from '@/lib/backendAvailability'
import { getSiteSettings } from '@/lib/queries/content'
import { getPublishedNewsBySlug } from '@/lib/queries/news'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import type { Media, News } from '@/payload-types'

type NewsPageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

const formatPublishDate = (value: string): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

const resolveFeaturedImage = (news: News): (Media & { url: string }) | null => {
  const image = news.featuredImage

  if (
    image &&
    typeof image === 'object' &&
    'url' in image &&
    typeof image.url === 'string' &&
    image.url
  ) {
    return image as Media & { url: string }
  }

  return null
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params
  const [news, siteSettings] = await Promise.all([
    getPublishedNewsBySlug(slug).catch((error) => {
      if (isBackendUnavailableError(error)) {
        return null
      }

      throw error
    }),
    getSiteSettings().catch(() => null),
  ])

  if (!news) {
    return {
      title: 'News article not found | Pro-Crick',
      robots: {
        follow: false,
        index: false,
      },
    }
  }

  return buildSeoMetadata({
    contentTitle: news.title,
    path: `/news/${news.slug}`,
    seo: news.seo,
    siteSettings,
    summary: news.excerpt || undefined,
  })
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params
  let news: News | null = null
  let isUnavailable = false

  try {
    news = await getPublishedNewsBySlug(slug)
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      isUnavailable = true
    } else {
      throw error
    }
  }

  if (isUnavailable) {
    return (
      <>
        <NavBar variant="light" />
        <main className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl pt-20">
            <ServiceUnavailableNotice
              message="This news article is not available at the moment because the content service is temporarily offline."
              title="News service unavailable"
            />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!news) {
    notFound()
  }

  const image = resolveFeaturedImage(news)
  const dateLabel = news.publishedAt ? formatPublishDate(news.publishedAt) : ''

  return (
    <>
      <NavBar variant="light" />
      <main>
        <section className="bg-surface px-5 pb-16 pt-36 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="type-accent font-medium uppercase text-accent">News update</p>
            <h1 className="type-h3 mt-4 text-foreground">{news.title}</h1>
            {dateLabel ? (
              <p className="type-accent mt-6 font-medium uppercase tracking-[0.14em] text-foreground/56">
                {dateLabel}
              </p>
            ) : null}
            {news.excerpt ? (
              <p className="type-lead mt-6 max-w-3xl text-muted">{news.excerpt}</p>
            ) : null}
          </div>
        </section>

        {image ? (
          <section className="bg-background px-5 sm:px-8 lg:px-10">
            <div className="relative mx-auto aspect-[16/7] max-w-6xl overflow-hidden border border-black/10 bg-black/8">
              <Image
                src={image.url}
                alt={image.alt || news.title}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </section>
        ) : null}

        <section className="bg-background px-5 py-16 sm:px-8 lg:px-10">
          <div className="news-prose mx-auto max-w-3xl">
            <RichText data={news.content} />
          </div>
        </section>

        <section className="border-t border-hairline bg-background px-5 pb-24 pt-10 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-3xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="type-body text-muted">
              Want to talk about a player or club opportunity?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/players"
                className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium uppercase tracking-[0.12em] !text-white transition-colors hover:bg-accent-hover"
              >
                Browse Players
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex min-h-12 items-center justify-center border border-foreground bg-transparent px-6 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground/5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
