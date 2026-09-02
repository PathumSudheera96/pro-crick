import { findRedirectForPath } from '@/lib/redirects/runtime'
import { BACKEND_UNAVAILABLE_MESSAGE, isBackendUnavailableError } from '@/lib/backendAvailability'

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

  let redirect = null

  try {
    redirect = await findRedirectForPath(path)
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      return Response.json({ error: BACKEND_UNAVAILABLE_MESSAGE, redirect: null }, { status: 503 })
    }

    throw error
  }

  if (!redirect) {
    return Response.json({ redirect: null }, { status: 404 })
  }

  return Response.json(redirect)
}
