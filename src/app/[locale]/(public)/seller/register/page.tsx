import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import RegisterSellerPage from '@/views/pages/seller/register';
import { Metadata } from 'next';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Đăng ký Cửa hàng - FastE',
};

export default function Page() {
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={true}
      guestGuard={false}
    >
      <RegisterSellerPage />
    </GuardLayoutWrapper>
  );
}
