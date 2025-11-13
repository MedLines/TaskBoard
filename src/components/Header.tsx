import { LucideKanban } from 'lucide-react'
import Link from 'next/link'

import { homePath, ticketsPath } from '@/paths'

import { ThemeSwitcher } from './theme/theme-switcher'
import { Button, buttonVariants } from './ui/button'

const Header = () => {
  console.log('Header Rendering Header')
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
            <h1 className="text-lg font-semibold">TicketBounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={ticketsPath()}
        >
          Tickets
        </Link>
      </div>
    </nav>
  )
}

export { Header }
