// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/dashboard',
          '/auth',
          '/auth/*',
          '/cart',
          '/checkout',
          '/api',
          '/api/*',
        ],
      },
    ],
    sitemap: 'https://fast-e2.com/sitemap.xml',
    host: 'https://fast-e2.com',
  };
}
