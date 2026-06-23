import { describe, expect, it } from 'vitest';

import {
  calculateTotalSold,
  findMatchingSKU,
  getRelatedProducts,
  normalizeProductImages,
} from './product-detail.helpers';

describe('normalizeProductImages', () => {
  it('deduplicates product and SKU images and removes empty values', () => {
    expect(
      normalizeProductImages(
        ['a.webp', '', 'b.webp'],
        [{ image: 'b.webp' }, { image: 'c.webp' }, { image: null }],
      ),
    ).toEqual(['a.webp', 'b.webp', 'c.webp']);
  });

  it('returns the stable fallback when no image exists', () => {
    expect(normalizeProductImages([], [])).toEqual(['/nftt-1.webp']);
  });
});

describe('calculateTotalSold', () => {
  it('sums sold quantities and tolerates missing values', () => {
    expect(calculateTotalSold([{ sold: 2 }, {}, { sold: 3 }])).toBe(5);
  });
});

describe('findMatchingSKU', () => {
  const skus = [
    { id: 1, attributes: { color: 'red', size: 'm' } },
    { id: 2, attributes: { color: 'blue', size: 'm' } },
  ];

  it('returns a SKU only when every selected attribute matches', () => {
    expect(findMatchingSKU(skus, { color: 'blue', size: 'm' })?.id).toBe(2);
    expect(findMatchingSKU(skus, {})).toBeNull();
  });
});

describe('getRelatedProducts', () => {
  it('prefers shared categories, excludes the current product, and caps results', () => {
    const products = Array.from({ length: 15 }, (_, index) => ({
      id: String(index),
      categories: [{ categoryId: index < 13 ? 7 : 9 }],
    }));

    const result = getRelatedProducts(products, '0', [7], 12);

    expect(result).toHaveLength(12);
    expect(result.some((product) => product.id === '0')).toBe(false);
    expect(
      result.every((product) => product.categories[0].categoryId === 7),
    ).toBe(true);
  });
});
