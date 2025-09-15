'use client';

import ExampleClientComponent from '@/components/ExampleClientComponent';
import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutSeller';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={false}
      guestGuard={false}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h1>{t('getStarted')}</h1>
        <ExampleClientComponent />
      </div>
    </GuardLayoutWrapper>
  );
}
