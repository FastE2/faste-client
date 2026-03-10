"use client"

import { ReactNode } from 'react';
import Header from './components/header';
import { ChatWidget } from '@/components/chat-widget';
import dynamic from 'next/dynamic';
import { LoadingDialog } from '@/components/loading/LoadingDialog';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';

const Footer = dynamic(() => import('./components/footer'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="bg-[#F5F5F5] dark:bg-[#121212] py-8">
        <ChatWidget />
        {children}
      </main>
      <Footer />
    </div>
  );
}
