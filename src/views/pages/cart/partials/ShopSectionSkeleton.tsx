import { Skeleton } from '@/components/ui/skeleton';

export const ShopSectionSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-border bg-white">
    <div className="flex h-[57px] items-center gap-3 border-b p-4">
      <Skeleton className="h-4 w-4 rounded-sm" />
      <Skeleton className="h-4 w-40" />
    </div>
    <div className="flex h-[33px] items-center border-b px-4 py-2">
      <Skeleton className="h-3 w-28" />
    </div>
    {[1, 2].map((item) => (
      <div key={item} className="flex min-h-[112px] items-start gap-4 border-b px-4 py-4">
        <Skeleton className="mt-2 h-4 w-4 rounded-sm" />
        <Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-52 max-w-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="hidden h-7 w-[110px] md:block" />
        <Skeleton className="hidden h-8 w-[120px] md:block" />
        <Skeleton className="hidden h-7 w-[120px] md:block" />
        <Skeleton className="h-8 w-8" />
      </div>
    ))}
  </div>
);
