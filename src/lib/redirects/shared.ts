export type RedirectStatusCode = 301 | 302

export type RedirectRecordLike = {
  enabled?: boolean | null
  fromPath: string
  redirectType: RedirectStatusCode | '301' | '302'
  toPath: string
}

const PROTECTED_PREFIXES = ['/admin', '/api', '/_next']
const PROTECTED_EXACT_PATHS = ['/favicon.ico', '/robots.txt', '/sitemap.xml']

export const normalizeRedirectPath = (value: string): string => {
  const trimmed = value.trim()

  if (!trimmed) {
    return '/'
  }

  const candidate = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const [pathname] = candidate.split(/[?#]/, 1)

  if (!pathname || pathname === '/') {
    return '/'
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export const isProtectedRedirectPath = (value: string): boolean => {
  const normalized = normalizeRedirectPath(value)

  if (PROTECTED_EXACT_PATHS.includes(normalized)) {
    return true
  }

  return PROTECTED_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  )
}

export const validateRedirectPath = (value: string, label: 'fromPath' | 'toPath'): true | string => {
  if (!value.trim()) {
    return `${label} is required.`
  }

  if (value.includes('://') || value.startsWith('//')) {
    return `${label} must be an internal path.`
  }

  if (value.includes('?') || value.includes('#')) {
    return `${label} must not include query strings or fragments.`
  }

  if (isProtectedRedirectPath(value)) {
    return `${label} cannot target protected internal routes.`
  }

  return true
}

export const validateRedirectPair = (fromPath: string, toPath: string): true | string => {
  const fromValidation = validateRedirectPath(fromPath, 'fromPath')
  if (fromValidation !== true) {
    return fromValidation
  }

  const toValidation = validateRedirectPath(toPath, 'toPath')
  if (toValidation !== true) {
    return toValidation
  }

  if (normalizeRedirectPath(fromPath) === normalizeRedirectPath(toPath)) {
    return 'Redirect source and destination cannot be the same path.'
  }

  return true
}

export const resolveRedirectMatch = (
  pathname: string,
  redirects: RedirectRecordLike[],
): { statusCode: RedirectStatusCode; toPath: string } | null => {
  const normalizedPath = normalizeRedirectPath(pathname)

  for (const redirect of redirects) {
    if (!redirect.enabled) {
      continue
    }

    if (validateRedirectPair(redirect.fromPath, redirect.toPath) !== true) {
      continue
    }

    if (normalizeRedirectPath(redirect.fromPath) !== normalizedPath) {
      continue
    }

    const toPath = normalizeRedirectPath(redirect.toPath)

    if (toPath === normalizedPath) {
      continue
    }

    return {
      statusCode: Number(redirect.redirectType) === 302 ? 302 : 301,
      toPath,
    }
  }

  return null
}
