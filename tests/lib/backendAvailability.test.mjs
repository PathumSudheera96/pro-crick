import assert from 'node:assert/strict'
import test from 'node:test'

import {
  BACKEND_UNAVAILABLE_MESSAGE,
  isBackendUnavailableError,
} from '../../src/lib/backendAvailability.ts'

test('isBackendUnavailableError detects payload init and postgres connection failures', () => {
  assert.equal(isBackendUnavailableError({ payloadInitError: true }), true)
  assert.equal(isBackendUnavailableError({ code: 'ECONNREFUSED' }), true)
  assert.equal(isBackendUnavailableError({ code: 'EPERM' }), true)
  assert.equal(
    isBackendUnavailableError({ message: 'Error: cannot connect to Postgres: connection refused' }),
    true,
  )
  assert.equal(isBackendUnavailableError({ message: 'Some other failure' }), false)
  assert.equal(isBackendUnavailableError(null), false)
})

test('backend unavailable message stays user friendly and stable', () => {
  assert.equal(
    BACKEND_UNAVAILABLE_MESSAGE,
    'Service not available at the moment. Please try again shortly.',
  )
})
