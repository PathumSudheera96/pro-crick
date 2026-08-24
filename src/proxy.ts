import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { isProtectedRedirectPath } from '@/lib/redirects/shared'

const PUBLIC_FILE_PATTERN = /\.[^/]+$/

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (PUBLIC_FILE_PATTERN.test(pathname) || isProtectedRedirectPath(pathname)) {
    return NextResponse.next()
  }

  const response = await fetch(
    new URL(`/api/redirects/resolve?path=${encodeURIComponent(pathname)}`, request.url),
    {
      headers: {
        'x-pro-crick-internal-secret': process.env.PAYLOAD_SECRET || '',
      },
    },
  )

  if (!response.ok) {
    return NextResponse.next()
  }

  const redirect = (await response.json()) as
    | { statusCode: 301 | 302; toPath: string }
    | { redirect: null }

  if (!('toPath' in redirect)) {
    return NextResponse.next()
  }

  const destination = new URL(redirect.toPath, request.url)

  if (destination.pathname === pathname || isProtectedRedirectPath(destination.pathname)) {
    return NextResponse.next()
  }

  destination.search = search

  return NextResponse.redirect(destination, redirect.statusCode)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
