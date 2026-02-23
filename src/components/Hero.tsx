interface HeroProps {
  content?: {
    badge?: string | null
    title?: string | null
    subtitle?: string | null
    buttonText?: string | null
    buttonLink?: string | null
    stats?: Array<{ value: string; label: string }> | null
  } | null
}

export function Hero({ content }: HeroProps) {
  const badge = content?.badge || 'Serving Lee County Since 1918'
  const title =
    content?.title || 'What is the Goodfellows of Lee County?'
  const subtitle =
    content?.subtitle ||
    'We are an organization that has been around 108 years helping those who need a helping hand. Our main giveaway is during the holiday season, but we assist people all year.'
  const buttonText = content?.buttonText || 'Apply Now'
  const buttonLink = content?.buttonLink || '/apply'

  const stats = content?.stats?.length
    ? content.stats
    : [
        { value: '108+', label: 'Years of Service' },
        { value: '1000+', label: 'Families Helped' },
        { value: '100%', label: 'Volunteer Run' },
      ]

  return (
    <section className="pt-28 pb-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-6">
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
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <span>{badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title.split('Goodfellows').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="gradient-text">Goodfellows</span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={buttonLink}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {buttonText}
            </a>
            <a
              href="#donate"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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
              Make a Donation
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
