import Image from 'next/image'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Players', href: '/players' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

export function NavBar({ inverted = false }: { inverted?: boolean }) {
  return (
    <header
      className={`border-b ${inverted ? 'border-white/12 bg-panel text-white' : 'border-hairline bg-white text-foreground'}`}
    >
      <div className="mx-auto flex h-20 max-w-[96rem] items-center gap-8 px-5 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Pro-Crick home" className="flex items-center">
          <Image
            src="/images/pro-crick-512.png"
            alt="Pro-Crick"
            width={170}
            height={120}
            className={`h-12 w-auto ${inverted ? 'invert' : ''}`}
            priority
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 text-base font-semibold lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 ${inverted ? 'text-white/72 hover:text-white' : 'text-foreground/68 hover:text-accent'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/players"
          className="inline-flex min-h-11 items-center justify-center bg-accent px-5 text-sm font-medium !text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          Player Directory
        </Link>
      </div>
    </header>
  )
}
