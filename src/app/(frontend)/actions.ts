'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function submitDonation(data: {
  amount: number
  firstName: string
  email: string
  isAnonymous: boolean
}) {
  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'donations',
    data: {
      amount: data.amount,
      firstName: data.firstName,
      email: data.email,
      isAnonymous: data.isAnonymous,
      status: 'pending',
    },
  })

  return { success: true }
}

export async function submitApplication(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  householdSize?: number
  childrenCount?: number
  childrenAges?: string
  needDescription?: string
}) {
  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'applications',
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      address: {
        street: data.address || undefined,
        city: data.city || undefined,
        state: data.state || 'IL',
        zip: data.zip || undefined,
      },
      householdSize: data.householdSize || undefined,
      childrenCount: data.childrenCount || undefined,
      childrenAges: data.childrenAges || undefined,
      needDescription: data.needDescription || undefined,
      status: 'submitted',
      year: new Date().getFullYear(),
    },
  })

  return { success: true }
}

export async function submitVolunteer(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message?: string
}) {
  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'volunteers',
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      message: data.message || undefined,
      status: 'new',
    },
  })

  return { success: true }
}

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
