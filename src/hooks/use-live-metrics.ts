'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// Types for live metrics data
export interface LiveMetric {
  id: string
  title: string
  value: number | string
  prefix?: string
  suffix?: string
  subtitle: string
  icon: string
  color: string
  target?: number | string
  targetSuffix?: string
  status?: 'success' | 'warning' | 'danger' | 'neutral'
}

export interface HistoricalDataPoint {
  month: string
  mrrActual: number
  mrrTarget: number
  activeUsers: number
  newSignups: number
  successfulMatches: number
  monthlyBurn: number
  churnRate: number
  cac: number
  arpu: number
}

export interface CountryAnalytics {
  mrrGrowth: number
  userGrowth: number
  currentCAC: number
  currentARPU: number
  churnRate: number
  ltvCacRatio: number
}

export interface CountryMetrics {
  id: string
  name: string
  code: string
  flag: string
  status: 'live' | 'launching' | 'planned'
  launchDate: string
  metrics: LiveMetric[]
  historicalData?: HistoricalDataPoint[]
  analytics?: CountryAnalytics
}

export interface LiveMetricsData {
  overview: {
    keyMetrics: LiveMetric[]
  }
  countries: CountryMetrics[]
  lastUpdated: string
}

// Function to fetch from Google Sheets via our API
async function fetchLiveMetrics(): Promise<LiveMetricsData> {
  const response = await fetch('/api/live-metrics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Add cache busting for fresh data
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(`Failed to fetch live metrics: ${errorData.error || response.statusText}`)
  }

  const data: LiveMetricsData = await response.json()
  return data
}

export function useLiveMetrics() {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)

  const query = useQuery({
    queryKey: ['live-metrics'],
    queryFn: fetchLiveMetrics,
    refetchInterval: isAutoRefresh ? 5 * 60 * 1000 : false, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    retry: 3,
  })

  return {
    ...query,
    isAutoRefresh,
    setIsAutoRefresh,
    lastUpdated: query.data?.lastUpdated,
  }
}
