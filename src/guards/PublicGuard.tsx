'use client';

import { ReactNode, ReactElement, memo } from 'react';

interface PublicGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const PublicGuard = memo((props: PublicGuardProps) => {
  const { children } = props;

  return <>{children}</>;
});

PublicGuard.displayName = 'PublicGuard';

export default PublicGuard;
