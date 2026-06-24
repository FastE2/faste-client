import { normalizeProductForAI } from '@/lib/aeo/product';
import { getSiteUrl } from '@/lib/seo';
import { getAllProductsPublic } from '@/services/product.service';
import type { ProductDetail } from '@/views/pages/product/product-details/product-detail.types';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  const response = await getAllProductsPublic({ page: 1, limit: 100 });
  const payload = response?.data?.data ?? response?.data ?? [];
  const products = Array.isArray(payload) ? (payload as ProductDetail[]) : [];
  const siteUrl = getSiteUrl();

  return NextResponse.json({
    metadata: {
      title: 'FastE products',
      count: products.length,
      generatedAt: new Date().toISOString(),
    },
    products: products.map((product) =>
      normalizeProductForAI(product, siteUrl),
    ),
  });
}
