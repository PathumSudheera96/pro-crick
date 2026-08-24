import assert from 'node:assert/strict'
import test from 'node:test'

import {
  leadCollectionAccess,
  publishedOrPrivilegedAccess,
  redirectCollectionAccess,
} from '../../src/access/collectionPolicies.ts'

const adminArgs = { req: { user: { id: 1, role: 'administrator' } } }
const editorArgs = { req: { user: { id: 2, role: 'editor' } } }
const anonymousArgs = { req: {} }

test('isPublishedOrPrivileged only exposes published content to anonymous users', () => {
  assert.equal(publishedOrPrivilegedAccess(adminArgs), true)
  assert.equal(publishedOrPrivilegedAccess(editorArgs), true)
  assert.deepEqual(publishedOrPrivilegedAccess(anonymousArgs), {
    status: {
      equals: 'published',
    },
  })
})

test('lead collections block direct create access for all users', () => {
  assert.equal(leadCollectionAccess.create(adminArgs), false)
  assert.equal(leadCollectionAccess.create(editorArgs), false)
  assert.equal(leadCollectionAccess.create(anonymousArgs), false)
})

test('lead collections only allow privileged read and update access', () => {
  assert.equal(leadCollectionAccess.read(adminArgs), true)
  assert.equal(leadCollectionAccess.read(editorArgs), true)
  assert.equal(leadCollectionAccess.read(anonymousArgs), false)
  assert.equal(leadCollectionAccess.update(adminArgs), true)
  assert.equal(leadCollectionAccess.update(editorArgs), true)
  assert.equal(leadCollectionAccess.update(anonymousArgs), false)
})

test('redirects stay restricted to privileged CMS users', () => {
  assert.equal(redirectCollectionAccess.create(adminArgs), true)
  assert.equal(redirectCollectionAccess.create(editorArgs), true)
  assert.equal(redirectCollectionAccess.create(anonymousArgs), false)
  assert.equal(redirectCollectionAccess.read(adminArgs), true)
  assert.equal(redirectCollectionAccess.read(editorArgs), true)
  assert.equal(redirectCollectionAccess.read(anonymousArgs), false)
  assert.equal(redirectCollectionAccess.delete(adminArgs), true)
  assert.equal(redirectCollectionAccess.delete(editorArgs), true)
  assert.equal(redirectCollectionAccess.delete(anonymousArgs), false)
})
