'use server'
import { prisma } from '@/lib/prisma'

export const getTicket = async (ticketId: string) => {
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
