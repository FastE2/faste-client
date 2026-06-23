import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import { getDetailProductPublicBySlug } from '@/services/product.service';
import LayoutPublic from '@/views/layouts/LayoutPublic/LayoutPublic';
import { Metadata } from 'next';
import { cache, ReactElement } from 'react';
import Script from 'next/script';
import ProductDetails from '@/views/pages/product/product-details';
import { getLocalizedAlternates, getLocalizedPath, getSiteUrl } from '@/lib/seo';

type Product = {
  id: string;
  slugId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  brand?: string;
};
type Props = {
  params: Promise<{ slugId: string; locale: string }>;
};

const getDetailProduct = cache(async (slugId: string): Promise<Product | null> => {
  try {
    const product = await getDetailProductPublicBySlug(slugId);
    return product?.data ?? null;
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
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@fastE',
      title: product.name,
      description: product.description,
      images: [product.image],
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

  // JSON-LD structured data cho SEO (schema.org)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand ?? 'FastE',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
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
        <ProductDetails product={product} />

        <Script
          id="product-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </main>
    </GuardLayoutWrapper>
  );
}
