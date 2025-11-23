'use client'
import { cloneElement, useActionState, useState } from 'react'

import { Form } from './form/form'
import { SubmitButton } from './form/submit-button'
import { ActionState, EMPYT_ACTION_STATE } from './form/utils/to-action-state'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

type UseConfirmDialogProps = {
  title?: string
  description?: string
  action: () => Promise<ActionState>
  trigger: React.ReactElement<{ onClick: () => void }>
}

const useConfirmDialog = ({
  title = 'Are you sure?',
  description = 'This action cannot be undone, Make sure you want to continue.',
  action,
  trigger,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  })

  const [actionState, formAction] = useActionState(action, EMPYT_ACTION_STATE)

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form actionState={actionState} action={formAction}>
            <AlertDialogAction asChild>
              <SubmitButton label="Confirm" />
            </AlertDialogAction>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return [dialogTrigger, dialog]
}

export { useConfirmDialog }
