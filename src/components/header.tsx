import { LucideKanban, LucideLogOut } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

import { signOut } from '@/features/auth/actions/sign-out'
import { auth } from '@/lib/auth'
import { homePath, signInPath, signUpPath, ticketsPath } from '@/paths'

import { SubmitButton } from './form/submit-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Button, buttonVariants } from './ui/button'

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const navItems = session ? (
    <form action={signOut}>
      <SubmitButton label="Sign out" icon={<LucideLogOut />} />
    </form>
  ) : (
    <>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={ticketsPath()}
      >
        Tickets
      </Link>

      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={signUpPath()}
      >
        Sign Up
      </Link>

      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={signInPath()}
      >
        Sign In
      </Link>
    </>
  )

  return (
    <nav
      className="
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
