import { LOCALE_MAP } from '@/constants/meta';
import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import { getAllProductsPublic } from '@/services/product';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import HomePage from '@/views/pages/home';
import { Metadata, Viewport } from 'next';
import { ReactElement } from 'react';

interface TProps {
  data: [];
  totalItem: number;
  page: number;
  limit: number;
  totalPage: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: keyof typeof LOCALE_MAP }>;
}): Promise<Metadata> {
  const { locale = 'vi' } = await params;

  const meta = LOCALE_MAP[locale];

  const baseUrl = 'https://fasteapp.vercel.app';
  const path = locale === 'vi' ? '' : `/${locale}`;

  return {
    title: meta.title,
    description: meta.desc,

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: path || '/',
      languages: {
        'x-default': '/',
        'vi-VN': '/',
        'en-US': '/en',
        'zh-CN': '/cn',
        'ko-KR': '/kr',
      },
    },

    openGraph: {
      locale: meta.lang.replace('-', '_'),
      title: meta.title,
      description: meta.desc,
      url: `${baseUrl}${path}`,
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
export default async function Home() {
  const products = await getProductsData();
  const { data, limit, page, totalItem, totalPage } = products;
  console.log(
    '© Copyright belongs to the account [ahkiet lekiett2201@gmail.com]. Unauthorized copying, selling, distribution, or modification is prohibited.',
  );
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={false}
      guestGuard={false}
    >
      <HomePage
        data={data}
        limit={limit}
        page={page}
        totalItem={totalItem}
        totalPage={totalPage}
      />
    </GuardLayoutWrapper>
  );
}

export const dynamic = 'force-static';
export const revalidate = 60;
