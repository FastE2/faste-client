import { MetadataRoute } from 'next';
import { getLocalizedAlternates, getSiteUrl } from '@/lib/seo';

const PUBLIC_ROUTES = [
  '/',
  '/product',
  '/shop',
  '/blog',
  '/about',
  '/contact',
  '/support',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const siteUrl = getSiteUrl();

  return PUBLIC_ROUTES.map((path) => {
    const alternates = getLocalizedAlternates('vi', path);
    return {
      url: new URL(alternates.canonical, siteUrl).toString(),
      lastModified: now,
      changeFrequency: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates.languages).map(([locale, href]) => [
            locale,
            new URL(href, siteUrl).toString(),
          ]),
        ),
      },
    } satisfies MetadataRoute.Sitemap[number];
  });
}
