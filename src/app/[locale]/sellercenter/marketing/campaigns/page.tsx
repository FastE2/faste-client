'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';

// --- TYPES ---
type CampaignType = 'FLASH_SALE' | 'VOUCHER' | 'AFFILIATE' | 'SEASONAL';
type CampaignStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'SCHEDULED'
  | 'FINISHED'
  | 'CANCELLED';

interface Campaign {
  id: number;
  name: string;
  description: string;
  image: string;
  type: CampaignType;
  status: CampaignStatus;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

// --- MOCK DATA & API ---
const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: 'Siêu Sale Tết 2024',
    description: 'Chiến dịch kích cầu mua sắm dịp Tết Nguyên Đán',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
    type: 'SEASONAL',
    status: 'ACTIVE',
    startAt: '2024-01-15T00:00:00',
    endAt: '2024-02-10T23:59:59',
    createdAt: '2023-12-20T10:00:00',
    updatedAt: '2024-01-20T08:30:00',
  },
  {
    id: 2,
    name: 'Flash Sale Giờ Vàng',
    description: 'Giảm giá 50% khung giờ 12h-14h',
    image:
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=100&h=100&fit=crop',
    type: 'FLASH_SALE',
    status: 'SCHEDULED',
    startAt: '2024-05-01T12:00:00',
    endAt: '2024-05-01T14:00:00',
    createdAt: '2024-04-25T09:15:00',
    updatedAt: '2024-04-25T09:15:00',
  },
  {
    id: 3,
    name: 'Voucher Khách Hàng Mới',
    description: 'Tặng mã giảm giá 50k cho đơn đầu tiên',
    image:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=100&h=100&fit=crop',
    type: 'VOUCHER',
    status: 'DRAFT',
    startAt: '2024-06-01T00:00:00',
    endAt: '2024-06-30T23:59:59',
    createdAt: '2024-05-10T14:20:00',
    updatedAt: '2024-05-12T16:45:00',
  },
  {
    id: 4,
    name: 'Affiliate Mùa Hè',
    description: 'Chiến dịch tiếp thị liên kết đồ bơi',
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop',
    type: 'AFFILIATE',
    status: 'FINISHED',
    startAt: '2023-06-01T00:00:00',
    endAt: '2023-08-31T23:59:59',
    createdAt: '2023-05-20T11:00:00',
    updatedAt: '2023-09-01T09:00:00',
  },
  {
    id: 5,
    name: 'Black Friday 2023',
    description: 'Xả kho cuối năm',
    image:
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop',
    type: 'SEASONAL',
    status: 'CANCELLED',
    startAt: '2023-11-24T00:00:00',
    endAt: '2023-11-26T23:59:59',
    createdAt: '2023-10-15T08:00:00',
    updatedAt: '2023-11-20T10:00:00',
  },
];

const getSellerCampaigns = async (): Promise<Campaign[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Uncomment dòng dưới để test Error State
      // reject(new Error("Lỗi kết nối server"));

      // Uncomment dòng dưới để test Empty State
      // resolve([]);

      resolve(MOCK_CAMPAIGNS);
    }, 1200);
  });
};

// --- UTILS ---
const formatDate = (dateStr: string) => {
  try {
    return format(new Date(dateStr), 'dd/MM/yyyy HH:mm', { locale: vi });
  } catch (e) {
    return dateStr;
  }
};

// --- INLINE COMPONENTS (SHADCN UI STYLE) ---

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    size?: 'default' | 'sm' | 'icon';
  }
