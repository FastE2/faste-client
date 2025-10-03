import { Widget } from "@/types/widget"

interface CategoriesWidgetProps {
  widget: Widget
}

export default function CategoriesWidget({ widget }: CategoriesWidgetProps) {
  const categories = [
    { name: "Điện thoại", icon: "📱", color: "bg-blue-100" },
    { name: "Laptop", icon: "💻", color: "bg-purple-100" },
    { name: "Tablet", icon: "📱", color: "bg-green-100" },
    { name: "Phụ kiện", icon: "🎧", color: "bg-orange-100" },
    { name: "Đồng hồ", icon: "⌚", color: "bg-pink-100" },
  ]

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Danh mục</h3>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {categories.map((category, index) => (
          <button key={index} className="flex flex-col items-center gap-1.5">
            <div className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center text-xl`}>
              {category.icon}
            </div>
            <span className="text-xs text-gray-700 text-center leading-tight">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
