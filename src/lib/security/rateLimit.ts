type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export const consumeRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; remaining: number; resetAt: number } => {
  const now = Date.now()
  const existing = rateLimitStore.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs

    rateLimitStore.set(key, {
      count: 1,
      resetAt,
    })

    return {
      ok: true,
      remaining: limit - 1,
      resetAt,
    }
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: existing.resetAt,
    }
  }

  existing.count += 1
  rateLimitStore.set(key, existing)

  return {
    ok: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  }
}
