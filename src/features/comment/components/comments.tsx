'use client'

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Cardcompact } from '@/components/card-compact'
import { PaginatedData } from '@/types/pagination'

import { getComments } from '../queries/get-comments'
import { CommentWithMetadata } from '../types'
import { CommentCreateForm } from './comment-create-form'
import { CommentDeleteButton } from './comment-delete-button'
import { CommentItem } from './comment-item'
type CommentsProps = {
  ticketId: string
  paginatedComments: PaginatedData<CommentWithMetadata>
}

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ['comments', ticketId]
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lasPage) =>
        lasPage.metadata.hasNextPage ? lasPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    })
  const comments = data.pages.flatMap((page) => page.list)

  const handleMore = async () => fetchNextPage()

  const queryClient = useQueryClient()

  const handleDeleteComment = () => {
    //refetch() // refetch all pages of comments after deletion
    queryClient.invalidateQueries({ queryKey }) // invalidate comments query cache to refetch data
  }

  const handleCreateComment = () => {
    // refetch()
    queryClient.invalidateQueries({ queryKey })
  }

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <>
      <Cardcompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ] //key="0" just in case we want to add more buttons
                : []),
            ]}
          />
        ))}
      </div>
      {/* <div className="flex flex-col justify-center ml-8">
        {hasNextPage && (
          <Button
            variant="ghost"
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div> */}
      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-center text-xs italic text-muted-foreground">
            No more comments
          </p>
        )}
      </div>
    </>
  )
}

export { Comments }
