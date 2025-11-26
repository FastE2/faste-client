'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import Image from 'next/image';

// --- TYPES ---
type FlashSaleStatus = 'DRAFT' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';
type FlashSaleType = 'SELLER' | 'SYSTEM';

interface FlashSaleItem {
  id: number;
  productId: number;
}

interface FlashSale {
  id: number;
  name: string;
  description: string;
  image: string;
  status: FlashSaleStatus;
  type: FlashSaleType;
  items: FlashSaleItem[];
  startAt: Date;
  endAt: Date;
  updatedAt: Date;
}

// --- MOCK API ---
const MOCK_DATA: FlashSale[] = [
  {
    id: 1,
    name: 'Siêu Sale 9.9',
    description: 'Giảm giá cực sốc các mặt hàng điện tử',
    image:
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=100&h=100&fit=crop',
    status: 'ACTIVE',
    type: 'SELLER',
    items: [1, 2, 3, 4],
    startAt: new Date('2023-09-09T00:00:00'),
    endAt: new Date('2023-09-09T23:59:59'),
    updatedAt: new Date('2023-09-08T10:00:00'),
  },
  {
    id: 2,
    name: 'Xả kho cuối tháng',
    description: 'Dọn kho đón hàng mới',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=100&h=100&fit=crop',
    status: 'DRAFT',
    type: 'SELLER',
    items: [5, 6],
    startAt: new Date('2023-10-30T09:00:00'),
    endAt: new Date('2023-10-30T18:00:00'),
    updatedAt: new Date('2023-10-25T14:30:00'),
  },
  {
    id: 3,
    name: 'Flash Sale 11.11',
    description: 'Săn sale ngày đôi',
    image:
      'https://images.unsplash.com/photo-1472851294608-41531268f434?w=100&h=100&fit=crop',
    status: 'FINISHED',
    type: 'SELLER',
    items: [7, 8, 9, 10, 11, 12],
    startAt: new Date('2023-11-11T00:00:00'),
    endAt: new Date('2023-11-11T23:59:59'),
    updatedAt: new Date('2023-11-12T08:00:00'),
  },
];

const getFlashSaleBySeller = async (): Promise<FlashSale[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Giả lập lỗi ngẫu nhiên (bỏ comment dòng dưới để test Error state)
      // if (Math.random() < 0.1) reject(new Error("Network Error"));

      // Giả lập trả về dữ liệu (hoặc mảng rỗng để test Empty state)
      resolve(MOCK_DATA);
      // resolve([]);
    }, 1500);
  });
};

// --- UTILS ---
const formatDate = (date: Date) => format(date, 'dd/MM/yyyy HH:mm');

const getStatusBadge = (status: FlashSaleStatus) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge variant="success">Đang diễn ra</Badge>;
    case 'DRAFT':
      return <Badge variant="secondary">Bản nháp</Badge>;
    case 'FINISHED':
      return <Badge variant="outline">Đã kết thúc</Badge>;
    case 'CANCELLED':
      return <Badge variant="destructive">Đã hủy</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getTypeBadge = (type: FlashSaleType) => {
  return type === 'SYSTEM' ? (
    <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
      System
    </span>
  ) : (
    <span className="inline-flex items-center rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
      Shop
    </span>
  );
};

// --- SIMULATED SHADCN UI COMPONENTS (Inline for Single File Portability) ---

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'link';
    size?: 'default' | 'sm' | 'icon';
  }
