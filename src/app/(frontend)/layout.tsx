import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const dynamic = 'force-dynamic'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </>
  )
}
