import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildPlayerDirectoryWhere,
  resolvePlayerDirectorySort,
  sanitizeDirectoryFilters,
} from '../../src/lib/queries/playerDirectory.ts'

test('sanitizeDirectoryFilters applies defaults and clamps pagination', () => {
  assert.deepEqual(
    sanitizeDirectoryFilters({
      limit: 200,
      page: 0,
    }),
    {
      availability: '',
      eligibleCountry: '',
      limit: 48,
      nationality: '',
      page: 1,
      query: '',
      role: '',
      sort: 'featured',
    },
  )
})

test('resolvePlayerDirectorySort maps directory sorts to payload sorts', () => {
  assert.equal(resolvePlayerDirectorySort('alphabetical'), 'fullName')
  assert.equal(resolvePlayerDirectorySort('recent'), '-updatedAt')
  assert.deepEqual(resolvePlayerDirectorySort('featured'), ['-featured', 'sortOrder', 'fullName'])
})

test('buildPlayerDirectoryWhere always enforces published status and optional filters', () => {
  assert.deepEqual(
    buildPlayerDirectoryWhere({
      availability: 'available',
      eligibleCountry: 'united-kingdom',
      nationality: 'sri-lanka',
      query: 'Kasun',
      role: 'batting-all-rounder',
    }),
    {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          or: [
            { fullName: { like: 'Kasun' } },
            { shortIntroduction: { like: 'Kasun' } },
            { biography: { like: 'Kasun' } },
          ],
        },
        {
          primaryRole: {
            equals: 'batting-all-rounder',
          },
        },
        {
          nationality: {
            equals: 'sri-lanka',
          },
        },
        {
          playerStatus: {
            equals: 'available',
          },
        },
        {
          eligibleCountries: {
            in: ['united-kingdom'],
          },
        },
      ],
    },
  )
})
