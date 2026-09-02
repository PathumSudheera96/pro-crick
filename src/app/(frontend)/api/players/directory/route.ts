import { mapPlayerToCardData } from '@/lib/players/playerCards'
import {
  getPublishedPlayers,
  parseDirectoryFilters,
} from '@/lib/queries/players'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = parseDirectoryFilters(Object.fromEntries(searchParams.entries()))
    const results = await getPublishedPlayers(filters)

    return Response.json({
      page: results.page,
      players: results.docs.map(mapPlayerToCardData),
      totalDocs: results.totalDocs,
      totalPages: results.totalPages,
    })
  } catch {
    return Response.json(
      { error: 'Service not available at the moment. Please try again shortly.' },
      { status: 503 },
    )
  }
}
