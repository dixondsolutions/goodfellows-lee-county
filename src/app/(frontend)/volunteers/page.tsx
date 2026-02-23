import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { VolunteerForm } from '@/components/VolunteerForm'

export const metadata = {
  title: 'Volunteer with Goodfellows of Lee County',
  description:
    'Join our team of dedicated volunteers making a difference in Lee County.',
}

export default async function VolunteersPage() {
  const payload = await getPayload({ config: configPromise })
  const pageContent = await payload.findGlobal({ slug: 'page-content' })

  const vol = pageContent.volunteers
  const heroBadge = vol?.heroBadge || 'Join Our Team'
  const heroTitle = vol?.heroTitle || 'Become a Volunteer'
  const heroSubtitle =
    vol?.heroSubtitle ||
    'The Goodfellows of Lee County is 100% volunteer-run. Every hour you contribute helps ensure that children in our community have a brighter holiday season.'
  const waysTitle = vol?.waysTitle || 'Ways to Help'
  const formTitle = vol?.formTitle || 'Sign Up to Volunteer'
  const formNote =
    vol?.formNote ||
    "We'll reach out to you within 2-3 business days to discuss volunteer opportunities."

  const waysToHelp: Array<{ title: string; description: string; icon?: string | null }> =
    vol?.waysToHelp && vol.waysToHelp.length > 0
      ? vol.waysToHelp
      : [
          {
            title: 'Holiday Distribution',
            description:
              'Help sort, wrap, and distribute gifts during our annual holiday giveaway event.',
            icon: 'calendar' as const,
          },
          {
            title: 'Application Processing',
            description:
              'Assist with reviewing and processing applications from families in need.',
            icon: 'clipboard-list' as const,
          },
          {
            title: 'Community Outreach',
            description:
              'Help spread the word about our programs and fundraising efforts throughout the year.',
            icon: 'megaphone' as const,
          },
        ]

  const gradients = [
    'from-primary-400 to-primary-600',
    'from-accent-400 to-accent-600',
    'from-primary-400 to-primary-600',
  ]

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>{heroBadge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {heroTitle.includes('Volunteer') ? (
                <>
                  {heroTitle.split('Volunteer')[0]}
                  <span className="gradient-text">Volunteer</span>
                  {heroTitle.split('Volunteer')[1]}
                </>
              ) : (
                heroTitle
              )}
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Areas */}
      <section className="section bg-white/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {waysTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {waysToHelp.map((way, index) => (
              <div key={index} className="card text-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mx-auto mb-6`}
                >
                  {way.icon === 'calendar' && (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {way.icon === 'clipboard-list' && (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  )}
                  {way.icon === 'megaphone' && (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  )}
                  {(!way.icon ||
                    !['calendar', 'clipboard-list', 'megaphone'].includes(
                      way.icon,
                    )) && (
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {way.title}
                </h3>
                <p className="text-gray-600">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Sign Up Form */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {formTitle}
              </h2>
              <VolunteerForm />
              <p className="text-center text-sm text-gray-500 mt-6">
                {formNote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
