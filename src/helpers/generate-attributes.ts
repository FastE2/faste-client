import { VariantsType } from '@/types/product';

export function generateAttributes(
  variants: VariantsType,
): Record<string, string>[] {
  const combine = (
    variantsLeft: VariantsType,
    current: Record<string, string> = {},
  ): Record<string, string>[] => {
    if (variantsLeft.length === 0) {
      // Khi không còn variant nào => trả về tổ hợp hiện tại
      return [current];
    }

    const [first, ...rest] = variantsLeft;
    const result: Record<string, string>[] = [];

    for (const option of first.options) {
      // Tạo object mới, thêm thuộc tính hiện tại
      const next = { ...current, [first.value]: option };
      // Đệ quy với các variant còn lại
      result.push(...combine(rest, next));
    }

    return result;
  };

  return combine(variants);
}
