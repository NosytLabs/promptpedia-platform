/**
 * Client-side error handling utilities
 * Replaces console.error with proper error tracking
 */

export interface ClientError {
  message: string
  context?: string
  error?: unknown
  timestamp?: Date
}

/**
 * Log error silently in production, to console in development
 * Can be connected to error tracking service (Sentry, etc.)
 */
export const logError = (
  message: string,
  context?: string,
  error?: unknown
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'Client Error'}] ${message}`, error)
  }

  // TODO: Send to error tracking service in production
  // Example: sentry.captureException(error, { extra: { message, context } })
}

/**
 * Handle fetch errors gracefully
 */
export const handleFetchError = (
  error: unknown,
  context: string
): string => {
  if (error instanceof TypeError) {
    // Network error
    if (error.message.includes('fetch')) {
      return 'Network error. Please check your connection.'
    }
  }

  if (error instanceof Error) {
    logError(error.message, context, error)
    return 'Something went wrong. Please try again.'
  }

  logError(String(error), context, error)
  return 'An unexpected error occurred.'
}

/**
 * Safe JSON parsing with error handling
 */
export const safeJsonParse = <T = any>(
  json: string,
  fallback: T
): T => {
  try {
    return JSON.parse(json) as T
  } catch (error) {
    logError('Failed to parse JSON', 'JSON Parse', error)
    return fallback
  }
}
