import { Widget } from "@/types/widget"
import { Plus } from "lucide-react"

interface StoriesWidgetProps {
  widget: Widget
}

export default function StoriesWidget({ widget }: StoriesWidgetProps) {
  const stories = [
    { title: "Sale 50%", color: "from-red-500 to-orange-500" },
    { title: "Hàng mới", color: "from-blue-500 to-cyan-500" },
    { title: "Review", color: "from-purple-500 to-pink-500" },
    { title: "Tips", color: "from-green-500 to-emerald-500" },
  ]

  return (
    <div className="rounded-lg bg-white p-3 shadow-sm">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Bảng tin</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        <button className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <div className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <span className="text-xs text-gray-600">Thêm</span>
        </button>
        {stories.map((story, index) => (
          <button key={index} className="flex-shrink-0 flex flex-col items-center gap-1.5">
            <div
              className={`h-16 w-16 rounded-full bg-gradient-to-br ${story.color} p-0.5 flex items-center justify-center`}
            >
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
            </div>
            <span className="text-xs text-gray-700 text-center leading-tight w-16 truncate">{story.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
