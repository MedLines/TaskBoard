import { headers } from 'next/headers'
import { cache } from 'react'

import { auth } from '@/lib/auth'

export const getAuth = cache(async () => {
  //todo
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const sessionId = session?.session.id ?? null

  console.log(sessionId)
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
})

// in the end so far it feels like get auth is the same as await auth.api.getSession either
// client side or server side
