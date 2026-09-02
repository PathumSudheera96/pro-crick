import type { Country, Player, PlayerApplication, PlayingRole, Club } from '@/payload-types'

type RelationshipValue = number | Country | PlayingRole | Club | null | undefined
type PlayerDraftData = Pick<
  Player,
  | 'biography'
  | 'currentClub'
  | 'nationality'
  | 'playerCategory'
  | 'playingExperience'
  | 'playerStatus'
  | 'primaryRole'
  | 'sortOrder'
  | 'shortIntroduction'
  | 'slug'
  | 'status'
  | 'vimeoVideos'
  | 'youtubeVideos'
>

const toRelationID = (value: RelationshipValue): number | undefined => {
  if (typeof value === 'number') {
    return value
  }

  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'number') {
    return value.id
  }

  return undefined
}

export const buildPlayerDraftFromApplication = (application: Pick<
  PlayerApplication,
  | 'applicantName'
  | 'biography'
  | 'cricketRole'
  | 'currentClub'
  | 'nationality'
  | 'statistics'
  | 'teamsExperience'
  | 'vimeoVideos'
  | 'youtubeVideos'
>): PlayerDraftData => {
  const nationality = toRelationID(application.nationality)
  const primaryRole = toRelationID(application.cricketRole)

  if (!nationality || !primaryRole) {
    throw new Error('Player application must include a nationality and cricket role before conversion.')
  }

  const slug = application.applicantName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return {
    biography: application.biography,
    currentClub: toRelationID(application.currentClub),
    nationality,
    playerCategory: 'professional-player',
    playerStatus: 'available',
    playingExperience: application.teamsExperience || undefined,
    primaryRole,
    sortOrder: 0,
    shortIntroduction: application.statistics || application.biography.slice(0, 280),
    slug,
    status: 'draft',
    vimeoVideos: application.vimeoVideos || undefined,
    youtubeVideos: application.youtubeVideos || undefined,
  }
}
