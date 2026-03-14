'use client';

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { ROUTE_CONFIG } from '@/configs/router';
import { useTranslation } from 'react-i18next';
import { formatCurrencyWithExchange } from '@/utils';


interface SummaryCardProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  selectedItems: any[];
  onCheckout?: () => void;
  onOrder?: () => void;
}

function SummaryCardComponent({
  subtotal,
  shipping,
  discount,
  total,
  selectedItems,
  onCheckout,
  onOrder,
}: SummaryCardProps) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  // Memoized format
  const formatPrice = useCallback(
    (price: number) => {
      return formatCurrencyWithExchange(price, {
        language: i18n.language as 'vi' | 'en' | 'cn' | 'kr',
      });
    },
    [i18n.language],
  );

  console.log('== SummaryCard render', {
    subtotal,
    shipping,
    discount,
    total,
    selectedItems,
    onCheckout,
    onOrder
  });

  const isCartPage = pathname === ROUTE_CONFIG.CART;
  const disableCheckout = selectedItems.length <= 0;

  return (
    <Card className="p-6 sticky top-4 h-fit">
      {/* Delivery Address */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {t('cart.deliverTo')}
          </h3>
          <button className="text-sm text-primary hover:underline">
            {t('common.change')}
          </button>
        </div>
        <div className="bg-muted p-3 rounded-lg mb-2">
          <p className="text-sm font-medium text-foreground">Phạm Văn A</p>
          <p className="text-xs text-muted-foreground mt-1">0xxxxxxxxx</p>
          <p className="text-xs text-muted-foreground mt-1">
            xxxxxxxxxxxxxx, Hồ Chí Minh
          </p>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Promo Code */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {t('cart.promoCode')}
        </h3>
        <div className="flex gap-2">
          <Input placeholder={t('cart.enterPromoCode')} className="text-sm" />
          <Button variant="outline" size="sm">
            {t('common.apply')}
          </Button>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Price Summary */}
      <div className="space-y-2 ">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('cart.totalProductPrice')}</span>
          <span className="text-foreground">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('cart.shippingFee')}</span>
          <span className="text-foreground">{formatPrice(shipping)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('cart.discount')}</span>
            <span className="text-destructive">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <Separator className="my-2" />

      {/* Total */}
      <div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">
            {t('cart.totalPayment')}
          </span>
          <span className="text-2xl font-bold text-destructive">
            {formatPrice(total)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          ({t('cart.vatIncluded')})
        </p>
      </div>

      {/* Checkout Button */}
      <Button
        disabled={disableCheckout}
        className={`w-full bg-destructive hover:bg-destructive/90 text-white font-semibold rounded-lg mb-4 ${
          disableCheckout ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={isCartPage ? onCheckout : onOrder}
      >
        {`${isCartPage ? t('cart.checkout') : t('checkout.placeOrder')} (${selectedItems.length})`}
      </Button>
    </Card>
  );
}

export const SummaryCard = React.memo(SummaryCardComponent);
