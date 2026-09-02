import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { RegistrationSplitCta } from '@/components/home/RegistrationSplitCta'
import { FounderProfiles } from '@/components/marketing/FounderProfiles'
import { PageHero } from '@/components/marketing/PageHero'
import { Footer } from '@/components/site/Footer'
import { NavBar } from '@/components/site/NavBar'
import { buildSeoMetadata } from '@/lib/seo/metadata'

const VALUES = [
  {
    title: 'Trust',
    description:
      'Players and clubs should feel confident that conversations, expectations, and introductions are handled with care.',
  },
  {
    title: 'Transparency',
    description:
      'We aim to keep decisions, opportunities, and communication clear so neither side is left guessing.',
  },
  {
    title: 'Partnership',
    description:
      'The goal is not a quick transaction. It is to help both sides move toward the right long-term fit.',
  },
  {
    title: 'Professionalism',
    description:
      'Every profile, discussion, and recommendation should reflect a serious standard worthy of the game.',
  },
  {
    title: 'Passion for Cricket',
    description:
      'Cricket understanding sits at the centre of the agency, shaping how players are assessed and presented.',
  },
  {
    title: 'Flexibility',
    description:
      'Different players and clubs need different solutions, so the process stays practical rather than rigid.',
  },
]

const PLAYER_BENEFITS = [
  {
    title: 'Access to relevant club opportunities',
  },
  {
    title: 'Guidance through every stage',
  },
  {
    title: 'A trusted bridge between both sides',
  },
  {
    title: 'Long-term development focus',
  },
]

const CLUB_BENEFITS = [
  {
    title: 'Access to a stronger player network',
  },
  {
    title: 'Shortlisting with cricket context',
  },
  {
    title: 'A clearer recruitment process',
  },
  {
    title: 'Partnerships built for fit and reliability',
  },
]

const FOUNDERS = [
  {
    email: 'connect@pro-crick.com',
    facebook: 'https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr',
    fullBiography: [
      'Dilan Perera represents the connection between sport, business and people that forms the foundation of Pro-Crick. With a diverse background across multiple sports, education, coaching and business environments, Dilan brings a unique perspective to developing opportunities for athletes and building meaningful partnerships within the cricket community.',
      'From an early stage, Dilan demonstrated excellence across multiple sporting disciplines while maintaining a strong focus on education and personal development. His journey through different sports environments has given him a broad understanding of athlete commitment, performance, teamwork and the challenges faced by individuals striving to progress in competitive fields.',
      'Beyond sport, Dilan has gained valuable experience across multiple industries, developing strong skills in business development, marketing, communication and relationship management. His ability to understand people, identify opportunities and create connections has become a key strength in building the Pro-Crick platform.',
      'As a qualified coach, Dilan understands the importance of player development, guidance and creating environments where individuals can reach their potential. His coaching background, combined with his business knowledge, allows him to approach cricket opportunities from both a sporting and professional perspective.',
      'Within Pro-Crick, Dilan is the driving force behind partnerships, communication and building relationships between players, clubs and communities. Known for his energetic personality, creativity and positive approach, he brings a people-first mindset to every connection made through the agency.',
      'Dilan believes that successful opportunities are created when talent, trust and the right platform come together. His vision is to help build a cricket network where players are recognised, clubs find the right individuals, and relationships continue to grow beyond the initial opportunity.',
    ],
    image: '/images/dilan-perera.jpg',
    linkedin: 'https://www.linkedin.com/company/pro-crick-where-cricket-connects/',
    name: 'Dilan Perera',
    preview:
      'Dilan connects sport, business, coaching, and relationships across the Pro-Crick model. He leads the partnership side of the agency with a people-first approach focused on trust, communication, and long-term cricket opportunities.',
    quote: 'Great opportunities happen when the right talent meets the right platform.',
    role: 'Co-Founder - Pro-Crick',
  },
  {
    email: 'connect@pro-crick.com',
    facebook: 'https://www.facebook.com/share/1HmFr8qYGB/?mibextid=wwXIfr',
    fullBiography: [
      'Nisala Tharaka brings professional cricket experience, technical knowledge and a deep understanding of player development to Pro-Crick. As a Sri Lankan cricketer with extensive domestic experience, representation at Sri Lanka A level and years competing in high-level cricket environments, Nisala provides the cricket expertise required to identify talent and create the right connections between players and clubs.',
      'A right-arm fast-medium bowling all-rounder, Nisala has built his career through dedication, discipline and consistent performance across domestic cricket. Throughout his playing journey, he has represented several leading Sri Lankan cricket teams and competed at a high level across multiple formats, gaining valuable experience of professional cricket standards, team environments and the demands required to succeed.',
      'His experience extends beyond playing alone. Having competed in overseas league cricket, Nisala understands the journey of international players from adapting to new conditions and cultures to finding the right club environment where they can contribute and continue developing. This personal understanding allows him to provide genuine insight into the needs of both players and clubs.',
      'Alongside his playing career, Nisala has developed his coaching knowledge through formal qualifications, including UKCC Level 2 coaching accreditation, strengthening his ability to support player growth and development.',
      'Within Pro-Crick, Nisala represents the cricket mind behind the organisation. His role focuses on evaluating talent, understanding player capabilities, advising clubs and ensuring that every connection is built on cricketing knowledge, honesty and long-term value.',
      'Known for his dedication, professionalism and deep passion for the game, Nisala brings the experience of a player who understands both the challenges and opportunities within modern cricket.',
      'His belief is simple: the right opportunity can transform a player’s journey, and the right player can make a lasting impact on a club.',
    ],
    image: '/images/nisala-tharaka.jpg',
    linkedin: 'https://www.linkedin.com/company/pro-crick-where-cricket-connects/',
    name: 'Nisala Tharaka',
    preview:
      'Nisala brings professional cricket insight, Sri Lanka A representation, and overseas league experience to the agency. He leads the cricket evaluation side, helping match player ability, discipline, and club fit with real cricket context.',
    quote: 'Where cricket knowledge meets opportunity.',
    role: 'Co-Founder - Pro-Crick',
  },
] as const

