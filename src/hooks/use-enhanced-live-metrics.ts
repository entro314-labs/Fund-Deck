'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import { useAutoRefresh } from '@/stores/app-store'

// Re-export types from original hook for compatibility
export type {
  LiveMetric,
  HistoricalDataPoint,
  CountryAnalytics,
  CountryMetrics,
  LiveMetricsData,
} from '@/hooks/use-live-metrics'

// Enhanced query keys for better cache management
export const liveMetricsKeys = {
  all: ['live-metrics'] as const,
  overview: () => [...liveMetricsKeys.all, 'overview'] as const,
  countries: () => [...liveMetricsKeys.all, 'countries'] as const,
  country: (countryId: string) => [...liveMetricsKeys.countries(), countryId] as const,
  analytics: () => [...liveMetricsKeys.all, 'analytics'] as const,
}

// Enhanced fetch function with better error handling
async function fetchLiveMetrics(): Promise<import('@/hooks/use-live-metrics').LiveMetricsData> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

  try {
    const response = await fetch('/api/live-metrics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))

      // Create error with status for better retry logic
      const error = new Error(
        `Failed to fetch live metrics: ${errorData.error || response.statusText}`
      ) as any
      error.status = response.status
      throw error
    }

    const data = await response.json()

    // Validate data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format received from API')
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out - please check your connection')
    }

    throw error
  }
}

// Enhanced hook with better state management and features
export function useEnhancedLiveMetrics() {
  const queryClient = useQueryClient()
  const globalAutoRefresh = useAutoRefresh()
  const [localAutoRefresh, setLocalAutoRefresh] = useState<boolean | null>(null)

  // Use local setting if set, otherwise fall back to global
  const isAutoRefresh = localAutoRefresh !== null ? localAutoRefresh : globalAutoRefresh

  const query = useQuery({
    queryKey: liveMetricsKeys.all,
    queryFn: fetchLiveMetrics,
    refetchInterval: isAutoRefresh ? 5 * 60 * 1000 : false, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error && 'status' in error) {
        const status = (error as any).status
        if (status >= 400 && status < 500) return false
      }
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  })

  // Force refresh function
  const forceRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: liveMetricsKeys.all,
    })
  }, [queryClient])

  // Prefetch related data
  const prefetchCountryData = useCallback(
    async (countryCode: string) => {
      await queryClient.prefetchQuery({
        queryKey: liveMetricsKeys.country(countryCode),
        queryFn: () => fetchCountrySpecificData(countryCode),
        staleTime: 5 * 60 * 1000,
      })
    },
    [queryClient]
  )

  // Background sync
  const enableBackgroundSync = useCallback(() => {
    if (!isAutoRefresh) return

    const interval = setInterval(async () => {
      await queryClient.invalidateQueries({
        queryKey: liveMetricsKeys.all,
        refetchType: 'none', // Don't refetch immediately, just mark as stale
      })
    }, 60 * 1000) // Check every minute

    return () => clearInterval(interval)
  }, [queryClient, isAutoRefresh])

  // Cache management
  const clearCache = useCallback(() => {
    queryClient.removeQueries({
      queryKey: liveMetricsKeys.all,
    })
  }, [queryClient])

  // Optimistic updates for demo purposes
  const updateMetricOptimistically = useCallback(
    (countryId: string, metricId: string, newValue: any) => {
      queryClient.setQueryData(liveMetricsKeys.all, (oldData: any) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          countries: oldData.countries.map((country: any) =>
            country.id === countryId
              ? {
                  ...country,
                  metrics: country.metrics.map((metric: any) =>
                    metric.id === metricId ? { ...metric, value: newValue } : metric
                  ),
                }
              : country
          ),
        }
      })
    },
    [queryClient]
  )

  return {
    // Data and loading states
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    isStale: query.isStale,
    isFetching: query.isFetching,
    isPending: query.isPending,

    // Auto-refresh controls
    isAutoRefresh: isAutoRefresh,
    setAutoRefresh: setLocalAutoRefresh,

    // Manual controls
    refetch: query.refetch,
    forceRefresh,

    // Cache management
    clearCache,

    // Advanced features
    prefetchCountryData,
    updateMetricOptimistically,
    enableBackgroundSync,

    // Metadata
    lastUpdated: query.data?.lastUpdated,
    dataUpdatedAt: query.dataUpdatedAt,
    errorUpdatedAt: query.errorUpdatedAt,

    // Query status
    status: query.status,
    fetchStatus: query.fetchStatus,
  }
}

// Helper function for country-specific data (placeholder)
async function fetchCountrySpecificData(countryCode: string) {
  const response = await fetch(`/api/live-metrics/country/${countryCode}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch data for ${countryCode}`)
  }
  return response.json()
}

// Hook for managing live metrics subscriptions (WebSocket or SSE)
export function useLiveMetricsSubscription() {
  const queryClient = useQueryClient()

  const subscribe = useCallback(() => {
    // This would implement WebSocket or Server-Sent Events
    // For now, it's a placeholder
    console.log('Live metrics subscription would start here')

    return () => {
      console.log('Live metrics subscription would end here')
    }
  }, [])

  const handleRealtimeUpdate = useCallback(
    (update: any) => {
      queryClient.setQueryData(liveMetricsKeys.all, (oldData: any) => {
        // Apply real-time update to cached data
        return { ...oldData, ...update }
      })
    },
    [queryClient]
  )

  return {
    subscribe,
    handleRealtimeUpdate,
  }
}

// Performance monitoring hook
export function useLiveMetricsPerformance() {
  const [metrics, setMetrics] = useState({
    fetchTime: 0,
    cacheHitRate: 0,
    errorRate: 0,
  })

  const recordFetchTime = useCallback((startTime: number) => {
    const endTime = Date.now()
    const fetchTime = endTime - startTime

    setMetrics((prev) => ({
      ...prev,
      fetchTime,
    }))
  }, [])

  const recordCacheHit = useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      cacheHitRate: prev.cacheHitRate + 1,
    }))
  }, [])

  const recordError = useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      errorRate: prev.errorRate + 1,
    }))
  }, [])

  return {
    metrics,
    recordFetchTime,
    recordCacheHit,
    recordError,
  }
}
