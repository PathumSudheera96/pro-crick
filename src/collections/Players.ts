import type { Access, CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { hasRole, isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'
import { seoFields } from '@/fields/seo'

const isPublishedOrPrivileged: Access = ({ req }) => {
  if (hasRole(req.user, 'administrator') || hasRole(req.user, 'editor')) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}

const syncPublishedAt: CollectionBeforeChangeHook = ({ data }) => {
  if (data?.status === 'published' && !data?.publishedAt) {
    return {
      ...data,
      publishedAt: new Date().toISOString(),
    }
  }

  if (data?.status !== 'published' && data?.publishedAt) {
    return {
      ...data,
      publishedAt: null,
    }
  }

  return data
}

export const Players: CollectionConfig = {
  slug: 'players',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: isPublishedOrPrivileged,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['fullName', 'primaryRole', 'playerStatus', 'status', 'updatedAt'],
    group: 'Players',
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      index: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'Stable public URL segment for the player profile.',
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'profileImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'shortIntroduction',
      type: 'textarea',
      maxLength: 280,
    },
    {
      name: 'biography',
      type: 'textarea',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'nationality',
      type: 'relationship',
      relationTo: 'countries',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
    {
      name: 'currentLocation',
      type: 'text',
    },
    {
      name: 'primaryRole',
      type: 'relationship',
      relationTo: 'playing-roles',
      required: true,
    },
    {
      name: 'battingStyle',
      type: 'select',
      options: [
        {
          label: 'Right-hand bat',
          value: 'right-hand-bat',
        },
        {
          label: 'Left-hand bat',
          value: 'left-hand-bat',
        },
      ],
    },
    {
      name: 'bowlingStyle',
      type: 'select',
      options: [
        {
          label: 'Right-arm fast',
          value: 'right-arm-fast',
        },
        {
          label: 'Right-arm medium',
          value: 'right-arm-medium',
        },
        {
          label: 'Right-arm off break',
          value: 'right-arm-off-break',
        },
        {
          label: 'Right-arm leg break',
          value: 'right-arm-leg-break',
        },
        {
          label: 'Left-arm fast',
          value: 'left-arm-fast',
        },
        {
          label: 'Left-arm medium',
          value: 'left-arm-medium',
        },
        {
          label: 'Left-arm orthodox',
          value: 'left-arm-orthodox',
        },
        {
          label: 'Left-arm wrist spin',
          value: 'left-arm-wrist-spin',
        },
      ],
    },
    {
      name: 'currentClub',
      type: 'relationship',
      relationTo: 'clubs',
    },
    {
      name: 'previousClubs',
      type: 'relationship',
      hasMany: true,
      relationTo: 'clubs',
    },
    {
      name: 'teamsRepresented',
      type: 'relationship',
      hasMany: true,
      relationTo: 'clubs',
    },
    {
      name: 'careerHighlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [
        {
          name: 'achievement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'playingExperience',
      type: 'textarea',
    },
    {
      name: 'playerStatus',
      type: 'select',
      defaultValue: 'available',
      index: true,
      options: [
        {
          label: 'Available',
          value: 'available',
        },
        {
          label: 'Contracted',
          value: 'contracted',
        },
        {
          label: 'Unavailable',
          value: 'unavailable',
        },
      ],
      required: true,
    },
    {
      name: 'availabilityDate',
      type: 'date',
    },
    {
      name: 'eligibleCountries',
      type: 'relationship',
      hasMany: true,
      relationTo: 'countries',
    },
    {
      name: 'statisticsByFormat',
      type: 'array',
      fields: [
        {
          name: 'format',
          type: 'select',
          options: [
            {
              label: 'Test',
              value: 'test',
            },
            {
              label: 'ODI',
              value: 'odi',
            },
            {
              label: 'T20',
              value: 't20',
            },
            {
              label: 'List A',
              value: 'list-a',
            },
            {
              label: 'First Class',
              value: 'first-class',
            },
          ],
          required: true,
        },
        {
          name: 'matches',
          type: 'number',
        },
        {
          name: 'runs',
          type: 'number',
        },
        {
          name: 'battingAverage',
          type: 'number',
        },
        {
          name: 'highestScore',
          type: 'number',
        },
        {
          name: 'hundreds',
          type: 'number',
        },
        {
          name: 'fifties',
          type: 'number',
        },
        {
          name: 'wickets',
          type: 'number',
        },
        {
          name: 'bowlingAverage',
          type: 'number',
        },
        {
          name: 'bestBowling',
          type: 'text',
        },
        {
          name: 'economyRate',
          type: 'number',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'relationship',
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'playerCv',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'youtubeVideos',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'vimeoVideos',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'instagramUrl',
      type: 'text',
    },
    {
      name: 'espnCricinfoUrl',
      type: 'text',
    },
    {
      name: 'cricbuzzUrl',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      index: true,
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    ...seoFields(),
  ],
  hooks: {
    beforeChange: [syncPublishedAt],
  },
}
