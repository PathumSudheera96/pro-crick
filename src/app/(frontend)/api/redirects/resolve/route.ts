import { findRedirectForPath } from '@/lib/redirects/runtime'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const secret = request.headers.get('x-pro-crick-internal-secret')

  if (!process.env.PAYLOAD_SECRET || secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return Response.json({ error: 'Missing path' }, { status: 400 })
  }

  const redirect = await findRedirectForPath(path)

  if (!redirect) {
    return Response.json({ redirect: null }, { status: 404 })
  }

  return Response.json(redirect)
}
