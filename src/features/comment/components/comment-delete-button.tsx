'use client'
import { LucideTrash } from 'lucide-react'

import { useConfirmDialog } from '@/components/confirm-dialog'
import { Button } from '@/components/ui/button'

import { deleteComment } from '../actions/delete-comment'

type CommentDeleteButtonProps = {
  id: string
}

const CommentDeleteButton = ({ id }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash className="w-4 h-4" />
      </Button>
    ),
  })

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
    // <form action={deleteComment.bind(null, id)}>
    //   <Button variant="outline" size="icon">
    //     <LucideTrash className="w-4 h-4" />
    //   </Button>
    // </form>
  )
}

export { CommentDeleteButton }
