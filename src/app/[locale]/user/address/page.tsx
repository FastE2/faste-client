import AddressPage from '@/views/pages/user/address';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Địa chỉ | FastE'
}

export default function Page() {
  return (
    <>
      <AddressPage />
    </>
  );
}
