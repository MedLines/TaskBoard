'use server'
import { prisma } from '@/lib/prisma'

export const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })
}
