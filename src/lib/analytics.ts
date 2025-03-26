// Google Analytics Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Event tracking
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for feature tracking
export const trackFeatureUsage = (featureName: string) => {
  event({
    action: 'feature_used',
    category: 'Feature',
    label: featureName,
  })
}

// Track prompt creation
export const trackPromptCreation = () => {
  event({
    action: 'prompt_created',
    category: 'Prompt',
    label: 'New Prompt',
  })
}

// Track prompt optimization
export const trackPromptOptimization = () => {
  event({
    action: 'prompt_optimized',
    category: 'Prompt',
    label: 'Optimization',
  })
}

// Track collaboration events
export const trackCollaboration = (type: string) => {
  event({
    action: 'collaboration',
    category: 'Collaboration',
    label: type,
  })
}

// Track user engagement
export const trackEngagement = (type: string, duration?: number) => {
  event({
    action: 'engagement',
    category: 'User',
    label: type,
    value: duration,
  })
}

// Track error events
export const trackError = (errorType: string, errorMessage: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${errorType}: ${errorMessage}`,
  })
}

// Track search events
export const trackSearch = (query: string) => {
  event({
    action: 'search',
    category: 'Search',
    label: query,
  })
}

// Track authentication events
export const trackAuth = (type: 'login' | 'signup' | 'logout') => {
  event({
    action: type,
    category: 'Authentication',
    label: type,
  })
}

// Track subscription events
export const trackSubscription = (plan: string) => {
  event({
    action: 'subscription',
    category: 'Subscription',
    label: plan,
  })
}

// Track resource downloads
export const trackDownload = (resourceName: string) => {
  event({
    action: 'download',
    category: 'Resource',
    label: resourceName,
  })
}

// Track social sharing
export const trackShare = (platform: string) => {
  event({
    action: 'share',
    category: 'Social',
    label: platform,
  })
}