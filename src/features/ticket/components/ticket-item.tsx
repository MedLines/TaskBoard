import clsx from 'clsx'
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Prisma } from '@/generated/prisma/client'
import { ticketEditPath, ticketPath } from '@/paths'
import { toCurrencyFromCent } from '@/utils/currency'

import { TICKET_ICONS } from '../constants'
import { TicktMoreMenu } from './ticket-more-menu'

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  }>
  isDetail?: boolean
}
const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)} className="text-sm">
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  )
  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)} className="text-sm">
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  )

  const moreMenu = (
    <TicktMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  )
  return (
    <div
      className={clsx('flex gap-x-1', {
        'w-full max-w-[580px]': isDetail,
        'w-full max-w-[420px]': !isDetail,
      })}
    >
      <Card className="flex-1 min-w-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="text-2xl font-bold truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx(' whitespace-break-spaces', {
              'line-clamp-3': !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {ticket.deadline} by {ticket.user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton} {editButton}
          </>
        )}
      </div>
    </div>
  )
}

export { TicketItem }
