import { notFound } from 'next/navigation'

import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { getTickets } from '@/features/ticket/queries/get-tickets'

type TicketPageProps = {
  params: {
    ticketId: string
  }
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params
  // const ticket = initialTickets.find((ticket) => ticket.id === ticketId)
  const ticket = await getTicket(ticketId)
  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  )
}

export default TicketPage
