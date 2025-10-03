import { Widget } from "@/types/widget"
import { Ticket } from "lucide-react"

interface DiscountWidgetProps {
  widget: Widget
}

export default function DiscountWidget({ widget }: DiscountWidgetProps) {
  const discounts = [
    { code: "FREESHIP50K", label: "Miễn phí vận chuyển", min: "50K" },
    { code: "GIAM20K", label: "Giảm 20K", min: "100K" },
    { code: "SALE30", label: "Giảm 30%", min: "200K" },
  ]

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Mã giảm giá</h3>
        <button className="text-xs font-medium text-blue-500">Xem tất cả</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {discounts.map((discount, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 rounded-lg border border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 p-2.5"
          >
            <div className="flex items-start gap-2">
              <Ticket className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-orange-600 truncate">{discount.code}</p>
                <p className="text-xs text-gray-600 mt-0.5">{discount.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">Đơn tối thiểu {discount.min}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
