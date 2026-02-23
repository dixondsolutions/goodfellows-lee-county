import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
