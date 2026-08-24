export type EnquirySubmission = {
  clubOrOrganization?: string
  country?: string
  email?: string
  message?: string
  name?: string
  phone?: string
  playerSlug?: string
  website?: string
}

export type EnquiryValidationResult =
  | {
      data: {
        clubOrOrganization?: string
        country?: string
        email: string
        message: string
        name: string
        phone?: string
        playerSlug?: string
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

export const validateEnquirySubmission = (
  input: EnquirySubmission,
): EnquiryValidationResult => {
  if (input.website?.trim()) {
    return {
      error: 'Spam protection triggered.',
      ok: false,
      status: 400,
    }
  }

  const name = input.name?.trim()
  const email = input.email?.trim().toLowerCase()
  const message = input.message?.trim()

  if (!name || name.length < 2) {
    return {
      error: 'Name is required.',
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

  if (!message || message.length < 10) {
    return {
      error: 'Message must be at least 10 characters.',
      ok: false,
      status: 400,
    }
  }

  return {
    data: {
      clubOrOrganization: normalizeOptional(input.clubOrOrganization),
      country: normalizeOptional(input.country),
      email,
      message,
      name,
      phone: normalizeOptional(input.phone),
      playerSlug: normalizeOptional(input.playerSlug),
    },
    ok: true,
  }
}
