interface IFormatCurrencyOptions {
  language?: 'vi' | 'en' | 'cn' | 'kr';
  exchangeRate?: number;
  exchangeRateCNY?: number;
  exchangeRateKRW?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatCurrencyWithExchange = (
  value: number | string,
  {
    language = 'vi',
    exchangeRate = 26000,
    exchangeRateCNY = 3400,
    exchangeRateKRW = 18.2,
    minimumFractionDigits = 0,
  }: IFormatCurrencyOptions = {},
): string => {
  const amount = Number(
    typeof value === 'string' ? value.replace(/,/g, '').trim() : value,
  );
  if (isNaN(amount)) return String(value);

  let locale = 'vi-VN';
  let currency = 'VND';
  let finalAmount = amount;

  if (language === 'en') {
    locale = 'en-US';
    currency = 'USD';
    finalAmount = amount / exchangeRate;
  } else if (language === 'cn') {
    locale = 'zh-CN';
    currency = 'CNY';
    finalAmount = amount / exchangeRateCNY;
  } else if (language === 'kr') {
    locale = 'ko-KR';
    currency = 'KRW';
    finalAmount = amount / exchangeRateKRW;
  }

  return finalAmount.toLocaleString(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumFractionDigits,
  });
};
