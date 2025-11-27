'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { setCookieByKey } from '@/actions/cookies'
import {
  ActionState,
  fromErrorToActionState,
} from '@/components/form/utils/to-action-state'
import { auth } from '@/lib/auth'
import { ticketsPath } from '@/paths'

const signInSchema = z.object({
  email: z
    .email({ pattern: z.regexes.email })
    .min(1, { message: 'Email is required' })
    .max(191, { message: 'Email must be at most 191 characters long' }),
  password: z.string().min(6).max(191),
})

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }

  await setCookieByKey('toast', 'Successfully signed in')
  revalidatePath('/', 'layout')
  redirect(ticketsPath())
}
