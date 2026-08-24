import type { Access } from 'payload'

import { publishedOrPrivilegedAccess } from './collectionPolicies'

export const isPublishedOrPrivileged: Access = publishedOrPrivilegedAccess
