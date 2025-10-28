import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import { CheckoutPage } from '@/views/pages/checkout';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Checkout - FastE',
};

export default function Page() {
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={true}
      guestGuard={false}
    >
      <CheckoutPage />
    </GuardLayoutWrapper>
  );
}
