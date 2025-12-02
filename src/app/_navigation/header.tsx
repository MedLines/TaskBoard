'use client'
import { LucideKanban } from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { homePath, signInPath, signUpPath } from '@/paths'

import { ThemeSwitcher } from '../../components/theme/theme-switcher'
import { Button, buttonVariants } from '../../components/ui/button'
import { AccountDropdown } from './account-dropdown'

const Header = () => {
  const { user, isPending } = useAuth()
  if (isPending) {
    // isPending here is used to prevent the flicker
    // that happens because of the useEffect in the navbar
    return null
  }
  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={signUpPath()}
      >
        Sign Up
      </Link>

      <Link
        className={buttonVariants({ variant: 'default' })}
        href={signInPath()}
      >
        Sign In
      </Link>
    </>
  )

  return (
    <nav
      className="
        animate-header-from-top
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
    >
      <div className="flex align-items gap-x-2">
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <LucideKanban />
            <h1 className="text-lg font-semibold">TaskBoard</h1>
          </Link>
        </Button>
      </div>

      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />

        {navItems}
      </div>
    </nav>
  )
}

export { Header }
