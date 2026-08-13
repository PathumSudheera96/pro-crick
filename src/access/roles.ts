import type { Access, FieldAccess, Where } from 'payload'

export const USER_ROLES = ['administrator', 'editor'] as const

export type UserRole = (typeof USER_ROLES)[number]

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const getRole = (user: unknown): null | UserRole => {
  if (!isRecord(user)) {
    return null
  }

  const role = user.role

  return USER_ROLES.includes(role as UserRole) ? (role as UserRole) : null
}

const getID = (user: unknown): number | string | undefined => {
  if (!isRecord(user)) {
    return undefined
  }

  const id = user.id

  return typeof id === 'number' || typeof id === 'string' ? id : undefined
}

export const isAdminUser = (user: unknown): boolean => getRole(user) === 'administrator'

export const isEditorUser = (user: unknown): boolean => getRole(user) === 'editor'

export const isAdmin: Access = ({ req }) => isAdminUser(req.user)

export const isAdminAdminAccess = ({ req }: Parameters<Access>[0]): boolean =>
  isAdminUser(req.user)

export const isAdminFieldAccess: FieldAccess = ({ req }) => isAdminUser(req.user)

export const isAdminOrEditor: Access = ({ req }) =>
  isAdminUser(req.user) || isEditorUser(req.user)

export const adminsOrFirstUser: Access = async ({ req }) => {
  if (isAdminUser(req.user)) {
    return true
  }

  const { totalDocs } = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
  })

  return totalDocs === 0
}

export const adminsOrFirstUserFieldAccess: FieldAccess = async ({ req }) => {
  if (isAdminUser(req.user)) {
    return true
  }

  const { totalDocs } = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
  })

  return totalDocs === 0
}

export const adminOrSelf: Access = ({ req }) => {
  if (isAdminUser(req.user)) {
    return true
  }

  const id = getID(req.user)

  if (!id) {
    return false
  }

  return {
    id: {
      equals: id,
    },
  } satisfies Where
}

export const hasRole = (user: unknown, roles: UserRole[]): boolean => {
  const role = getRole(user)

  return role ? roles.includes(role) : false
}
