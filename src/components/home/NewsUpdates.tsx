import Image from 'next/image'
import Link from 'next/link'

import { getLatestPublishedNews } from '@/lib/queries/news'
import type { Media, News } from '@/payload-types'

const resolveFeaturedImage = (item: News): (Media & { url: string }) | null => {
  const image = item.featuredImage

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

export async function NewsUpdates() {
  const items = await getLatestPublishedNews(3)
  const isEmpty = items.length === 0

  return (
    <section data-gsap-section className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p data-gsap-item className="type-accent font-medium uppercase text-accent">
              Latest news
            </p>
            <h2 data-gsap-item data-gsap-title className="type-h3 mt-4 text-foreground">
              News Updates
            </h2>
          </div>
          <p data-gsap-item className="type-body max-w-xl text-muted">
            The latest developments from the Pro-Crick network for players, clubs, and
            cricket communities.
          </p>
        </div>

        {isEmpty ? (
          <div
            data-gsap-item
            className="mt-12 border border-black/8 bg-white px-6 py-16 text-center sm:py-20"
          >
            <p className="type-body text-muted">No Articles has been published yet.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const image = resolveFeaturedImage(item)

            return (
              <article
                data-gsap-item
                key={item.id}
                className="group flex flex-col border border-black/8 bg-white transition-colors duration-200 hover:border-black/16"
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-black/8"
                >
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.alt || item.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="type-accent flex h-full w-full items-center justify-center font-medium uppercase tracking-[0.18em] text-foreground/30">
                      Pro-Crick
                    </span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="type-h5 text-foreground">
                    <Link
                      href={`/news/${item.slug}`}
                      className="transition-colors duration-200 hover:text-accent"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  {item.excerpt ? (
                    <p className="type-body mt-3 line-clamp-3 text-muted">{item.excerpt}</p>
                  ) : null}
                  <div className="mt-auto pt-7">
                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent transition-colors duration-200 hover:text-accent-hover"
                    >
                      Read more
                      <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
          </div>
        )}
      </div>
    </section>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      className={className}
    >
      <path d="M4 12h15m0 0-6-6m6 6-6 6" />
    </svg>
  )
}
