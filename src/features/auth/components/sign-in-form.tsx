'use client'
import { useActionState } from 'react'

import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'

import { signIn } from '../actions/sign-in'

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE)
  return (
    <Form action={action} actionState={actionState}>
      <label htmlFor="email">Email</label>
      <Input
        id="email"
        name="email"
        placeholder="you@example.com"
        defaultValue={actionState.payload?.get('email') as string}
      />
      <FieldError actionState={actionState} name="email" />

      <label htmlFor="password">Password</label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Eenter a password"
        defaultValue={actionState.payload?.get('password') as string}
      />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign in" />
    </Form>
  )
}

export { SignInForm }
