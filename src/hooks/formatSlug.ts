import type { FieldHook } from 'payload'

export const formatSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const formatSlugField =
  (fallbackField: string): FieldHook =>
  ({ data, value }) => {
    if (typeof value === 'string' && value.trim()) {
      return formatSlug(value)
    }

    const fallbackValue = data?.[fallbackField]

    return typeof fallbackValue === 'string' ? formatSlug(fallbackValue) : value
  }
