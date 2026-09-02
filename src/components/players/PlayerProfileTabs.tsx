'use client'

import Image from 'next/image'
import { useState } from 'react'

type KeyValueItem = {
  label: string
  value: string
}

type StatRecord = {
  format: string
  values: KeyValueItem[]
}

type MediaLink = {
  label: string
  url: string
}

type GalleryItem = {
  alt: string
  id: string
  url: string
}

type PlayerProfileTabData = {
  biography: {
    achievements: string[]
    content: string
    highlights: string[]
  }
  cricketProfile: {
    details: KeyValueItem[]
    notes: string[]
  }
  media: {
    gallery: GalleryItem[]
    links: MediaLink[]
  }
  overview: {
    details: KeyValueItem[]
    majorTeams: string
  }
  statistics: {
    formats: StatRecord[]
  }
}

const TAB_ORDER = [
  { key: 'biography', label: 'Player Bio' },
  { key: 'overview', label: 'Overview' },
  { key: 'cricketProfile', label: 'Cricket Profile' },
  { key: 'statistics', label: 'Player Stats' },
  { key: 'media', label: 'Media & Links' },
] as const

type TabKey = (typeof TAB_ORDER)[number]['key']

export function PlayerProfileTabs({ data }: { data: PlayerProfileTabData }) {
  const [activeTab, setActiveTab] = useState<TabKey>('biography')

  return (
    <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[19rem_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:gap-4 lg:overflow-visible lg:pb-0">
            {TAB_ORDER.map((tab) => {
              const isActive = activeTab === tab.key

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={
                    isActive
                      ? 'flex min-w-[15rem] items-start border border-panel bg-panel px-6 py-5 text-left text-white transition-colors lg:min-w-0'
                      : 'flex min-w-[15rem] items-start border border-hairline bg-white px-6 py-5 text-left text-foreground transition-colors hover:border-foreground/20 hover:bg-surface lg:min-w-0'
                  }
                >
                  <span className="type-h5 leading-tight">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="border border-hairline bg-white p-6 sm:p-8 lg:p-12">
          {activeTab === 'overview' ? <OverviewPanel data={data.overview} /> : null}
          {activeTab === 'cricketProfile' ? <CricketProfilePanel data={data.cricketProfile} /> : null}
          {activeTab === 'biography' ? <BiographyPanel data={data.biography} /> : null}
          {activeTab === 'statistics' ? <StatisticsPanel data={data.statistics} /> : null}
          {activeTab === 'media' ? <MediaPanel data={data.media} /> : null}
        </div>
      </div>
    </section>
  )
}

function PanelHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="border-b border-hairline pb-6">
      <p className="type-accent font-medium uppercase text-accent">{eyebrow}</p>
      <h2 className="type-h4 mt-4 text-foreground">{title}</h2>
    </div>
  )
}

function OverviewPanel({ data }: { data: PlayerProfileTabData['overview'] }) {
  return (
    <div>
      <PanelHeader eyebrow="Overview" title="Built for club review." />
      <div className="mt-8 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
        {data.details.map((item) => (
          <div key={item.label} className="bg-white p-6">
            <p className="type-accent font-medium uppercase text-muted">{item.label}</p>
            <p className="type-h5 mt-3 font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <p className="type-accent font-medium uppercase text-muted">Major teams</p>
        <p className="type-body mt-3 text-foreground">{data.majorTeams}</p>
      </div>
    </div>
  )
}

function CricketProfilePanel({ data }: { data: PlayerProfileTabData['cricketProfile'] }) {
  return (
    <div>
      <PanelHeader eyebrow="Cricket Profile" title="Role, style, and playing background." />
      <div className="mt-8 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
        {data.details.map((item) => (
          <div key={item.label} className="bg-white p-6">
            <p className="type-accent font-medium uppercase text-muted">{item.label}</p>
            <p className="type-h5 mt-3 font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
      {data.notes.length > 0 ? (
        <div className="mt-10 grid gap-5">
          {data.notes.map((note) => (
            <div key={note} className="border border-hairline bg-surface p-6">
              <p className="type-body text-muted">{note}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function BiographyPanel({ data }: { data: PlayerProfileTabData['biography'] }) {
  return (
    <div>
      <PanelHeader eyebrow="Player Bio" title="Biography and career context." />
      <p className="type-body mt-8 text-muted">{data.content}</p>

      {data.highlights.length > 0 || data.achievements.length > 0 ? (
        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {data.highlights.length > 0 ? (
            <div className="border border-hairline bg-surface p-7">
              <p className="type-accent font-medium uppercase text-accent">Career highlights</p>
              <ul className="mt-5 grid gap-3">
                {data.highlights.map((item) => (
                  <li key={item} className="type-body flex gap-3 text-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {data.achievements.length > 0 ? (
            <div className="border border-hairline bg-surface p-7">
              <p className="type-accent font-medium uppercase text-accent">Achievements</p>
              <ul className="mt-5 grid gap-3">
                {data.achievements.map((item) => (
                  <li key={item} className="type-body flex gap-3 text-muted">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function StatisticsPanel({ data }: { data: PlayerProfileTabData['statistics'] }) {
  return (
    <div>
      <PanelHeader eyebrow="Player Stats" title="Format-by-format playing record." />
      {data.formats.length > 0 ? (
        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {data.formats.map((stat) => (
            <article key={stat.format} className="border border-hairline bg-surface p-6">
              <p className="type-accent font-medium uppercase text-accent">{stat.format}</p>
              <div className="mt-5 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2">
                {stat.values.map((item) => (
                  <div key={`${stat.format}-${item.label}`} className="bg-white p-4">
                    <p className="type-accent font-medium uppercase text-muted">{item.label}</p>
                    <p className="type-body mt-2 font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="type-body mt-8 text-muted">Structured statistics have not been added for this player yet.</p>
      )}
    </div>
  )
}

function MediaPanel({ data }: { data: PlayerProfileTabData['media'] }) {
  return (
    <div>
      <PanelHeader eyebrow="Media & Links" title="Extra material for scouting and due diligence." />
      {data.links.length > 0 ? (
        <div className="mt-8 border border-hairline bg-surface p-6">
          <p className="type-accent font-medium uppercase text-muted">External links</p>
          <ul className="mt-5 grid gap-3">
            {data.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="type-body inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {data.gallery.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {data.gallery.map((image) => (
            <div key={image.id} className="overflow-hidden border border-hairline bg-surface">
              <Image
                src={image.url}
                alt={image.alt}
                width={1200}
                height={900}
                className="aspect-[1.1] w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {data.links.length === 0 && data.gallery.length === 0 ? (
        <p className="type-body mt-8 text-muted">No gallery items or profile links have been added yet.</p>
      ) : null}
    </div>
  )
}
