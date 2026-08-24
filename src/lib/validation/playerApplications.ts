export type PlayerApplicationSubmission = {
  biography?: string
  cricketRoleSlug?: string
  currentClubSlug?: string
  email?: string
  nationalitySlug?: string
  phone?: string
  statistics?: string
  teamsExperience?: string
  website?: string
  youtubeVideos?: string[]
  vimeoVideos?: string[]
  applicantName?: string
}

export type PlayerApplicationValidationResult =
  | {
      data: {
        applicantName: string
        biography: string
        cricketRoleSlug?: string
        currentClubSlug?: string
        email: string
        nationalitySlug?: string
        phone?: string
        statistics?: string
        teamsExperience?: string
        youtubeVideos: { url: string }[]
        vimeoVideos: { url: string }[]
      }
      ok: true
    }
  | {
      error: string
      ok: false
      status: number
    }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeOptional = (value?: string): string | undefined => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

const normalizeVideoLinks = (urls?: string[]): { url: string }[] => {
  return (urls || [])
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url) => ({ url }))
}

export const validatePlayerApplicationSubmission = (
  input: PlayerApplicationSubmission,
): PlayerApplicationValidationResult => {
  if (input.website?.trim()) {
    return {
      error: 'Spam protection triggered.',
      ok: false,
      status: 400,
    }
  }

  const applicantName = input.applicantName?.trim()
  const email = input.email?.trim().toLowerCase()
  const biography = input.biography?.trim()

  if (!applicantName || applicantName.length < 2) {
    return {
      error: 'Applicant name is required.',
      ok: false,
      status: 400,
    }
  }

  if (!email || !emailPattern.test(email)) {
    return {
      error: 'A valid email address is required.',
      ok: false,
      status: 400,
    }
  }

  if (!biography || biography.length < 30) {
    return {
      error: 'Biography must be at least 30 characters.',
      ok: false,
      status: 400,
    }
  }

  return {
    data: {
      applicantName,
      biography,
      cricketRoleSlug: normalizeOptional(input.cricketRoleSlug),
      currentClubSlug: normalizeOptional(input.currentClubSlug),
      email,
      nationalitySlug: normalizeOptional(input.nationalitySlug),
      phone: normalizeOptional(input.phone),
      statistics: normalizeOptional(input.statistics),
      teamsExperience: normalizeOptional(input.teamsExperience),
      vimeoVideos: normalizeVideoLinks(input.vimeoVideos),
      youtubeVideos: normalizeVideoLinks(input.youtubeVideos),
    },
    ok: true,
  }
}
