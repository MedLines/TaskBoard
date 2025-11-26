'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Spinner } from '@/components/spinner'
import { authClient } from '@/lib/auth-client'
// NOTE: Make sure Spinner and authClient imports are correct for your project

// We are hardcoding the path here to bypass any issues in the signInPath() function
const SIGN_IN_PATH = '/sign-in'

export default function DashboardPage() {
  const router = useRouter()
  // Better-Auth hook to manage session and loading state
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    // Check is done AND no session found
    if (!isPending && !session) {
      // Start the 3-second timer for redirection
      const timer = setTimeout(() => {
        router.push(SIGN_IN_PATH)
      }, 3000)

      // Cleanup function to prevent redirection if the user logs in before the timer expires
      return () => clearTimeout(timer)
    }
  }, [isPending, session, router])

  // ----------------------------------------------------
  // RENDER STATES
  // ----------------------------------------------------

  // 1. Initial Loading State (isPending is true)
  if (isPending) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Spinner />
        <p className="text-gray-500">Checking session...</p>
      </div>
    )
  }

  // 2. Redirect Message State (isPending is false, but session is null)
  // This screen will be visible for 3 seconds while the timer runs
  if (!session) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Spinner />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-500">Access Denied</h2>
          <p className="text-gray-600">Redirecting to login in 3 seconds...</p>
        </div>
      </div>
    )
  }

  // 3. Authenticated State
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-lg">Welcome back, {session.user.name}!</p>
    </div>
  )
}
