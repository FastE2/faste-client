'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { getDetailShopMe } from '@/services/shop';

// --- TYPE DEFINITIONS ---
interface ShopData {
  shopid: number;
  slug: string;
  name: string;
  logo: string;
  cover: string | null;
  banner: string | null;
  description: string;
  followerCount: number | null;
  ratingStar: number;
  responseRate: number;
  responseTime: number; // minutes or hours? Assuming minutes for display
  addressWallet: string;
  addressShipId: number;
  businessType: 'COMPANY' | 'INDIVIDUAL' | 'BUSINESS_HOUSEHOLD';
  taxCode: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  isActive: boolean;
  itemCount: number;
  paymentMethods: string[];
  createdAt: string;
  updatedAt: string;
}

// --- HELPER COMPONENTS (Simulating Shadcn UI) ---
// Trong dự án thực tế, bạn sẽ import từ @/components/ui/...

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-xl border bg-white text-slate-950 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

const Badge = ({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
  className?: string;
}) => {
  const variants = {
    default:
      'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
    secondary:
      'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
    outline: 'text-slate-950 border-slate-200',
    destructive:
      'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80',
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

const Separator = ({ className = '' }: { className?: string }) => (
  <div className={`shrink-0 bg-slate-200 h-[1px] w-full ${className}`} />
);

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />
);

// --- MAIN PAGE COMPONENT ---

export default function StoreInfoPage() {
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetailShopMe = async () => {
    setLoading(true);
    try {
      const res = await getDetailShopMe();
      if (res.data && res.status === 'success') {
        console.log(res)
        setShop(res.data);
      }
    } catch (error) {}
    try {
    } catch (error) {
      // console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetailShopMe();
  }, []);

  // Format Helpers
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getBusinessTypeLabel = (type: string) => {
    switch (type) {
      case 'COMPANY':
        return 'Công ty';
      case 'BUSINESS_HOUSEHOLD':
        return 'Hộ kinh doanh';
      case 'INDIVIDUAL':
        return 'Cá nhân';
      default:
        return type;
    }
  };

  // --- RENDER LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 space-y-6">
        {/* Header Skeleton */}
        <div className="relative mb-16">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="absolute -bottom-12 left-6 md:left-10 flex items-end gap-4">
            <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
            <div className="mb-2 space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>

        {/* Details Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!shop)
    return (
      <div className="text-center p-10">Không tìm thấy thông tin cửa hàng.</div>
    );

  // --- RENDER CONTENT ---
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10">
      {/* 1. HEADER SECTION */}
      <div className="relative bg-white shadow-sm border-b border-slate-100">
        {/* Cover Image */}
        <div className="h-48 w-full md:h-64 relative overflow-hidden bg-slate-100">
          {shop.cover ? (
            <Image
              height={192}
              src={shop.cover}
              alt="Shop Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white/20">
              <Icon icon="lucide:image" width={64} />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative -mt-12 mb-6 flex flex-col md:flex-row md:items-end gap-4">
            {/* Logo / Avatar */}
            <div className="relative group">
              <div className="h-32 w-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
                {shop.logo ? (
                  <Image
                    height={128}
                    width={128}
                    src={shop.logo}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon
                    icon="lucide:store"
                    className="text-slate-300 w-16 h-16"
                  />
                )}
              </div>
              <div className="absolute bottom-1 right-1">
                {shop.isActive ? (
                  <div
                    className="h-5 w-5 rounded-full bg-green-500 border-2 border-white"
                    title="Online"
                  />
                ) : (
                  <div
                    className="h-5 w-5 rounded-full bg-slate-400 border-2 border-white"
                    title="Offline"
                  />
                )}
              </div>
            </div>

            {/* Name & Actions */}
            <div className="flex-1 mt-2 md:mt-0 md:mb-2 space-y-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {shop.name}
                </h1>
                <Badge
                  variant={shop.status === 'APPROVED' ? 'success' : 'secondary'}
                  className="w-fit"
                >
                  {shop.status}
                </Badge>
              </div>
              <p className="text-slate-500 text-sm font-medium">@{shop.slug}</p>
            </div>

            {/* Meta Actions (Optional placeholder) */}
            <div className="flex gap-2 md:mb-3 mt-2 md:mt-0">
              {/* Could add Follow button here */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* 2. STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            icon="lucide:star"
            label="Đánh giá"
            value={shop.ratingStar.toFixed(1)}
            subValue="/ 5.0"
            iconColor="text-yellow-500"
          />
          <StatsCard
            icon="lucide:package"
            label="Sản phẩm"
            value={shop.itemCount}
            subValue="mặt hàng"
            iconColor="text-blue-500"
          />
          <StatsCard
            icon="lucide:message-circle"
            label="Phản hồi Chat"
            value={`${shop.responseRate}%`}
            subValue="tỷ lệ"
            iconColor="text-green-500"
          />
          <StatsCard
            icon="lucide:clock"
            label="Thời gian trả lời"
            value={
              shop.responseTime > 60
                ? `${(shop.responseTime / 60).toFixed(1)}h`
                : `${shop.responseTime}p`
            }
            subValue="trung bình"
            iconColor="text-purple-500"
          />
        </div>

        {/* 3. DETAILS & SIDEBAR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN: SHOP DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="lucide:info"
                    className="text-slate-500"
                    width={20}
                  />
                  <CardTitle className="text-lg">Thông tin cửa hàng</CardTitle>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-6 mt-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Mô tả
                  </h4>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {shop.description || 'Chưa có mô tả cho cửa hàng này.'}
                  </p>
                </div>

                {/* Business Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <InfoItem
                    icon="lucide:briefcase"
                    label="Loại hình kinh doanh"
                    value={
                      <Badge variant="secondary">
                        {getBusinessTypeLabel(shop.businessType)}
                      </Badge>
                    }
                  />
                  <InfoItem
                    icon="lucide:file-text"
                    label="Mã số thuế"
                    value={shop.taxCode}
                  />
                  <InfoItem
                    icon="lucide:map-pin"
                    label="Địa chỉ kho (Ship ID)"
                    value={`#${shop.addressShipId}`}
                  />
                  <InfoItem
                    icon="lucide:calendar"
                    label="Ngày tham gia"
                    value={formatDate(shop.createdAt)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="lucide:credit-card"
                    className="text-slate-500"
                    width={20}
                  />
                  <CardTitle className="text-lg">
                    Phương thức thanh toán
                  </CardTitle>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {shop.paymentMethods.length > 0 ? (
                    shop.paymentMethods.map((method) => (
                      <Badge
                        key={method}
                        variant="outline"
                        className="px-3 py-1 text-sm bg-slate-50"
                      >
                        {method}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Chưa cấu hình</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: META & ADDITIONAL INFO */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Trạng thái hoạt động
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Tình trạng</span>
                  <Badge variant={shop.isActive ? 'success' : 'destructive'}>
                    {shop.isActive ? 'Đang hoạt động' : 'Tạm ngưng'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Người theo dõi</span>
                  <span className="font-semibold text-slate-900">
                    {shop.followerCount?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-500">
                    Cập nhật lần cuối
                  </span>
                  <span className="text-sm font-medium text-slate-900 text-right">
                    {new Date(shop.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Address (Optional but in data) */}
            {shop.addressWallet && (
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2 text-slate-300">
                    <Icon icon="lucide:wallet" width={18} />
                    <span className="text-sm font-medium">Ví Web3</span>
                  </div>
                  <p className="font-mono text-xs break-all bg-black/20 p-2 rounded border border-white/10">
                    {shop.addressWallet}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function StatsCard({
  icon,
  label,
  value,
  subValue,
  iconColor,
}: {
  icon: string;
  label: string;
  value: string | number;
  subValue?: string;
  iconColor?: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <Icon
          icon={icon}
          className={`w-5 h-5 ${iconColor || 'text-slate-400'}`}
        />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {subValue && (
          <span className="text-xs text-slate-400 font-medium">{subValue}</span>
        )}
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
        <Icon icon={icon} width={16} />
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <div className="text-sm font-medium text-slate-900">{value}</div>
      </div>
    </div>
  );
}
