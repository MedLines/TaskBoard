import { PaginatedData } from '@/types/pagination'

import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type PageAndSize = {
  page: number
  size: number
}

type PaginationProps = {
  pagination: PageAndSize
  onPagination: (pagination: PageAndSize) => void
  paginatedMetadata: PaginatedData<unknown>['metadata']
}

const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata: { count, hasNextPage },
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1
  const endOffset = startOffset - 1 + pagination.size
  const actualEndOffset = Math.min(endOffset, count)

  const label = `${startOffset} - ${actualEndOffset} of ${count}`

  const handlePreviousPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page - 1,
    })
  }

  const handleNextPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page + 1,
    })
  }

  const handleChangeSize = (size: string) => {
    // When the user selects a new page size, update the pagination size
    // and reset to the first page to avoid landing on an invalid page.
    onPagination({
      // onPagination is just setPagination
      ...pagination,
      size: parseInt(size),
      page: 0,
    })
  }

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previoux
    </Button>
  )

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      //TODO
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  )

  const sizeButton = (
    <Select
      defaultValue={pagination.size.toString()}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger className="h-[30px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  )

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  )
}

export { Pagination }
