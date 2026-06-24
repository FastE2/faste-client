import { normalizeProductForAI } from '@/lib/aeo/product';
import { getSiteUrl } from '@/lib/seo';
import { getDetailProductPublicBySlug } from '@/services/product.service';
import type { ProductDetail } from '@/views/pages/product/product-details/product-detail.types';
import { NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const response = await getDetailProductPublicBySlug(slug);
  const product = response?.data as ProductDetail | undefined;

  if (!product?.slugId) {
    return NextResponse.json(
      {
        error: 'Product not found',
        slug,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    product: normalizeProductForAI(product, getSiteUrl()),
  });
}
