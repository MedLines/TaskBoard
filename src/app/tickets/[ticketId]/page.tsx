type SingleTicketPageProps = {
  params: {
    ticketId: string
  }
}

const SingleTicketPage = async ({ params }: SingleTicketPageProps) => {
  const { ticketId } = await params
  return <h2>Single Ticket Page {ticketId}</h2>
}

export default SingleTicketPage
