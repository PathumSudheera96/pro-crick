import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'
import { ChatWidget } from '@/components/site/ChatWidget'
import { SiteAnimations } from '@/components/site/SiteAnimations'
import { buildSeoMetadata, getSiteUrl } from '@/lib/seo/metadata'
import './styles.css'

const displayFont = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-family',
  display: 'swap',
})

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-family',
  display: 'swap',
})

export const metadata: Metadata = {
  ...buildSeoMetadata({
    contentTitle: 'Pro-Crick',
    path: '/',
    summary: 'Professional cricket talent connection platform and player agency.',
  }),
  icons: {
    icon: [
      { url: '/images/pro-crick-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/pro-crick-ICO.ico', type: 'image/x-icon' },
    ],
    apple: '/images/pro-crick-512.png',
  },
  metadataBase: new URL(getSiteUrl()),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
        <ChatWidget />
        <SiteAnimations />
      </body>
    </html>
  )
}
