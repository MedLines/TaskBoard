'use client'
import { Ticket, TicketStatus } from '@prisma/client'
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

import { deleteTicket } from '../actions/delete-ticket'
import { updateTicketStatus } from '../actions/update-ticket-status'
import { TICKET_STATUS_LABELS } from '../constants'

type TicktMoreMenuProps = {
  trigger: React.ReactNode
  ticket: Ticket
}
const TicktMoreMenu = ({ ticket, trigger }: TicktMoreMenuProps) => {
  // const deleteButton = (
  //   <ConfirmDialog
  //     action={deleteTicket.bind(null, ticket.id)}
  //     trigger={
  //       <DropdownMenuItem>
  //         <LucideTrash className=" h-4 w-4" />
  //         <span>Delete</span>
  //       </DropdownMenuItem>
  //     }
  //   />
  // )

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
    const promise = updateTicketStatus(ticket.id, value as TicketStatus)

    toast.promise(promise, {
      loading: 'Updating ticket status...',
      success: 'Ticket status updated successfully',
      error: 'Error updating ticket status',
    })

    const result = await promise

    if (result.status === 'ERROR') {
      toast.error(result.message)
    } else if (result.status === 'SUCCESS') {
      toast.success(result.message)
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
