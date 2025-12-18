'use client'
import { useActionState } from 'react'

import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'

import { signUp } from '../actions/sign-up'

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE)
  return (
    <Form action={action} actionState={actionState}>
      <label htmlFor="name">Name</label>
      <Input
        id="name"
        name="name"
        placeholder="e.g. johndoe"
        defaultValue={actionState.payload?.get('name') as string}
      />
      <FieldError actionState={actionState} name="name" />
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

      <label htmlFor="confirmPass word">Confirm Password</label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Re-enter your password"
        defaultValue={actionState.payload?.get('confirmPassword') as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  )
}

export { SignUpForm }
