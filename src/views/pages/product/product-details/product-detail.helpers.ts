import type { ProductDetail, ProductSKU } from './product-detail.types';

const FALLBACK_IMAGE = '/nftt-1.webp';

export function normalizeProductImages(
  productImages: Array<string | null | undefined> = [],
  skus: Array<Pick<ProductSKU, 'image'>> = [],
) {
  const images = [...productImages, ...skus.map((sku) => sku.image)].filter(
    (image): image is string => Boolean(image),
  );
  const uniqueImages = [...new Set(images)];
  return uniqueImages.length > 0 ? uniqueImages : [FALLBACK_IMAGE];
}

export function calculateTotalSold(skus: Array<Pick<ProductSKU, 'sold'>> = []) {
  return skus.reduce((total, sku) => total + (sku.sold ?? 0), 0);
}

export function findMatchingSKU<T extends Pick<ProductSKU, 'attributes'>>(
  skus: T[] = [],
  selected: Record<string, string>,
): T | null {
  const entries = Object.entries(selected);
  if (entries.length === 0) return null;
  return (
    skus.find((sku) =>
      entries.every(([name, option]) => sku.attributes[name] === option),
    ) ?? null
  );
}

const getCategoryIds = (product: Pick<ProductDetail, 'categories'>) =>
  (product.categories ?? [])
    .map((entry) => entry.categoryId ?? entry.category?.id)
    .filter((id): id is number => typeof id === 'number');

export function getRelatedProducts<
  T extends Pick<ProductDetail, 'id' | 'categories'>,
>(
  products: T[],
  currentProductId: string | number,
  categoryIds: number[],
  limit = 12,
) {
  const candidates = products.filter(
    (product) => String(product.id) !== String(currentProductId),
  );
  const preferred = candidates.filter((product) =>
    getCategoryIds(product).some((id) => categoryIds.includes(id)),
  );
  return (preferred.length > 0 ? preferred : candidates).slice(0, limit);
}
