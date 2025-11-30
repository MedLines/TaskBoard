import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar/components/sidebar'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Taskbounty',
  description: 'Do the tasks you love, earn the rewards you deserve.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={geistMono.className}>
        <ThemeProvider>
          <Header />
          <div className="flex h-screen overflow-hidden border-collapse">
            <Sidebar />
            <main
              className="
              min-h-screen flex-1
              overflow-y-auto overflow-x-hidden
              py-24 px-8
              bg-secondary/20
              flex flex-col
    "
            >
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
