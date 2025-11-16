'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

const createTicket = async (formData: FormData) => {
  const title = formData.get('title')
  const content = formData.get('content')

  await prisma.ticket.create({
    data: {
      title: title as string,
      content: content as string,
    },
  })
  revalidatePath(ticketsPath())
}
export { createTicket }
