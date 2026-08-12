import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/roles'

const uploadDir = process.env.UPLOAD_DIR || process.env.UPLOADS_DIR || 'storage'

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Short internal title for finding this asset in the media library.',
      },
      maxLength: 140,
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Describe the image for accessibility. Leave empty only for decorative images.',
      },
      maxLength: 180,
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Optional public-facing caption or credit.',
      },
      maxLength: 500,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
    ],
    mimeTypes: allowedMimeTypes,
    staticDir: uploadDir,
  },
}
