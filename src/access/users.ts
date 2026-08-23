import type { Access, CollectionBeforeChangeHook, FieldAccess } from 'payload'

export const USER_ROLES = ['administrator', 'editor'] as const

export type UserRole = (typeof USER_ROLES)[number]

type UserLike = {
  id: number | string
  role?: UserRole | null
}

type UserCountReader = Pick<Parameters<CollectionBeforeChangeHook>[0]['req']['payload'], 'find'>

const isUserLike = (value: unknown): value is UserLike => {
  return typeof value === 'object' && value !== null && 'id' in value
}

export const hasRole = (user: unknown, role: UserRole): boolean => {
  return isUserLike(user) && user.role === role
}

export const isAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, 'administrator')
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return hasRole(user, 'administrator') || hasRole(user, 'editor')
}

export const isAdminOrEditorBoolean = ({ req }: { req: { user?: unknown } }): boolean => {
  return hasRole(req.user, 'administrator') || hasRole(req.user, 'editor')
}

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'administrator')
}

export const isAdminOrSelfFieldAccess: FieldAccess = ({ id, req: { user } }) => {
  if (hasRole(user, 'administrator')) {
    return true
  }

  return isUserLike(user) && user.id === id
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!isUserLike(user)) {
    return false
  }

  if (user.role === 'administrator') {
    return true
  }

  return {
    id: {
      equals: user.id,
    },
  }
}

const countUsers = async (payload: UserCountReader) => {
  const result = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
  })

  return result.docs.length
}

export const allowInitialAdminCreate: Access = async ({ req }) => {
  if (hasRole(req.user, 'administrator')) {
    return true
  }

  return (await countUsers(req.payload)) === 0
}

export const assignInitialAdminRole: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') {
    return data
  }

  if ((await countUsers(req.payload)) > 0) {
    return data
  }

  return {
    ...data,
    role: 'administrator',
  }
}
