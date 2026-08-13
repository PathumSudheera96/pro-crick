import type { CollectionConfig } from 'payload'

import {
  adminOrSelf,
  adminsOrFirstUser,
  adminsOrFirstUserFieldAccess,
  isAdmin,
  isAdminAdminAccess,
  isAdminFieldAccess,
} from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    admin: isAdminAdminAccess,
    create: adminsOrFirstUser,
    delete: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    group: 'System',
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      access: {
        create: adminsOrFirstUserFieldAccess,
        update: isAdminFieldAccess,
      },
      admin: {
        description:
          'Administrators can manage users and protected system settings. Editors can manage normal CMS content as future collections are added.',
        position: 'sidebar',
      },
      defaultValue: 'administrator',
      options: [
        {
          label: 'Administrator',
          value: 'administrator',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') {
          return data
        }

        const { totalDocs } = await req.payload.count({
          collection: 'users',
          overrideAccess: true,
        })

        if (totalDocs > 0) {
          return data
        }

        return {
          ...data,
          role: 'administrator',
        }
      },
    ],
  },
}
