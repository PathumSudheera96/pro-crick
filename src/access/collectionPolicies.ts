import type { Access } from 'payload'

type UserLike = {
  role?: 'administrator' | 'editor' | null
}

const hasPrivilegedRole = (user: unknown): boolean => {
  return typeof user === 'object' && user !== null && 'role' in user && ['administrator', 'editor'].includes((user as UserLike).role || '')
}

export const denyAllAccess: Access = () => false

export const privilegedCollectionAccess: Access = ({ req: { user } }) => {
  return hasPrivilegedRole(user)
}

export const privilegedCollectionAdminAccess = ({ req }: { req: { user?: unknown } }): boolean => {
  return hasPrivilegedRole(req.user)
}

export const publishedOrPrivilegedAccess: Access = ({ req: { user } }) => {
  if (hasPrivilegedRole(user)) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}

export const leadCollectionAccess = {
  admin: privilegedCollectionAdminAccess,
  create: denyAllAccess,
  delete: privilegedCollectionAccess,
  read: privilegedCollectionAccess,
  update: privilegedCollectionAccess,
}

export const redirectCollectionAccess = {
  admin: privilegedCollectionAdminAccess,
  create: privilegedCollectionAccess,
  delete: privilegedCollectionAccess,
  read: privilegedCollectionAccess,
  update: privilegedCollectionAccess,
}
