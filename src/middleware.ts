import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { findRedirectForPath } from '@/lib/redirects/runtime'
import { isProtectedRedirectPath } from '@/lib/redirects/shared'

const PUBLIC_FILE_PATTERN = /\.[^/]+$/

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (PUBLIC_FILE_PATTERN.test(pathname) || isProtectedRedirectPath(pathname)) {
    return NextResponse.next()
  }

  const redirect = await findRedirectForPath(pathname)

  if (!redirect) {
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
