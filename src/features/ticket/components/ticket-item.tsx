'use client'
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
import { ticketEditPath, ticketPath } from '@/paths'
import { toCurrencyFromCent } from '@/utils/currency'

import { TICKET_ICONS } from '../constants'
import { TicketWithMetadata } from '../types'
import { TicktMoreMenu } from './ticket-more-menu'

type TicketItemProps = {
  ticket: TicketWithMetadata
  isDetail?: boolean
  comments?: React.ReactNode
}

const TicketItem = ({ ticket, isDetail, comments }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)} className="text-sm">
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  )
  const editButton = ticket.isOwner ? (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)} className="text-sm">
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null

  const moreMenu = ticket.isOwner ? (
    <TicktMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null
  return (
    <div
      className={clsx('flex flex-col gap-y-4', {
        'w-full max-w-[580px]': isDetail,
        'w-full max-w-[420px]': !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="flex-1 min-w-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="text-2xl font-bold truncate">
                {ticket.title}
              </span>
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
      {/* {isDetail ? <Comments ticketId={ticket.id} comments={comments} /> : null} */}
      {comments}
    </div>
  )
}

export { TicketItem }
