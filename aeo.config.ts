import { defineConfig } from 'aeo.js';

type AeoProduct = {
  id?: string | number;
  slugId: string;
  name: string;
  description?: string;
  basePrice?: number;
  price?: number;
  status?: string;
  images?: string[];
  skus?: Array<{ price?: number; quantity?: number }>;
};

const siteUrl = 'https://fasteapp.vercel.app';

const formatVND = (amount: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);

const getPrice = (product: AeoProduct) => {
  const skuPrices = (product.skus ?? [])
    .map((sku) => sku.price)
    .filter((price): price is number => Number.isFinite(price));

  if (skuPrices.length > 0) {
    return Math.min(...skuPrices);
  }

  return product.price ?? product.basePrice ?? 0;
};

const getAvailability = (product: AeoProduct) => {
  if (product.status && product.status !== 'PUBLISHED') {
    return 'Out of Stock';
  }

  const skus = product.skus ?? [];
  if (skus.length === 0) {
    return 'In Stock';
  }

  return skus.some((sku) => (sku.quantity ?? 0) > 0)
    ? 'In Stock'
    : 'Out of Stock';
};

const getProductFaqs = (product: AeoProduct) => [
  {
    question: `What is ${product.name}?`,
    answer: `${product.name} is a product available on FastE.${
      product.description ? ` ${product.description}` : ''
    }`,
  },
  {
    question: `How much does ${product.name} cost?`,
    answer: `${product.name} costs ${formatVND(getPrice(product))}.`,
  },
  {
    question: `Is ${product.name} available?`,
    answer:
      getAvailability(product) === 'In Stock'
        ? `${product.name} is currently in stock on FastE.`
        : `${product.name} is currently out of stock on FastE.`,
  },
];

const productMarkdown = (product: AeoProduct) => `# ${product.name}

## Price
${formatVND(getPrice(product))}

## Description
${product.description || `${product.name} on FastE.`}

## Availability
${getAvailability(product)}

## FAQ

${getProductFaqs(product)
  .map((faq) => `### ${faq.question}\n${faq.answer}`)
  .join('\n\n')}
`;

const { getProducts } = await import('./scripts/get-product' + '.ts');

let products: AeoProduct[] = [];

try {
  products = ((await getProducts()) as AeoProduct[])
    .filter((product) => product.slugId && product.name)
    .slice(0, 100);
} catch (error) {
  products = [];
}

const faqContent = `# FastE FAQ

## What is FastE?
FastE is an e-commerce platform connecting buyers and sellers with product, order, and payment management.

## How do I buy products on FastE?
Browse products, add items to cart, check out, and track orders in your account.

## Can I return products?
Return eligibility depends on seller policy and the product conditions shown during purchase.
`;

export default defineConfig({
  title: 'FastE',
  url: siteUrl,
  description: 'FastE is a modern e-commerce platform optimized for buyers, sellers, and AI answer engines.',
  contentDir: 'aeo-content',

  generators: {
    rawMarkdown: true,
    aiIndex: true,
    sitemap: true,
    llmsTxt: true,
  },

  pages: [
    {
      pathname: '/',
      title: 'FastE Ecommerce Platform',
      content: `# FastE Ecommerce Platform

FastE is a modern e-commerce marketplace for discovering products, buying online, and managing seller storefronts.`,
    },
    {
      pathname: '/shop',
      title: 'Browse FastE Shops',
      content: `# Browse FastE Shops

Discover public shops and sellers on FastE, including their ratings, product counts, and storefront information.`,
    },
    {
      pathname: '/faq',
      title: 'FastE FAQ',
      content: faqContent,
    },
    ...products.map((product) => ({
      pathname: `/product/${product.slugId}`,
      title: product.name,
      content: productMarkdown(product),
    })),
  ],

  schema: {
    enabled: true,
    organization: {
      name: 'FastE',
      url: siteUrl,
      logo: `${siteUrl}/images/logo.svg`,
    },
  },

  widget: {
    enabled: false,
  },
});
