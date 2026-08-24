import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { leadCollectionAccess } from '../access/collectionPolicies'

export const generatePlayerApplicationReferenceNumber = (): string => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()

  return `APP-${date}-${random}`
}

const assignReferenceNumber: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation !== 'create' || data?.referenceNumber) {
    return data
  }

  return {
    ...data,
    referenceNumber: generatePlayerApplicationReferenceNumber(),
  }
}

export const PlayerApplications: CollectionConfig = {
  slug: 'player-applications',
  access: leadCollectionAccess,
  admin: {
    defaultColumns: ['referenceNumber', 'applicantName', 'applicationStatus', 'createdAt'],
    group: 'Leads',
    useAsTitle: 'referenceNumber',
  },
  fields: [
    {
      name: 'referenceNumber',
      type: 'text',
      index: true,
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'applicantName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'nationality',
      type: 'relationship',
      relationTo: 'countries',
    },
    {
      name: 'cricketRole',
      type: 'relationship',
      relationTo: 'playing-roles',
    },
    {
      name: 'currentClub',
      type: 'relationship',
      relationTo: 'clubs',
    },
    {
      name: 'teamsExperience',
      type: 'textarea',
    },
    {
      name: 'statistics',
      type: 'textarea',
    },
    {
      name: 'biography',
      type: 'textarea',
      required: true,
    },
    {
      name: 'profilePhoto',
      type: 'relationship',
      relationTo: 'application-uploads',
    },
    {
      name: 'playerCv',
      type: 'relationship',
      relationTo: 'application-uploads',
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
      name: 'applicationStatus',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      required: true,
    },
  ],
  hooks: {
    beforeChange: [assignReferenceNumber],
  },
}
