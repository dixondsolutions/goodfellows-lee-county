interface SiteSettings {
  organizationName?: string | null
  address?: {
    street?: string | null
    city?: string | null
    state?: string | null
    zip?: string | null
  } | null
  email?: string | null
  tagline?: string | null
  footerTagline?: string | null
  footerShowAdminLink?: boolean | null
  footerCopyrightText?: string | null
}

interface FooterProps {
  settings: SiteSettings
}

export function Footer({ settings }: FooterProps) {
  const organizationName =
    settings?.organizationName || 'Goodfellows of Lee County'
  const address = settings?.address?.street || '704 S. Lincoln Ave'
  const city = settings?.address?.city || 'Dixon'
  const state = settings?.address?.state || 'IL'
  const zip = settings?.address?.zip || '61021'
  const email = settings?.email || 'info@goodfellowsil.org'
  const tagline =
    settings?.footerTagline ||
    settings?.tagline ||
    'Helping those in need since 1918. A 100% volunteer-run organization.'
  const showAdminLink = settings?.footerShowAdminLink !== false
  const copyrightText =
    settings?.footerCopyrightText || 'All rights reserved.'

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <span className="font-bold">{organizationName}</span>
            </div>
            <p className="text-gray-400 text-sm">{tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/apply" className="hover:text-white">
                  Apply for Help
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{address}</li>
              <li>
                {city}, {state} {zip}
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </li>
            </ul>
            {showAdminLink && (
              <a
                href="/admin"
                className="text-xs text-gray-500 hover:text-gray-400 mt-4 inline-block"
              >
                Admin Login
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {organizationName}. {copyrightText}
        </div>
      </div>
    </footer>
  )
}
