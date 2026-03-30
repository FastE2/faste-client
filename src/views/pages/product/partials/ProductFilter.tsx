'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

type Props = {
  updateFilter: (key: string, value: string) => void;
  router: any;
  closeSheet?: () => void;
};

export const ProductFilter = ({ updateFilter, router, closeSheet }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Icon icon={'line-md:filter'} className="text-lg" />
          <h2 className="text-lg font-medium">{t('search.filterTitle')}</h2>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2 text-sm md:text-base">
        <div className="text-sm font-semibold text-gray-500 uppercase">{t('search.location')}</div>
        <div className="flex flex-col gap-y-2">
          {['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'].map((loc) => (
            <div key={loc} className="flex items-center gap-3">
              <Checkbox id={`loc-${loc}`} />
              <Label htmlFor={`loc-${loc}`} className="font-normal cursor-pointer">
                {loc}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-100"></div>

      {/* Category */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-500 uppercase">{t('search.category')}</div>
        <div className="flex flex-col gap-y-2">
          {['Tivi', 'Máy tính', 'Phụ kiện'].map((cat) => (
            <div key={cat} className="flex items-center gap-3">
              <Checkbox id={`cat-${cat}`} />
              <Label htmlFor={`cat-${cat}`} className="font-normal cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-100"></div>

      {/* Shipping */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-500 uppercase">{t('search.shipping')}</div>
        <div className="flex flex-col gap-y-2">
          {['Hỏa tốc', 'Nhanh', 'Tiết kiệm'].map((ship) => (
            <div key={ship} className="flex items-center gap-3">
              <Checkbox id={`ship-${ship}`} />
              <Label htmlFor={`ship-${ship}`} className="font-normal cursor-pointer">
                {ship}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-100"></div>

      {/* Brand */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-500 uppercase">{t('search.brand')}</div>
        <div className="flex flex-col gap-y-2">
          {['Samsung', 'LG', 'Sony'].map((brand) => (
            <div key={brand} className="flex items-center gap-3">
              <Checkbox id={`brand-${brand}`} />
              <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-100" />

      {/* Price Range */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-500 uppercase">{t('search.priceRange')}</div>
        <div className="w-full flex items-center gap-x-2">
          <input
            type="number"
            placeholder={t('search.priceFrom')}
            className="h-[36px] w-full text-center outline-none border border-gray-200 rounded-md text-sm bg-gray-50 focus:border-red-400 transition-colors"
          />
          <span className="w-4 h-[1px] bg-gray-400 flex-shrink-0"></span>
          <input
            type="number"
            placeholder={t('search.priceTo')}
            className="h-[36px] w-full text-center outline-none border border-gray-200 rounded-md text-sm bg-gray-50 focus:border-red-400 transition-colors"
          />
        </div>
        <Button 
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md h-10 mt-2 shadow-sm"
          onClick={() => {
            if (closeSheet) closeSheet();
          }}
        >
          {t('search.apply')}
        </Button>
      </div>
      <div className="w-full h-[1px] bg-gray-100" />

      {/* Rating */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-500 uppercase">{t('search.rating')}</div>
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-2 cursor-pointer py-1 px-1 rounded hover:bg-gray-50 transition-colors"
              onClick={() => {
                updateFilter('rating', String(item));
                if (closeSheet) closeSheet();
              }}
            >
              <Rating defaultValue={item} readOnly className="gap-x-0">
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton
                    key={index}
                    className={index < item ? "text-yellow-500" : "text-gray-200"}
                    size={14}
                  />
                ))}
              </Rating>
              {item !== 5 && <span className="text-xs text-gray-500">{t('search.ratingAbove')}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-100 pt-4" />

      {/* Clear all */}
      <Button
        variant="outline"
        className="w-full border-red-200 text-red-500 hover:bg-red-50 rounded-md h-10 transition-colors"
        onClick={() => {
          router.replace('?');
          if (closeSheet) closeSheet();
        }}
      >
        {t('search.clearAll')}
      </Button>
    </div>
  );
};
