'use client'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from './ui/input'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    500 // Wait 500ms after last keystroke before triggering search
  )

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
    />
  )
}

export { SearchInput }
