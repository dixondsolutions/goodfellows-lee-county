import type { GlobalConfig } from 'payload'

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Page Content',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Home Page',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  defaultValue: 'Serving Lee County Since 1918',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'What is the Goodfellows of Lee County?',
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue:
                    'We are an organization that has been around 108 years helping those who need a helping hand. Our main giveaway is during the holiday season, but we assist people all year.',
                },
                { name: 'buttonText', type: 'text', defaultValue: 'Apply Now' },
                { name: 'buttonLink', type: 'text', defaultValue: '/apply' },
                {
                  name: 'stats',
                  type: 'array',
                  maxRows: 3,
                  minRows: 3,
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
            {
              name: 'programsSection',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Our Programs' },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue:
                    'Throughout the year, the Goodfellows of Lee County supports various initiatives to help those in need.',
                },
              ],
            },
            {
              name: 'whyWeCare',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Why We Care' },
                {
                  name: 'content',
                  type: 'textarea',
                  defaultValue: `One thing we're taught at a young age is to treat others as you want to be treated. The Goodfellows of Lee County don't just follow this rule, they live it.\n\nEvery year our volunteer board of directors along with community members work to make sure every child in Lee County is treated the same — that they too, regardless of income, can have their own gift during the holiday season.`,
                },
                {
                  name: 'highlight',
                  type: 'text',
                  defaultValue:
                    'Whether you donate $2 or $1,000, every bit helps.',
                },
                {
                  name: 'tagline',
                  type: 'text',
                  defaultValue: 'Empowering the children of Lee County',
                },
              ],
            },
            {
              name: 'boardSection',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Our Board' },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  defaultValue:
                    'Led by dedicated volunteers who give their time to make a difference.',
                },
              ],
            },
          ],
        },
        {
          label: 'Apply Page',
          fields: [
            {
              name: 'apply',
              type: 'group',
              fields: [
                { name: 'heroBadge', type: 'text', defaultValue: '2026 Applications' },
                {
                  name: 'heroTitle',
                  type: 'text',
                  defaultValue: 'Apply for Assistance',
                },
                {
                  name: 'heroSubtitle',
                  type: 'textarea',
                  defaultValue:
                    "If you're a Lee County resident in need of assistance, we're here to help. Applications for holiday assistance are accepted from September 1 through October 31.",
                },
                {
                  name: 'eligibilityTitle',
                  type: 'text',
                  defaultValue: 'Eligibility Requirements',
                },
                {
                  name: 'eligibilityItems',
                  type: 'array',
                  maxRows: 6,
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                {
                  name: 'pdfFile',
                  type: 'upload',
                  relationTo: 'documents',
                  admin: {
                    description: 'Upload the holiday application PDF form',
                  },
                },
                { name: 'pdfTitle', type: 'text', defaultValue: 'Download Application' },
                {
                  name: 'pdfText',
                  type: 'textarea',
                  defaultValue:
                    'Download a PDF application and mail it in or drop it off at our office.',
                },
              ],
            },
          ],
        },
        {
          label: 'Contact Page',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'heroBadge', type: 'text', defaultValue: 'Get in Touch' },
                { name: 'heroTitle', type: 'text', defaultValue: 'Contact Us' },
                {
                  name: 'heroSubtitle',
                  type: 'textarea',
                  defaultValue:
                    "Have questions about our programs, want to volunteer, or need assistance? We'd love to hear from you.",
                },
                {
                  name: 'infoTitle',
                  type: 'text',
                  defaultValue: 'Contact Information',
                },
                {
                  name: 'aboutTitle',
                  type: 'text',
                  defaultValue: 'About Our Organization',
                },
                {
                  name: 'aboutText',
                  type: 'textarea',
                  defaultValue:
                    "Goodfellows of Lee County is an all-volunteer organization. As we don't have regular office hours, email is the best way to reach us. We typically respond within 1-2 business days.",
                },
                { name: 'formTitle', type: 'text', defaultValue: 'Send a Message' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
