export type CartProductSummary = {
  name: string;
  images: string[];
};

export type CartSKU = {
  id: number;
  price: number;
  quantity: number;
  image?: string | null;
  attributes: Record<string, string>;
  product: CartProductSummary;
};

export type CartItemData = {
  id: number;
  skuId: number;
  quantity: number;
  sku: CartSKU;
};

export type CartShopGroup = {
  shop: { shopid: number; name: string };
  cartItems: CartItemData[];
};

export type CartQueryData = {
  data: CartShopGroup[];
  totalItem?: number;
};
