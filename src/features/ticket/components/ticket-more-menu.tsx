'use client'
import { LucideTrash } from 'lucide-react'
import { toast } from 'sonner'

import { useConfirmDialog } from '@/components/confirm-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ticket } from '@/generated/prisma/client'
import { TicketStatus } from '@/generated/prisma/enums'

import { deleteTicket } from '../actions/delete-ticket'
import { updateTicketStatus } from '../actions/update-ticket-status'
import { TICKET_STATUS_LABELS } from '../constants'

type TicktMoreMenuProps = {
  trigger: React.ReactNode
  ticket: Ticket
}
const TicktMoreMenu = ({ ticket, trigger }: TicktMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem className="cursor-pointer">
        <LucideTrash className=" h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  })

  const handleUpdateTicketStatus = async (value: string) => {
    const toastId = toast.loading('Updating ticket status...')

    const result = await updateTicketStatus(ticket.id, value as TicketStatus)

    if (result.status === 'SUCCESS') {
      toast.success(result.message, { id: toastId })
    } else {
      toast.error(result.message, { id: toastId })
    }
  }

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )
  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { TicktMoreMenu }
