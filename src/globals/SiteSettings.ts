import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '@/access/users'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'defaultSeoTitle',
      type: 'text',
    },
    {
      name: 'defaultSeoDescription',
      type: 'textarea',
    },
    {
      name: 'defaultOgImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'whatsApp',
      type: 'text',
      defaultValue: '+447424116701',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
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
  ],
}
