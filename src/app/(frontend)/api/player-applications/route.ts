import config from '@payload-config'
import { getPayload } from 'payload'
import type { File as PayloadFile } from 'payload'

import { generatePlayerApplicationReferenceNumber } from '@/collections/PlayerApplications'
import { getIntegrationsSettings } from '@/lib/queries/content'
import { consumeRateLimit } from '@/lib/security/rateLimit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'
import { validatePlayerApplicationSubmission } from '@/lib/validation/playerApplications'

export const dynamic = 'force-dynamic'

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_PHOTO_BYTES = 5 * 1024 * 1024
const MAX_CV_BYTES = 10 * 1024 * 1024

const toPayloadFile = async (file: File): Promise<PayloadFile> => {
  const arrayBuffer = await file.arrayBuffer()

  return {
    data: Buffer.from(arrayBuffer),
    mimetype: file.type,
    name: file.name,
    size: file.size,
  }
}

const validateUpload = (
  file: File | null,
  allowedMimeTypes: string[],
  maxBytes: number,
  label: string,
): { error?: string } => {
  if (!file) {
    return {}
  }

  if (!allowedMimeTypes.includes(file.type)) {
    return { error: `${label} has an invalid file type.` }
  }

  if (file.size > maxBytes) {
    return { error: `${label} exceeds the allowed size.` }
  }

  return {}
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const rateLimitKey = forwardedFor?.split(',')[0]?.trim() || 'anonymous'
  const rateLimit = consumeRateLimit(rateLimitKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)

  if (!rateLimit.ok) {
    return Response.json(
      { error: 'Too many applications submitted. Please wait and try again.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
        },
      },
    )
  }

  const formData = await request.formData()
  const profilePhoto = formData.get('profilePhoto')
  const playerCv = formData.get('playerCv')

  const validation = validatePlayerApplicationSubmission({
    applicantName: formData.get('applicantName')?.toString(),
    biography: formData.get('biography')?.toString(),
    cricketRoleSlug: formData.get('cricketRoleSlug')?.toString(),
    currentClubSlug: formData.get('currentClubSlug')?.toString(),
    email: formData.get('email')?.toString(),
    nationalitySlug: formData.get('nationalitySlug')?.toString(),
    phone: formData.get('phone')?.toString(),
    statistics: formData.get('statistics')?.toString(),
    teamsExperience: formData.get('teamsExperience')?.toString(),
    vimeoVideos: formData.getAll('vimeoVideos').map(String),
    website: formData.get('website')?.toString(),
    youtubeVideos: formData.getAll('youtubeVideos').map(String),
  })

  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: validation.status })
  }

  const integrations = await getIntegrationsSettings()
  const turnstile = await verifyTurnstileToken({
    remoteIp: rateLimitKey,
    secretKey: integrations.cloudflareTurnstileSecretKey,
    token: formData.get('cf-turnstile-response')?.toString(),
  })

  if (!turnstile.ok) {
    return Response.json({ error: turnstile.error }, { status: turnstile.status })
  }

  const photoValidation = validateUpload(
    profilePhoto instanceof File ? profilePhoto : null,
    ['image/jpeg', 'image/png', 'image/webp'],
    MAX_PHOTO_BYTES,
    'Profile photo',
  )
  if (photoValidation.error) {
    return Response.json({ error: photoValidation.error }, { status: 400 })
  }

  const cvValidation = validateUpload(
    playerCv instanceof File ? playerCv : null,
    ['application/pdf'],
    MAX_CV_BYTES,
    'CV',
  )
  if (cvValidation.error) {
    return Response.json({ error: cvValidation.error }, { status: 400 })
  }

  const payload = await getPayload({ config })

  const [nationality, role, currentClub] = await Promise.all([
    validation.data.nationalitySlug
      ? payload.find({
          collection: 'countries',
          depth: 0,
          limit: 1,
          overrideAccess: true,
          pagination: false,
          where: { slug: { equals: validation.data.nationalitySlug } },
        })
      : Promise.resolve({ docs: [] }),
    validation.data.cricketRoleSlug
      ? payload.find({
          collection: 'playing-roles',
          depth: 0,
          limit: 1,
          overrideAccess: true,
          pagination: false,
          where: { slug: { equals: validation.data.cricketRoleSlug } },
        })
      : Promise.resolve({ docs: [] }),
    validation.data.currentClubSlug
      ? payload.find({
          collection: 'clubs',
          depth: 0,
          limit: 1,
          overrideAccess: true,
          pagination: false,
          where: { slug: { equals: validation.data.currentClubSlug } },
        })
      : Promise.resolve({ docs: [] }),
  ])

  const uploadedProfilePhoto =
    profilePhoto instanceof File
      ? await payload.create({
          collection: 'application-uploads',
          data: {
            label: `${validation.data.applicantName} profile photo`,
          },
          draft: false,
          file: await toPayloadFile(profilePhoto),
          overrideAccess: true,
        })
      : null

  const uploadedCv =
    playerCv instanceof File
      ? await payload.create({
          collection: 'application-uploads',
          data: {
            label: `${validation.data.applicantName} CV`,
          },
          draft: false,
          file: await toPayloadFile(playerCv),
          overrideAccess: true,
        })
      : null

  const application = await payload.create({
    collection: 'player-applications',
    data: {
      applicantName: validation.data.applicantName,
      applicationStatus: 'new',
      biography: validation.data.biography,
      cricketRole: role.docs[0]?.id,
      currentClub: currentClub.docs[0]?.id,
      email: validation.data.email,
      nationality: nationality.docs[0]?.id,
      phone: validation.data.phone,
      playerCv: uploadedCv?.id,
      profilePhoto: uploadedProfilePhoto?.id,
      referenceNumber: generatePlayerApplicationReferenceNumber(),
      statistics: validation.data.statistics,
      teamsExperience: validation.data.teamsExperience,
      vimeoVideos: validation.data.vimeoVideos,
      youtubeVideos: validation.data.youtubeVideos,
    },
    draft: false,
    overrideAccess: true,
  })

  return Response.json(
    {
      message: 'Player application submitted successfully.',
      referenceNumber: application.referenceNumber,
    },
    { status: 201 },
  )
}
