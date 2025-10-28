// Mock data and TypeScript interfaces for the cart page

export interface CartItem {
  id: string;
  shopId: string;
  shopName: string;
  productImage: string;
  productTitle: string;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
  };
  originalPrice: number;
  price: number;
  quantity: number;
  deliveryDays: number;
  isSelected: boolean;
}

export interface Shop {
  id: string;
  name: string;
  items: CartItem[];
  promotions?: string[];
}

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    shopId: 'praza',
    shopName: 'Praza',
    productImage: '/black-backpack.jpg',
    productTitle: 'Túi Đeo Chéo Praza DCTK095 (23 × 17 cm) - Xám',
    attributes: {
      size: '23 × 17 cm',
      color: 'Xám',
    },
    originalPrice: 49000,
    price: 49000,
    quantity: 1,
    deliveryDays: 3,
    isSelected: true,
  },
  {
    id: '2',
    shopId: 'goking',
    shopName: 'GOKING',
    productImage: '/black-skateboard-shirt.jpg',
    productTitle:
      'SKATE BOARDING, free your jump, mã G137. Áo thun nghề thuật cho nam nữ, cặp đôi, gia đình, lớp nhóm,...',
    attributes: {
      size: 'XS',
      color: 'Đen',
      material: '100% cotton',
    },
    originalPrice: 168000,
    price: 168000,
    quantity: 1,
    deliveryDays: 4,
    isSelected: true,
  },
  {
    id: '3',
    shopId: 'goking',
    shopName: 'GOKING',
    productImage: '/gray-skateboard-shirt.jpg',
    productTitle:
      'SKATE BOARDING, free your jump, mã G137. Áo thun nam nữ in siêu đẹp. Áo phông hoạt nhiệt GOKING...',
    attributes: {
      size: 'S',
      color: 'Xám',
      material: 'Thun lạnh',
    },
    originalPrice: 99000,
    price: 99000,
    quantity: 1,
    deliveryDays: 4,
    isSelected: false,
  },
];

export const groupItemsByShop = (items: CartItem[]): Shop[] => {
  const shopMap = new Map<string, CartItem[]>();

  items.forEach((item) => {
    if (!shopMap.has(item.shopId)) {
      shopMap.set(item.shopId, []);
    }
    shopMap.get(item.shopId)!.push(item);
  });

  return Array.from(shopMap.entries()).map(([shopId, shopItems]) => ({
    id: shopId,
    name: shopItems[0].shopName,
    items: shopItems,
    promotions: ['Freeship 15k đơn từ 45k, Freeship 30k đơn từ 100k'],
  }));
};
