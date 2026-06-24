'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { ShopSection } from './partials/shop-section';
import { SummaryCard } from './partials/summary-card';
import CartPageSkeleton from './partials/CartPageSkeleton';
import { useCartController } from './use-cart-controller';

export default function CartPage() {
  const { t } = useTranslation();
  const cart = useCartController();
  const allItems = useMemo(
    () => cart.groups.flatMap((group) => group.cartItems),
    [cart.groups],
  );
  const eagerImageIds = useMemo(
    () => new Set(allItems.slice(0, 2).map((item) => item.id)),
    [allItems],
  );
  const allSelected =
    allItems.length > 0 && allItems.every((item) => cart.selectedIds.has(item.id));

  if (cart.isLoading) return <CartPageSkeleton />;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl p-2">
        <div className="mb-4">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            {t('navigation.cart')}
          </h1>
          <p className="text-muted-foreground">
            {allItems.length} {t('navigation.products')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {cart.groups.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">{t('cart.emptyCart')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-t-lg border border-border bg-white px-4 py-3">
                  <div className="w-6 flex-shrink-0">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={(checked) => cart.selectAll(Boolean(checked))}
                    />
                  </div>
                  <div className="flex-1 text-sm font-medium text-muted-foreground">
                    {t('navigation.products')}
                  </div>
                  <div className="min-w-[120px] text-center text-sm font-medium text-muted-foreground">
                    {t('cart.unitPrice')}
                  </div>
                  <div className="min-w-[120px] flex-shrink-0 text-center text-sm font-medium text-muted-foreground">
                    {t('cart.quantity')}
                  </div>
                  <div className="min-w-[120px] flex-shrink-0 text-center text-sm font-medium text-muted-foreground">
                    {t('cart.totalPrice')}
                  </div>
                  <div className="w-6 flex-shrink-0">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                {cart.groups.map((group) => (
                  <ShopSection
                    key={group.shop.shopid}
                    cartShop={group}
                    selectedIds={cart.selectedIds}
                    eagerImageIds={eagerImageIds}
                    onQuantityChange={cart.changeQuantity}
                    onDelete={cart.removeItem}
                    onSelect={cart.selectItem}
                    onSelectAll={cart.selectShop}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <SummaryCard
              subtotal={cart.subtotal}
              shipping={0}
              discount={0}
              total={cart.total}
              selectedItems={cart.selectedItems}
              onCheckout={cart.checkout}
              isPending={cart.isCheckingOut}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
