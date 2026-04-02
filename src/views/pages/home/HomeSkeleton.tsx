'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonCardCategory } from './partials/SkeletonCardCategory';
import CartProductSkeleton from '@/components/skeleton/CartProductSkeleton';
import { Card } from '@/components/ui/card';

const HomeSkeleton = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 animate-pulse">
      {/* Banner Skeleton */}
      <div className="bg-white dark:bg-black w-full mb-5 p-4">
        <Skeleton className="h-[306px] w-full rounded-xl" />
      </div>

      {/* Categories Skeleton */}
      <SkeletonCardCategory />

      {/* Best Sellers Section Skeleton */}
      <div className="w-full mb-5">
        <div className="bg-white dark:bg-black w-full mb-4">
          <div className="py-2 w-full flex justify-center items-center gap-2">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="bg-red-200 h-1 w-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 items-stretch">
          {/* Primary product card skeleton */}
          <div className="col-span-2">
            <Card className="rounded-none bg-white dark:bg-black max-h-[288px] h-full w-full border-none overflow-hidden relative">
              <Skeleton className="w-full h-full" />
              <div className="absolute bottom-2 left-2 z-10 p-2">
                <Skeleton className="h-9 w-24" />
              </div>
            </Card>
          </div>

          {/* Individual product skeletons */}
          <CartProductSkeleton className="hidden md:block lg:block" />
          <CartProductSkeleton className="hidden md:block lg:block" />
          <CartProductSkeleton />
          <CartProductSkeleton />
        </div>
      </div>

      {/* Middle Banner Skeleton */}
      <div className="w-full mb-5 rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-[380px]" />
      </div>

      {/* New Products Section Skeleton */}
      <div className="w-full">
        <div className="bg-white dark:bg-black w-full mb-4">
          <div className="py-2 w-full flex justify-center">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="bg-red-200 h-1 w-full"></div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <CartProductSkeleton key={index} />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Skeleton className="h-10 w-[320px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
