import { z } from 'zod'
import { DataSchemas } from '@/schemas/data'

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError,
    public path?: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export interface ValidationResult<T> {
  success: boolean
  data?: T
  error?: ValidationError
}

/**
 * Validates data against a Zod schema with enhanced error reporting
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  path?: string
): ValidationResult<T> {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = new ValidationError(
        `Validation failed${path ? ` for ${path}` : ''}: ${formatZodError(error)}`,
        error,
        path
      )
      return { success: false, error: validationError }
    }

    const genericError = new ValidationError(
      `Unknown validation error${path ? ` for ${path}` : ''}`,
      error as z.ZodError,
      path
    )
    return { success: false, error: genericError }
  }
}

/**
 * Safely validates data and returns the parsed result or throws a detailed error
 */
export function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown, path?: string): T {
  const result = validateData(schema, data, path)
  if (!result.success) {
    throw result.error
  }
  return result.data!
}

/**
 * Validates data and returns undefined if validation fails (useful for optional validation)
 */
export function softValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  path?: string
): T | undefined {
  const result = validateData(schema, data, path)
  if (result.success) {
    return result.data
  }

  console.warn(`Soft validation failed${path ? ` for ${path}` : ''}:`, result.error?.message)
  return undefined
}

/**
 * Formats Zod errors into human-readable messages
 */
function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((err: z.ZodIssue) => {
      const path = err.path.length > 0 ? ` at "${err.path.join('.')}"` : ''
      return `${err.message}${path}`
    })
    .join(', ')
}

/**
 * Schema getter with path-based routing for different data types
 */
export function getSchemaForPath(dataPath: string): z.ZodSchema<any> | undefined {
  const pathSchemaMap: Record<string, z.ZodSchema<any>> = {
    // Core pages
    dashboard: DataSchemas.DashboardData,
    'financial-model': DataSchemas.FinancialModelData,
    'executive-summary': DataSchemas.ExecutiveSummaryData,
    'investor-package': DataSchemas.InvestorPackageData,
    'market-analysis': DataSchemas.MarketAnalysisData,
    'product-overview': DataSchemas.ProductOverviewData,
    'strategic-plan': DataSchemas.StrategicPlanData,
    'growth-strategy': DataSchemas.GrowthStrategyData,
    'risk-assessment': DataSchemas.RiskAssessmentData,
    'exit-strategy': DataSchemas.ExitStrategyData,
    milestones: DataSchemas.MilestonesData,
    'one-pager': DataSchemas.OnePagerData,
    presentation: DataSchemas.PresentationData,
    'live-dashboard': DataSchemas.LiveDashboardData,

    // Generic fallback
    generic: DataSchemas.GenericPageData,
  }

  return pathSchemaMap[dataPath]
}

/**
 * Auto-validates data based on the data path
 */
export function validateDataByPath<T = any>(dataPath: string, data: unknown): ValidationResult<T> {
  const schema = getSchemaForPath(dataPath)

  if (!schema) {
    console.warn(`No schema found for path: ${dataPath}, using generic validation`)
    return validateData(DataSchemas.GenericPageData as unknown as z.ZodSchema<T>, data, dataPath)
  }

  return validateData(schema as z.ZodSchema<T>, data, dataPath)
}

/**
 * Batch validation for multiple data objects
 */
export function validateBatch<T>(
  validations: Array<{
    schema: z.ZodSchema<T>
    data: unknown
    path?: string
  }>
): {
  results: ValidationResult<T>[]
  allValid: boolean
  errors: ValidationError[]
} {
  const results = validations.map(({ schema, data, path }) => validateData(schema, data, path))

  const errors = results.filter((result) => !result.success).map((result) => result.error!)

  return {
    results,
    allValid: errors.length === 0,
    errors,
  }
}

/**
 * Development helper to check if data matches expected schema
 */
export function debugValidation<T>(schema: z.ZodSchema<T>, data: unknown, path?: string): void {
  const result = validateData(schema, data, path)

  if (result.success) {
    console.log(`✅ Validation passed${path ? ` for ${path}` : ''}`)
  } else {
    console.error(`❌ Validation failed${path ? ` for ${path}` : ''}:`)
    console.error('Errors:', result.error?.errors)
    console.error('Data:', data)
  }
}

/**
 * Type-safe data transformation with validation
 */
export function transformAndValidate<TInput, TOutput>(
  inputSchema: z.ZodSchema<TInput>,
  outputSchema: z.ZodSchema<TOutput>,
  transformer: (input: TInput) => TOutput,
  data: unknown,
  path?: string
): ValidationResult<TOutput> {
  // First validate input
  const inputResult = validateData(inputSchema, data, `${path}.input`)
  if (!inputResult.success) {
    return { success: false, error: inputResult.error }
  }

  try {
    // Transform the data
    const transformed = transformer(inputResult.data!)

    // Validate output
    return validateData(outputSchema, transformed, `${path}.output`)
  } catch (error) {
    const transformError = new ValidationError(
      `Transformation failed${path ? ` for ${path}` : ''}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error as z.ZodError,
      path
    )
    return { success: false, error: transformError }
  }
}

/**
 * Runtime type checking utilities
 */
export const RuntimeTypeChecks = {
  isMetricCard: (data: unknown): data is z.infer<typeof DataSchemas.MetricCard> => {
    return validateData(DataSchemas.MetricCard, data).success
  },

  isChartData: (data: unknown): data is z.infer<typeof DataSchemas.ChartData> => {
    return validateData(DataSchemas.ChartData, data).success
  },

  isPageMeta: (data: unknown): data is z.infer<typeof DataSchemas.PageMeta> => {
    return validateData(DataSchemas.PageMeta, data).success
  },

  // Add more runtime checks as needed
} as const

/**
 * Schema validation middleware for API routes
 */
export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (data: unknown, path?: string): T => {
    return safeValidate(schema, data, path)
  }
}

/**
 * Environment-aware validation (stricter in development)
 */
export function environmentValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  path?: string
): ValidationResult<T> {
  const result = validateData(schema, data, path)

  // In development, log validation issues for debugging
  if (process.env.NODE_ENV === 'development' && !result.success) {
    debugValidation(schema, data, path)
  }

  return result
}
