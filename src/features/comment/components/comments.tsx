import { Cardcompact } from '@/components/card-compact'
import { getAuthClient } from '@/features/auth/queries/get-auth-client'
import { isOwner } from '@/features/auth/utils/is-owner'

import { CommentWithMetadata } from '../types'
import { CommentCreateForm } from './comment-create-form'
import { CommentDeleteButton } from './comment-delete-button'
import { CommentItem } from './comment-item'

type CommentsProps = {
  ticketId: string
  comments?: CommentWithMetadata[]
}

const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
  const { user } = getAuthClient()
  return (
    <>
      <Cardcompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner(user, comment)
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]} //key="0" just in case we want to add more buttons
          />
        ))}
      </div>
    </>
  )
}

export { Comments }
