import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'
import { formatSlugField } from '@/hooks/formatSlug'

export const PlayingRoles: CollectionConfig = {
  slug: 'playing-roles',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'slug', 'status', 'updatedAt'],
    group: 'Players',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Reusable cricket role shown on player profiles and filters.',
      },
      maxLength: 120,
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Stable URL/filter value generated from the role name when left empty.',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlugField('name')],
      },
      index: true,
      maxLength: 140,
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
      required: true,
    },
  ],
}
