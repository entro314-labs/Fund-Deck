'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export interface InvestorAccessState {
  hasAccess: boolean
  isChecking: boolean
  lastChecked: number | null
}

export interface ValidateCodeResponse {
  success: boolean
  message: string
  expiresAt?: number
}

// Query keys for investor access
export const investorAccessKeys = {
  all: ['investor-access'] as const,
  check: () => [...investorAccessKeys.all, 'check'] as const,
  validate: () => [...investorAccessKeys.all, 'validate'] as const,
}

// Check investor access status
async function checkInvestorAccess(): Promise<boolean> {
  try {
    const response = await fetch('/api/check-investor-access', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.ok
  } catch (error) {
    console.error('Error checking investor access:', error)
    return false
  }
}

// Validate investor access code
async function validateInvestorCode(code: string): Promise<ValidateCodeResponse> {
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

    if (!response.ok) {
      throw new Error(data.message || 'Validation failed')
    }

    return data
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection error. Please try again.',
    }
  }
}

// Revoke investor access
async function revokeInvestorAccess(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/revoke-investor-access', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to revoke access')
    }

    return data
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to revoke access',
    }
  }
}

// Modern replacement for useInvestorAccess hook
export function useInvestorAccess() {
  const queryClient = useQueryClient()

  // Query to check access status
  const accessQuery = useQuery({
    queryKey: investorAccessKeys.check(),
    queryFn: checkInvestorAccess,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 1,
  })

  // Mutation to validate access code
  const validateMutation = useMutation({
    mutationFn: validateInvestorCode,
    onSuccess: (data) => {
      if (data.success) {
        // Update access status immediately
        queryClient.setQueryData(investorAccessKeys.check(), true)

        // Invalidate to ensure fresh data
        queryClient.invalidateQueries({
          queryKey: investorAccessKeys.check(),
        })
      }
    },
    onError: (error) => {
      console.error('Code validation error:', error)
    },
  })

  // Mutation to revoke access
  const revokeMutation = useMutation({
    mutationFn: revokeInvestorAccess,
    onSuccess: (data) => {
      if (data.success) {
        // Update access status immediately
        queryClient.setQueryData(investorAccessKeys.check(), false)

        // Clear all cached data that requires access
        queryClient.removeQueries({
          predicate: (query) => {
            const key = query.queryKey[0]
            return (
              typeof key === 'string' && (key.includes('investor') || key.includes('protected'))
            )
          },
        })
      }
    },
    onError: (error) => {
      console.error('Access revocation error:', error)
    },
  })

  // Manual refresh function
  const refreshAccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: investorAccessKeys.check(),
    })
  }

  return {
    // Access state
    hasAccess: accessQuery.data ?? false,
    loading: accessQuery.isLoading,
    error: accessQuery.error,
    isStale: accessQuery.isStale,

    // Code validation
    validateCode: validateMutation.mutateAsync,
    validating: validateMutation.isPending,
    validationError: validateMutation.error,
    validationSuccess: validateMutation.isSuccess,

    // Access revocation
    revokeAccess: revokeMutation.mutateAsync,
    revoking: revokeMutation.isPending,
    revocationError: revokeMutation.error,

    // Utilities
    refreshAccess,
    resetValidation: validateMutation.reset,
    resetRevocation: revokeMutation.reset,
  }
}

// Hook for components that require investor access
export function useRequireInvestorAccess() {
  const { hasAccess, loading, error } = useInvestorAccess()

  return {
    hasAccess,
    loading,
    error,
    canAccess: hasAccess && !loading && !error,
    shouldShowLogin: !(hasAccess || loading),
    shouldShowError: !!error && !loading,
  }
}

// Hook for monitoring access expiration
export function useInvestorAccessMonitor(onAccessLost?: () => void) {
  const monitorQuery = useQuery({
    queryKey: [...investorAccessKeys.check(), 'monitor'],
    queryFn: checkInvestorAccess,
    refetchInterval: 5 * 60 * 1000, // Check every 5 minutes
    refetchIntervalInBackground: true,
    enabled: true,
  })

  // React to access loss
  useEffect(() => {
    if (monitorQuery.data === false && onAccessLost) {
      onAccessLost()
    }
  }, [monitorQuery.data, onAccessLost])

  return {
    isMonitoring: !monitorQuery.isError,
    lastCheck: monitorQuery.dataUpdatedAt,
    error: monitorQuery.error,
  }
}

// Prefetch utility for protected routes
export function usePrefetchProtectedData() {
  const queryClient = useQueryClient()

  const prefetchIfAuthorized = async (queryKey: unknown[], queryFn: () => Promise<unknown>) => {
    const hasAccess = queryClient.getQueryData(investorAccessKeys.check())

    if (hasAccess) {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: 5 * 60 * 1000,
      })
    }
  }

  return { prefetchIfAuthorized }
}

// Cache management for investor data
export function useInvestorDataCache() {
  const queryClient = useQueryClient()

  const clearProtectedCache = () => {
    queryClient.removeQueries({
      predicate: (query) => {
        const key = query.queryKey[0]
        return (
          typeof key === 'string' &&
          (key.includes('investor') || key.includes('protected') || key.includes('private'))
        )
      },
    })
  }

  const invalidateProtectedQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey[0]
        return (
          typeof key === 'string' &&
          (key.includes('investor') || key.includes('protected') || key.includes('private'))
        )
      },
    })
  }

  return {
    clearProtectedCache,
    invalidateProtectedQueries,
  }
}
