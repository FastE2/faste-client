import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-4 p-4 md:p-6" aria-busy="true" aria-label="Loading product">
      <section className="flex flex-col gap-6 bg-white p-4 dark:bg-black lg:flex-row lg:gap-8">
        <div className="w-full lg:w-2/5">
          <Skeleton className="mx-auto aspect-square w-full max-w-[420px] lg:mx-0" />
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-20" />
            ))}
          </div>
        </div>
        <div className="w-full space-y-4 lg:w-3/5">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-[520px] w-full" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-72 w-full" />
        ))}
      </div>
    </main>
  );
}
