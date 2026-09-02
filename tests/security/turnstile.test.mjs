import assert from 'node:assert/strict'
import test from 'node:test'

import { verifyTurnstileToken } from '../../src/lib/security/turnstile.ts'

const originalFetch = globalThis.fetch

test.afterEach(() => {
  globalThis.fetch = originalFetch
})

test('verifyTurnstileToken skips verification when no secret key is configured', async () => {
  const result = await verifyTurnstileToken({
    secretKey: undefined,
    token: undefined,
  })

  assert.deepEqual(result, { ok: true })
})

test('verifyTurnstileToken requires a token when a secret key is configured', async () => {
  const result = await verifyTurnstileToken({
    secretKey: 'secret',
    token: '',
  })

  assert.deepEqual(result, {
    error: 'Please complete the spam protection check.',
    ok: false,
    status: 400,
  })
})

test('verifyTurnstileToken accepts a successful Siteverify response', async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ success: true }), {
      status: 200,
    })

  const result = await verifyTurnstileToken({
    remoteIp: '203.0.113.10',
    secretKey: 'secret',
    token: 'token',
  })

  assert.deepEqual(result, { ok: true })
})

test('verifyTurnstileToken rejects a failed Siteverify response', async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ success: false, 'error-codes': ['invalid-input-response'] }), {
      status: 200,
    })

  const result = await verifyTurnstileToken({
    secretKey: 'secret',
    token: 'token',
  })

  assert.deepEqual(result, {
    error: 'Spam protection check failed. Please try again.',
    ok: false,
    status: 400,
  })
})
