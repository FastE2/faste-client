import { Skeleton } from '@/components/ui/skeleton';

export default function ProductReviewsSkeleton() {
  return (
    <div className="min-h-[520px] w-full bg-white p-4 dark:bg-black" aria-busy="true" aria-label="Loading reviews">
      <Skeleton className="mb-4 h-5 w-28" />
      <div className="mb-4 flex min-h-24 items-center gap-4 bg-red-50 p-4">
        <Skeleton className="h-16 w-28" />
        <Skeleton className="h-10 flex-1" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex h-16 gap-4 border-b py-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
