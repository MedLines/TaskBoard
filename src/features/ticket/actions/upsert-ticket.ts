'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'

const upsertTicket = async (id: string | undefined, formData: FormData) => {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await prisma.ticket.upsert({
    // Try to find a ticket with this ID
    // If id exists (editing mode), search for that ticket
    // If id is undefined (creating mode), use empty string which won't match anything
    where: { id: id || '' },

    // If the ticket EXISTS: update it with new data
    update: {
      title: title,
      content: content,
    },

    // If the ticket DOESN'T exist: create a new one
    create: {
      title: title,
      content: content,
    },
  })
  revalidatePath(ticketsPath())

  if (id) {
    redirect(ticketPath(id))
  }
}
export { upsertTicket }
