import { rightNavItems, topNavItems } from '@/configs/header';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TProps {
  setIsOpen: (isOpen: boolean) => void;
}

// use React.memo to prevent unnecessary re-renders
export default React.memo(function MobileTopNavigation({ setIsOpen }: TProps) {
  const { t } = useTranslation();
  return (
    <div className="border-t border-border pt-4">
      <div className="flex flex-col space-y-3">
        {[...topNavItems, ...rightNavItems].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted-foreground hover:text-foreground transition-colors py-1"
            onClick={() => setIsOpen(false)}
          >
            {t(item.label)}
          </Link>
        ))}
      </div>
    </div>
  );
});
