'use client'

import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

interface ConditionalClerkProviderProps {
  children: React.ReactNode
}

export default function ConditionalClerkProvider({ children }: ConditionalClerkProviderProps) {
  // In demo mode, just return children without ClerkProvider
  if (DEMO_MODE) {
    return <>{children}</>
  }

  // In normal mode, wrap with ClerkProvider
  return <ClerkProvider>{children}</ClerkProvider>
}