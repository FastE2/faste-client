import type React from 'react';
import AccountPage from '@/views/pages/user/account';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Thông tin cá nhân | FastE',
};

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AccountPage />
    </Suspense>
  );
}
