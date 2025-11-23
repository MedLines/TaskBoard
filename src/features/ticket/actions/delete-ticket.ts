'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { setCookieByKey } from '@/actions/cookies'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const deleteTicket = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  await prisma.ticket.delete({
    where: { id: id },
  })

  revalidatePath(ticketsPath())
  await setCookieByKey('toast', 'Ticket Deleted')
  redirect(ticketsPath())
}
