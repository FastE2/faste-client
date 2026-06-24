import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import { getAllShopsIsPublic } from '@/services/shop.service';
import LayoutPublic from '@/views/layouts/LayoutPublic/LayoutPublic';
import ShopPage, { type TShop } from '@/views/pages/shop';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Shop - FastE',
  description: 'Browse public shops and sellers on FastE.',
};

export const revalidate = 3600;

async function getPublicShops(): Promise<TShop[]> {
  const response = await getAllShopsIsPublic({ page: 1, limit: 48 });
  const payload = response?.data?.data ?? response?.data ?? [];

  return Array.isArray(payload) ? payload : [];
}

export default async function Page() {
  const shops = await getPublicShops();

  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={false}
      guestGuard={false}
    >
      <ShopPage initialShops={shops} />
    </GuardLayoutWrapper>
  );
}
