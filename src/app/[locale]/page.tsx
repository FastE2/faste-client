import { LOCALE_MAP } from '@/constants/meta';
import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import { getAllProductsPublic } from '@/services/product.service';
import LayoutPublic from '@/views/layouts/LayoutPublic/LayoutPublic';
import HomePage from '@/views/pages/home';
import HomeSkeleton from '@/views/pages/home/HomeSkeleton';
import { Metadata, Viewport } from 'next';
import { ReactElement, Suspense } from 'react';
import { getAllCategories } from '@/services/category.service';
import { getLocalizedAlternates, getSiteUrl } from '@/lib/seo';

interface TProps {
  data: [];
  totalItem: number;
  page: number;
  limit: number;
  totalPage: number;
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: keyof typeof LOCALE_MAP }>;
}): Promise<Metadata> {
  const { locale = 'vi' } = await params;

  const meta = LOCALE_MAP[locale];

  const baseUrl = getSiteUrl();

  return {
    title: meta.title,
    description: meta.desc,

    metadataBase: new URL(baseUrl),

    alternates: getLocalizedAlternates(locale),

    openGraph: {
      locale: meta.lang.replace('-', '_'),
      title: meta.title,
      description: meta.desc,
      url: new URL(getLocalizedAlternates(locale).canonical, baseUrl),
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

async function getProductsData(): Promise<TProps> {
  const page = 1;
  const limit = 48;

  try {
    const response = await getAllProductsPublic({ page, limit });
    const products = response?.data ?? [];

    return products;
  } catch (error) {
    return {
      data: [],
      totalItem: 0,
      page,
      limit,
      totalPage: 0,
    };
  }
}

async function HomeContent() {
  const [products, categoriesResponse] = await Promise.all([
    getProductsData(),
    getAllCategories({ page: 1, limit: 20 }),
  ]);
  const categoryPayload = categoriesResponse?.data;
  const categories = Array.isArray(categoryPayload)
    ? categoryPayload
    : Array.isArray(categoryPayload?.data)
      ? categoryPayload.data
      : [];

  return <HomePage {...products} categories={categories} />;
}

export default async function Home() {
  console.log(
    '© Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.',
  );
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={false}
      guestGuard={false}
    >
      <Suspense fallback={<HomeSkeleton />}>
        <HomeContent />
      </Suspense>
    </GuardLayoutWrapper>
  );
}

// No force-static to prevent hydration block on home
