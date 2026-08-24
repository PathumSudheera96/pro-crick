import type { Field } from 'payload'

export const seoFields = (): Field[] => {
  return [
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'Reusable SEO metadata for public content. Leave fields empty to allow application-level fallbacks.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 70,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
        {
          name: 'canonicalUrl',
          type: 'text',
        },
        {
          name: 'ogTitle',
          type: 'text',
          maxLength: 70,
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          maxLength: 160,
        },
        {
          name: 'ogImage',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'index',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'follow',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ]
}
