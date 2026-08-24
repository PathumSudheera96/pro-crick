import path from 'node:path'
import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorBoolean } from '@/access/users'

export const ApplicationUploads: CollectionConfig = {
  slug: 'application-uploads',
  access: {
    admin: isAdminOrEditorBoolean,
    create: () => false,
    delete: isAdminOrEditor,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
    group: 'Leads',
    useAsTitle: 'filename',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 320,
        fit: 'cover',
      },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
    staticDir: path.resolve(process.cwd(), 'storage/application-uploads'),
  },
}
