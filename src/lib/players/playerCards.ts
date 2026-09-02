import type { PlayerCardData } from '@/components/players/PlayerCard'
import type { Club, Country, Media, Player, PlayingRole } from '@/payload-types'

import { getStaticPlayerImageUrl } from './staticPlayers'

export const getNamedRelationship = (
  value: number | Club | Country | PlayingRole | null | undefined,
): string | null => {
  if (value && typeof value === 'object' && 'name' in value && typeof value.name === 'string') {
    return value.name
  }

  return null
}

export const getMediaUrl = (value: number | Media | null | undefined): string | null => {
  if (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string') {
    return value.url
  }

  return null
}

export const formatPlayerStatus = (status: Player['playerStatus']): string => {
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

export const mapPlayerToCardData = (player: Player): PlayerCardData => {
  return {
    club: getNamedRelationship(player.currentClub),
    imageUrl: getStaticPlayerImageUrl(player.slug) || getMediaUrl(player.profileImage),
    introduction: player.shortIntroduction,
    nationality: getNamedRelationship(player.nationality) || 'Nationality on request',
    role: getNamedRelationship(player.primaryRole) || 'Cricket player',
    slug: player.slug,
    status: formatPlayerStatus(player.playerStatus),
    title: player.fullName,
  }
}
