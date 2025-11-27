'use client'

type SubmitButtonProps = {
  label?: string
  icon?: React.ReactElement<{ className?: string }>
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'secondary'

  size?: 'default' | 'sm' | 'lg' | 'icon'
}

import clsx from 'clsx'
import { LucideLoader2 } from 'lucide-react'
import { cloneElement } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '../ui/button'

const SubmitButton = ({ label, icon, variant, size }: SubmitButtonProps) => {
  // const { pending } = useFormStatus();
  const { pending } = useFormStatus()
  // const { pending } = { pending: true }

  return (
    <Button variant={variant} size={size} disabled={pending} type="submit">
      {pending && (
        <LucideLoader2
          className={clsx('h-4 w-4 animate-spin', {
            'mr-2': !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        <span
          className={clsx({
            '': !!label,
          })}
        >
          {cloneElement(icon, {
            className: 'h-4 w-4',
          })}
        </span>
      ) : null}
    </Button>
  )
}
export { SubmitButton }
