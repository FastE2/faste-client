'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JSX } from 'react'; // Import JSX to declare the variable

interface ICategory {
  id: string;
  name: string;
  children?: ICategory[];
}

interface CategorySelectorProps {
  categories: ICategory[];
  control: any;
  errors: any;
  onChange: (selectedCategories: string[]) => void;
}

// const categories: ICategory[] = [
//   {
//     id: 'women-fashion',
//     name: 'Thời trang nữ',
//     children: [
//       { id: 'women-dress', name: 'Váy nữ' },
//       { id: 'women-shirt', name: 'Áo nữ' },
//     ],
//   },
//   {
//     id: 'men-fashion',
//     name: 'Thời trang nam',
//     children: [
//       { id: 'men-tshirt', name: 'Áo thun nam' },
//       {
//         id: 'men-shirt',
//         name: 'Áo sơ mi nam',
//         children: [
//           { id: 'men-shirt-long', name: 'Áo sơ mi nam tay dài' },
//           { id: 'men-shirt-short', name: 'Áo sơ mi nam tay ngắn' },
//           { id: 'men-shirt-mandarin', name: 'Áo sơ mi nam cổ tàu' },
//         ],
//       },
//       { id: 'men-vest', name: 'Áo vest - Áo khoác nam' },
//       { id: 'men-hoodie', name: 'Áo hoodie nam' },
//       { id: 'men-polo', name: 'Áo nỉ - Áo len nam' },
//       { id: 'men-pants', name: 'Quần dài nam' },
//       { id: 'men-underwear', name: 'Đồ ngủ, đồ mặc nhà nam' },
//       { id: 'men-traditional', name: 'Đồ đôi - Đồ gia đình nam' },
//       { id: 'men-suit', name: 'Đồ lót nam' },
//     ],
//   },
//   {
//     id: 'women-shoes',
//     name: 'Giày - Dép nữ',
//   },
//   {
//     id: 'women-bags',
//     name: 'Túi thời trang nữ',
//   },
//   {
//     id: 'men-bags',
//     name: 'Túi thời trang nam',
//   },
//   {
//     id: 'backpacks',
//     name: 'Balo và Vali',
//   },
//   {
//     id: 'accessories',
//     name: 'Phụ kiện thời trang',
//   },
//   {
//     id: 'watches',
//     name: 'Đồng hồ và Trang sức',
//   },
// ];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  errors,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [hoveredPath, setHoveredPath] = useState<string[]>([]);

  const handleSelect = (categoryId: string, level: number) => {
    const newPath = [...selectedPath.slice(0, level), categoryId];
    setSelectedPath(newPath);
  };

  const handleConfirm = () => {
    onChange(selectedPath);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedPath([]);
    onChange([]);
    setIsOpen(false);
  };

  const getSelectedNames = () => {
    let current = categories;
    const names: string[] = [];

    for (const id of selectedPath) {
      const found = current.find((cat) => cat.id === id);
      if (found) {
        names.push(found.name);
        current = found.children || [];
      }
    }

    return names;
  };

  const renderCategories = (cats: ICategory[], level: number) => {
    const activeId = hoveredPath[level] || selectedPath[level];

    return (
      <div className="flex-1 overflow-y-auto border-r border-border last:border-r-0">
        <div className="min-w-[200px] p-2">
          {cats.map((category) => {
            const isActive = category.id === activeId;
            const hasChildren =
              category.children && category.children.length > 0;

            return (
              <button
                key={category.id}
                className={cn(
                  'flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
                  isActive && 'bg-accent font-medium',
                )}
                onClick={() => {
                  const newPath = [...hoveredPath.slice(0, level), category.id];
                  setHoveredPath(newPath);
                  handleSelect(category.id, level);
                }}
                // onClick={() => handleSelect(category.id, level)}
              >
                <span>{category.name}</span>
                {hasChildren && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderNestedCategories = () => {
    const columns: JSX.Element[] = [];
    let current = categories;

    columns.push(renderCategories(current, 0));

    for (let i = 0; i < hoveredPath.length; i++) {
      const found = current.find((cat) => cat.id === hoveredPath[i]);
      if (found?.children) {
        current = found.children;
        columns.push(renderCategories(current, i + 1));
      } else {
        break;
      }
    }

    return columns;
  };

  const selectedNames = getSelectedNames();

  return (
    <div className="w-full z-40">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          <span className="text-destructive">*</span> Danh mục
        </label>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span
            className={cn(!selectedNames.length && 'text-muted-foreground')}
          >
            {selectedNames.length ? selectedNames.join(' / ') : 'Chọn Danh mục'}
          </span>
          <ChevronRight
            className={cn(
              'h-4 w-4 transition-transform',
              isOpen && 'rotate-90',
            )}
          />
        </button>

        {isOpen && (
          <div className="rounded-lg border border-border bg-popover shadow-lg">
            <div className="border-b border-border bg-blue-50 p-3">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>Vui lòng chọn danh mục cấp cuối được in đậm.</p>
              </div>
            </div>

            <div className="border-b border-border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Nhập ID hoặc tên Danh mục để tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 h-[250px]">
              {renderNestedCategories()}
            </div>

            {selectedNames.length > 0 && (
              <div className="border-t border-border bg-muted/50 p-3">
                <div className="text-sm">
                  <span className="font-medium">Đang chọn: </span>
                  <span className="text-primary">
                    {selectedNames.join(' / ')}
                  </span>
                </div>
                {errors.categories && (
                  <p className="text-red-500 text-sm">
                    {errors.categories.message}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-2 border-t border-border p-3">
              <Button onClick={handleConfirm} className="flex-1">
                Xác nhận
              </Button>
              <Button onClick={handleClear} variant="outline">
                Bỏ chọn
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
