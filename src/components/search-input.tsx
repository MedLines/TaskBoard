'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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

  // Runs whenever the user types in the search box
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  // Input that triggers the search filter
  return <Input placeholder={placeholder} onChange={handleSearch} />
}

export { SearchInput }
