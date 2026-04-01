'use client';

import React, { useEffect, ReactNode, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocalUserData, setLocalUserData } from '@/helpers/storage';
import { injectAuthDependencies } from '@/utils/axios';
import { useGetProfile } from '@/hooks/api/queries/useGetProfile';
import { keepPreviousData } from '@tanstack/react-query';
import { LoadingDialog } from '@/components/loading/LoadingDialog';
import { useAuthStore } from '@/stores/auth.store';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser, setLoading, loading } = useAuthStore();
  const router = useRouter();
  const pathName = usePathname();

  const { userData, accessToken } = typeof window !== 'undefined' ? getLocalUserData() : { userData: null, accessToken: null };
  const enabled = !!userData;

  const { data, isLoading } = useGetProfile({
    enabled,
    select: (data) => data,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!userData && !accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (data) {
      setUser(data);
      setLocalUserData(data);
    }

    if (!isLoading) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, data, isLoading, accessToken]);

  useEffect(() => {
    injectAuthDependencies(router, setUser, pathName);
  }, [router, setUser, pathName]);

  return (
    <Suspense fallback={<LoadingDialog isLoading />}>
      {!loading && children}
    </Suspense>
  );
};
