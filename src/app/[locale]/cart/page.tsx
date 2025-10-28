import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import CartPage from '@/views/pages/cart';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Giỏ hàng - FastE',
};

export default function Page() {
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={true}
      guestGuard={false}
    >
      <CartPage />
    </GuardLayoutWrapper>
  );
}
