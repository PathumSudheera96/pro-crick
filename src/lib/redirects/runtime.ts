import config from '@payload-config'
import { getPayload } from 'payload'

import { normalizeRedirectPath, resolveRedirectMatch } from '@/lib/redirects/shared'

export const findRedirectForPath = async (pathname: string) => {
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
}
