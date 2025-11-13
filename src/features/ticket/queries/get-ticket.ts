import { initialTickets } from '@/data'

import { Ticket } from '../types'

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const maybeTickets = await initialTickets.find(
    (ticket) => ticket.id === ticketId
  )
  return new Promise((resolve) => {
    resolve(maybeTickets || null)
  })
}
