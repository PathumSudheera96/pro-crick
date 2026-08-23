import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const Clubs: CollectionConfig = {
  slug: 'clubs',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'country', 'updatedAt'],
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
        description: 'Stable URL-safe identifier used by relationships and future club pages.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
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
