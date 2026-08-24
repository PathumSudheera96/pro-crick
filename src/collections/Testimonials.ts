import type { CollectionConfig } from 'payload'

import { isPublishedOrPrivileged } from '@/access/content'
import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: isPublishedOrPrivileged,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'role', 'featured', 'status', 'updatedAt'],
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
      name: 'role',
      type: 'text',
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'player',
      type: 'relationship',
      relationTo: 'players',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
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
