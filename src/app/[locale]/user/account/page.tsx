import type React from 'react';
import AccountPage from '@/views/pages/user/account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thông tin cá nhân | FastE'
}

export default function Page() {
  return <AccountPage />;
}
