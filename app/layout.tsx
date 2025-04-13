import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/context/theme-context"

export const metadata: Metadata = {
  title: "FLOAT BBS // YOU ARE THE THREAD NOW",
  description: "Ghost-trace::01 - Terminal-inspired interface with ambient analog texture",
  viewport: "width=device-width, initial-scale=1.0",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'