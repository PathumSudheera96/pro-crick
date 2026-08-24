import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const Countries: CollectionConfig = {
  slug: 'countries',
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
        description: 'Stable URL-safe identifier used by filters and relationships.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'isoCode',
      type: 'text',
      admin: {
        description: 'Optional ISO 3166-1 alpha-2 code such as LK or GB.',
      },
      maxLength: 2,
      minLength: 2,
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
