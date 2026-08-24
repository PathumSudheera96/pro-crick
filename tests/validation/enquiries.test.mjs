import assert from 'node:assert/strict'
import test from 'node:test'

import { consumeRateLimit } from '../../src/lib/security/rateLimit.ts'
import { validateEnquirySubmission } from '../../src/lib/validation/enquiries.ts'

test('validateEnquirySubmission accepts valid payloads', () => {
  assert.deepEqual(
    validateEnquirySubmission({
      email: 'Club@example.com',
      message: 'We would like to discuss a possible player placement.',
      name: 'Richmond CC',
      playerSlug: 'kasun-jayawardena',
    }),
    {
      data: {
        clubOrOrganization: undefined,
        country: undefined,
        email: 'club@example.com',
        message: 'We would like to discuss a possible player placement.',
        name: 'Richmond CC',
        phone: undefined,
        playerSlug: 'kasun-jayawardena',
      },
      ok: true,
    },
  )
})

test('validateEnquirySubmission rejects honeypot spam and malformed input', () => {
  assert.deepEqual(
    validateEnquirySubmission({
      email: 'bad-email',
      message: 'short',
      name: 'A',
      website: 'https://spam.example.com',
    }),
    {
      error: 'Spam protection triggered.',
      ok: false,
      status: 400,
    },
  )
})

test('consumeRateLimit blocks after the configured limit', () => {
  const first = consumeRateLimit('test-enquiries', 2, 60_000)
  const second = consumeRateLimit('test-enquiries', 2, 60_000)
  const third = consumeRateLimit('test-enquiries', 2, 60_000)

  assert.equal(first.ok, true)
  assert.equal(second.ok, true)
  assert.equal(third.ok, false)
})
