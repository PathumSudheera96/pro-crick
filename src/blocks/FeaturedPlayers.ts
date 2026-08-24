import type { Block } from 'payload'

export const FeaturedPlayersBlock: Block = {
  slug: 'featuredPlayers',
  interfaceName: 'FeaturedPlayersBlock',
  fields: [
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
      name: 'players',
      type: 'relationship',
      hasMany: true,
      relationTo: 'players',
    },
  ],
}
