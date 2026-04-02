'use client';

import { rightNavItems, topNavItems } from '@/configs/header';
import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next';
import LocaleSwitcher from '@/components/locale-switcher';

export const TopNavigation = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-between py-2 text-xs text-muted-foreground">
        <nav className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {topNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-px h-4 bg-border"></div>
          <p className="text-xs">
            <Trans
              i18nKey="header.deliveryInfo"
              components={{
                1: <span className="text-orange-600 font-semibold" />,
                2: <span className="text-orange-600 font-semibold" />,
              }}
            />
          </p>
        </nav>

        <ul className="flex items-center gap-4">
          <li>
            <LocaleSwitcher />
          </li>
          {rightNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
