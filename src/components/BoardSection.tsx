interface BoardMember {
  id: string
  name: string
  role: string
}

interface BoardSectionProps {
  content?: {
    title?: string | null
    subtitle?: string | null
  } | null
  members: BoardMember[]
}

const defaultBoardMembers: BoardMember[] = [
  { id: '1', name: 'Clara Harris', role: 'President' },
  { id: '2', name: 'Mary Kathryn Stenzel', role: 'Vice President' },
  { id: '3', name: 'Janet Bushman', role: 'Secretary' },
  { id: '4', name: 'Linda Erisman', role: 'Treasurer' },
]

export function BoardSection({ content, members }: BoardSectionProps) {
  const displayMembers = members.length > 0 ? members : defaultBoardMembers
  const sectionTitle = content?.title || 'Our Board'
  const sectionSubtitle =
    content?.subtitle ||
    'Led by dedicated volunteers who give their time to make a difference.'

  return (
    <section className="section bg-gray-50" id="board">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{sectionSubtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {displayMembers.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
            return (
              <div key={member.id} className="text-center">
                <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {initials}
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
