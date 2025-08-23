import type React from 'react'
import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import PlatformLayout from '../components/platform-layout'
import GoogleOneTapAuth from '../components/google-one-tap'
import QueryClientProviderWrapper from '../components/query-client-provider'
import { COMPANY_CONFIG } from '../lib/company-config'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
const CLERK_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  (DEMO_MODE ? 'pk_test_Y2xlcmsuZGVtby5tb2RlLmJ1aWxkLnBsYWNlaG9sZGVyJA' : '')

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
  title: COMPANY_CONFIG.platformTitle,
  description: COMPANY_CONFIG.platformDescription,
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

  // Always use ClerkProvider with proper key (from env var or fallback)
  return <ClerkProvider publishableKey={CLERK_KEY}>{content}</ClerkProvider>
}
