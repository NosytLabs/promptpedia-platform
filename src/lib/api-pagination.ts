export interface PaginationParams {
  skip: number
  take: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  take: number
  hasMore: boolean
}

export const getPaginationParams = (
  searchParams: URLSearchParams,
  maxTake = 50
): PaginationParams => {
  const skip = Math.max(0, parseInt(searchParams.get("skip") || "0", 10))
  const take = Math.min(
    maxTake,
    Math.max(1, parseInt(searchParams.get("take") || String(maxTake), 10))
  )

  return { skip, take }
}

export const createPaginatedResponse = <T>(
  items: T[],
  total: number,
  skip: number,
  take: number
): PaginatedResponse<T> => ({
  items,
  total,
  skip,
  take,
  hasMore: skip + take < total,
})
