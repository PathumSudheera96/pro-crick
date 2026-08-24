import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Countries } from './src/collections/Countries'
import { Clubs } from './src/collections/Clubs'
import { ApplicationUploads } from './src/collections/ApplicationUploads'
import { Media } from './src/collections/Media'
import { Enquiries } from './src/collections/Enquiries'
import { Partners } from './src/collections/Partners'
import { Pages } from './src/collections/Pages'
import { PlayerApplications } from './src/collections/PlayerApplications'
import { PlayingRoles } from './src/collections/PlayingRoles'
import { Players } from './src/collections/Players'
import { Testimonials } from './src/collections/Testimonials'
import { Users } from './src/collections/Users'
import { Footer } from './src/globals/Footer'
import { Header } from './src/globals/Header'
import { SiteSettings } from './src/globals/SiteSettings'
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
  collections: [
    Users,
    Media,
    ApplicationUploads,
    PlayingRoles,
    Countries,
    Clubs,
    Players,
    Testimonials,
    Partners,
    Pages,
    Enquiries,
    PlayerApplications,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: migrations,
    push: false,
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, Header, Footer],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
