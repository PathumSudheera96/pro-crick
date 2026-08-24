import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
    },
    {
      name: 'primaryCtaUrl',
      type: 'text',
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
    },
    {
      name: 'secondaryCtaUrl',
      type: 'text',
    },
  ],
}
