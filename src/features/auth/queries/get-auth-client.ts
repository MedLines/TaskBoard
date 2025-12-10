import { authClient } from '@/lib/auth-client'

export const getAuthClient = () => {
  const { data: session } = authClient.useSession()

  if (!session) {
    return {
      user: null,
      session: null,
    }
  }

  return {
    user: session.user,
    session: session.session,
  }
}
