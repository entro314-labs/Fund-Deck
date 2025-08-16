'use client'

import { useState, useEffect } from 'react'

export function useInvestorAccess() {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Check if investor-access cookie exists by making a request to a protected endpoint
        const response = await fetch('/api/check-investor-access', {
          method: 'GET',
          credentials: 'include',
        })

        setHasAccess(response.ok)
      } catch (error) {
        setHasAccess(false)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [])

  const validateCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('/api/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        credentials: 'include',
      })

      const data = await response.json()

      if (data.success) {
        setHasAccess(true)
      }

      return data
    } catch (error) {
      return { success: false, message: 'Connection error. Please try again.' }
    }
  }

  return {
    hasAccess,
    loading,
    validateCode,
  }
}
