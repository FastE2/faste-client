'use client';

import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Rating, RatingButton } from './ui/shadcn-io/rating';
import { formatCurrencyWithExchange } from '@/utils';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

const CartProduct = (props: { data: any; className?: string }) => {
  const { data, className = '' } = props;
  const { i18n } = useTranslation();
  const [imgLoading, setImgLoading] = useState(true);

  return (
    // h-[350px] w-[280px]
    <Link href={`/product/${data.slugId}`}>
      <Card
        className={`rounded-none bg-white dark:bg-black max-w-80 h-72 hover:shadow-accent-foreground text-xs gap-y-1 p-0 border-none transition-all duration-300 ease-in-out overflow-hidden ${className}`}
      >
        <CardContent className="p-0 h-full">
          <div className="relative h-[190px] w-full overflow-hidden">
            {imgLoading ? (
              <Skeleton className="absolute inset-0 h-full w-full" />
            ) : null}
            <Image
              src={data.images?.[0] ?? '/nftt-1.webp'}
              loading="lazy"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 190px"
              alt={data.name}
              className={`object-cover object-center transition-opacity duration-300 ${
                imgLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImgLoading(false)}
            />
          </div>
          <div className="p-1">
            <p className="line-clamp-2 text-sm">{data.name}</p>
            <div className="flex items-center gap-x-1">
              <div className="text-[#EE4D2D] text-base">
                {data?.skus?.length
                  ? formatCurrencyWithExchange(data.skus[0].price, {
                      language: i18n.language as 'vi' | 'en' | 'cn' | 'kr',
                    })
                  : formatCurrencyWithExchange(data?.basePrice ?? 0, {
                      language: i18n.language as 'vi' | 'en' | 'cn' | 'kr',
                    })}
              </div>
              <div className="w-8 h-4 text-[10px] bg-[#FEEEEA] text-[#EE4D2D] py-0.5 px-1 ">
                -39%
              </div>
            </div>
            <div>
              <Rating defaultValue={data.rating ?? 0} readOnly className="gap-x-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    className="text-yellow-500"
                    key={index}
                    size={12}
                  />
                ))}
              </Rating>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CartProduct;