>(
  (
    { className = '', variant = 'default', size = 'default', ...props },
    ref,
  ) => {
    const variants = {
      default:
        'bg-primary text-primary-foreground hover:bg-primary/90 bg-slate-900 text-white hover:bg-slate-800',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-slate-200 hover:bg-slate-100',
      ghost: 'hover:bg-accent hover:text-accent-foreground hover:bg-slate-100',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      link: 'text-primary underline-offset-4 hover:underline text-slate-900',
    };
    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      icon: 'h-10 w-10',
    };
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

const Badge = ({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
  className?: string;
}) => {
  const variants = {
    default:
      'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
    secondary:
      'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
    destructive:
      'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80',
    outline: 'text-slate-950 border-slate-200',
    success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
  };
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200 ${className}`}
      {...props}
    />
  );
};

// Simplified Dropdown for Single File (Simulating Radix/Shadcn behavior)
const DropdownMenuSimulated = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border border-slate-200 bg-white p-1 shadow-md animate-in fade-in-0 zoom-in-95">
          {/* Actions */}
          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Icon icon="mdi:eye-outline" className="mr-2 h-4 w-4" /> Xem chi
            tiết
          </button>
          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Icon icon="mdi:pencil-outline" className="mr-2 h-4 w-4" /> Chỉnh
            sửa
          </button>
          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Icon icon="mdi:content-copy" className="mr-2 h-4 w-4" /> Nhân bản
          </button>
          <div className="my-1 h-px bg-slate-100" />
          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors hover:bg-red-50 hover:text-red-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <Icon icon="mdi:trash-can-outline" className="mr-2 h-4 w-4" /> Xóa
          </button>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function FlashSaleShopPage() {
  const [data, setData] = useState<FlashSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFlashSaleBySeller();
      setData(res);
    } catch (err) {
      setError('Không thể tải danh sách Flash Sale. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- RENDER STATES ---

  const renderLoading = () => (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        {/* Table Rows Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <Icon
          icon="mdi:alert-circle-outline"
          className="h-6 w-6 text-red-600"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Đã xảy ra lỗi</h3>
      <p className="mb-4 mt-2 text-sm text-slate-500">
        {error}
      </p>
      <Button onClick={fetchData} variant="outline">
        Thử lại
      </Button>
    </div>
  );

  const renderEmpty = () => (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Icon
          icon="mdi:lightning-bolt-outline"
          className="h-8 w-8 text-slate-400"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Chưa có Flash Sale nào</h3>
      <p className="mb-4 mt-2 text-sm text-slate-500 max-w-sm">
        Bạn chưa tạo chương trình Flash Sale nào. Hãy tạo chương trình đầu tiên
        để thúc đẩy doanh số!
      </p>
      <Button className="gap-2">
        <Icon icon="mdi:plus" className="h-4 w-4" />
        Tạo Flash Sale
      </Button>
    </div>
  );

  // --- MAIN RENDER ---

  if (loading) return <div className="p-6 md:p-8 pt-6">{renderLoading()}</div>;
  if (error) return <div className="p-6 md:p-8 pt-6">{renderError()}</div>;

  return (
    <div className="flex-1 space-y-4 p-6 md:p-8 pt-6">
      {/* HEADER */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Flash Sale của Shop
          </h2>
          <p className="text-sm text-slate-500">
            Quản lý các chương trình giảm giá chớp nhoáng của bạn.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="shadow-sm gap-2">
            <Icon icon="mdi:plus" className="h-4 w-4" />
            Tạo Flash Sale
          </Button>
        </div>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        renderEmpty()
      ) : (
        <div className="rounded-md border shadow-sm">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[80px]">
                    Ảnh
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Tên chương trình
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Trạng thái
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Loại
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Sản phẩm
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Thời gian
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500">
                    Cập nhật
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100"
                  >
                    {/* Image */}
                    <td className="p-4 align-middle">
                      <Image
                        height={100}
                        width={100}
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-md object-cover border border-slate-200"
                      />
                    </td>

                    {/* Name & Desc */}
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500 truncate max-w-[200px]">
                          {item.description}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4 align-middle">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Type */}
                    <td className="p-4 align-middle">
                      {getTypeBadge(item.type)}
                    </td>

                    {/* Items Count */}
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Icon icon="mdi:package-variant" className="h-4 w-4" />
                        <span>{item.items.length}</span>
                      </div>
                    </td>

                    {/* Time Range */}
                    <td className="p-4 align-middle">
                      <div className="flex flex-col text-xs text-slate-600 gap-1">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Bắt đầu:</span>
                          {formatDate(item.startAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Kết thúc:</span>
                          {formatDate(item.endAt)}
                        </div>
                      </div>
                    </td>

                    {/* Updated At */}
                    <td className="p-4 align-middle text-slate-500">
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mdi:clock-outline"
                          className="h-3.5 w-3.5"
                        />
                        {formatDate(item.updatedAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 align-middle text-right">
                      <DropdownMenuSimulated>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <Icon icon="mdi:dots-vertical" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuSimulated>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
