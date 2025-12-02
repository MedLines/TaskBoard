'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Options = { label: string; value: string }

type SortSelectProps = {
  defaultValue: string
  options: Options[]
}

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const searchParams = useSearchParams()

  const pathName = usePathname()

  const { replace } = useRouter()

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === defaultValue) {
      params.delete('sort')
    } else if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }

    replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <Select
      defaultValue={searchParams.get('sort')?.toString() || defaultValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SortSelect }
