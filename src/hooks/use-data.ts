'use client'

import { useState, useEffect } from 'react'

export interface UseDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  update: (newData: T) => Promise<boolean>
}

export function useData<T>(dataPath: string): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/data/${dataPath}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const rawData = await response.json()

      // Import validation functions dynamically to avoid circular deps
      const { safeValidate, getSchemaForPath } = await import('@/lib/validation')

      // Validate data if schema exists
      const schema = getSchemaForPath(dataPath)
      if (schema) {
        try {
          const validatedData = safeValidate(schema, rawData, dataPath)
          setData(validatedData)
        } catch (validationError) {
          console.error(`❌ Data validation failed for ${dataPath}:`, validationError)

          if (process.env.NODE_ENV === 'development') {
            throw validationError
          }

          console.warn(`⚠️ Using unvalidated data for ${dataPath}`)
          setData(rawData)
        }
      } else {
        setData(rawData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateData = async (newData: T): Promise<boolean> => {
    try {
      // Import validation functions
      const { safeValidate, getSchemaForPath } = await import('@/lib/validation')

      // Validate outgoing data
      const schema = getSchemaForPath(dataPath)
      if (schema) {
        try {
          safeValidate(schema, newData, `${dataPath}.outgoing`)
        } catch (validationError) {
          console.error(`❌ Outgoing data validation failed for ${dataPath}:`, validationError)
          setError(validationError instanceof Error ? validationError.message : 'Validation error')
          return false
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
        throw new Error(`Failed to update data: ${response.statusText}`)
      }

      const responseData = await response.json()

      // Validate response data
      if (schema) {
        try {
          const validatedData = safeValidate(schema, responseData, `${dataPath}.response`)
          setData(validatedData)
        } catch (validationError) {
          console.error(`❌ Response validation failed for ${dataPath}:`, validationError)

          if (process.env.NODE_ENV === 'development') {
            setError(
              validationError instanceof Error ? validationError.message : 'Validation error'
            )
            return false
          }

          console.warn(`⚠️ Using unvalidated response data for ${dataPath}`)
          setData(responseData)
        }
      } else {
        setData(responseData)
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error updating data:', err)
      return false
    }
  }

  useEffect(() => {
    fetchData()
  }, [dataPath])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    update: updateData,
  }
}
