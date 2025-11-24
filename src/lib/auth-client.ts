import { createAuthClient } from 'better-auth/react'

import { getBaseUrl } from '@/utils/urls'
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: getBaseUrl(),
})
