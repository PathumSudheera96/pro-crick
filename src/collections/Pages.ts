import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import {
  CTABlock,
  ContactBlock,
  FAQBlock,
  FeaturedPlayersBlock,
  HeroBlock,
  ImageTextBlock,
  RichTextBlock,
  StatsBlock,
  TestimonialsBlock,
} from '@/blocks'
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

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: isPublishedOrPrivileged,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        RichTextBlock,
        ImageTextBlock,
        FeaturedPlayersBlock,
        StatsBlock,
        TestimonialsBlock,
        FAQBlock,
        CTABlock,
        ContactBlock,
      ],
      required: true,
    },
    ...seoFields(),
  ],
  hooks: {
    beforeChange: [syncPublishedAt],
  },
}
