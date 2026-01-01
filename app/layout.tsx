import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { ReactNode } from 'react'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Universe Group - Task Manager',
  description: 'Task management system in Jira style',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
