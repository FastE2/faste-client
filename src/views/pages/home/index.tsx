'use client';

import CartProduct from '@/components/CardProduct';
import CardCategory from './partials/CardCategory';
import { Button } from '@/components/ui/button';
import BannerWeb from './partials/BannerWeb';
import { Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import PrimaryProductCard from './partials/PrimaryProductCard';
import Image from 'next/image';
import WelcomePopup from './partials/WelcomePopup';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import EmptyProductHome from './partials/EmptyProductHome';

interface TProps {
  data: [];
  totalItem: number;
  page: number;
  limit: number;
  totalPage: number;
  categories: Array<{ id: number | string; image?: string; name: string }>;
}

const HomePage = (props: TProps) => {
  const { data: products, categories } = props;
  const router = useRouter();
  const { t } = useTranslation(undefined, { useSuspense: false });
  const bestSelling = products?.slice(0, 7) || [];
  const newProducts = products?.slice(7) || [];

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4">
        <WelcomePopup />
        <BannerWeb />
        <CardCategory data={categories} />

        {/* Best Sellers Section */}
        <div className="w-full mb-5">
          <div className="bg-white dark:bg-black w-full mb-4">
            <div className="text-center uppercase text-base font-medium text-red-400 py-2 w-full flex justify-center items-center gap-2">
              <Flame aria-hidden="true" className="h-6 w-6" />
              {t('product.bestSelling')}
            </div>
            <div className="bg-red-500 h-1 w-full"></div>
          </div>

          {/* Other products */}
          {bestSelling && bestSelling.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 items-stretch">
              {/* Primary product card */}
              <div className="col-span-2">
                <Card className="rounded-none bg-white dark:bg-black max-h-[288px] h-full w-full hover:shadow-accent-foreground text-xs gap-y-1 p-0 border-none transition-all duration-300 ease-in-out overflow-hidden">
                  <PrimaryProductCard />
                </Card>
              </div>

              {bestSelling.map((product: any) => (
                <CartProduct key={product.id} data={product} />
              ))}
            </div>
          ) : (
            <EmptyProductHome />
          )}
        </div>

        <Image
          src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/2f/bf/2fbff17f2d97cb69d9d10194b17611aa.png?w=1280&q=75"
          alt="primary product"
          width={1280}
          height={400}
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 100vw,
            1280px
          "
          className="w-full h-auto object-cover"
        />

        {/* New Products Section */}
        <div className="w-full">
          <div className="bg-white dark:bg-black w-full mb-4">
            <div className="text-center uppercase text-base font-medium text-red-400 py-2 w-full">
              {t('product.newProducts')}
            </div>
            <div className="bg-red-500 h-1 w-full"></div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            {newProducts && newProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {newProducts.map((product: any, index) => (
                  <CartProduct key={index + product.id} data={product} />
                ))}
              </div>
            ) : (
              <EmptyProductHome />
            )}

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="font-normal bg-transparent text-blue-400 border border-blue-400 rounded-none px-40 cursor-pointer"
                onClick={() => router.push('/product?page=1&limit=20')}
              >
                {t('common.viewMore')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
