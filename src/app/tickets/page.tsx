import { Suspense } from 'react'

import { Cardcompact } from '@/components/card-compact'
import Heading from '@/components/heading'
import { Spinner } from '@/components/spinner'
import TicketList from '@/features/ticket/components/ticket-list'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { getBaseUrl } from '@/utils/urls'

const TicketsPage = () => {
  console.log(getBaseUrl)
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Cardcompact
        className="w-full max-w-[420px] self-center"
        title="Create Ticket"
        description="Create your new ticket"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}

export default TicketsPage
