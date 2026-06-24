import type { ProductDetail } from '@/views/pages/product/product-details/product-detail.types';

export type AIProductAvailability = 'InStock' | 'OutOfStock';

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type AIProductSummary = {
  id: string | number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  price: {
    amount: number;
    currency: 'VND';
    formatted: string;
  };
  availability: AIProductAvailability;
  url: string;
  image?: string;
  brand?: string;
  categories: string[];
  faqs: ProductFAQ[];
};

const CURRENCY = 'VND' as const;

export function formatVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProductPrice(
  product: Pick<ProductDetail, 'basePrice' | 'price' | 'skus'>,
) {
  const skuPrices = (product.skus ?? [])
    .map((sku) => sku.price)
    .filter((price): price is number => Number.isFinite(price));

  if (skuPrices.length > 0) {
    return Math.min(...skuPrices);
  }

  return product.price ?? product.basePrice ?? 0;
}

export function getProductAvailability(
  product: Pick<ProductDetail, 'skus'> & { status?: string },
): AIProductAvailability {
  if (product.status && product.status !== 'PUBLISHED') {
    return 'OutOfStock';
  }

  const skus = product.skus ?? [];
  if (skus.length === 0) {
    return 'InStock';
  }

  return skus.some((sku) => (sku.quantity ?? 0) > 0) ? 'InStock' : 'OutOfStock';
}

export function getProductBrand(product: Pick<ProductDetail, 'brand'>) {
  if (typeof product.brand === 'string') {
    return product.brand;
  }

  return product.brand?.name;
}

export function getProductCategories(
  product: Pick<ProductDetail, 'categories'>,
) {
  return (product.categories ?? [])
    .map((entry) => entry.category?.name)
    .filter((name): name is string => Boolean(name));
}

export function buildProductFaqs(product: ProductDetail): ProductFAQ[] {
  const price = getProductPrice(product);
  const availability = getProductAvailability(product);
  const description = product.description?.trim();

  return [
    {
      question: `What is ${product.name}?`,
      answer: `${product.name} is a product available on FastE.${description ? ` ${description}` : ''}`,
    },
    {
      question: `How much does ${product.name} cost?`,
      answer: `${product.name} costs ${formatVND(price)}.`,
    },
    {
      question: `Is ${product.name} available?`,
      answer:
        availability === 'InStock'
          ? `${product.name} is currently in stock on FastE.`
          : `${product.name} is currently out of stock on FastE.`,
    },
  ];
}

export function normalizeProductForAI(
  product: ProductDetail,
  siteUrl: string,
): AIProductSummary {
  const price = getProductPrice(product);
  const description =
    product.description?.trim() || `${product.name} on FastE.`;

  return {
    id: product.id,
    slug: product.slugId,
    title: product.name,
    summary: `${product.name}: ${description}`,
    description,
    price: {
      amount: price,
      currency: CURRENCY,
      formatted: formatVND(price),
    },
    availability: getProductAvailability(product),
    url: new URL(`/product/${product.slugId}`, siteUrl).toString(),
    image: product.images?.[0] ?? product.image,
    brand: getProductBrand(product),
    categories: getProductCategories(product),
    faqs: buildProductFaqs(product),
  };
}

export function buildProductMarkdown(product: ProductDetail) {
  const normalized = normalizeProductForAI(
    product,
    'https://fasteapp.vercel.app',
  );

  return `# ${normalized.title}

## Price
${normalized.price.formatted}

## Description
${normalized.description}

## Availability
${normalized.availability === 'InStock' ? 'In Stock' : 'Out of Stock'}

## FAQ

${normalized.faqs
  .map((faq) => `### ${faq.question}\n${faq.answer}`)
  .join('\n\n')}
`;
}
