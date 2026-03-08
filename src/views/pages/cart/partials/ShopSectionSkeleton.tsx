import { Skeleton } from '@/components/ui/skeleton'

export const ShopSectionSkeleton = () => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Shop Header */}
      <div className="bg-white p-4 border-b border-border flex items-center gap-3">
        <Skeleton className="bg-white h-4 w-4 rounded-sm" />

        <div className="flex items-center gap-2 flex-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>

      {/* Promotion */}
      <div className="bg-white px-4 py-2 border-b border-border">
        <Skeleton className="h-3 w-28" />
      </div>

      {/* Cart Items */}
      <div className="bg-white divide-y divide-border">
        {[1, 2].map((item) => (
          <div key={item} className="p-4 flex gap-4 items-center">
            {/* Checkbox */}
            <Skeleton className="h-4 w-4 rounded-sm" />

            {/* Image */}
            <Skeleton className="h-16 w-16 rounded-md" />

            {/* Info */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Quantity */}
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}