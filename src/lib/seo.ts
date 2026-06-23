const DEFAULT_SITE_URL = 'https://fasteapp.vercel.app';

export const getSiteUrl = (siteUrl = process.env.NEXT_PUBLIC_BASE_URL) =>
  (siteUrl || DEFAULT_SITE_URL).replace(/\/$/, '');

const normalizePath = (path: string) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? '' : normalized.replace(/\/$/, '');
};

export const getLocalizedPath = (locale: string, path = '/') => {
  const suffix = normalizePath(path);
  return locale === 'vi' ? suffix || '/' : `/${locale}${suffix}`;
};

export const getLocalizedAlternates = (locale: string, path = '/') => ({
  canonical: getLocalizedPath(locale, path),
  languages: {
    'x-default': getLocalizedPath('vi', path),
    'vi-VN': getLocalizedPath('vi', path),
    'en-US': getLocalizedPath('en', path),
    'zh-CN': getLocalizedPath('cn', path),
    'ko-KR': getLocalizedPath('kr', path),
  },
});
