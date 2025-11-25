'use server'

import { revalidatePath } from 'next/cache'

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { TicketStatus } from '@/generated/prisma/enums'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: { id: id },
      data: { status: status },
    })
  } catch (error) {
    return fromErrorToActionState(error)
  }

  revalidatePath(ticketsPath())
  return toActionState('SUCCESS', 'Ticket Status Updated')
}
