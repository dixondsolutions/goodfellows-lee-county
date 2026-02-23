import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // Create admin user
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@goodfellowsil.org',
        password: 'changeme123',
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('Created admin user: admin@goodfellowsil.org / changeme123')
  } catch {
    console.log('Admin user may already exist, skipping...')
  }

  // Seed programs
  const programsData = [
    {
      title: 'Salvation Army',
      description:
        'Provide items to help those who have experienced loss due to a natural disaster, house-fire, or other acts of god.',
      icon: 'heart-handshake' as const,
      order: 1,
      isActive: true,
    },
    {
      title: 'Shop with a Cop',
      description:
        'We work with Shop with a Cop or Sheriff to provide food vouchers and shopping opportunities for families.',
      icon: 'gift' as const,
      order: 2,
      isActive: true,
    },
    {
      title: "Men's & Women's Recovery House",
      description:
        'We ensure those taking steps towards self-improvement are provided with clothes, furniture, and household items.',
      icon: 'home' as const,
      order: 3,
      isActive: true,
    },
  ]

  for (const program of programsData) {
    try {
      await payload.create({ collection: 'programs', data: program })
      console.log(`Created program: ${program.title}`)
    } catch {
      console.log(`Program ${program.title} may already exist, skipping...`)
    }
  }

  // Seed board members
  const boardMembersData = [
    { name: 'Clara Harris', role: 'President', order: 1, isActive: true },
    {
      name: 'Mary Kathryn Stenzel',
      role: 'Vice President',
      order: 2,
      isActive: true,
    },
    { name: 'Janet Bushman', role: 'Secretary', order: 3, isActive: true },
    { name: 'Linda Erisman', role: 'Treasurer', order: 4, isActive: true },
  ]

  for (const member of boardMembersData) {
    try {
      await payload.create({ collection: 'board-members', data: member })
      console.log(`Created board member: ${member.name}`)
    } catch {
      console.log(`Board member ${member.name} may already exist, skipping...`)
    }
  }

  // Update page content global with hero stats
  try {
    await payload.updateGlobal({
      slug: 'page-content',
      data: {
        hero: {
          badge: 'Serving Lee County Since 1918',
          title: 'What is the Goodfellows of Lee County?',
          subtitle:
            'We are an organization that has been around 108 years helping those who need a helping hand. Our main giveaway is during the holiday season, but we assist people all year.',
          buttonText: 'Apply Now',
          buttonLink: '/apply',
          stats: [
            { value: '108+', label: 'Years of Service' },
            { value: '1000+', label: 'Families Helped' },
            { value: '100%', label: 'Volunteer Run' },
          ],
        },
      },
    })
    console.log('Updated page content with hero stats')
  } catch {
    console.log('Error updating page content, skipping...')
  }

  // Update site settings global
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        organizationName: 'Goodfellows of Lee County',
        tagline:
          'Helping those in need since 1918. A 100% volunteer-run organization.',
        email: 'info@goodfellowsil.org',
        address: {
          street: '704 S. Lincoln Ave',
          city: 'Dixon',
          state: 'IL',
          zip: '61021',
        },
        applicationPeriod: {
          startDate: 'September 1',
          endDate: 'October 31',
          currentYear: '2026',
        },
        headerLogoText: 'Goodfellows',
        headerShowLogo: true,
        headerCtaText: 'Donate',
        headerCtaLink: '/#donate',
        footerShowAdminLink: true,
        footerCopyrightText: 'All rights reserved.',
      },
    })
    console.log('Updated site settings')
  } catch {
    console.log('Error updating site settings, skipping...')
  }

  console.log('Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
