'use client';

import React, { ReactNode } from 'react';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import PublicGuard from './PublicGuard';
import AclGuard from './AclGuard';
import { LoadingDialog } from '@/components/loading/LoadingDialog';

type GuardProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  roles?: string[];
  children: ReactNode;
};

const Guard = React.memo(({ children, authGuard, guestGuard, roles }: GuardProps) => {
  const fallback = <LoadingDialog isLoading={true} message="" />;

  if (guestGuard) {
    return <GuestGuard fallback={fallback}>{children}</GuestGuard>;
  }

  if (!guestGuard && !authGuard) {
    return <PublicGuard fallback={fallback}>{children}</PublicGuard>;
  }

  return (
    <AuthGuard fallback={fallback}>
      {roles ? <AclGuard roles={roles}>{children}</AclGuard> : children}
    </AuthGuard>
  );
});

Guard.displayName = 'Guard';

export default Guard;