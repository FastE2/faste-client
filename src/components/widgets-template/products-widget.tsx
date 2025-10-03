import { Widget } from '@/types/widget';
import { Star } from 'lucide-react';

interface ProductsWidgetProps {
  widget: Widget;
}

export default function ProductsWidget({ widget }: ProductsWidgetProps) {
  const products = [
    {
      name: 'iPhone 15 Pro Max',
      price: '29.990.000',
      oldPrice: '34.990.000',
      rating: 4.8,
      sold: 1200,
    },
    {
      name: 'Samsung Galaxy S24',
      price: '22.990.000',
      oldPrice: '27.990.000',
      rating: 4.7,
      sold: 890,
    },
    {
      name: 'MacBook Air M3',
      price: '28.990.000',
      oldPrice: '32.990.000',
      rating: 4.9,
      sold: 650,
    },
    {
      name: 'iPad Pro 2024',
      price: '24.990.000',
      oldPrice: '29.990.000',
      rating: 4.8,
      sold: 420,
    },
  ];

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Sản phẩm nổi bật
        </h3>
        <button className="text-xs font-medium text-blue-500">
          Xem tất cả
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white overflow-hidden"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">
                {product.name}
              </h4>
              <div className="mt-1.5 flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{product.rating}</span>
                <span className="text-xs text-gray-400">
                  | Đã bán {product.sold}
                </span>
              </div>
              <div className="mt-1.5">
                <p className="text-sm font-bold text-red-500">
                  ₫{product.price}
                </p>
                <p className="text-xs text-gray-400 line-through">
                  ₫{product.oldPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
