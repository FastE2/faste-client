import { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from './i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  console.log(request.headers);
  request.headers.forEach((value, key) => (headers[key] = value));
  const languages = new Negotiator({ headers }).languages(i18nConfig.locales);
  return matchLocale(languages, i18nConfig.locales, i18nConfig.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('pathname middleware', pathname);

  const locale = getLocale(request);
  return i18nRouter(request, {
    ...i18nConfig,
    defaultLocale: locale, // override defaultLocale theo client
  });
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
