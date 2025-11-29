'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { setCookieByKey } from '@/actions/cookies'
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { getAuth } from '@/features/auth/queries/get-auth'
import { prisma } from '@/lib/prisma'
import { signInPath, ticketPath, ticketsPath } from '@/paths'
import { toCent } from '@/utils/currency'

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191, 'Title must be at most 191 characters'),
  content: z
    .string()
    .min(1)
    .max(1024, 'Content must be at most 1024 characters'),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
})

const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState, // the underscore just make eslint happy because the var is unused eslint-disable-line @typescript-eslint/no-unused-vars
  formData: FormData
) => {
  const { user } = await getAuth()
  if (!user) {
    redirect(signInPath())
  }

  try {
    // Parse form data safely
    const data = await upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    })

    const dbData = {
      ...data,
      userId: user.id, //must fix in the future so the user can't edit other's tickets
      bounty: toCent(data.bounty),
    }
    // Upsert ticket
    await prisma.ticket.upsert({
      where: { id: id || '' },
      update: dbData,
      create: dbData,
    })
  } catch (error) {
    console.error(error)

    //console.log('TREE', tree.fieldErrors)
    return fromErrorToActionState(error, formData)
  }
  // Revalidate ticket list path
  revalidatePath(ticketsPath())

  // Redirect if editing/creating a single ticket
  if (id) {
    await setCookieByKey('toast', 'Ticket Updated')
    redirect(ticketPath(id))
  }
  return toActionState('SUCCESS', 'Ticket Created') //{ message: 'Ticket created successfully!', fieldErrors: {} }
}

export { upsertTicket }
