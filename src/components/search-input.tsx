'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from './ui/input'

type SearchInputProps = {
  placeholder: string
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  // Read current URL query parameters (?search=...)
  const searchParams = useSearchParams()

  // Get the current page path (/products, /users, etc.)
  const pathName = usePathname()

  // Router used to update the URL without reloading
  const { replace } = useRouter()

  // Debounced search handler - waits 500ms after user stops typing before updating URL
  // This prevents hitting the database on every keystroke (typing "hello" = 1 query instead of 5)
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      // Clone current search params so we can modify them
      const params = new URLSearchParams(searchParams)

      if (value) {
        // If input has text → set / update ?search=value
        params.set('search', value)
      } else {
        // If input is empty → remove ?search from the URL
        params.delete('search')
      }

      // Update the URL instantly without refreshing the page
      replace(`${pathName}?${params.toString()}`, {
        scroll: false, // prevents jumping to top
      })
    },
    500 // Wait 500ms after last keystroke before triggering search
  )

  // Input that triggers the search filter
  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={searchParams.get('search') || ''}
    />
  )
}

export { SearchInput }
