'use client';

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const OrderCardSkeleton = () => {
  return (
    <div className="overflow-hidden border rounded-xl bg-card">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-4 w-4" />
          <SkeletonBox className="h-4 w-20" />
          <SkeletonBox className="h-6 w-20 rounded-md" />
        </div>
        <SkeletonBox className="h-4 w-24" />
      </div>

      {/* Product */}
      <div className="px-4 sm:px-6 py-4">
        <div className="flex gap-4">
          <SkeletonBox className="w-20 h-20 rounded-lg" />

          <div className="flex-1 space-y-2">
            <SkeletonBox className="h-4 w-3/4" />
            <SkeletonBox className="h-3 w-1/2" />
            <SkeletonBox className="h-3 w-1/3" />

            <div className="flex gap-2 mt-2">
              <SkeletonBox className="h-3 w-16" />
              <SkeletonBox className="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-border w-full" />

      {/* Footer */}
      <div className="px-4 sm:px-6 py-4 border-t space-y-4">
        <SkeletonBox className="h-3 w-40" />

        <div className="flex justify-between items-center">
          <div />
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-4 w-16" />
            <SkeletonBox className="h-6 w-24" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap justify-end">
          <SkeletonBox className="h-8 w-24 rounded-md" />
          <SkeletonBox className="h-8 w-24 rounded-md" />
          <SkeletonBox className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
