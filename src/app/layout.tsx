import type React from 'react'
import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import PlatformLayout from '../components/platform-layout'
import GoogleOneTapAuth from '../components/google-one-tap'
import QueryClientProviderWrapper from '../components/query-client-provider'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: 'MyRoomie - Premium Investor Pitch Deck',
  description: "Europe's Integrated Living Platform - Investment Presentation",
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const content = (
    <html
      lang="en"
      className={`${inter.variable} ${lexend.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <QueryClientProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
          >
            {!DEMO_MODE && <GoogleOneTapAuth />}
            <PlatformLayout>{children}</PlatformLayout>
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )

  // In demo mode, skip ClerkProvider wrapper
  if (DEMO_MODE) {
    return content
  }

  // In normal mode, wrap with ClerkProvider
  return <ClerkProvider>{content}</ClerkProvider>
}
