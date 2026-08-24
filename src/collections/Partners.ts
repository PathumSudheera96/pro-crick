import type { CollectionConfig } from 'payload'

import { isPublishedOrPrivileged } from '@/access/content'
import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const Partners: CollectionConfig = {
  slug: 'partners',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: isPublishedOrPrivileged,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'featured', 'status', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'websiteUrl',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      required: true,
    },
  ],
}
