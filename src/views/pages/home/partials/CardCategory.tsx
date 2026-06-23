'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const EmptyCategory = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <PackageOpen className="w-12 h-12 text-muted-foreground mb-4" />

      <h3 className="text-lg font-semibold mb-2">No categories found</h3>

      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        There are currently no product categories available.
      </p>

      <Link href="/products" className="text-sm text-primary hover:underline">
        Browse all products
      </Link>
    </div>
  );
};

const CardCategory = ({
  data,
}: {
  data: Array<{ id: number | string; image?: string; name: string }>;
}) => {
  const { t } = useTranslation();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateNavigation = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setCanScrollPrevious(viewport.scrollLeft > 1);
    setCanScrollNext(
      viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    updateNavigation();
    const resizeObserver = new ResizeObserver(updateNavigation);
    resizeObserver.observe(viewport);
    viewport.addEventListener('scroll', updateNavigation, { passive: true });

    return () => {
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', updateNavigation);
    };
  }, [data.length, updateNavigation]);

  const scroll = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollBy({
      left: direction * viewport.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
      <div className="relative mb-5 w-full bg-white dark:bg-black">
        <p className="text-gray-400 py-2 px-4 uppercase">
          {t('navigation.categories')}
        </p>
        {data.length > 0 ? (
          <>
          <div
            ref={viewportRef}
            className="hide-scrollbar w-full overflow-x-auto overscroll-x-contain scroll-smooth"
          >
            <div className="grid h-80 grid-flow-col grid-rows-2 auto-cols-[25%] md:auto-cols-[20%]">
            {data
              .map((item: any, index: number) => (
                <Link
                  href={'/product?categoryIds=' + item.id}
                  key={item.id + index + 'skeleton'}
                  data-category-card="true"
                  className={`
                    flex flex-col items-center justify-between p-2 h-40
                    bg-white dark:bg-black border-gray-200
                    ${index === data.length - 1 || index === 0 ? 'border' : ' border border-l-0'}
                    w-full snap-start
                    hover:shadow-xl
                    transform transition duration-300 ease-in-out
                  `}
                >
                  <div className="rounded-full bg-[#F5F5F5] w-[83px] h-[83px]">
                    <Image
                      src={item.image ? item.image : '/vercel.svg'}
                      width={100}
                      height={100}
                      sizes="83px"
                      alt={item.name}
                      className="h-[83px] w-[83px] rounded-full object-cover"
                    />
                  </div>
                  <div className="text-wrap max-w-[100px] text-center text-sm">
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Previous categories"
            disabled={!canScrollPrevious}
            onClick={() => scroll(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-md transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next categories"
            disabled={!canScrollNext}
            onClick={() => scroll(1)}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 shadow-md transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
          </>
        ) : (
          <EmptyCategory />
        )}
      </div>
  );
};

export default CardCategory;
