"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// --- TYPES ---
type AdObjective = "TRAFFIC" | "CONVERSION" | "AWARENESS" | "PRODUCT_BOOST";
type AdStatus = "ACTIVE" | "PAUSED" | "DRAFT" | "FINISHED";

interface AdCampaign {
  id: number;
  name: string;
  objective: AdObjective;
  status: AdStatus;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number; // Percentage like 1.5 for 1.5%
  cpc: number;
  startAt: string;
  endAt: string;
  createdAt: string;
}

// --- MOCK DATA ---
const MOCK_ADS: AdCampaign[] = [
  {
    id: 1,
    name: "Quảng cáo Giày Sneaker Mùa Hè",
    objective: "CONVERSION",
    status: "ACTIVE",
    budget: 5000000,
    spent: 2450000,
    impressions: 125000,
    clicks: 3200,
    ctr: 2.56,
    cpc: 765,
    startAt: "2024-06-01T00:00:00",
    endAt: "2024-06-30T23:59:59",
    createdAt: "2024-05-28T10:00:00",
  },
  {
    id: 2,
    name: "Tăng Traffic Trang Chủ Shop",
    objective: "TRAFFIC",
    status: "PAUSED",
    budget: 2000000,
    spent: 1800000,
    impressions: 80000,
    clicks: 1500,
    ctr: 1.87,
    cpc: 1200,
    startAt: "2024-05-01T00:00:00",
    endAt: "2024-05-31T23:59:59",
    createdAt: "2024-04-25T09:00:00",
  },
  {
    id: 3,
    name: "Nhận diện thương hiệu mới",
    objective: "AWARENESS",
    status: "ACTIVE",
    budget: 10000000,
    spent: 1200000,
    impressions: 450000,
    clicks: 1200,
    ctr: 0.26,
    cpc: 1000,
    startAt: "2024-06-10T00:00:00",
    endAt: "2024-07-10T23:59:59",
    createdAt: "2024-06-05T14:00:00",
  },
  {
    id: 4,
    name: "Đẩy sản phẩm Áo Thun Local Brand",
    objective: "PRODUCT_BOOST",
    status: "DRAFT",
    budget: 3000000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    startAt: "2024-07-01T00:00:00",
    endAt: "2024-07-15T23:59:59",
    createdAt: "2024-06-20T11:00:00",
  },
  {
    id: 5,
    name: "Xả kho cuối mùa",
    objective: "CONVERSION",
    status: "FINISHED",
    budget: 5000000,
    spent: 4950000,
    impressions: 200000,
    clicks: 5000,
    ctr: 2.5,
    cpc: 990,
    startAt: "2024-04-01T00:00:00",
    endAt: "2024-04-15T23:59:59",
    createdAt: "2024-03-25T08:00:00",
  },
];

const getAdsBySeller = async (): Promise<AdCampaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ADS);
    }, 1200);
  });
};

// --- UTILS ---
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

const formatDate = (dateStr: string) =>
  format(new Date(dateStr), "dd/MM/yyyy", { locale: vi });

// --- UI COMPONENTS (Inline for Single File) ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "destructive"; size?: "default" | "sm" | "icon" }>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
      ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    };
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      icon: "h-9 w-9",
    };
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Badge = ({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: "default" | "outline" | "active" | "paused" | "draft" | "finished" | "objective" }) => {
  const variants = {
    default: "bg-slate-900 text-white",
    outline: "text-slate-950 border border-slate-200",
    active: "bg-green-100 text-green-700 border border-green-200",
    paused: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    draft: "bg-slate-100 text-slate-600 border border-slate-200",
    finished: "bg-blue-50 text-blue-700 border border-blue-200",
    objective: "bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase text-[10px] tracking-wider",
  };
  return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>{children}</div>;
};

