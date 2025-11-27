'use client'
import { LucideLoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  label: string
  icon?: React.ReactElement<{ className?: string }>
}

import { Button } from '../ui/button'

const SubmitButton = ({ label, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
      {icon && icon}
    </Button>
  )
}
export { SubmitButton }
