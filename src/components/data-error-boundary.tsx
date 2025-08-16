'use client'

import React, { type ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface DataErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface DataErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onRetry?: () => void
  dataPath?: string
}

export class DataErrorBoundary extends React.Component<
  DataErrorBoundaryProps,
  DataErrorBoundaryState
> {
  constructor(props: DataErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): DataErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log validation errors differently from other errors
    if (error.name === 'ValidationError') {
      console.error('📊 Data validation error caught by boundary:', {
        path: this.props.dataPath,
        error: error.message,
        componentStack: errorInfo.componentStack,
      })
    } else {
      console.error('🚨 Unexpected error caught by data boundary:', {
        path: this.props.dataPath,
        error,
        errorInfo,
      })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isValidationError = this.state.error?.name === 'ValidationError'
      const isDevelopment = process.env.NODE_ENV === 'development'

      return (
        <div className="p-4 space-y-4">
          <Alert variant={isValidationError ? 'default' : 'destructive'}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>
              {isValidationError ? 'Data Validation Error' : 'Data Loading Error'}
            </AlertTitle>
            <AlertDescription className="space-y-2">
              <p>
                {isValidationError
                  ? 'The data structure does not match the expected format.'
                  : 'An unexpected error occurred while loading the data.'}
              </p>

              {this.props.dataPath && (
                <p className="text-sm font-mono text-muted-foreground">
                  Path: {this.props.dataPath}
                </p>
              )}

              {isDevelopment && this.state.error && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    Technical Details (Development)
                  </summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {'\n\nStack trace:\n'}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </details>
              )}

              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-3 w-3" />
                  Retry
                </Button>

                {isDevelopment && (
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    Reload Page
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>

          {/* Fallback content for better UX */}
          <div className="p-6 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="font-medium">Content Unavailable</h3>
              <p className="text-sm">
                This section is temporarily unavailable due to a data error.
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useDataErrorHandler(dataPath?: string) {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback(
    (error: Error) => {
      console.error(`📊 Data error in ${dataPath}:`, error)
      setError(error)
    },
    [dataPath]
  )

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  const retryHandler = React.useCallback(() => {
    clearError()
    // Force re-render by updating a dummy state
    window.location.reload()
  }, [clearError])

  return {
    error,
    hasError: !!error,
    handleError,
    clearError,
    retryHandler,
  }
}

// Higher-order component for wrapping data-dependent components
export function withDataErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: ReactNode
    dataPath?: string
  }
) {
  const WrappedComponent = (props: P) => (
    <DataErrorBoundary
      fallback={options?.fallback}
      dataPath={options?.dataPath}
      onRetry={() => window.location.reload()}
    >
      <Component {...props} />
    </DataErrorBoundary>
  )

  WrappedComponent.displayName = `withDataErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

// Validation error component for specific validation failures
export function ValidationErrorDisplay({
  error,
  dataPath,
  onRetry,
}: {
  error: Error
  dataPath?: string
  onRetry?: () => void
}) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <Alert variant="default" className="border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-800">Data Validation Issue</AlertTitle>
      <AlertDescription className="text-yellow-700 space-y-2">
        <p>
          The data format has changed or contains unexpected values. This might happen after updates
          or when using custom data.
        </p>

        {dataPath && <p className="text-sm font-mono">Data source: {dataPath}</p>}

        {isDevelopment && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium">Validation Details</summary>
            <pre className="mt-2 p-2 bg-yellow-100 rounded text-xs overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}

        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry Loading
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
