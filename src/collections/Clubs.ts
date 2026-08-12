import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'
import { formatSlugField } from '@/hooks/formatSlug'

export const Clubs: CollectionConfig = {
  slug: 'clubs',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'country', 'status', 'updatedAt'],
    group: 'Players',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Club, team, or organization name used by player records.',
      },
      maxLength: 160,
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Stable URL/filter value generated from the club name when left empty.',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlugField('name')],
      },
      index: true,
      maxLength: 180,
      required: true,
      unique: true,
    },
    {
      name: 'country',
      type: 'relationship',
      admin: {
        description: 'Optional country for filtering and context.',
      },
      index: true,
      relationTo: 'countries',
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
