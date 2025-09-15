'use client';
// ** hooks
import { useAuth } from '@/hooks/useAuth';
// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

interface PublicGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const PublicGuard = (props: PublicGuardProps) => {
  // ** props
  const { children, fallback } = props;

  // ** auth
  const { loading } = useAuth();

  useEffect(() => {}, []);

  if (loading) {
    return fallback;
  }

  return <>{children}</>;
};

export default PublicGuard;
