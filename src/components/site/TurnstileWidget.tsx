'use client'

import Script from 'next/script'

export function TurnstileWidget({ siteKey }: { siteKey?: string | null }) {
  if (!siteKey) {
    return null
  }

  return (
    <div className="grid gap-2">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div className="cf-turnstile" data-sitekey={siteKey} />
    </div>
  )
}
