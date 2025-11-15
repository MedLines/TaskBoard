'use server'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const deleteTicket = async (id: string) => {
  console.log('Delete ticket with id:', id)
  await prisma.ticket.delete({
    where: { id: id },
  })
  redirect(ticketsPath())
}
