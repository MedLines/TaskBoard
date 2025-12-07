'use server'
import { prisma } from '@/lib/prisma'

import { ParsedSearchParams } from '../search-params'

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      //this line here because we added 'string[] | undefined' in type SearchParams
      title: {
        contains: searchParams.search || '',
        mode: 'insensitive',
      },
    },
    orderBy: {
      // ...(searchParams.sort === 'newest' && { createdAt: 'desc' }),
      // ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
      [searchParams.sortKey]: searchParams.sortValue,
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
