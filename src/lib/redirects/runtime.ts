import config from '@payload-config'
import { getPayload } from 'payload'

import { isBackendUnavailableError } from '@/lib/backendAvailability'
import { normalizeRedirectPath, resolveRedirectMatch } from '@/lib/redirects/shared'

export const findRedirectForPath = async (pathname: string) => {
  try {
    const payload = await getPayload({ config })
    const normalizedPath = normalizeRedirectPath(pathname)
    const results = await payload.find({
      collection: 'redirects',
      depth: 0,
      limit: 5,
      overrideAccess: true,
      pagination: false,
      where: {
        and: [
          {
            enabled: {
              equals: true,
            },
          },
          {
            fromPath: {
              equals: normalizedPath,
            },
          },
        ],
      },
    })

    return resolveRedirectMatch(normalizedPath, results.docs)
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      return null
    }

    throw error
  }
}