const Progress = ({ value, className = "" }: { value: number; className?: string }) => (
  <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
    <div
      className="h-full bg-slate-900 transition-all duration-500 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-all hover:shadow-md ${className}`}>
    {children}
  </div>
);

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} {...props} />
);

// Custom Filter Select
const FilterSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: { label: string; value: string }[];
  placeholder?: string;
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
      >
        <option value="">{placeholder || "Tất cả"}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <Icon icon="mdi:chevron-down" className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  );
};

// Dropdown Menu
const DropdownMenu = ({ children, trigger }: { children: React.ReactNode; trigger: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

// Dialog
const Dialog = ({ isOpen, onClose, title, description, children }: { isOpen: boolean; onClose: () => void; title: string; description?: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-0">
      <div className="w-full max-w-md scale-100 gap-4 border bg-white p-6 shadow-lg sm:rounded-lg md:w-full animate-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const ObjectiveBadge = ({ objective }: { objective: AdObjective }) => {
  return <Badge variant="objective">{objective.replace("_", " ")}</Badge>;
};

const StatusBadge = ({ status }: { status: AdStatus }) => {
  const map = {
    ACTIVE: { label: "Đang chạy", variant: "active" as const },
    PAUSED: { label: "Tạm dừng", variant: "paused" as const },
    DRAFT: { label: "Bản nháp", variant: "draft" as const },
    FINISHED: { label: "Hoàn tất", variant: "finished" as const },
  };
  const config = map[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const StatCard = ({ title, value, subtext, icon, colorClass }: { title: string; value: string; subtext: string; icon: string; colorClass: string }) => (
  <Card className="p-4 md:p-6 flex items-start justify-between space-x-4">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon icon={icon} className={`h-6 w-6 ${colorClass.replace("bg-", "text-")}`} />
    </div>
  </Card>
);

// --- MAIN PAGE ---

export default function MarketingAdsPage() {
  const [data, setData] = useState<AdCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [objectiveFilter, setObjectiveFilter] = useState<string>("");

  // Dialog
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch Logic
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdsBySeller();
      setData(res);
    } catch (err) {
      setError("Không thể tải dữ liệu quảng cáo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Derived State: Filters
  const filteredData = useMemo(() => {
    return data.filter((ad) => {
      const matchSearch = ad.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter ? ad.status === statusFilter : true;
      const matchObjective = objectiveFilter ? ad.objective === objectiveFilter : true;
      return matchSearch && matchStatus && matchObjective;
    });
  }, [data, searchTerm, statusFilter, objectiveFilter]);

  // Derived State: Stats
  const stats = useMemo(() => {
    const totalSpent = data.reduce((acc, curr) => acc + curr.spent, 0);
    const totalImpressions = data.reduce((acc, curr) => acc + curr.impressions, 0);
    const totalClicks = data.reduce((acc, curr) => acc + curr.clicks, 0);
    // Weighted Average CTR based on impressions could be better, but simple average for now or Total Clicks / Total Imp
    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

    return { totalSpent, totalImpressions, totalClicks, avgCtr };
  }, [data]);

  // Handlers
  const handleDelete = () => {
    if (deleteId) {
      setData((prev) => prev.filter((ad) => ad.id !== deleteId));
      setDeleteId(null);
    }
  };

  // --- RENDERS ---

  const renderStats = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard 
        title="Tổng chi tiêu" 
        value={formatCurrency(stats.totalSpent)} 
        subtext="Trong toàn bộ chiến dịch" 
        icon="mdi:cash-multiple" 
        colorClass="bg-green-500 text-green-600"
      />
      <StatCard 
        title="Lượt hiển thị" 
        value={formatNumber(stats.totalImpressions)} 
        subtext="Tổng số lần ads xuất hiện" 
        icon="mdi:eye-outline" 
        colorClass="bg-blue-500 text-blue-600"
      />
      <StatCard 
        title="Lượt Click" 
        value={formatNumber(stats.totalClicks)} 
        subtext="Tổng tương tác click" 
        icon="mdi:cursor-default-click-outline" 
        colorClass="bg-purple-500 text-purple-600"
      />
      <StatCard 
        title="CTR Trung bình" 
        value={`${stats.avgCtr.toFixed(2)}%`} 
        subtext="Hiệu quả click/hiển thị" 
        icon="mdi:chart-line" 
        colorClass="bg-orange-500 text-orange-600"
      />
    </div>
  );

  const renderFilterBar = () => (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Icon icon="mdi:magnify" className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm chiến dịch..."
            className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Status */}
        <div className="w-full sm:w-40">
            <FilterSelect 
                value={statusFilter} 
                onChange={setStatusFilter}
                placeholder="Trạng thái"
                options={[
                    { label: "Tất cả", value: "" },
                    { label: "Đang chạy", value: "ACTIVE" },
                    { label: "Tạm dừng", value: "PAUSED" },
                    { label: "Bản nháp", value: "DRAFT" },
                    { label: "Hoàn tất", value: "FINISHED" },
                ]}
            />
        </div>

        {/* Filter Objective */}
        <div className="w-full sm:w-40">
            <FilterSelect 
                value={objectiveFilter} 
                onChange={setObjectiveFilter}
                placeholder="Mục tiêu"
                options={[
                    { label: "Tất cả", value: "" },
                    { label: "Traffic", value: "TRAFFIC" },
                    { label: "Conversion", value: "CONVERSION" },
                    { label: "Awareness", value: "AWARENESS" },
                    { label: "Product Boost", value: "PRODUCT_BOOST" },
                ]}
            />
        </div>
      </div>
      
      <div className="text-sm text-slate-500 hidden md:block">
        Hiển thị <strong>{filteredData.length}</strong> chiến dịch
      </div>
    </div>
  );

  const renderGrid = () => {
    if (loading) {
      return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-xl p-6 space-y-4">
                    <div className="flex justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-2 w-full mt-4" />
                    <div className="flex gap-2 mt-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                </div>
            ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl border-red-200 bg-red-50">
          <Icon icon="mdi:alert-circle-outline" className="h-10 w-10 text-red-500 mb-2" />
          <p className="text-red-600 font-medium">{error}</p>
          <Button variant="outline" className="mt-4" onClick={fetchData}>Thử lại</Button>
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed rounded-xl bg-slate-50/50">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
             <Icon icon="mdi:ads" className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Chưa có chiến dịch quảng cáo nào</h3>
          <p className="text-slate-500 mt-2 mb-6 max-w-sm text-center">
            {searchTerm || statusFilter 
              ? "Không tìm thấy kết quả phù hợp với bộ lọc của bạn." 
              : "Tạo chiến dịch quảng cáo đầu tiên để tiếp cận khách hàng tiềm năng ngay hôm nay."}
          </p>
          <Button className="gap-2 shadow-md">
             <Icon icon="mdi:plus" className="h-4 w-4" />
             Tạo chiến dịch mới
          </Button>
        </div>
      );
    }

    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredData.map((ad) => {
          const percentSpent = ad.budget > 0 ? (ad.spent / ad.budget) * 100 : 0;
          return (
            <Card key={ad.id} className="flex flex-col group">
              {/* Header */}
              <div className="p-5 pb-3 flex items-start justify-between">
                <div className="space-y-2">
                    <StatusBadge status={ad.status} />
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
                        {ad.name}
                    </h3>
                </div>
                <DropdownMenu
                    trigger={
                        <button className="text-slate-400 hover:text-slate-900 p-1 rounded-md transition-colors">
                             <Icon icon="mdi:dots-vertical" className="h-5 w-5" />
                        </button>
                    }
                >
                    <>
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Thao tác</div>
                        <button className="flex w-full items-center px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm">
                            <Icon icon="mdi:eye-outline" className="mr-2 h-4 w-4" /> Xem chi tiết
                        </button>
                        <button className="flex w-full items-center px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm">
                            <Icon icon="mdi:pencil-outline" className="mr-2 h-4 w-4" /> Chỉnh sửa
                        </button>
                        <button className="flex w-full items-center px-2 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-sm">
                            <Icon icon="mdi:content-copy" className="mr-2 h-4 w-4" /> Nhân bản
                        </button>
                        <div className="h-px bg-slate-100 my-1" />
                        <button 
                            onClick={() => setDeleteId(ad.id)}
                            className="flex w-full items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm"
                        >
                            <Icon icon="mdi:trash-can-outline" className="mr-2 h-4 w-4" /> Xóa chiến dịch
                        </button>
                    </>
                </DropdownMenu>
              </div>

              {/* Body Info */}
              <div className="px-5 py-2 flex-1 space-y-4">
                 <div className="flex items-center justify-between">
                     <ObjectiveBadge objective={ad.objective} />
                     <span className="text-xs text-slate-400 font-mono">ID: #{ad.id}</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
                    <div>
                        <p className="text-slate-500 text-xs">Ngân sách</p>
                        <p className="font-medium text-slate-900">{formatCurrency(ad.budget)}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">Đã chi</p>
                        <p className="font-medium text-slate-900">{formatCurrency(ad.spent)}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">Impressions</p>
                        <p className="font-medium text-slate-900">{formatNumber(ad.impressions)}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">Clicks (CTR)</p>
                        <p className="font-medium text-slate-900">
                            {formatNumber(ad.clicks)} <span className="text-xs text-slate-500">({ad.ctr}%)</span>
                        </p>
                    </div>
                 </div>
              </div>

              {/* Progress & Timeline */}
              <div className="px-5 py-4 space-y-3">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Tiến độ ngân sách</span>
                        <span className="font-medium text-slate-700">{percentSpent.toFixed(1)}%</span>
                    </div>
                    <Progress value={percentSpent} className={percentSpent > 90 ? "bg-red-100" : ""} />
                </div>
                
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-md">
                    <Icon icon="mdi:calendar-clock" className="h-4 w-4 opacity-70" />
                    <span>{formatDate(ad.startAt)} - {formatDate(ad.endAt)}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/30 flex gap-2 rounded-b-xl">
                 <Button variant="outline" size="sm" className="flex-1 w-full border-slate-200">
                    Xem chi tiết
                 </Button>
                 <Button variant="ghost" size="sm" className="flex-1 w-full hover:bg-slate-100">
                    Chỉnh sửa
                 </Button>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 min-h-screen bg-slate-50/30">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Quảng cáo của bạn</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Quản lý hiệu suất, ngân sách và tối ưu hóa các chiến dịch quảng cáo.
                </p>
            </div>
            <Button className="shadow-lg shadow-slate-900/20 gap-2 w-full md:w-auto">
                <Icon icon="mdi:plus" className="h-5 w-5" />
                Tạo chiến dịch quảng cáo
            </Button>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
            {/* Stats Overview */}
            {!loading && !error && renderStats()}

            {/* Filter Bar */}
            {renderFilterBar()}

            {/* Main Grid */}
            {renderGrid()}
        </div>

        {/* DELETE CONFIRM DIALOG */}
        <Dialog 
            isOpen={!!deleteId} 
            onClose={() => setDeleteId(null)}
            title="Xóa chiến dịch quảng cáo?"
            description="Hành động này sẽ xóa vĩnh viễn chiến dịch và dừng mọi quảng cáo liên quan. Bạn không thể hoàn tác."
        >
            <div className="flex justify-end space-x-3 pt-2">
                <Button variant="outline" onClick={() => setDeleteId(null)}>Hủy bỏ</Button>
                <Button variant="destructive" onClick={handleDelete}>Xác nhận xóa</Button>
            </div>
        </Dialog>
    </div>
  );
}