import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildPlayersSearch,
  buildPlayerDirectoryWhere,
  hasActiveDirectoryCriteria,
  parseDirectoryFilters,
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

test('parseDirectoryFilters normalizes search param input', () => {
  assert.deepEqual(
    parseDirectoryFilters({
      page: '2',
      query: [' Kasun '],
      role: 'batting-all-rounder',
      sort: 'recent',
    }),
    {
      availability: '',
      eligibleCountry: '',
      limit: 12,
      nationality: '',
      page: 2,
      query: 'Kasun',
      role: 'batting-all-rounder',
      sort: 'recent',
    },
  )
})

test('buildPlayersSearch includes only active filters and non-default page', () => {
  assert.equal(
    buildPlayersSearch(
      sanitizeDirectoryFilters({
        page: 2,
        query: 'Kasun',
        sort: 'featured',
      }),
    ),
    'query=Kasun&sort=featured&page=2',
  )
})

test('hasActiveDirectoryCriteria ignores sort and page-only state', () => {
  assert.equal(
    hasActiveDirectoryCriteria(
      sanitizeDirectoryFilters({
        page: 3,
        sort: 'recent',
      }),
    ),
    false,
  )
  assert.equal(
    hasActiveDirectoryCriteria(
      sanitizeDirectoryFilters({
        availability: 'available',
      }),
    ),
    true,
  )
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
