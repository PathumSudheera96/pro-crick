import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      hasMany: true,
      relationTo: 'testimonials',
    },
  ],
}
