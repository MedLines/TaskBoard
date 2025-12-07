'use client'

import { useQueryStates } from 'nuqs'

import { SortSelect, SortSelectOptions } from '@/components/sort-select'

import { sortOptions, sortParser } from '../search-params'

type TicketSortSelectProps = {
  options: SortSelectOptions[]
}

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions)

  return <SortSelect value={sort} onChange={setSort} options={options} />
}

export { TicketSortSelect }
