import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us - Goodfellows of Lee County',
  description:
    "Get in touch with Goodfellows of Lee County. We're here to answer your questions about our programs, volunteering, and how you can help.",
}

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const [pageContent, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'page-content' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const contact = pageContent.contact
  const heroBadge = contact?.heroBadge || 'Get in Touch'
  const heroTitle = contact?.heroTitle || 'Contact Us'
  const heroSubtitle =
    contact?.heroSubtitle ||
    "Have questions about our programs, want to volunteer, or need assistance? We'd love to hear from you."
  const infoTitle = contact?.infoTitle || 'Contact Information'
  const aboutTitle = contact?.aboutTitle || 'About Our Organization'
  const aboutText =
    contact?.aboutText ||
    "Goodfellows of Lee County is an all-volunteer organization. As we don't have regular office hours, email is the best way to reach us. We typically respond within 1-2 business days."
  const formTitle = contact?.formTitle || 'Send a Message'

  const organizationName =
    siteSettings?.organizationName || 'Goodfellows of Lee County'
  const address = siteSettings?.address?.street || '704 S. Lincoln Ave'
  const city = siteSettings?.address?.city || 'Dixon'
  const state = siteSettings?.address?.state || 'IL'
  const zip = siteSettings?.address?.zip || '61021'
  const email = siteSettings?.email || 'info@goodfellowsil.org'

  return (
    <main className="pt-24">
      <section className="section">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{heroBadge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {heroTitle.includes('Us') ? (
                  <>
                    {heroTitle.split('Us')[0]}
                    <span className="gradient-text">Us</span>
                    {heroTitle.split('Us')[1]}
                  </>
                ) : (
                  heroTitle
                )}
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {heroSubtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {infoTitle}
                </h2>

                <div className="space-y-6">
                  <div className="card flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Mailing Address
                      </h3>
                      <p className="text-gray-600">
                        {organizationName}
                        <br />
                        {address}
                        <br />
                        {city}, {state} {zip}
                      </p>
                    </div>
                  </div>

                  <div className="card flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a
                        href={`mailto:${email}`}
                        className="text-primary-600 hover:underline"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {aboutTitle}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{aboutText}</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {formTitle}
                  </h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
