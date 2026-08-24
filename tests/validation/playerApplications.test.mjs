import assert from 'node:assert/strict'
import test from 'node:test'

import { buildPlayerDraftFromApplication } from '../../src/lib/players/buildPlayerDraftFromApplication.ts'
import { validatePlayerApplicationSubmission } from '../../src/lib/validation/playerApplications.ts'

test('validatePlayerApplicationSubmission accepts valid application payloads', () => {
  const result = validatePlayerApplicationSubmission({
    applicantName: 'Kasun Jayawardena',
    biography:
      'Experienced top-order player with first-class background and overseas club ambitions for the next season.',
    cricketRoleSlug: 'batting-all-rounder',
    email: 'kasun@example.com',
    youtubeVideos: ['https://youtube.com/watch?v=123'],
  })

  assert.equal(result.ok, true)
  if (result.ok) {
    assert.equal(result.data.applicantName, 'Kasun Jayawardena')
    assert.equal(result.data.email, 'kasun@example.com')
    assert.deepEqual(result.data.youtubeVideos, [{ url: 'https://youtube.com/watch?v=123' }])
  }
})

test('validatePlayerApplicationSubmission rejects invalid payloads', () => {
  assert.deepEqual(
    validatePlayerApplicationSubmission({
      applicantName: 'A',
      biography: 'too short',
      email: 'not-an-email',
      website: 'https://spam.example.com',
    }),
    {
      error: 'Spam protection triggered.',
      ok: false,
      status: 400,
    },
  )
})

test('buildPlayerDraftFromApplication converts approved application data into a player draft shape', () => {
  assert.deepEqual(
    buildPlayerDraftFromApplication({
      applicantName: 'Kasun Jayawardena',
      biography: 'Long-form biography for the player application.',
      cricketRole: { id: 10 },
      currentClub: { id: 20 },
      nationality: { id: 30 },
      statistics: 'Top-order batter averaging 40 in first-class cricket.',
      teamsExperience: 'Colombo CC, UK league cricket',
      vimeoVideos: [{ url: 'https://vimeo.com/123' }],
      youtubeVideos: [{ url: 'https://youtube.com/watch?v=123' }],
    }),
    {
      biography: 'Long-form biography for the player application.',
      currentClub: 20,
      nationality: 30,
      playerStatus: 'available',
      playingExperience: 'Colombo CC, UK league cricket',
      primaryRole: 10,
      sortOrder: 0,
      shortIntroduction: 'Top-order batter averaging 40 in first-class cricket.',
      slug: 'kasun-jayawardena',
      status: 'draft',
      vimeoVideos: [{ url: 'https://vimeo.com/123' }],
      youtubeVideos: [{ url: 'https://youtube.com/watch?v=123' }],
    },
  )
})
