import "@/public/globals.css"
import type { Metadata } from "next"
import { GlobalContextProvider } from "@/app/Context/store"
import { AuthHandler } from "@/app/commons"

export const metadata: Metadata = {
  title: "Daimon",
  description: "Powered by MasterBase",
  icons: {
    icon: "/favicon.png",
  }
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
          <AuthHandler>
            {children}
          </AuthHandler>
        </GlobalContextProvider>
      </body>
    </html>
  )
}