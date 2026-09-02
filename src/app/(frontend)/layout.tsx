import type { Metadata } from 'next'
import { ChatWidget } from '@/components/site/ChatWidget'
import { SiteAnimations } from '@/components/site/SiteAnimations'
import { getSiteSettings } from '@/lib/queries/content'
import { buildSeoMetadata, getSiteUrl } from '@/lib/seo/metadata'
import './styles.css'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await getSiteSettings().catch(() => null)

  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget whatsAppNumber={siteSettings?.whatsApp} />
        <SiteAnimations />
      </body>
    </html>
  )
}
