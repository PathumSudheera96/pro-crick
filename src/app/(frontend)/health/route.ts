import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await getPayload({ config })

    return Response.json({ status: 'healthy' })
  } catch {
    return Response.json({ status: 'unhealthy' }, { status: 503 })
  }
}
