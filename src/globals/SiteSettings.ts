import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'organizationName',
              type: 'text',
              defaultValue: 'Goodfellows of Lee County',
            },
            {
              name: 'tagline',
              type: 'textarea',
              defaultValue:
                'Helping those in need since 1918. A 100% volunteer-run organization.',
            },
            { name: 'email', type: 'email', defaultValue: 'info@goodfellowsil.org' },
            { name: 'phone', type: 'text' },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'street', type: 'text', defaultValue: '704 S. Lincoln Ave' },
                { name: 'city', type: 'text', defaultValue: 'Dixon' },
                { name: 'state', type: 'text', defaultValue: 'IL' },
                { name: 'zip', type: 'text', defaultValue: '61021' },
              ],
            },
            {
              name: 'applicationPeriod',
              type: 'group',
              fields: [
                { name: 'startDate', type: 'text', defaultValue: 'September 1' },
                { name: 'endDate', type: 'text', defaultValue: 'October 31' },
                { name: 'currentYear', type: 'text', defaultValue: '2026' },
              ],
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            { name: 'headerLogoText', type: 'text', defaultValue: 'Goodfellows' },
            { name: 'headerShowLogo', type: 'checkbox', defaultValue: true },
            {
              name: 'headerNavLabels',
              type: 'group',
              fields: [
                { name: 'home', type: 'text', defaultValue: 'Home' },
                { name: 'volunteers', type: 'text', defaultValue: 'Volunteers' },
                { name: 'apply', type: 'text', defaultValue: 'Apply' },
                { name: 'contact', type: 'text', defaultValue: 'Contact' },
              ],
            },
            { name: 'headerCtaText', type: 'text', defaultValue: 'Donate' },
            { name: 'headerCtaLink', type: 'text', defaultValue: '/#donate' },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerTagline', type: 'textarea' },
            { name: 'footerShowAdminLink', type: 'checkbox', defaultValue: true },
            {
              name: 'footerCopyrightText',
              type: 'text',
              defaultValue: 'All rights reserved.',
            },
          ],
        },
      ],
    },
  ],
}
