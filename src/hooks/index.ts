// Central export file for all custom hooks

// Enhanced TanStack Query hooks
export * from './use-data-query'
export * from './use-investor-access-query'
export * from './use-enhanced-live-metrics'

// Legacy hooks (consider migrating components away from these)
export * from './use-data'
export * from './use-investor-access'
export * from './use-live-metrics'

// UI hooks
export * from './use-mobile'
export * from './use-toast'

// Hook barrel exports for common usage patterns
export { useDataQuery, useDataMutation } from './use-data-query'
export { useInvestorAccess, useRequireInvestorAccess } from './use-investor-access-query'
export { useEnhancedLiveMetrics } from './use-enhanced-live-metrics'
