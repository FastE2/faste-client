import { VariantsType } from '@/types/product';
import { v4 as uuidv4 } from 'uuid';
import { generateAttributes } from './generate-attributes';

export function buildSkuCode(attributes: Record<string, string>): string {
  const prefix = uuidv4().split('-')[0].slice(0, 4);

  const attributeValue = Object.values(attributes)
    .map((val) =>
      val
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D'),
    )
    .join('-');

  return `${prefix}-${attributeValue}`.toUpperCase();
}

export function generateSKUs(variants: VariantsType) {
  const combineVariants = (
    variants: VariantsType,
  ): Record<string, string>[] => {
    if (variants.length === 0) return [];

    return variants.reduce<Record<string, string>[]>((acc, variant) => {
      const result: Record<string, string>[] = [];

      for (const option of variant.options) {
        if (acc.length === 0) {
          // Lần đầu tiên
          result.push({ [variant.value]: option });
        } else {
          // Kết hợp với các attribute trước
          for (const item of acc) {
            result.push({
              ...item,
              [variant.value]: option,
            });
          }
        }
      }

      return result;
    }, []);
  };

  const result = combineVariants(variants);

  return result.map((attributes) => {
    const skuCode = buildSkuCode(attributes);
    return {
      attributes,
      skuCode,
      price: 0,
      quantity: 0,
      image: '',
    };
  });
}

export function generateSKUsV2(variants: VariantsType) {
  const attributes = generateAttributes(variants);

  return attributes.map((attributes) => {
    const skuCode = buildSkuCode(attributes);
    return {
      attributes,
      skuCode,
      price: 0,
      quantity: 0,
      image: '',
    };
  });
}
