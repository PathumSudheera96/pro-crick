import Image from 'next/image'
import Link from 'next/link'

const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Pro-Crick', href: '/about-us' },
      { label: 'Services', href: '/our-services' },
      { label: 'Partners', href: '/#partners' },
      { label: 'Contact', href: '/contact-us' },
    ],
  },
  {
    title: 'Players',
    links: [
      { label: 'Directory', href: '/players' },
      { label: 'Featured Players', href: '/players?sort=featured' },
      { label: 'Apply to Join', href: '/apply' },
      { label: 'Player CVs', href: '/players' },
    ],
  },
  {
    title: 'For Clubs',
    links: [
      { label: 'Find a Player', href: '/players' },
      { label: 'Submit Enquiry', href: '/contact-us' },
      { label: 'Availability', href: '/players?status=available' },
      { label: 'Overseas Talent', href: '/players' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Contact Pro-Crick', href: '/contact-us' },
      { label: 'Admin', href: '/admin' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-panel text-white">
      <div className="mx-auto max-w-[96rem] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr]">
          <div>
            <Image
              src="/images/pro-crick-logo-light.PNG"
              alt="Pro-Crick"
              width={190}
              height={134}
              className="h-14 w-auto"
            />
            <p className="type-small mt-6 max-w-sm text-white/62">
              Professional cricket talent connections for players, clubs, and long-term
              partnerships built around trust, transparency, and fit.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="type-small font-semibold text-white">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      <Link href={link.href} className="type-small text-white/58 transition-colors duration-200 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="type-small mt-12 flex flex-col gap-3 border-t border-white/12 pt-6 text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="https://ovixglobal.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-white"
          >
            Development and Maintenance
          </a>
          <p>
            Copyright {year} Pro-Crick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
