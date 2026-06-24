import type { ProductDetail } from '@/views/pages/product/product-details/product-detail.types';
import {
  buildProductFaqs,
  getProductAvailability,
  getProductBrand,
  getProductPrice,
} from './product';

export const organizationJsonLd = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FastE',
  url: siteUrl,
  logo: new URL('/images/logo.svg', siteUrl).toString(),
});

export const productJsonLd = (product: ProductDetail, url: string) => {
  const availability = getProductAvailability(product);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images ?? [],
    description: product.description,
    sku: String(product.id),
    brand: {
      '@type': 'Brand',
      name: getProductBrand(product) ?? 'FastE',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: getProductPrice(product),
      availability: `https://schema.org/${availability}`,
      url,
    },
  };
};

export const productFaqJsonLd = (product: ProductDetail) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: buildProductFaqs(product).map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const faqPageJsonLd = (
  faqs: Array<{ question: string; answer: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
