interface IFormatCurrencyOptions {
  language?: 'vi' | 'en';
  exchangeRate?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatCurrencyWithExchange = (
  value: number | string,
  {
    language = 'vi',
    exchangeRate = 24500,
    minimumFractionDigits = 0,
  }: IFormatCurrencyOptions = {},
): string => {
  const amount = Number(
    typeof value === 'string' ? value.replace(/,/g, '').trim() : value,
  );
  if (isNaN(amount)) return String(value);

  const locale = language === 'en' ? 'en-US' : 'vi-VN';
  const currency = language === 'en' ? 'USD' : 'VND';

  const finalAmount = language === 'en' ? amount / exchangeRate : amount;

  return finalAmount.toLocaleString(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumFractionDigits,
  });
};
