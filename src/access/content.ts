import type { Access } from 'payload'

import { hasRole } from '@/access/users'

export const isPublishedOrPrivileged: Access = ({ req }) => {
  if (hasRole(req.user, 'administrator') || hasRole(req.user, 'editor')) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}
