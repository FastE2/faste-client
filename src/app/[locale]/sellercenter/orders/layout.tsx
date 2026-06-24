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
  const pathname = usePathname();
  const localePrefix = /^\/(vi|en|kr|cn)/;
  const normalizedPath = pathname.replace(localePrefix, '');

  const showParallelSlots =
    normalizedPath === '' ||
    normalizedPath === '/' ||
    normalizedPath === '/sellercenter/orders/list' ||
    normalizedPath.startsWith('/sellercenter/orders/detail/');

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
