import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: { singular: 'Program', plural: 'Programs' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order', 'isActive'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Heart Handshake', value: 'heart-handshake' },
        { label: 'Gift', value: 'gift' },
        { label: 'Home', value: 'home' },
        { label: 'Users', value: 'users' },
        { label: 'Heart', value: 'heart' },
        { label: 'Shield', value: 'shield' },
        { label: 'Star', value: 'star' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