export const metadata: Metadata = buildSeoMetadata({
  contentTitle: 'About Pro-Crick',
  path: '/about-us',
  summary:
    'Learn about Pro-Crick, the founders behind the platform, and the Sri Lanka-to-UK cricket talent mission.',
})

export default function AboutPage() {
  return (
    <>
      <NavBar variant="light" />
      <main>
        <PageHero
          eyebrow="About the agency"
          title="Built to connect cricket talent with the right clubs."
          titleClassName="font-[600]"
          tone="dark"
          backgroundImage="/images/players/akila-samarasinghe.png"
          description="Pro-Crick was created to bridge talented cricketers and serious clubs through transparent, long-term partnerships. Our starting focus is Sri Lankan talent and UK club opportunities, with the ambition to grow into a global cricket network."
          actions={[
            { href: '/players', label: 'Browse players' },
            { href: '/contact-us', label: 'Contact Pro-Crick', variant: 'secondary' },
          ]}
          aside={
            <div className="grid gap-px overflow-hidden border border-white/16 bg-white/12 backdrop-blur-sm">
              {[
                ['Initial focus', 'Sri Lanka to UK club opportunities'],
                ['Built for', 'Players, clubs, and cricket communities'],
                ['Approach', 'Professional, transparent, flexible'],
              ].map(([label, value]) => (
                <div key={label} className="bg-white/8 p-6">
                  <p className="type-accent font-medium uppercase text-white/58">{label}</p>
                  <p className="type-h5 mt-3 text-white">{value}</p>
                </div>
              ))}
            </div>
          }
        />

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/pro-crick-PNG.png"
                alt="Pro-Crick logo"
                width={720}
                height={405}
                className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px] lg:max-w-[360px]"
              />
            </div>
            <div className="grid gap-6">
              <p className="type-accent font-medium uppercase text-accent">Agency background</p>
              <h2 className="type-h2 mt-4 text-foreground">Where Cricket Connects is a business model, not just a line.</h2>
              <p className="type-body text-muted">
                Founded by cricket enthusiasts with deep understanding of the game, Pro-Crick
                has been shaped through years of research, discussion, and observation around
                what clubs and players actually need from modern cricket recruitment.
              </p>
              <p className="type-body text-muted">
                We focus first on talented Sri Lankan cricketers seeking the right UK club
                environment, while keeping the platform broad enough to support future
                international expansion and long-term cricket partnerships.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="type-accent font-medium uppercase text-accent">Founders</p>
              <h2 className="type-h2 mt-4 text-foreground">Two different lenses. One shared cricket standard.</h2>
            </div>

            <FounderProfiles founders={[...FOUNDERS]} />
          </div>
        </section>

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-3">
            <InfoPanel
              eyebrow="Vision"
              title="A trusted global cricket talent network."
              description="We want talented players to access the right opportunities, and clubs to access the right players, through partnerships built on trust, fairness, and shared success."
            />
            <InfoPanel
              eyebrow="Mission"
              title="Create successful cricket partnerships."
              description="Our mission is to connect talented players with suitable clubs through a professional, transparent, and flexible process that respects the needs of both sides."
            />
            <InfoPanel
              eyebrow="Foundation"
              title="Years of research behind the launch."
              description="Pro-Crick is new as a public agency, but its foundation comes from years of involvement in cricket environments, player pathways, club requirements, and international opportunity research."
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#e24a4f_0%,#bf2732_42%,#7f111b_100%)] px-5 py-24 text-white sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 left-1/2 right-0 hidden lg:block">
            <Image
              src="/images/stock/pexels-cricket-batsman-shot.jpeg"
              alt="Cricket player batting during a match"
              fill
              unoptimized
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex items-center lg:pr-10">
              <BenefitSection
                eyebrow="For players"
                title="Support built around ambition, fit, and visibility."
                description={
                  <>
                    <p>
                      Pro-Crick is built to help players move beyond generic exposure, with clearer
                      presentation, stronger club alignment, and a process that supports better
                      decisions around timing, fit, and opportunity for growth.
                    </p>
                  </>
                }
              items={PLAYER_BENEFITS}
              ctaClassName="!text-[#bf2732] hover:!text-[#bf2732]"
            />
          </div>
            <div className="hidden min-h-[560px] lg:block" />
          </div>
        </section>

        <section className="relative overflow-hidden bg-panel px-5 py-24 text-white sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 left-0 right-1/2 hidden lg:block">
            <Image
              src="/images/players/jarrod-mckay.png"
              alt="Cricket player ready during a match"
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative mx-auto grid max-w-[90rem] gap-10 lg:grid-cols-2 lg:items-center">
            <div className="hidden min-h-[560px] lg:block" />
            <div className="flex items-center justify-end lg:pl-10">
              <BenefitSection
                eyebrow="For clubs"
                title="A cleaner route to committed, suitable talent."
                description={
                  <>
                    <p>
                      Pro-Crick helps clubs move beyond scattered outreach by combining stronger
                      player access, practical cricket context, and clearer communication through a
                      recruitment process built for faster, better-informed decisions.
                    </p>
                  </>
                }
                items={CLUB_BENEFITS}
              />
            </div>
          </div>
        </section>

        <section className="bg-background px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[90rem]">
            <div className="max-w-5xl">
              <p className="type-accent font-medium uppercase text-accent">Values and promise</p>
              <h2 className="type-h2 mt-4 text-foreground">
                The standard behind every introduction, conversation, and placement.
              </h2>
              <p className="type-body mt-6 max-w-2xl text-muted">
                Pro-Crick is built around a few simple principles that shape how we represent players,
                support clubs, and protect the quality of every cricket partnership we help create.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {VALUES.map((value) => (
                <div key={value.title} className="border border-hairline bg-surface p-6 lg:p-7">
                  <p className="type-h5 text-foreground">{value.title}</p>
                  <p className="type-body mt-4 text-muted">{value.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-hairline bg-hairline lg:grid-cols-[1.1fr_0.9fr]">
              <div className="bg-white p-8 lg:p-10">
                <p className="type-accent font-medium uppercase text-accent">Our promise</p>
                <h3 className="type-h3 mt-4 text-foreground">
                  We do not just make introductions. We stay responsible for the quality of the match.
                </h3>
                <p className="type-body mt-5 max-w-3xl text-muted">
                  That means presenting players with proper context, helping clubs shortlist with more
                  confidence, and treating every opportunity as the start of a relationship rather than
                  the end of a process.
                </p>
              </div>
              <div className="bg-surface p-8 lg:p-10">
                <p className="type-small font-medium uppercase tracking-[0.14em] text-foreground/56">
                  What that means in practice
                </p>
                <div className="mt-6 grid gap-5">
                  {[
                    'Clearer player presentation',
                    'More credible club conversations',
                    'Better alignment around fit and timing',
                    'Longer-term cricket partnerships',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-foreground">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <CheckIcon />
                      </span>
                      <p className="text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <RegistrationSplitCta />
      </main>
      <Footer />
    </>
  )
}

function InfoPanel({
  description,
  eyebrow,
  title,
}: {
  description: string
  eyebrow: string
  title: string
}) {
  return (
    <article className="border border-hairline bg-surface p-7">
      <p className="text-[clamp(1rem,0.92rem+0.4vw,1.125rem)] font-medium uppercase tracking-[0.12em] text-accent">
        {eyebrow}
      </p>
      <h3 className="type-h4 mt-4 text-foreground">{title}</h3>
      <p className="type-body mt-4 text-muted">{description}</p>
    </article>
  )
}

function BenefitSection({
  ctaClassName,
  description,
  eyebrow,
  items,
  light = false,
  title,
}: {
  ctaClassName?: string
  description: ReactNode
  eyebrow: string
  items: Array<{ title: string; description?: string }>
  light?: boolean
  title: string
}) {
  const titleOnlyItems = items.every((item) => !item.description)

  return (
    <div className="relative z-10">
      <div className="max-w-3xl">
        <h3
          className={`text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] font-medium ${
            light ? 'text-accent' : 'text-white'
          }`}
        >
          {eyebrow}
        </h3>
        <h2 className={`type-h2 mt-5 ${light ? 'text-foreground' : 'text-white'}`}>{title}</h2>
        {titleOnlyItems ? (
          <h4 className={`type-h5 mt-10 ${light ? 'text-foreground' : 'text-white'}`}>
            What you will get:
          </h4>
        ) : null}
        <div className={`${titleOnlyItems ? 'mt-5 grid gap-x-4 gap-y-7 md:grid-cols-2' : 'mt-10 grid gap-5 md:grid-cols-2'}`}>
          {items.map((item) => (
            <div
              key={item.title}
              className={
                titleOnlyItems
                  ? `flex items-start gap-3 ${
                      light ? 'text-foreground' : 'text-white'
                    }`
                  : `border p-7 ${
                      light
                        ? 'border-hairline bg-surface'
                        : 'border-white/14 bg-white/6 backdrop-blur-sm'
                    }`
              }
            >
              {titleOnlyItems ? (
                <>
                  <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    light ? 'bg-accent text-white' : 'bg-white text-[#bf2732]'
                  }`}>
                    <CheckIcon />
                  </span>
                  <p className={`text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] font-medium ${
                    light ? 'text-foreground' : 'text-white'
                  }`}>
                    {item.title}
                  </p>
                </>
              ) : (
                <>
                  <h3 className={`type-h5 ${light ? 'text-foreground' : 'text-white'}`}>{item.title}</h3>
                  <p className={`type-body mt-4 ${light ? 'text-muted' : 'text-white/72'}`}>
                    {item.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <div className={`type-body mt-6 max-w-2xl ${light ? 'text-muted' : 'text-white/72'}`}>
          {description}
        </div>
        {!light ? (
          <div className="mt-8">
            <Link
              href="/apply"
              className={`inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-white/90 ${ctaClassName ?? '!text-[#111111] hover:!text-[#111111]'}`}
            >
              Register as a Player
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4.2 4.2L19 6.5" />
    </svg>
  )
}
