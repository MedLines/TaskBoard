import { prisma } from '@/lib/prisma'

const getComments = async (ticketId: string) => {
  return await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export { getComments }
