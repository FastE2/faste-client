import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { i18nConfig } from '@/i18n-config';
import TranslationProvider from '@/providers/TranslationProvider';
import initTranslations from '@/configs/i18n';
import AppWrapper from '@/hocs/AppWrappers';
import { LOCALE_MAP } from '@/constants/meta';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: keyof typeof LOCALE_MAP }>;
}): Promise<Metadata> {
  const { locale = 'vi' } = await params;

  const meta = LOCALE_MAP[locale];

  const baseUrl = 'https://fasteapp.vercel.app';
  const path = locale === 'vi' ? '' : `/${locale}`;

  return {
    title: meta.title,
    description: meta.desc,

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: path || '/',
      languages: {
        'x-default': '/',
        'vi-VN': '/',
        'en-US': '/en',
        'zh-CN': '/cn',
        'ko-KR': '/kr',
      },
    },

    openGraph: {
      locale: meta.lang.replace('-', '_'),
      title: meta.title,
      description: meta.desc,
      url: `${baseUrl}${path}`,
    },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ['translation'];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider
          locale={locale}
          resources={resources}
          namespaces={i18nNamespaces}
        >
          <AppWrapper>{children}</AppWrapper>
        </TranslationProvider>
      </body>
    </html>
  );
}
