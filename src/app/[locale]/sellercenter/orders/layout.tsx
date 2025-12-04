'use client';

import { usePathname } from 'next/navigation';

export default function OrdersLayout({
  children,
  list,
  detail,
}: {
  children: React.ReactNode;
  list: React.ReactNode; // @list slot
  detail: React.ReactNode; // @detail slot
}) {
  console.log('RUN LAYOUT');
  const pathname = usePathname();
  const showParallelSlots =
    pathname === '/sellercenter/orders/list' ||
    pathname.startsWith('/sellercenter/orders/detail/');

  return (
    <>
      {showParallelSlots ? (
        <>
          {list}
          {detail}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
