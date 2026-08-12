import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'
import { formatSlugField } from '@/hooks/formatSlug'

export const Countries: CollectionConfig = {
  slug: 'countries',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['name', 'countryCode', 'status', 'updatedAt'],
    group: 'Players',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Country or nationality label used for player profiles and filters.',
      },
      maxLength: 120,
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Stable URL/filter value generated from the country name when left empty.',
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
      name: 'countryCode',
      type: 'text',
      admin: {
        description: 'Optional ISO-style country code, such as LK, AU, or GB.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value),
        ],
      },
      maxLength: 3,
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
