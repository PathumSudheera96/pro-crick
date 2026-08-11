import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  title: 'Pro-Crick',
  description: 'Professional cricket player agency and custom CMS.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
