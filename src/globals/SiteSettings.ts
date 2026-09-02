import type { GlobalConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

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
      type: 'tabs',
      tabs: [
        {
          label: 'General',
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
        },
        {
          label: 'Integrations',
          fields: [
            {
              name: 'cloudflareTurnstileSiteKey',
              type: 'text',
              admin: {
                description: 'Public site key rendered on enquiry and application forms.',
              },
              label: 'Cloudflare Turnstile Site Key',
            },
            {
              name: 'cloudflareTurnstileSecretKey',
              type: 'text',
              access: {
                read: isAdminOrEditorBoolean,
              },
              admin: {
                description:
                  'Private key used only by the server to verify form submissions with Cloudflare.',
              },
              label: 'Cloudflare Turnstile Secret Key',
            },
          ],
        },
      ],
    },
  ],
}
