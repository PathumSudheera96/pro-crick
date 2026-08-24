import config from '@payload-config'
import { getPayload } from 'payload'

import { buildPlayerDraftFromApplication } from '@/lib/players/buildPlayerDraftFromApplication'

export const convertPlayerApplicationToPlayerDraft = async (applicationID: number) => {
  const payload = await getPayload({ config })
  const application = await payload.findByID({
    collection: 'player-applications',
    depth: 1,
    id: applicationID,
    overrideAccess: true,
  })

  if (!application.nationality || !application.cricketRole) {
    throw new Error('Player application must include a nationality and cricket role before conversion.')
  }

  const player = await payload.create({
    collection: 'players',
    data: {
      fullName: application.applicantName,
      ...buildPlayerDraftFromApplication(application),
    },
    draft: false,
    overrideAccess: true,
  })

  await payload.update({
    id: applicationID,
    collection: 'player-applications',
    data: {
      applicationStatus: 'approved',
    },
    draft: false,
    overrideAccess: true,
  })

  return player
}

export { buildPlayerDraftFromApplication } from '@/lib/players/buildPlayerDraftFromApplication'
