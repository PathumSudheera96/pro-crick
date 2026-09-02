import config from '@payload-config'
import { getPayload } from 'payload'

import { generateEnquiryReferenceNumber } from '@/collections/Enquiries'
import { BACKEND_UNAVAILABLE_MESSAGE, isBackendUnavailableError } from '@/lib/backendAvailability'
import { consumeRateLimit } from '@/lib/security/rateLimit'
import { validateEnquirySubmission } from '@/lib/validation/enquiries'

export const dynamic = 'force-dynamic'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60_000

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const rateLimitKey = forwardedFor?.split(',')[0]?.trim() || 'anonymous'
  const rateLimit = consumeRateLimit(rateLimitKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)

  if (!rateLimit.ok) {
    return Response.json(
      { error: 'Too many enquiries submitted. Please wait and try again.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
        },
      },
    )
  }

  const body = (await request.json()) as Record<string, string | undefined>
  const validation = validateEnquirySubmission(body)

  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: validation.status })
  }

  try {
    const payload = await getPayload({ config })
    let relatedPlayer: number | undefined

    if (validation.data.playerSlug) {
      const player = await payload.find({
        collection: 'players',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        pagination: false,
        where: {
          slug: {
            equals: validation.data.playerSlug,
          },
        },
      })

      relatedPlayer = player.docs[0]?.id
    }

    const enquiry = await payload.create({
      collection: 'enquiries',
      data: {
        clubOrOrganization: validation.data.clubOrOrganization,
        country: validation.data.country,
        email: validation.data.email,
        message: validation.data.message,
        name: validation.data.name,
        phone: validation.data.phone,
        relatedPlayer,
        referenceNumber: generateEnquiryReferenceNumber(),
        status: 'new',
      },
      draft: false,
      overrideAccess: true,
    })

    return Response.json(
      {
        message: 'Enquiry submitted successfully.',
        referenceNumber: enquiry.referenceNumber,
      },
      { status: 201 },
    )
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      return Response.json({ error: BACKEND_UNAVAILABLE_MESSAGE }, { status: 503 })
    }

    throw error
  }
}
