'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCardCategory = () => {
  return (
    <div className="bg-white dark:bg-black w-full mb-5">
      <p className="text-gray-400 py-2 px-4 uppercase">Category</p>

      <div className="flex flex-wrap w-full bg-gray-200 animate-pulse">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            data-category-skeleton-card="true"
            className={`w-1/4 sm:w-1/4 md:w-1/5 lg:w-1/5
              flex h-40 flex-col items-center justify-between p-2
              bg-white dark:bg-black
              ${index >= 8 ? 'max-[768px]:hidden' : ''}
              ${index === 9 || index === 0 ? 'border' : 'border border-l-0'}
              border-gray-200`}
          >
            <Skeleton className="rounded-full w-[83px] h-[83px]" />
            <div className="w-full max-w-[100px] text-center">
              <Skeleton className="mx-auto mt-2 h-4 w-3/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
