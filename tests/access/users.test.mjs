import assert from 'node:assert/strict'
import test from 'node:test'

import {
  allowInitialAdminCreate,
  assignInitialAdminRole,
  isAdmin,
  isAdminOrSelf,
} from '../../src/access/users.ts'

const createPayload = (userCount) => {
  return {
    find: async () => ({
      docs: Array.from({ length: userCount }, (_, index) => ({ id: index + 1 })),
      hasNextPage: false,
      hasPrevPage: false,
      limit: 1,
      nextPage: null,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: userCount,
      totalPages: userCount === 0 ? 0 : 1,
    }),
  }
}

test('isAdmin only allows administrators', () => {
  assert.equal(isAdmin({ req: { user: { id: 1, role: 'administrator' } } }), true)
  assert.equal(isAdmin({ req: { user: { id: 2, role: 'editor' } } }), false)
  assert.equal(isAdmin({ req: {} }), false)
})

test('isAdminOrSelf allows admins and scopes editors to their own record', () => {
  assert.equal(isAdminOrSelf({ req: { user: { id: 1, role: 'administrator' } } }), true)
  assert.deepEqual(isAdminOrSelf({ req: { user: { id: 9, role: 'editor' } } }), {
    id: {
      equals: 9,
    },
  })
  assert.equal(isAdminOrSelf({ req: {} }), false)
})

test('allowInitialAdminCreate only permits bootstrap create when no users exist', async () => {
  assert.equal(
    await allowInitialAdminCreate({
      req: {
        payload: createPayload(1),
        user: { id: 1, role: 'administrator' },
      },
    }),
    true,
  )

  assert.equal(
    await allowInitialAdminCreate({
      req: {
        payload: createPayload(0),
      },
    }),
    true,
  )

  assert.equal(
    await allowInitialAdminCreate({
      req: {
        payload: createPayload(1),
      },
    }),
    false,
  )
})

test('assignInitialAdminRole elevates only the first created user', async () => {
  assert.deepEqual(
    await assignInitialAdminRole({
      data: { email: 'first@example.com' },
      operation: 'create',
      req: {
        payload: createPayload(0),
      },
    }),
    {
      email: 'first@example.com',
      role: 'administrator',
    },
  )

  assert.deepEqual(
    await assignInitialAdminRole({
      data: { email: 'second@example.com', role: 'editor' },
      operation: 'create',
      req: {
        payload: createPayload(2),
      },
    }),
    {
      email: 'second@example.com',
      role: 'editor',
    },
  )

  assert.deepEqual(
    await assignInitialAdminRole({
      data: { email: 'existing@example.com', role: 'editor' },
      operation: 'update',
      req: {
        payload: createPayload(1),
      },
    }),
    {
      email: 'existing@example.com',
      role: 'editor',
    },
  )
})
