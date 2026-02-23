import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: { singular: 'Contact Message', plural: 'Contact Messages' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subject', 'email', 'createdAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'subject',
      type: 'select',
      required: true,
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Volunteering', value: 'volunteer' },
        { label: 'Donation Question', value: 'donation' },
        { label: 'Application Status', value: 'application' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
  ],
  timestamps: true,
}
