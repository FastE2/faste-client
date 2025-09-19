import { MetadataRoute } from 'next';

const BASE_URL = 'https://fast-e2.com';

async function getProducts() {
  return [{ slug: 'ao-thun-nam' }, { slug: 'giay-the-thao' }];
}

async function getCategories() {
  return [{ slug: 'thoi-trang' }, { slug: 'dien-thoai' }];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const categories = await getCategories();

  const now = new Date();

  return [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // ...products.map((p) => ({
    //   url: `${BASE_URL}/products/${p.slug}`,
    //   lastModified: now,
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // })),
    // ...categories.map((c) => ({
    //   url: `${BASE_URL}/categories/${c.slug}`,
    //   lastModified: now,
    //   changeFrequency: 'weekly',
    //   priority: 0.6,
    // })),
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
