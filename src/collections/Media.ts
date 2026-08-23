import path from 'node:path'
import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

const isImageMimeType = (mimeType: unknown): mimeType is string => {
  return typeof mimeType === 'string' && mimeType.startsWith('image/')
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    admin: isAdminOrEditorBoolean,
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'filename',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Internal Title',
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      validate: (
        value: string | null | undefined,
        { siblingData }: { siblingData?: { mimeType?: unknown } },
      ) => {
        if (isImageMimeType(siblingData?.mimeType) && typeof value !== 'string') {
          return 'Alt text is required for image uploads.'
        }

        if (isImageMimeType(siblingData?.mimeType) && typeof value === 'string' && value.trim().length === 0) {
          return 'Alt text is required for image uploads.'
        }

        return true
      },
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 480,
        fit: 'cover',
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
    staticDir: path.resolve(process.cwd(), 'storage/media'),
  },
}
