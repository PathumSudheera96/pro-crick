import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const generateEnquiryReferenceNumber = (): string => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()

  return `ENQ-${date}-${random}`
}

const assignReferenceNumber: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation !== 'create' || data?.referenceNumber) {
    return data
  }

  return {
    ...data,
    referenceNumber: generateEnquiryReferenceNumber(),
  }
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  access: {
    admin: isAdminOrEditorBoolean,
    create: () => false,
    delete: isAdminOrEditor,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['referenceNumber', 'name', 'relatedPlayer', 'status', 'createdAt'],
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
      name: 'relatedPlayer',
      type: 'relationship',
      relationTo: 'players',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'clubOrOrganization',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
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
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Closed', value: 'closed' },
      ],
      required: true,
    },
  ],
  hooks: {
    beforeChange: [assignReferenceNumber],
  },
}
