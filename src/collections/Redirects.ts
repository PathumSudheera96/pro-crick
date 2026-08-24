import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

import { redirectCollectionAccess } from '../access/collectionPolicies'
import { normalizeRedirectPath, validateRedirectPair, validateRedirectPath } from '@/lib/redirects/shared'

const normalizeRedirectFields: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) {
    return data
  }

  return {
    ...data,
    fromPath: typeof data.fromPath === 'string' ? normalizeRedirectPath(data.fromPath) : data.fromPath,
    toPath: typeof data.toPath === 'string' ? normalizeRedirectPath(data.toPath) : data.toPath,
  }
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  access: redirectCollectionAccess,
  admin: {
    defaultColumns: ['fromPath', 'toPath', 'redirectType', 'enabled', 'updatedAt'],
    group: 'SEO',
    useAsTitle: 'fromPath',
  },
  fields: [
    {
      name: 'fromPath',
      type: 'text',
      index: true,
      required: true,
      unique: true,
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (typeof value !== 'string') {
          return 'fromPath is required.'
        }

        const pathValidation = validateRedirectPath(value, 'fromPath')
        if (pathValidation !== true) {
          return pathValidation
        }

        return validateRedirectPair(value, String(siblingData?.toPath || '/target'))
      },
    },
    {
      name: 'toPath',
      type: 'text',
      required: true,
      validate: (value: unknown, { siblingData }: { siblingData?: Record<string, unknown> }) => {
        if (typeof value !== 'string') {
          return 'toPath is required.'
        }

        const pathValidation = validateRedirectPath(value, 'toPath')
        if (pathValidation !== true) {
          return pathValidation
        }

        return validateRedirectPair(String(siblingData?.fromPath || '/source'), value)
      },
    },
    {
      name: 'redirectType',
      type: 'select',
      defaultValue: '301',
      options: [
        {
          label: '301 Permanent',
          value: '301',
        },
        {
          label: '302 Temporary',
          value: '302',
        },
      ],
      required: true,
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    beforeValidate: [normalizeRedirectFields],
  },
}
