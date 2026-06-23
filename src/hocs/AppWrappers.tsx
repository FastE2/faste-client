'use client';

// ** Components
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import { AuthProvider } from '@/contexts/AuthContext';
import { useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { createQueryClient } from '@/lib/query-client';
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((m) => m.Analytics),
  { ssr: false },
);

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights),
  { ssr: false },
);

export default function AppWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(createQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <AuthProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' ? <QueryDevtools /> : null}
    </QueryClientProvider>
  );
}

const QueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then(
      (module) => module.ReactQueryDevtools,
    ),
  { ssr: false },
);
