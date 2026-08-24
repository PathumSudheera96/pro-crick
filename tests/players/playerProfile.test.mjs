import assert from 'node:assert/strict'
import test from 'node:test'

import { mapPlayerToProfileViewModel } from '../../src/lib/players/playerProfile.ts'

test('mapPlayerToProfileViewModel normalizes a published player for the profile page', () => {
  const result = mapPlayerToProfileViewModel({
    biography: 'Experienced opening batter with strong overseas ambitions.',
    bowlingStyle: 'right-arm-medium',
    createdAt: '2026-08-24T00:00:00.000Z',
    currentClub: { id: 4, name: 'Colombo CC' },
    currentLocation: null,
    dateOfBirth: '2000-01-15T00:00:00.000Z',
    featured: true,
    fullName: 'Kasun Jayawardena',
    gallery: null,
    id: 1,
    nationality: { id: 9, name: 'Sri Lanka' },
    playerStatus: 'available',
    primaryRole: { id: 2, name: 'Opening Batter' },
    profileImage: { id: 6, url: '/media/kasun.jpg' },
    publishedAt: '2026-08-24T00:00:00.000Z',
    seo: null,
    shortIntroduction: 'Technically strong top-order batter.',
    slug: 'kasun-jayawardena',
    sortOrder: 1,
    status: 'published',
    teamsRepresented: [{ id: 4, name: 'Colombo CC' }, { id: 5, name: 'Sri Lanka Emerging' }],
    updatedAt: '2026-08-24T00:00:00.000Z',
  })

  assert.equal(result.name, 'Kasun Jayawardena')
  assert.equal(result.currentRole, 'Opening Batter')
  assert.equal(result.nationality, 'Sri Lanka')
  assert.equal(result.imageUrl, '/media/kasun.jpg')
  assert.equal(result.profileLine, 'Technically strong top-order batter.')
  assert.equal(result.status, 'Available')
  assert.equal(result.majorTeams, 'Colombo CC, Sri Lanka Emerging')
})
