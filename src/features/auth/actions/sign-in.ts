'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state'
import { ticketsPath } from '@/paths'

const signInSchema = z.object({
  email: z
    .email({ pattern: z.regexes.email })
    .min(1, { message: ' Email is required ' })
    .max(191, { message: 'Email must be at most 191 characters long' }),
  password: z.string().min(6).max(191),
})

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(Object.fromEntries(formData))
    // TODO store in database
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }
  redirect(ticketsPath())
}
