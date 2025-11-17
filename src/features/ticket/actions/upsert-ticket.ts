'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import { ticketPath, ticketsPath } from '@/paths'

const upsertTicketSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(191, 'Title must be at most 191 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1024, 'Content must be at most 1024 characters'),
})

const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState, // the underscore just make eslint happy because the var is unused eslint-disable-line @typescript-eslint/no-unused-vars
  formData: FormData
) => {
  try {
    // Parse form data safely
    const data = await upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    })

    // Upsert ticket
    await prisma.ticket.upsert({
      where: { id: id || '' },
      update: data,
      create: data,
    })
  } catch (error) {
    console.error(error)
    return fromErrorToActionState(error, formData)
  }
  // Revalidate ticket list path
  revalidatePath(ticketsPath())

  // Redirect if editing/creating a single ticket
  if (id) {
    redirect(ticketPath(id))
  }
  return { message: 'Ticket created successfully!' }
}

export { upsertTicket }
