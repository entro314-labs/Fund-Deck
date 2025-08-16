'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getAdminEmails } from '../lib/company-config'

interface AdminGuardProps {
  children: React.ReactNode
}

// List of admin email addresses from environment variable
const ADMIN_EMAILS = getAdminEmails()

// For development, allow any authenticated user to access admin
const ALLOW_ALL_USERS_IN_DEV = process.env.NODE_ENV === 'development'

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isLoaded, userId } = useAuth()
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
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
