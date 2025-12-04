'use client';

import LocaleSwitcher from '@/components/locale-switcher';
import { rightNavItems, topNavItems } from '@/configs/header';
import Link from 'next/link';

export const TopNavigation = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between py-2 text-xs text-muted-foreground">
        <nav className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {topNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-px h-4 bg-border"></div>
          <p className="text-xs">
            We deliver to you every day from{' '}
            <span className="text-orange-600 font-semibold">7:00</span> to{' '}
            <span className="text-orange-600 font-semibold">23:00</span>
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
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
