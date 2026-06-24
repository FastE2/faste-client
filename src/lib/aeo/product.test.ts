import { describe, expect, it } from 'vitest';

import {
  buildProductFaqs,
  getProductAvailability,
  normalizeProductForAI,
} from './product';

const baseProduct = {
  id: 12,
  slugId: 'demo-product',
  name: 'Demo Product',
  description: 'A clean product description for answer engines.',
  basePrice: 125000,
  images: ['https://example.com/product.webp'],
  brand: { name: 'FastE Brand' },
  categories: [{ category: { name: 'Electronics' } }],
  skus: [{ id: 1, price: 120000, quantity: 5, attributes: {} }],
};

describe('getProductAvailability', () => {
  it('returns InStock when any SKU has quantity available', () => {
    expect(getProductAvailability(baseProduct)).toBe('InStock');
  });

  it('returns OutOfStock when no SKU quantity is available', () => {
    expect(
      getProductAvailability({
        ...baseProduct,
        skus: [{ id: 1, price: 120000, quantity: 0, attributes: {} }],
      }),
    ).toBe('OutOfStock');
  });
});

describe('buildProductFaqs', () => {
  it('generates direct answer product FAQs', () => {
    expect(buildProductFaqs(baseProduct)).toEqual([
      {
        question: 'What is Demo Product?',
        answer:
          'Demo Product is a product available on FastE. A clean product description for answer engines.',
      },
      {
        question: 'How much does Demo Product cost?',
        answer: 'Demo Product costs 120.000 ₫.',
      },
      {
        question: 'Is Demo Product available?',
        answer: 'Demo Product is currently in stock on FastE.',
      },
    ]);
  });
});

describe('normalizeProductForAI', () => {
  it('returns the clean AI-facing product shape', () => {
    expect(
      normalizeProductForAI(baseProduct, 'https://fasteapp.vercel.app'),
    ).toEqual({
      id: 12,
      slug: 'demo-product',
      title: 'Demo Product',
      summary: 'Demo Product: A clean product description for answer engines.',
      description: 'A clean product description for answer engines.',
      price: {
        amount: 120000,
        currency: 'VND',
        formatted: '120.000 ₫',
      },
      availability: 'InStock',
      url: 'https://fasteapp.vercel.app/product/demo-product',
      image: 'https://example.com/product.webp',
      brand: 'FastE Brand',
      categories: ['Electronics'],
      faqs: buildProductFaqs(baseProduct),
    });
  });
});
