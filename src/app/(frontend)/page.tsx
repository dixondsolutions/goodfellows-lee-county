import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Hero } from '@/components/Hero'
import { ProgramsSection } from '@/components/ProgramsSection'
import { WhyWeCare } from '@/components/WhyWeCare'
import { BoardSection } from '@/components/BoardSection'

export const metadata = {
  title: 'Goodfellows of Lee County - Helping Those in Need Since 1918',
  description:
    'For over 108 years, Goodfellows of Lee County has been helping those who need a helping hand. Our main giveaway is during the holiday season, but we assist people all year.',
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [pageContent, programsResult, boardMembersResult] = await Promise.all([
    payload.findGlobal({ slug: 'page-content' }),
    payload.find({
      collection: 'programs',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 20,
    }),
    payload.find({
      collection: 'board-members',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 20,
    }),
  ])

  const programs = programsResult.docs.map((p) => ({
    id: String(p.id),
    title: p.title,
    description: p.description,
    icon: p.icon,
  }))

  const boardMembers = boardMembersResult.docs.map((m) => ({
    id: String(m.id),
    name: m.name,
    role: m.role,
  }))

  return (
    <main>
      <Hero content={pageContent.hero} />
      <ProgramsSection
        content={pageContent.programsSection}
        programs={programs}
      />
      <WhyWeCare content={pageContent.whyWeCare} />
      <BoardSection content={pageContent.boardSection} members={boardMembers} />
    </main>
  )
}
