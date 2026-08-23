import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const PlayingRoles: CollectionConfig = {
  slug: 'playing-roles',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Players',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Stable URL-safe identifier used by player filters and relationships.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
  ],
}
