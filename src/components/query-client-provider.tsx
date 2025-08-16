'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode, useState } from 'react'

interface QueryClientProviderWrapperProps {
  children: ReactNode
}

export default function QueryClientProviderWrapper({ children }: QueryClientProviderWrapperProps) {
  // Create query client instance with enhanced options
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache data for 5 minutes by default
            staleTime: 5 * 60 * 1000,
            // Keep data in cache for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 3 times with exponential backoff
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error instanceof Error && 'status' in error) {
                const status = (error as any).status
                if (status >= 400 && status < 500) return false
              }
              return failureCount < 3
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Don't refetch on window focus for performance
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
            // Background refetch interval for live data
            refetchInterval: false,
            // Error handling
            throwOnError: false,
          },
          mutations: {
            // Retry mutations once on network errors
            retry: (failureCount, error) => {
              if (error instanceof Error && error.message.includes('network')) {
                return failureCount < 1
              }
              return false
            },
            // Global error handling for mutations
            onError: (error) => {
              console.error('Mutation error:', error)
              // You could integrate with your notification system here
            },
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  )
}
