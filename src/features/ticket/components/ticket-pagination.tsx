'use client'
import { useQueryState, useQueryStates } from 'nuqs'
import { useEffect, useRef } from 'react'

import { Pagination } from '@/components/pagination'

import {
  paginationOptions,
  paginationParser,
  searchParser,
} from '../search-params'

type TicketPaginationProps = {
  paginatedTicketMetadata: {
    count: number
    hasNextPage: boolean
  }
}

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  )
  const [search] = useQueryState('search', searchParser) // this and the below
  const prevSearch = useRef(search) // is useful so you can return to the first page
  //when you are searching

  useEffect(() => {
    if (prevSearch.current === search) return

    prevSearch.current = search
    setPagination({ page: 0 })
  }, [pagination, search, setPagination])

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  )
}
export { TicketPagination }
