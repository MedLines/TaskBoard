import { Suspense } from 'react'

import Heading from '@/components/heading'
import { Spinner } from '@/components/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TicketCreateForm } from '@/features/ticket/components/ticket-create-form'
import TicketList from '@/features/ticket/components/ticket-list'

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Card className="w-full max-w-[420px] self-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold truncate">
            Create Ticket
          </CardTitle>
          <CardDescription>Create your new ticket</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  )
}

export default TicketsPage
