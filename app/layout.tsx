import type { Metadata } from "next"
import { GlobalContextProvider } from "@/app/Context/store"

export const metadata: Metadata = {
  title: "Daimon",
  description: "Powered by MasterBase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}