import "./globals.css"
import type { Metadata } from "next"
import { GlobalContextProvider } from "./Context/store"

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
      <body>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
