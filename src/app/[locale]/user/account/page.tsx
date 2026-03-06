import type React from 'react';
import AccountPage from '@/views/pages/user/account';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Thông tin cá nhân | FastE',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountPage />
    </Suspense>
  );
}
