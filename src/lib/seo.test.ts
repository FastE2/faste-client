import { describe, expect, it } from 'vitest';

import { getLocalizedAlternates, getSiteUrl } from './seo';

describe('SEO URL helpers', () => {
  it('normalizes the configured site URL', () => {
    expect(getSiteUrl('https://example.com/')).toBe('https://example.com');
  });

  it('builds canonical and reciprocal locale alternates', () => {
    expect(getLocalizedAlternates('en', '/product/red-shirt')).toEqual({
      canonical: '/en/product/red-shirt',
      languages: {
        'x-default': '/product/red-shirt',
        'vi-VN': '/product/red-shirt',
        'en-US': '/en/product/red-shirt',
        'zh-CN': '/cn/product/red-shirt',
        'ko-KR': '/kr/product/red-shirt',
      },
    });
  });
});
