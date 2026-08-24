import type { CollectionConfig } from 'payload'

import {
  allowInitialAdminCreate,
  assignInitialAdminRole,
  hasRole,
  isAdmin,
  isAdminOrSelf,
  isAdminFieldAccess,
  isAdminOrSelfFieldAccess,
} from '@/access/users'
import { USER_ROLES } from './shared'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    admin: ({ req }) => hasRole(req.user, 'administrator'),
    create: allowInitialAdminCreate,
    delete: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    group: 'System',
    hidden: ({ user }) => !hasRole(user, 'administrator'),
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      access: {
        create: isAdminFieldAccess,
        read: isAdminOrSelfFieldAccess,
        update: isAdminFieldAccess,
      },
      defaultValue: 'editor',
      options: USER_ROLES.map((role) => ({
        label: role === 'administrator' ? 'Administrator' : 'Editor',
        value: role,
      })),
      required: true,
      saveToJWT: true,
    },
  ],
  hooks: {
    beforeChange: [assignInitialAdminRole],
  },
}
