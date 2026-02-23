import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
  slug: 'donations',
  labels: { singular: 'Donation', plural: 'Donations' },
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'amount', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'amount', type: 'number', required: true, min: 1 },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text' },
    { name: 'comment', type: 'textarea' },
    { name: 'isAnonymous', type: 'checkbox', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
