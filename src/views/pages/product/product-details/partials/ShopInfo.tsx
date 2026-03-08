'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MessageCircle, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Props = {
  shop: any;
};

export const ShopInfo = memo(({ shop }: Props) => {
  const router = useRouter();
  const {t} = useTranslation();

  return (
    <div className="flex items-center gap-x-4 bg-white dark:bg-black w-full p-4">
      <Image
        src={shop.logo || '/placeholder.png'}
        alt={shop.name}
        width={80}
        height={80}
        className="rounded-full w-20 h-20 object-cover"
      />

      <div>
        <h3 className="font-medium text-xl">{shop.name}</h3>
        <div className="flex items-center gap-x-2 mt-2">
          <Button variant="outline" size="sm" className="cursor-pointer" >
            <MessageCircle className="w-4 h-4 mr-1" />
            {t('shop.chatNow')}
          </Button>
          <Button size="sm" onClick={() => router.push(`/shop/${shop.slug}`)} className='cursor-pointer'>
            <Store className="w-4 h-4 mr-1" />
            {t('shop.viewShop')}
          </Button>
        </div>
      </div>

      <div className="h-20 w-[1px] bg-gray-200 mx-4" />

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">{t('product.rating')}</span>{' '}
          <span className="text-red-500">72K</span>
        </div>
        <div>
          <span className="text-gray-400">{t('navigation.products')}</span>{' '}
          <span className="text-red-500">3,6K</span>
        </div>
        <div>
          <span className="text-gray-400">{t('product.joined')}</span>{' '}
          <span className="text-red-500">2 năm</span>
        </div>
        <div>
          <span className="text-gray-400">{t('shop.follow')}</span>{' '}
          <span className="text-red-500">127,6k</span>
        </div>
      </div>
    </div>
  );
});

ShopInfo.displayName = 'ShopInfo';
