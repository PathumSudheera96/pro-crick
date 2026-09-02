import { NotFoundContent } from '@/components/site/NotFoundContent'
import './(frontend)/styles.css'

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Page not found — Pro-Crick</title>
      </head>
      <body>
        <NotFoundContent />
      </body>
    </html>
  )
}
