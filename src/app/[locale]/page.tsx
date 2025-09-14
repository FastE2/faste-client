"use client";

import ExampleClientComponent from '@/components/ExampleClientComponent';
import LocaleSwitcher from '@/components/locale-switcher';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <main>
      <LocaleSwitcher />
      <h1>{t('getStarted')}</h1>
      <ExampleClientComponent />
    </main>
  );
}
