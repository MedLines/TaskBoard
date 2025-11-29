'use server'
import { prisma } from '@/lib/prisma'

export const getTicket = async (ticketId: string) => {
  console.log('Fetching ticket with id:', ticketId)
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })
}
