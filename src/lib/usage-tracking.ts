// Usage tracking for free vs Pro users
// This would typically be stored in a database

export interface UsageLimit {
  free: number;
  pro: number;
}

export const PROMPT_GENERATION_LIMITS: UsageLimit = {
  free: 5, // 5 per day for free users
  pro: 100, // 100 per day for Pro users
};

export const PROMPT_TESTING_LIMITS: UsageLimit = {
  free: 3, // 3 tests per day
  pro: 50, // 50 tests per day
};

// Track usage by user ID
// In production, this would be stored in Prisma with the User model
const usageCache = new Map<string, Record<string, number>>();

export function getUserUsage(userId: string, key: string): number {
  if (!usageCache.has(userId)) {
    usageCache.set(userId, {});
  }
  return usageCache.get(userId)?.[key] || 0;
}

export function incrementUsage(userId: string, key: string): void {
  if (!usageCache.has(userId)) {
    usageCache.set(userId, {});
  }
  const usage = usageCache.get(userId)!;
  usage[key] = (usage[key] || 0) + 1;
}

export function checkUsageLimit(userId: string, key: string, limit: number): boolean {
  return getUserUsage(userId, key) < limit;
}

export function resetDailyUsage(userId: string): void {
  usageCache.delete(userId);
}
