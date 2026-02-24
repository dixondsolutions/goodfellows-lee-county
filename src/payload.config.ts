import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Documents } from './collections/Documents'
import { BoardMembers } from './collections/BoardMembers'
import { Programs } from './collections/Programs'
import { ContactMessages } from './collections/ContactMessages'
import { SiteSettings } from './globals/SiteSettings'
import { PageContent } from './globals/PageContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Goodfellows CMS',
    },
  },
  collections: [
    Users,
    Media,
    Documents,
    BoardMembers,
    Programs,
    ContactMessages,
  ],
  globals: [SiteSettings, PageContent],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '' },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true, documents: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
