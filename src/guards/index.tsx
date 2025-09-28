'use client';

import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import React, { ReactNode } from 'react';
import PublicGuard from './PublicGuard';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';

type GuardProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  children: ReactNode;
};

const Guard = React.memo(({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<LoadingSpinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <PublicGuard fallback={<LoadingSpinner />}>{children}</PublicGuard>;
  } else {
    return <AuthGuard fallback={<LoadingSpinner />}>{children}</AuthGuard>;
  }
});

Guard.displayName = 'Guard';

export default Guard;
