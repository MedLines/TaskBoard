'use server'

import { revalidatePath } from 'next/cache'

import {
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { isOwner } from '@/features/auth/utils/is-owner'
import { TicketStatus } from '@/generated/prisma/enums'
import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const { user } = await getAuthOrRedirect()

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: id },
    })

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState(
        'ERROR',
        'You are not authorized to edit this ticket'
      )
    }

    await prisma.ticket.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: { status: status },
    })

    revalidatePath(ticketsPath())
    return toActionState('SUCCESS', 'Ticket Status Updated')
  } catch (error) {
    return fromErrorToActionState(error)
  }
}
