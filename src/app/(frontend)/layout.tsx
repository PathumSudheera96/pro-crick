import type { Metadata } from 'next'
import { Archivo, Zilla_Slab } from 'next/font/google'
import './styles.css'

const displayFont = Zilla_Slab({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-family',
  display: 'swap',
})

const bodyFont = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-family',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pro-Crick',
  description: 'Professional cricket player agency and custom CMS.',
  icons: {
    icon: [
      { url: '/images/pro-crick-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/pro-crick-ICO.ico', type: 'image/x-icon' },
    ],
    apple: '/images/pro-crick-512.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
