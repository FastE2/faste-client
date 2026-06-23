import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '@/app/globals.css';
import { i18nConfig } from '@/i18n-config';
import TranslationProvider from '@/providers/TranslationProvider';
import initTranslations from '@/configs/i18n';
import AppWrapper from '@/hocs/AppWrappers';
import { LOCALE_MAP } from '@/constants/meta';
import { getLocalizedAlternates, getSiteUrl } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: keyof typeof LOCALE_MAP }>;
}): Promise<Metadata> {
  const { locale = 'vi' } = await params;

  const meta = LOCALE_MAP[locale];

  const baseUrl = getSiteUrl();

  return {
    title: meta.title,
    description: meta.desc,

    metadataBase: new URL(baseUrl),

    alternates: getLocalizedAlternates(locale),

    openGraph: {
      locale: meta.lang.replace('-', '_'),
      title: meta.title,
      description: meta.desc,
      url: new URL(getLocalizedAlternates(locale).canonical, baseUrl),
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
      <body className={`${geistSans.variable} font-sans antialiased`}>
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
