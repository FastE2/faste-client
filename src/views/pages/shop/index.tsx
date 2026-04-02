'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getAllShopsIsPublic } from '@/services/shop.service';
import { toastify } from '@/components/ToastNotification';

interface TShop {
  shopid: number;
  id?: number;
  slug: string;
  name: string;
  description: string;
  ratingStar: number;
  itemCount: number;
  logo: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'rating-high' | 'products-high';

export default function ShopPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataShops, setDataShops] = useState<TShop[]>();
  const shopsPerPage = 8;

  // Filter and sort shops
  const filteredAndSortedShops = useMemo(() => {
    const filtered = dataShops
      ? dataShops.filter(
          (shop) =>
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-high':
        filtered.sort((a, b) => b.ratingStar - a.ratingStar);
        break;
      case 'products-high':
        filtered.sort((a, b) => b.itemCount - a.itemCount);
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, dataShops]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedShops.length / shopsPerPage);
  const startIndex = (currentPage - 1) * shopsPerPage;
  const paginatedShops = filteredAndSortedShops.slice(
    startIndex,
    startIndex + shopsPerPage,
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Fetch data
  const fetchDataShopsIsPublic = async () => {
    const res = await getAllShopsIsPublic();
    if (!res.error) {
      setDataShops(res.data.data);
    } else {
      toastify.error('', res.message);
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  useEffect(() => {
    fetchDataShopsIsPublic();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('shops.title')}
            </h1>
            <p className="mt-4 text-lg opacity-90">
              {t('shops.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search and Sort Controls */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('shops.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                aria-label={t('shops.searchPlaceholder')}
              />
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {t('shops.sortBy')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleSortChange('name-asc')}>
                  {t('shops.sortOptions.nameAsc')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('name-desc')}>
                  {t('shops.sortOptions.nameDesc')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSortChange('rating-high')}
                >
                  {t('shops.sortOptions.ratingHigh')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSortChange('products-high')}
                >
                  {t('shops.sortOptions.productsHigh')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Shops Grid */}
          {paginatedShops.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedShops.map((shop, index) => (
                  <article key={shop.shopid || index}>
                    <Link href={`/shop/${shop.slug}`}>
                      <Card className="h-full overflow-hidden transition-all hover:shadow-lg gap-y-4">
                        {/* Shop Logo */}
                        <div className='relative h-32 w-full overflow-hidden bg-muted flex items-center justify-center'>
                          <div className="relative flex h-20 w-20 items-center justify-center rounded-full overflow-hidden bg-white">
                            <Image
                              src={shop.logo || '/placeholder.png'}
                              alt={`${shop.name} logo`}
                              width={100}
                              height={100}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>

                        <CardHeader className="pb-3">
                          {/* Shop Name */}
                          <h2 className="text-lg font-semibold text-card-foreground line-clamp-2">
                            {shop.name}
                          </h2>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4">
                          {/* Description */}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {shop.description}
                          </p>

                          {/* Rating */}
                          <div className="flex items-center justify-between border-t border-border pt-3">
                            {renderStars(shop.ratingStar)}
                          </div>

                          {/* Product Count */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{t('shops.productCount', { count: shop.itemCount })}</span>
                          </div>

                          {/* View Shop Button */}
                          <Button className="w-full mt-2" size="sm">
                            {t('shops.viewShop')}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    {t('blog.previous')}
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-9 w-9 p-0"
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    {t('blog.next')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg font-medium text-foreground">
                {t('shops.noShops')}
              </p>
              <p className="mt-2 text-muted-foreground">
                {t('shops.noShopsDesc')}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  handleSortChange('name-asc');
                }}
                className="mt-4"
              >
                {t('blog.clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
