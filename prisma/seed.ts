// const prisma = new PrismaClient()

import { prisma } from '@/lib/prisma'

const tickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket from the database.',
    status: 'DONE' as const,
    deadline: new Date().toISOString(),
    bounty: 0,
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket from the database.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString(),
    bounty: 0,
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket from the database.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString(),
    bounty: 0,
  },
]

const seed = async () => {
  const t0 = performance.now()
  console.log('DB Seed started')
  await prisma.ticket.deleteMany()
  await prisma.ticket.createMany({
    data: tickets,
  })
  const t1 = performance.now()
  console.log('DB Seed finished ' + (t1 - t0).toFixed(2) + ' milliseconds.')
}
seed()
