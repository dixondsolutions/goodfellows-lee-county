import type { CollectionConfig } from 'payload'

export const BoardMembers: CollectionConfig = {
  slug: 'board-members',
  labels: { singular: 'Board Member', plural: 'Board Members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'isActive'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
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
