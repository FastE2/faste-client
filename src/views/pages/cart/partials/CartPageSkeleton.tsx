import { Skeleton } from '@/components/ui/skeleton';
import { ShopSectionSkeleton } from './ShopSectionSkeleton';

export default function CartPageSkeleton() {
  return (
    <main className="min-h-screen" aria-busy="true" aria-label="Loading cart">
      <div className="mx-auto max-w-6xl p-2">
        <div className="mb-4 space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-2">
            <Skeleton className="h-12 w-full" />
            <ShopSectionSkeleton />
            <ShopSectionSkeleton />
          </div>
          <Skeleton className="min-h-[430px] w-full lg:col-span-1" />
        </div>
      </div>
    </main>
  );
}
