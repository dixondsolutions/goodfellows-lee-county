'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function submitContactMessage(data: {
  name: string
  email: string
  subject: 'general' | 'volunteer' | 'donation' | 'application' | 'other'
  message: string
}) {
  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'contact-messages',
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
  })

  return { success: true }
}
