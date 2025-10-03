import { Widget } from "@/types/widget"
import { Clock } from "lucide-react"

interface FlashSaleWidgetProps {
  widget: Widget
}

export default function FlashSaleWidget({ widget }: FlashSaleWidgetProps) {
  const products = [
    { name: "AirPods Pro 2", price: "4.990.000", oldPrice: "6.990.000", discount: "-29%", stock: 65 },
    { name: "Apple Watch S9", price: "8.990.000", oldPrice: "11.990.000", discount: "-25%", stock: 42 },
  ]

  return (
    <div className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">⚡ FLASH SALE</h3>
          <div className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5">
            <Clock className="h-3 w-3 text-white" />
            <span className="text-xs font-medium text-white">02:45:30</span>
          </div>
        </div>
        <button className="text-xs font-medium text-white">Xem tất cả</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-36 rounded-lg bg-white overflow-hidden">
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-3xl">🎧</span>
              <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                {product.discount}
              </div>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">{product.name}</h4>
              <div className="mt-1.5">
                <p className="text-sm font-bold text-red-500">₫{product.price}</p>
                <p className="text-xs text-gray-400 line-through">₫{product.oldPrice}</p>
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${product.stock}%` }} />
                </div>
                <span className="text-xs text-gray-600">{product.stock}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
