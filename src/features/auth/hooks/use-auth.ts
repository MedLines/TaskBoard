import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { authClient } from '@/lib/auth-client'

const useAuth = () => {
  // Fetches the current user session (authentication
  // status) and provides refetch functionality.
  // The session is automatically refetched whenever the
  // current route (pathname) changes, ensuring the
  // header/layout accurately reflects the latest
  // authentication state across page navigations.

  const { data: session, refetch, isPending } = authClient.useSession()
  const pathname = usePathname()

  useEffect(() => {
    refetch()
  }, [pathname, refetch])
  const user = session?.user
  return { user, isPending }
}

export { useAuth }
