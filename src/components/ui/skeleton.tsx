export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export function BillingPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div>
        <Skeleton className="h-8 w-32 mb-4" />
        <CardSkeleton />
      </div>

      {/* Plan Features */}
      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      {/* Upgrade Options */}
      <div>
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
