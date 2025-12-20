'use server'

import { getAuth } from '@/features/auth/queries/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { prisma } from '@/lib/prisma'

const getComments = async (ticketId: string, cursor?: string) => {
  const { user } = await getAuth()

  const take = 3

  const where = {
    ticketId,
    id: {
      lt: cursor, //Prisma IDs are ordered strings, not random text lt means less than
    },
  }

  // eslint-disable-next-line prefer-const
  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1, //fetch one extra to check if there's more
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        { id: 'desc' },
      ],
    }),
    prisma.comment.count({
      where,
    }),
  ])

  const hasNextPage = comments.length > take //check if there's an extra comment
  comments = hasNextPage ? comments.slice(0, -1) : comments //remove the extra comment if exists

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: comments.at(-1)?.id,
    },
  }
}

export { getComments }
