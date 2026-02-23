import type { CollectionConfig } from 'payload'

export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
  labels: { singular: 'Volunteer', plural: 'Volunteers' },
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'email', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Active', value: 'active' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
