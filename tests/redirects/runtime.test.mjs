import assert from 'node:assert/strict'
import test from 'node:test'

import { resolveRedirectMatch } from '../../src/lib/redirects/shared.ts'

test('resolveRedirectMatch returns a 301 redirect for a valid enabled record', () => {
  assert.deepEqual(
    resolveRedirectMatch('/players/old-path', [
      {
        enabled: true,
        fromPath: '/players/old-path',
        redirectType: '301',
        toPath: '/players/new-path',
      },
    ]),
    {
      statusCode: 301,
      toPath: '/players/new-path',
    },
  )
})

test('resolveRedirectMatch returns a 302 redirect when configured', () => {
  assert.deepEqual(
    resolveRedirectMatch('/about-us', [
      {
        enabled: true,
        fromPath: '/about-us',
        redirectType: '302',
        toPath: '/about',
      },
    ]),
    {
      statusCode: 302,
      toPath: '/about',
    },
  )
})

test('resolveRedirectMatch ignores disabled redirects', () => {
  assert.equal(
    resolveRedirectMatch('/disabled', [
      {
        enabled: false,
        fromPath: '/disabled',
        redirectType: '301',
        toPath: '/target',
      },
    ]),
    null,
  )
})

test('resolveRedirectMatch ignores self redirects', () => {
  assert.equal(
    resolveRedirectMatch('/same-path', [
      {
        enabled: true,
        fromPath: '/same-path',
        redirectType: '301',
        toPath: '/same-path',
      },
    ]),
    null,
  )
})

test('resolveRedirectMatch returns null for unknown paths', () => {
  assert.equal(
    resolveRedirectMatch('/unknown', [
      {
        enabled: true,
        fromPath: '/known',
        redirectType: '301',
        toPath: '/destination',
      },
    ]),
    null,
  )
})
