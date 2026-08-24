import type { Club, Country, Media, Player, PlayingRole } from '@/payload-types'

const getNamedRelationship = (
  value: number | Club | Country | PlayingRole | null | undefined,
): string | undefined => {
  if (value && typeof value === 'object' && 'name' in value && typeof value.name === 'string') {
    return value.name
  }

  return undefined
}

const getRelationshipNames = (value: (number | Club)[] | null | undefined): string[] => {
  if (!value) {
    return []
  }

  return value
    .map((item) => getNamedRelationship(item))
    .filter((item): item is string => Boolean(item))
}

const getMediaUrl = (value: number | Media | null | undefined): string | null => {
  if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
    return value.url
  }

  return null
}

const formatPlayerStatus = (status: Player['playerStatus']) => {
  switch (status) {
    case 'contracted':
      return 'Contracted'
    case 'unavailable':
      return 'Unavailable'
    case 'available':
    default:
      return 'Available'
  }
}

const formatDateOfBirth = (value: string | null | undefined) => {
  if (!value) {
    return 'Not provided'
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

const getAge = (value: string | null | undefined): string => {
  if (!value) {
    return 'Not provided'
  }

  const today = new Date()
  const birthDate = new Date(value)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDelta = today.getMonth() - birthDate.getMonth()

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return String(age)
}

export type PlayerProfileViewModel = {
  age: string
  battingStyle: string
  biography: string
  bowlingStyle: string
  currentRole: string
  dateOfBirth: string
  imageUrl: string | null
  majorTeams: string
  name: string
  nationality: string
  profileLine: string
  status: string
}

export const mapPlayerToProfileViewModel = (player: Player): PlayerProfileViewModel => {
  const teams = [
    ...getRelationshipNames(player.teamsRepresented),
    ...getRelationshipNames(player.previousClubs),
  ]
  const currentClubName = getNamedRelationship(player.currentClub)
  const currentRoleName = getNamedRelationship(player.primaryRole) || 'Cricket player'
  const nationalityName = getNamedRelationship(player.nationality) || 'Not provided'

  if (currentClubName) {
    teams.unshift(currentClubName)
  }

  return {
    age: getAge(player.dateOfBirth),
    battingStyle: player.battingStyle || 'Available on request',
    biography: player.biography || 'Full player biography coming soon.',
    bowlingStyle: player.bowlingStyle || 'Available on request',
    currentRole: currentRoleName,
    dateOfBirth: formatDateOfBirth(player.dateOfBirth),
    imageUrl: getMediaUrl(player.profileImage),
    majorTeams: teams.length > 0 ? Array.from(new Set(teams)).join(', ') : 'Available on request',
    name: player.fullName,
    nationality: nationalityName,
    profileLine: player.shortIntroduction || player.biography || 'Player summary coming soon.',
    status: formatPlayerStatus(player.playerStatus),
  }
}
