import { Suspense } from 'react'

import { Cardcompact } from '@/components/card-compact'
import Heading from '@/components/heading'
import { Spinner } from '@/components/spinner'
import { getAuth } from '@/features/auth/queries/get-auth'
import TicketList from '@/features/ticket/components/ticket-list'
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form'
import { SearchParams } from '@/features/ticket/search-params'
type TicketPageProps = {
  searchParams: Promise<SearchParams> // Could be a Promise
}
const TicketsPage = async ({ searchParams }: TicketPageProps) => {
  const { user } = await getAuth()
  const resolvedSearchParams = await searchParams
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />

      <Cardcompact
        className="w-full max-w-[420px] self-center"
        title="Create Ticket"
        description="Create your new ticket"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  )
}

export default TicketsPage
