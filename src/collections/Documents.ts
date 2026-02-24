import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Document', plural: 'Documents' },
  upload: {
    staticDir: 'documents',
    mimeTypes: ['application/pdf'],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'A descriptive name for this document (e.g., "2026 Holiday Application Form")',
      },
    },
  ],
}
