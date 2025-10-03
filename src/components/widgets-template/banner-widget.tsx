import { Widget } from '@/types/widget';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerWidgetProps {
  widget: Widget;
}

export default function BannerWidget({ widget }: BannerWidgetProps) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 aspect-[2/1] shadow-sm">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-lg font-bold">SALE UP TO 50%</h3>
          <p className="text-sm mt-1">Khuyến mãi đặc biệt</p>
        </div>
      </div>
      <button className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>
      <button className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
        <ChevronRight className="h-4 w-4 text-white" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
      </div>
    </div>
  );
}
