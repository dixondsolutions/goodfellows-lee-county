import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: { singular: 'Application', plural: 'Applications' },
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'childrenCount', 'status', 'year', 'createdAt'],
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
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text', defaultValue: 'IL' },
        { name: 'zip', type: 'text' },
      ],
    },
    { name: 'householdSize', type: 'number', min: 1 },
    { name: 'childrenCount', type: 'number', min: 0 },
    { name: 'childrenAges', type: 'text' },
    { name: 'needDescription', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'submitted',
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under Review', value: 'under_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Denied', value: 'denied' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      defaultValue: new Date().getFullYear(),
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
