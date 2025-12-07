'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SortSelectOptions = {
  sortKey: string
  sortValue: string
  label: string
}

type SortObject = {
  sortKey: string
  sortValue: string
}

export type SortSelectProps = {
  value: SortObject
  onChange: (sort: SortObject) => void
  options: SortSelectOptions[]
}

const SortSelect = ({ options, value, onChange }: SortSelectProps) => {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split(' ')

    onChange({
      sortKey,
      sortValue,
    })
  }

  return (
    <Select
      defaultValue={value.sortKey + ' ' + value.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + ' ' + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
