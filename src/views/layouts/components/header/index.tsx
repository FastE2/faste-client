'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import LocaleSwitcher from '@/components/locale-switcher';
import { ModeToggle } from '@/components/ModeToggle';
import { ROUTE_CONFIG } from '@/configs/router';
import { createUrlQuery } from '@/utils/create-query-url';
import { cn } from '@/lib/utils';
import PromoBar from './PromoBar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const handleNavigateLogin = () => {
    if (pathName !== '/') {
      router.replace(
        ROUTE_CONFIG.LOGIN + '?' + createUrlQuery('returnUrl', pathName),
      );
    } else {
      router.replace('/login');
    }
  };

  const navigationItems = [
    {
      href: '#',
      label: 'Home',
      icon: 'material-symbols:home-outline',
      hasDropdown: true,
    },
    { href: '#', label: 'Shop', icon: 'iconoir:shop', hasDropdown: true },
    { href: '#', label: 'Fruits & Vegetables', icon: 'lucide:apple' },
    { href: '#', label: 'Beverages', icon: 'line-md:coffee-loop' },
    { href: '#', label: 'Blog', icon: 'mdi:file-text-outline' },
    { href: '#', label: 'Contact', icon: 'material-symbols:mail-outline' },
  ];

  const topNavItems = [
    { href: '/about', label: 'About us' },
    { href: '/my-account', label: 'My account' },
    { href: '/wishlist', label: 'Wishlist' },
  ];

  const rightNavItems = [
    { href: '/my-account', label: 'My account' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <header className="bg-background border-b border-border">
      {/* Promo Bar */}
      <PromoBar />

      {/* Top Navigation */}
      <div className="hidden md:block bg-muted/30">
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
      </div>

      {/* Main Header */}
      <div className="bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <Image
                src="/next.svg"
                width={40}
                height={40}
                alt="FastE3 logo"
                className="dark:invert"
              />
              <span className="font-bold text-xl text-foreground hidden sm:block">
                FastE3
              </span>
            </div>

            {/* Location (Hidden on mobile) */}
            <div className="hidden lg:block">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Icon icon="akar-icons:location" className="w-5 h-5" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:flex items-center gap-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products, categories or brands..."
                  className="pr-10 bg-muted/50 border-0 rounded-2xl"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl"
                >
                  <Icon
                    icon="material-symbols-light:search"
                    className="w-4 h-4"
                  />
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <Icon
                  icon="material-symbols-light:search"
                  className="w-5 h-5"
                />
              </Button>

              {/* User Profile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNavigateLogin}
                className="text-muted-foreground hover:text-purple-600 transition-colors"
              >
                <Icon icon="lucide:user-round" className="w-5 h-5" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-purple-600 transition-colors"
              >
                <Icon
                  icon="material-symbols:favorite-outline"
                  className="w-5 h-5"
                />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500"
                >
                  2
                </Badge>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-purple-600 transition-colors"
              >
                <Icon icon="f7:cart" className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500"
                >
                  2
                </Badge>
              </Button>

              {/* Theme Toggle */}
              <ModeToggle />

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-muted-foreground hover:text-foreground"
                  >
                    <Icon icon="material-symbols:menu" className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 p-4">
                    {/* Mobile Search */}
                    <div className="md:hidden py-4">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search products..."
                          className="pr-10 bg-muted/50 border-0 rounded-2xl"
                        />
                        <Button
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl"
                        >
                          <Icon
                            icon="material-symbols-light:search"
                            className="w-4 h-4"
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-4">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 text-foreground hover:text-purple-600 transition-colors py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon icon={item.icon} className="w-5 h-5" />
                          <span>{item.label}</span>
                          {item.hasDropdown && (
                            <Icon
                              icon="icon-park-outline:down"
                              className="w-4 h-4 ml-auto"
                            />
                          )}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Top Nav Items */}
                    <div className="border-t border-border pt-4">
                      <div className="flex flex-col space-y-3">
                        {[...topNavItems, ...rightNavItems].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Locale Switcher */}
                    <div className="border-t border-border pt-4">
                      <LocaleSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Desktop) */}
      <div className="hidden lg:block bg-background border-t border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium transition-colors',
                    'text-muted-foreground hover:text-purple-600',
                    item.label === 'Home' && 'text-foreground',
                  )}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <Icon icon="icon-park-outline:down" className="w-4 h-4" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Trending Products</span>
                <Icon icon="icon-park-outline:down" className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-red-600 font-medium">
                  Almost Finished
                </span>
                <Badge
                  variant="destructive"
                  className="bg-red-500 text-xs px-2 py-1 rounded-md"
                >
                  SALE
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