>(
  (
    { className = '', variant = 'default', size = 'default', ...props },
    ref,
  ) => {
    const variants = {
      default: 'bg-slate-900 text-white hover:bg-slate-800',
      outline:
        'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900',
      ghost: 'hover:bg-slate-100 hover:text-slate-900',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
    };
    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      icon: 'h-9 w-9',
    };
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

const Badge = ({
  children,
  className = '',
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'info';
}) => {
  const variants = {
    default: 'border-transparent bg-slate-900 text-slate-50',
    secondary: 'border-transparent bg-slate-100 text-slate-900',
    outline: 'text-slate-950 border-slate-200',
    success: 'border-transparent bg-green-100 text-green-700',
    warning: 'border-transparent bg-yellow-100 text-yellow-700',
    destructive: 'border-transparent bg-red-100 text-red-700',
    info: 'border-transparent bg-blue-100 text-blue-700',
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
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200 ${className}`}
    {...props}
  />
);

// Simulated Dropdown
const DropdownMenu = ({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border border-slate-200 bg-white p-1 shadow-md animate-in fade-in-0 zoom-in-95">
          {children}
        </div>
      )}
    </div>
  );
};

// Simulated Dialog (Modal)
const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-0">
      <div className="w-full max-w-md scale-100 gap-4 border bg-white p-6 shadow-lg sm:rounded-lg md:w-full animate-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>
        <div className="py-4">{children}</div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          {/* Actions are usually passed as children, but for this specific delete dialog we might want generic buttons if not provided */}
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: CampaignStatus }) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge variant="success">Đang diễn ra</Badge>;
    case 'SCHEDULED':
      return <Badge variant="info">Sắp diễn ra</Badge>;
    case 'FINISHED':
      return <Badge variant="secondary">Đã kết thúc</Badge>;
    case 'CANCELLED':
      return <Badge variant="destructive">Đã hủy</Badge>;
    default:
      return <Badge variant="outline">Bản nháp</Badge>;
  }
};

const TypeBadge = ({ type }: { type: CampaignType }) => {
  switch (type) {
    case 'FLASH_SALE':
      return (
        <Badge
          variant="outline"
          className="border-purple-200 bg-purple-50 text-purple-700"
        >
          Flash Sale
        </Badge>
      );
    case 'VOUCHER':
      return (
        <Badge
          variant="outline"
          className="border-orange-200 bg-orange-50 text-orange-700"
        >
          Voucher
        </Badge>
      );
    case 'AFFILIATE':
      return (
        <Badge
          variant="outline"
          className="border-cyan-200 bg-cyan-50 text-cyan-700"
        >
          Affiliate
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="border-slate-200 bg-slate-50 text-slate-700"
        >
          Seasonal
        </Badge>
      );
  }
};

// --- MAIN PAGE COMPONENT ---

export default function MarketingCampaignsPage() {
  const [data, setData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog State
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getSellerCampaigns();
      setData(res);
    } catch (err) {
      setError(
        'Không thể tải danh sách chiến dịch. Vui lòng kiểm tra lại kết nối.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = () => {
    if (deleteId) {
      // Logic call API delete would be here
      setData(data.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  // --- RENDER FUNCTIONS ---

  const renderLoading = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[140px]" />
      </div>
      <div className="rounded-md border p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[30%]" />
              <Skeleton className="h-4 w-[20%]" />
            </div>
            <Skeleton className="h-8 w-[100px]" />
          </div>
        ))}
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
      <p className="mb-4 mt-2 text-sm text-slate-500">{error}</p>
      <Button onClick={fetchData} variant="outline" className="gap-2">
        <Icon icon="mdi:refresh" /> Thử lại
      </Button>
    </div>
  );

  const renderEmpty = () => (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Icon icon="mdi:bullhorn-outline" className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Chưa có chiến dịch nào</h3>
      <p className="mb-4 mt-2 text-sm text-slate-500 max-w-sm">
        Bắt đầu tạo chiến dịch Marketing đầu tiên để tiếp cận nhiều khách hàng
        hơn.
      </p>
      <Button className="gap-2">
        <Icon icon="mdi:plus" className="h-4 w-4" />
        Tạo chiến dịch
      </Button>
    </div>
  );

  if (loading) return <div className="p-6 md:p-8 pt-6">{renderLoading()}</div>;
  if (error) return <div className="p-6 md:p-8 pt-6">{renderError()}</div>;

  return (
    <div className="flex-1 space-y-4 p-6 md:p-8 pt-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Chiến dịch Marketing
          </h2>
          <p className="text-sm text-slate-500">
            Quản lý tất cả các chương trình khuyến mãi, voucher và affiliate.
          </p>
        </div>
        <Button className="shadow-sm gap-2">
          <Icon icon="mdi:plus" className="h-4 w-4" />
          Tạo chiến dịch
        </Button>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        renderEmpty()
      ) : (
        <div className="space-y-4">
          <div className="rounded-md border shadow-sm bg-white">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm text-left">
                <thead className="[&_tr]:border-b bg-slate-50/50">
                  <tr className="border-b transition-colors hover:bg-slate-100/50">
                    <th className="h-12 px-4 align-middle font-medium text-slate-500 w-[70px]">
                      Ảnh
                    </th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500 min-w-[200px]">
                      Tên chiến dịch
                    </th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">
                      Loại
                    </th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">
                      Trạng thái
                    </th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500 min-w-[150px]">
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
                      className="border-b transition-colors hover:bg-slate-100/50"
                    >
                      <td className="p-4 align-middle">
                        <Image
                          width={100}
                          height={100}
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-md object-cover border border-slate-200"
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-500 truncate max-w-[250px]">
                            {item.description}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <TypeBadge type={item.type} />
                      </td>
                      <td className="p-4 align-middle">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-col text-xs text-slate-600 gap-1">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 w-14">
                              Bắt đầu:
                            </span>
                            <span className="font-medium">
                              {formatDate(item.startAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 w-14">
                              Kết thúc:
                            </span>
                            <span className="font-medium">
                              {formatDate(item.endAt)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-slate-500 text-xs">
                        {formatDate(item.updatedAt)}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <DropdownMenu
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <Icon
                                icon="mdi:dots-vertical"
                                className="h-4 w-4"
                              />
                            </Button>
                          }
                        >
                          <>
                            <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
                              Thao tác
                            </div>
                            <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100">
                              <Icon
                                icon="mdi:eye-outline"
                                className="mr-2 h-4 w-4 text-slate-500"
                              />{' '}
                              Xem chi tiết
                            </button>
                            <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100">
                              <Icon
                                icon="mdi:pencil-outline"
                                className="mr-2 h-4 w-4 text-slate-500"
                              />{' '}
                              Chỉnh sửa
                            </button>
                            <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100">
                              <Icon
                                icon="mdi:content-copy"
                                className="mr-2 h-4 w-4 text-slate-500"
                              />{' '}
                              Nhân bản
                            </button>
                            <div className="my-1 h-px bg-slate-100" />
                            <button
                              onClick={() => setDeleteId(item.id)}
                              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none hover:bg-red-50 hover:text-red-700"
                            >
                              <Icon
                                icon="mdi:trash-can-outline"
                                className="mr-2 h-4 w-4"
                              />{' '}
                              Xóa
                            </button>
                          </>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Footer (Static UI) */}
            <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t">
              <div className="flex-1 text-sm text-slate-500">
                Hiển thị 1-5 trên tổng số 5 chiến dịch
              </div>
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" disabled>
                Sau
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM DIALOG */}
      <Dialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xóa chiến dịch?"
        description="Bạn có chắc chắn muốn xóa chiến dịch này không? Hành động này không thể hoàn tác."
      >
        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" onClick={() => setDeleteId(null)}>
            Hủy bỏ
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Xóa ngay
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
