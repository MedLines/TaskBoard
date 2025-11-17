'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { ticketsPath } from '@/paths'

const updateTicket = async (id: string, formData: FormData) => {
  //   const id = formData.get('id')
  const title = formData.get('title')
  const content = formData.get('content')

  await prisma.ticket.update({
    where: { id: id as string },
    data: {
      title: title as string,
      content: content as string,
    },
  })

  revalidatePath(ticketsPath())
  redirect(ticketsPath())
}
export { updateTicket }
