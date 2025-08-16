import { useAuth, useUser } from '@clerk/nextjs'
import { DEMO_MODE } from '../lib/demo-config'

// Demo-safe wrapper for Clerk auth hooks
export function useDemoSafeAuth() {
  if (DEMO_MODE) {
    return {
      isLoaded: true,
      userId: null,
      user: null,
    }
  }

  const { isLoaded, userId } = useAuth()
  const { user } = useUser()

  return {
    isLoaded,
    userId,
    user,
  }
}