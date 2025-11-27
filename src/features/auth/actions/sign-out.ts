'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { setCookieByKey } from '@/actions/cookies'
import { auth } from '@/lib/auth'
import { signInPath } from '@/paths'

const signOut = async () => {
  // await getAuth()
  await auth.api.signOut({
    headers: await headers(),
  })
  await setCookieByKey('toast', 'Successfully signed out')
  redirect(signInPath())
}

export { signOut }

// 'use client'
// import router from 'next/router'

// import { authClient } from '@/lib/auth-client'

// const handleSignOut = async () => {
//   await authClient.signOut()
//   router.push('/')
// }

// export { handleSignOut }
