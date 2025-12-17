import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Separator } from '@/components/ui/separator'
import { Comments } from '@/features/comment/components/comments'
import { getComments } from '@/features/comment/queries/get-comments'
import { TicketItem } from '@/features/ticket/components/ticket-item'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { homePath } from '@/paths'

type TicketPageProps = {
  params: {
    ticketId: string
  }
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params
  // const ticket = initialTickets.find((ticket) => ticket.id === ticketId)
  const ticketPromise = getTicket(ticketId)
  const commentsPromise = getComments(ticketId)
  // this is for parralel data fetching, instead
  //of waiting for them to resolve sequentially
  const [ticket, comments] = await Promise.all([ticketPromise, commentsPromise])

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem
          ticket={ticket}
          isDetail
          comments={<Comments ticketId={ticket.id} comments={comments} />}
        />
      </div>
    </div>
  )
}

export default TicketPage
