import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Countries } from './src/collections/Countries'
import { Clubs } from './src/collections/Clubs'
import { Media } from './src/collections/Media'
import { PlayingRoles } from './src/collections/PlayingRoles'
import { Users } from './src/collections/Users'
import { migrations } from './src/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
      importMapFile: path.resolve(dirname, 'src/app/(payload)/admin/importMap.js'),
    },
  },
  collections: [Users, Media, PlayingRoles, Countries, Clubs],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: migrations,
    push: false,
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
