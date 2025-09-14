export const i18nConfig = {
  locales: ['en', 'vi'],
  defaultLocale: 'vi',
};

export type Locale = (typeof i18nConfig)['locales'][number];
