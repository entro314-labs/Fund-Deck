'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { DEMO_MODE } from '../lib/demo-config'
import { useDemoSafeAuth } from '../hooks/use-demo-safe-auth'

interface AdminGuardProps {
  children: React.ReactNode
}

// List of admin email addresses (you can expand this list)
const ADMIN_EMAILS = [
  // Add admin email addresses here
  'admin@company.com',
  'contact@company.com',
  // "investor@company.com",
]

// For development, allow any authenticated user to access admin
const ALLOW_ALL_USERS_IN_DEV = process.env.NODE_ENV === 'development'

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isLoaded, userId, user } = useDemoSafeAuth()
  const router = useRouter()

  useEffect(() => {
    // In demo mode, admin section is completely blocked
    if (DEMO_MODE) {
      router.push('/')
      return
    }

    if (!isLoaded) return

    // If not authenticated, redirect to sign in
    if (!userId) {
      router.push('/sign-in')
      return
    }

    // If in production and user is not in admin list, redirect to home
    if (!ALLOW_ALL_USERS_IN_DEV && user?.emailAddresses[0]?.emailAddress) {
      const userEmail = user.emailAddresses[0].emailAddress
      if (!ADMIN_EMAILS.includes(userEmail)) {
        router.push('/')
        return
      }
    }
  }, [isLoaded, userId, user, router])

  // In demo mode, show access denied message
  if (DEMO_MODE) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-4">🚀 Demo Mode</h1>
            <p className="text-muted-foreground mb-6">
              Admin features are disabled in demo mode. Fork the repository to set up your own investor deck with full admin access.
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="block w-full text-primary hover:text-primary/80 underline"
              >
                Return to Dashboard
              </button>
              <a
                href="https://github.com/your-username/fund-deck"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading while checking auth
  if (!(isLoaded && userId)) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    )
  }

  // Show unauthorized message if user doesn't have admin access
  if (!ALLOW_ALL_USERS_IN_DEV && user?.emailAddresses[0]?.emailAddress) {
    const userEmail = user.emailAddresses[0].emailAddress
    if (!ADMIN_EMAILS.includes(userEmail)) {
      return (
        <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
              <p className="text-muted-foreground mb-6">
                You don't have permission to access the admin panel. Please contact an administrator
                if you believe this is an error.
              </p>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="text-primary hover:text-primary/80 underline"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  // Render admin content
  return <>{children}</>
}
