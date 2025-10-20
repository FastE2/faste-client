export type VariantsType = {
  value: string;
  options: string[];
}[];

export type TBodyCreateProduct = {
  name: string;
  description: string;
  basePrice: number;
  brandId: number;
  status: 'PUBLISHED' | 'DRAFT';
  slugId: string;
  images: string[];
  variants: VariantsType;
  categories: number[];
  skus: {
    skuCode: string;
    price: number;
    attributes: Record<string, string>;
    quantity: number;
  }[];
};

export type TSKUs = {
  attributes: Record<string, string>;
  skuCode: string;
  price: number;
  quantity: number;
  image: string;
};
