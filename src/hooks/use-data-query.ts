'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface UseDataQueryOptions {
  enabled?: boolean
  staleTime?: number
  gcTime?: number
  refetchOnWindowFocus?: boolean
  retry?: number | boolean
  refetchInterval?: number | false
}

export interface UseDataQueryResult<T> {
  data: T | undefined
  loading: boolean
  error: Error | null
  isStale: boolean
  isFetching: boolean
  refetch: () => Promise<any>
  invalidate: () => Promise<void>
}

export interface UseDataMutationResult<T> {
  mutate: (newData: T) => void
  mutateAsync: (newData: T) => Promise<T>
  loading: boolean
  error: Error | null
  isSuccess: boolean
  reset: () => void
}

// Query key factory for consistent cache management
export const dataQueryKeys = {
  all: ['data'] as const,
  byPath: (path: string) => [...dataQueryKeys.all, path] as const,
  detail: (path: string, params?: Record<string, any>) =>
    [...dataQueryKeys.byPath(path), 'detail', params] as const,
}

// Enhanced data fetching with Zod validation
async function fetchData<T>(dataPath: string): Promise<T> {
  const { safeValidate, getSchemaForPath } = await import('@/lib/validation')

  const response = await fetch(`/api/data/${dataPath}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message ||
        errorData.error ||
        `Failed to fetch data: ${response.status} ${response.statusText}`
    )
  }

  const rawData = await response.json()

  // Get schema for this data path and validate
  const schema = getSchemaForPath(dataPath)
  if (schema) {
    try {
      return safeValidate(schema, rawData, dataPath) as T
    } catch (validationError) {
      console.error(`❌ Data validation failed for ${dataPath}:`, validationError)

      // In development, throw validation errors
      if (process.env.NODE_ENV === 'development') {
        throw validationError
      }

      // In production, log error and return raw data (graceful degradation)
      console.warn(`⚠️ Using unvalidated data for ${dataPath} in production`)
      return rawData as T
    }
  }

  return rawData as T
}

// Enhanced data updating with Zod validation
async function updateData<T>(dataPath: string, newData: T): Promise<T> {
  const { safeValidate, getSchemaForPath } = await import('@/lib/validation')

  // Validate data before sending
  const schema = getSchemaForPath(dataPath)
  if (schema) {
    try {
      safeValidate(schema, newData, `${dataPath}.outgoing`)
    } catch (validationError) {
      console.error(`❌ Outgoing data validation failed for ${dataPath}:`, validationError)
      throw validationError
    }
  }

  const response = await fetch(`/api/data/${dataPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message ||
        errorData.error ||
        `Failed to update data: ${response.status} ${response.statusText}`
    )
  }

  const responseData = await response.json()

  // Validate response data
  if (schema) {
    try {
      return safeValidate(schema, responseData, `${dataPath}.response`) as T
    } catch (validationError) {
      console.error(`❌ Response data validation failed for ${dataPath}:`, validationError)

      if (process.env.NODE_ENV === 'development') {
        throw validationError
      }

      console.warn(`⚠️ Using unvalidated response data for ${dataPath}`)
      return responseData as T
    }
  }

  return responseData as T
}

// Modern replacement for useData hook using TanStack Query
export function useDataQuery<T>(
  dataPath: string,
  options: UseDataQueryOptions = {}
): UseDataQueryResult<T> {
  const queryClient = useQueryClient()

  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    gcTime = 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus = false,
    retry = 3,
    refetchInterval = false,
  } = options

  const query = useQuery({
    queryKey: dataQueryKeys.byPath(dataPath),
    queryFn: () => fetchData<T>(dataPath),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
    retry,
    refetchInterval,
  })

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: dataQueryKeys.byPath(dataPath),
    })
  }

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    isStale: query.isStale,
    isFetching: query.isFetching,
    refetch: query.refetch,
    invalidate,
  }
}

// Mutation hook for data updates with optimistic updates
export function useDataMutation<T>(dataPath: string): UseDataMutationResult<T> {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newData: T) => updateData(dataPath, newData),
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: dataQueryKeys.byPath(dataPath),
      })

      // Snapshot previous value
      const previousData = queryClient.getQueryData(dataQueryKeys.byPath(dataPath))

      // Optimistically update
      queryClient.setQueryData(dataQueryKeys.byPath(dataPath), newData)

      return { previousData }
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(dataQueryKeys.byPath(dataPath), context.previousData)
      }
    },
    onSuccess: (result) => {
      // Don't invalidate on success since optimistic update is correct
      console.log('✅ Mutation successful, result:', result)
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  }
}

// Bulk data operations
export function useBulkDataQuery<T>(dataPaths: string[]): {
  data: Record<string, T | undefined>
  loading: boolean
  error: Error | null
  refetchAll: () => Promise<void>
} {
  const queryClient = useQueryClient()

  const results = useQuery({
    queryKey: ['bulk-data', ...dataPaths],
    queryFn: async () => {
      const promises = dataPaths.map((path) => fetchData<T>(path))
      const results = await Promise.allSettled(promises)

      const data: Record<string, T | undefined> = {}
      const errors: Error[] = []

      results.forEach((result, index) => {
        const path = dataPaths[index]
        if (result.status === 'fulfilled') {
          data[path] = result.value
        } else {
          data[path] = undefined
          errors.push(new Error(`Failed to fetch ${path}: ${result.reason.message}`))
        }
      })

      if (errors.length > 0 && errors.length === dataPaths.length) {
        throw new Error(`All bulk requests failed: ${errors.map((e) => e.message).join(', ')}`)
      }

      return data
    },
  })

  const refetchAll = async () => {
    await Promise.all(
      dataPaths.map((path) =>
        queryClient.invalidateQueries({
          queryKey: dataQueryKeys.byPath(path),
        })
      )
    )
  }

  return {
    data: results.data || {},
    loading: results.isLoading,
    error: results.error,
    refetchAll,
  }
}

// Prefetch utility for improved UX
export function usePrefetchData() {
  const queryClient = useQueryClient()

  const prefetch = async (dataPath: string) => {
    await queryClient.prefetchQuery({
      queryKey: dataQueryKeys.byPath(dataPath),
      queryFn: () => fetchData(dataPath),
      staleTime: 5 * 60 * 1000,
    })
  }

  return { prefetch }
}

// Cache management utilities
export function useDataCache() {
  const queryClient = useQueryClient()

  const invalidateAll = async () => {
    await queryClient.invalidateQueries({
      queryKey: dataQueryKeys.all,
    })
  }

  const clearCache = () => {
    queryClient.removeQueries({
      queryKey: dataQueryKeys.all,
    })
  }

  const getCachedData = <T>(dataPath: string): T | undefined => {
    return queryClient.getQueryData(dataQueryKeys.byPath(dataPath))
  }

  const setCachedData = <T>(dataPath: string, data: T) => {
    queryClient.setQueryData(dataQueryKeys.byPath(dataPath), data)
  }

  return {
    invalidateAll,
    clearCache,
    getCachedData,
    setCachedData,
  }
}
