'use server'
import { prisma } from '@/lib/prisma'

import { SearchParams } from '../search-params'

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.search === 'string' && {
        //this line here because we added 'string[] | undefined' in type SearchParams
        title: {
          contains: searchParams.search || '',
          mode: 'insensitive',
        },
      }),
    },
    orderBy: {
      //createdAt: 'desc',
      ...(searchParams.sort === undefined && { createdAt: 'desc' }),
      ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
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
