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
  return (
    <ClerkProvider>
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
              <GoogleOneTapAuth />
              <PlatformLayout>{children}</PlatformLayout>
            </ThemeProvider>
          </QueryClientProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
