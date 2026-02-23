import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Goodfellows of Lee County',
  description:
    '108 years of helping those who need a helping hand in Lee County, Illinois',
  keywords:
    'Goodfellows, Lee County, Illinois, charity, donations, community, holiday help',
  openGraph: {
    type: 'website',
    title: 'Goodfellows of Lee County',
    description:
      '108 years of helping those who need a helping hand in Lee County, Illinois',
    siteName: 'Goodfellows of Lee County',
  },
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  )
}
