import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { isPublishedOrPrivileged } from '@/access/content'
import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'
import { seoFields } from '@/fields/seo'

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

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: isPublishedOrPrivileged,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'publishedAt', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
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
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Lead image shown on the homepage news card and the news article page.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary used on the news card. Keep to roughly three lines.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    ...seoFields(),
  ],
  hooks: {
    beforeChange: [syncPublishedAt],
  },
}
