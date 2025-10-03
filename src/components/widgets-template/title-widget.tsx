import { Widget } from '@/types/widget';
import { AlertCircle } from 'lucide-react';

interface TitleWidgetProps {
  widget: Widget;
}

export default function TitleWidget({ widget }: TitleWidgetProps) {
  return (
    <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-2">
      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-yellow-900">Tiêu đề cửa hàng</p>
        <p className="text-xs text-yellow-700 mt-1">
          Thêm tiêu đề để giới thiệu cửa hàng của bạn
        </p>
      </div>
    </div>
  );
}
