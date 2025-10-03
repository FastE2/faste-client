import { Widget } from '@/types/widget';

interface CollectionsWidgetProps {
  widget: Widget;
}

export default function CollectionsWidget({ widget }: CollectionsWidgetProps) {
  const collections = [
    {
      name: 'Bộ sưu tập mùa hè',
      count: 45,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      name: 'Công nghệ mới nhất',
      count: 32,
      color: 'from-blue-500 to-purple-600',
    },
    { name: 'Phụ kiện hot', count: 28, color: 'from-pink-500 to-red-500' },
  ];

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Bộ sưu tập</h3>
        <button className="text-xs font-medium text-blue-500">
          Xem tất cả
        </button>
      </div>
      <div className="space-y-2">
        {collections.map((collection, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden h-24">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${collection.color} opacity-90`}
            />
            <div className="relative h-full flex items-center justify-between p-3">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {collection.name}
                </h4>
                <p className="text-xs text-white/90 mt-1">
                  {collection.count} sản phẩm
                </p>
              </div>
              <button className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-900">
                Xem ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
