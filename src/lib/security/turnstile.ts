const TURNSTILE_SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TURNSTILE_TOKEN_MAX_LENGTH = 2048
const TURNSTILE_TIMEOUT_MS = 5000

export type TurnstileVerificationResult =
  | {
      ok: true
    }
  | {
      error: string
      ok: false
      status: number
    }

type TurnstileSiteverifyResponse = {
  success?: boolean
  'error-codes'?: string[]
}

const normalize = (value?: string | null): string | undefined => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export const isTurnstileConfigured = (
  siteKey?: string | null,
  secretKey?: string | null,
): boolean => {
  return Boolean(normalize(siteKey) && normalize(secretKey))
}

export const verifyTurnstileToken = async ({
  remoteIp,
  secretKey,
  token,
}: {
  remoteIp?: string
  secretKey?: string | null
  token?: string | null
}): Promise<TurnstileVerificationResult> => {
  const normalizedSecret = normalize(secretKey)

  if (!normalizedSecret) {
    return { ok: true }
  }

  const normalizedToken = normalize(token)

  if (!normalizedToken) {
    return {
      error: 'Please complete the spam protection check.',
      ok: false,
      status: 400,
    }
  }

  if (normalizedToken.length > TURNSTILE_TOKEN_MAX_LENGTH) {
    return {
      error: 'Spam protection check failed. Please try again.',
      ok: false,
      status: 400,
    }
  }

  const formData = new FormData()
  formData.append('secret', normalizedSecret)
  formData.append('response', normalizedToken)

  if (remoteIp) {
    formData.append('remoteip', remoteIp)
  }

  try {
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      body: formData,
      method: 'POST',
      signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
    })

    const result = (await response.json()) as TurnstileSiteverifyResponse

    if (response.ok && result.success) {
      return { ok: true }
    }

    return {
      error: 'Spam protection check failed. Please try again.',
      ok: false,
      status: 400,
    }
  } catch {
    return {
      error: 'Spam protection is unavailable right now. Please try again shortly.',
      ok: false,
      status: 503,
    }
  }
}
