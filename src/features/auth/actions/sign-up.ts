'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { setCookieByKey } from '@/actions/cookies'
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state'
import { auth } from '@/lib/auth'
import { ticketsPath } from '@/paths'

const signUpSchema = z
  .object({
    name: z.string().min(1).max(191),
    email: z
      .email({ pattern: z.regexes.email })
      .min(1, { message: 'Email is required' })
      .max(191, { message: 'Email must be at most 191 characters long' }),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { name, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    )
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })
  } catch (error) {
    return fromErrorToActionState(error, formData)
  }
  await setCookieByKey('toast', 'Successfully signed up')
  redirect(ticketsPath())
  return toActionState('SUCCESS', 'Sign up successful')
}
