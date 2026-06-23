import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import {
  getAllProductsPublic,
  getDetailProductPublicBySlug,
} from '@/services/product.service';
import { getAllReviews } from '@/services/review.service';
import LayoutPublic from '@/views/layouts/LayoutPublic/LayoutPublic';
import { Metadata } from 'next';
import { cache, ReactElement } from 'react';
import Script from 'next/script';
import ProductDetails from '@/views/pages/product/product-details';
import { getLocalizedAlternates, getLocalizedPath, getSiteUrl } from '@/lib/seo';
import type {
  ProductDetail,
  ProductReview,
} from '@/views/pages/product/product-details/product-detail.types';
import { getRelatedProducts } from '@/views/pages/product/product-details/product-detail.helpers';

type Props = {
  params: Promise<{ slugId: string; locale: string }>;
};

const getDetailProduct = cache(async (slugId: string): Promise<ProductDetail | null> => {
  try {
    const product = await getDetailProductPublicBySlug(slugId);
    return (product?.data as ProductDetail) ?? null;
  } catch (error) {
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugId, locale } = await params;
  const product = await getDetailProduct(slugId);

  if (!product) {
    return {
      title: 'Sản phẩm không tồn tại | FastE',
      description: 'Thông tin sản phẩm không khả dụng.',
      robots: { index: false, follow: false },
    };
  }

  const productPath = `/product/${product.slugId}`;
  const canonicalUrl = new URL(
    getLocalizedPath(locale, productPath),
    getSiteUrl(),
  ).toString();

  return {
    title: `${product.name} | FastE`,
    description: product.description,
    alternates: getLocalizedAlternates(locale, productPath),
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: product.name,
      description: product.description,
      images: product.images?.[0]
        ? [{ url: product.images[0], alt: product.name }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fastE',
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slugId, locale } = await params;
  const product = await getDetailProduct(slugId);

  if (!product) {
    return (
      <GuardLayoutWrapper
        getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
        authGuard={false}
        guestGuard={false}
      >
        <main className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-500">
            Sản phẩm không tồn tại
          </h1>
        </main>
      </GuardLayoutWrapper>
    );
  }

  const categoryIds = (product.categories ?? [])
    .map((entry) => entry.categoryId ?? entry.category?.id)
    .filter((id): id is number => typeof id === 'number');
  const [relatedResponse, reviewsResponse] = await Promise.all([
    getAllProductsPublic({ page: 1, limit: 24 }),
    getAllReviews({
      page: 1,
      limit: 5,
      productId: Number(product.id),
      order: 'asc',
      sortBy: 'createdAt',
    }),
  ]);
  const relatedPayload = relatedResponse?.data?.data ?? relatedResponse?.data ?? [];
  const relatedProducts = getRelatedProducts(
    Array.isArray(relatedPayload) ? relatedPayload : [],
    product.id,
    categoryIds,
    12,
  );
  const initialReviews = (reviewsResponse.data ?? []) as ProductReview[];

  // JSON-LD structured data cho SEO (schema.org)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images ?? [],
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name:
        typeof product.brand === 'string'
          ? product.brand
          : product.brand?.name ?? 'FastE',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price ?? product.basePrice,
      availability: 'https://schema.org/InStock',
      url: new URL(
        getLocalizedPath(locale, `/product/${product.slugId}`),
        getSiteUrl(),
      ).toString(),
    },
  };
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={false}
      guestGuard={false}
    >
      <main className="max-w-7xl mx-auto p-4 md:p-6 w-full">
        <ProductDetails
          product={product}
          relatedProducts={relatedProducts}
          initialReviews={initialReviews}
          locale={locale}
        />

        <Script
          id="product-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </main>
    </GuardLayoutWrapper>
  );
}
