'use client';

const PromoBar = () => (
  <div className="bg-purple-600 dark:bg-purple-700">
    <div className="container mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between py-2 text-white">
        <p className="text-xs sm:text-sm">
          <span className="hidden sm:inline">
            FREE delivery & 40% Discount for next 3 orders! Place your 1st order
            in.
          </span>
          <span className="sm:hidden">40% OFF next 3 orders!</span>
        </p>
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <span className="hidden sm:inline">Until the end of the sale:</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="text-center">
              <span className="font-bold text-sm sm:text-lg">47</span>
              <span className="text-xs block sm:inline sm:ml-1">days</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-sm sm:text-lg">06</span>
              <span className="text-xs block sm:inline sm:ml-1">hrs</span>
            </div>
            <div className="text-center">
              <span className="font-bold text-sm sm:text-lg">59</span>
              <span className="text-xs block sm:inline sm:ml-1">min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PromoBar;
