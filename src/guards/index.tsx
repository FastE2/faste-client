'use client';

import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import React, { ReactNode } from 'react';
import PublicGuard from './PublicGuard';
import { LoadingDialog } from '@/components/loading/LoadingDialog';

type GuardProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  children: ReactNode;
};

const Guard = React.memo(({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<LoadingDialog isLoading={true} message='' />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <PublicGuard fallback={<LoadingDialog isLoading={true} message='' />}>{children}</PublicGuard>;
  } else {
    return <AuthGuard fallback={<LoadingDialog isLoading={true} message='' />}>{children}</AuthGuard>;
  }
});

Guard.displayName = 'Guard';

export default Guard;
