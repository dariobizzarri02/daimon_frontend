import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GlobalContextProvider } from './Context/store'

export const metadata: Metadata = {
  title: 'MasterBase Leagues',
  description: 'MasterBase Leagues Team Drafting Platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
