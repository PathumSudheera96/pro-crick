import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '@/access/users'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'navigationItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
    },
    {
      name: 'primaryCtaUrl',
      type: 'text',
    },
  ],
}
