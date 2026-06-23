'use client';

import dynamic from 'next/dynamic';

import type { ProductReview, ProductSKU } from './product-detail.types';
import ProductReviewsSkeleton from './partials/ProductReviewsSkeleton';

const ProductReviews = dynamic(
  () => import('./partials/ProductReviews').then((module) => module.ProductReviews),
  { ssr: false, loading: () => <ProductReviewsSkeleton /> },
);

export default function ProductReviewsDeferred(props: {
  productId: number;
  rating: number;
  skus: ProductSKU[];
  initialReviews: ProductReview[];
}) {
  return <ProductReviews {...props} />;
}
