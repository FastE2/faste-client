'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { toastify } from '@/components/ToastNotification';
import { getDetailOrderByIdByShop } from '@/services/order';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import {
  Package,
  DollarSign,
  MapPin,
  Clock,
  XCircle,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  CreditCard,
  User,
  Phone,
  Loader2,
} from 'lucide-react';

export const OrderDetailPage = ({
  params,
}: {
  params: { orderId: string };
}) => {
  const { orderId } = params;
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string>('');

  const fetchDataOrder = async (orderId: string) => {
    setLoading(true);
    const order = await getDetailOrderByIdByShop(Number(orderId));
    if (order.status === 'error') {
      toastify.error(order.message || 'Lấy chi tiết đơn hàng thất bại.');
      return notFound();
    }
    setOrderData(order.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataOrder(orderId);
  }, [orderId]);

  const handleStatusChange = (newStatus: string) => {
    if (newStatus !== orderData.status) {
      setPendingStatus(newStatus);
      setOpenStatusDialog(true);
    }
  };

  const confirmStatusChange = async () => {
    setUpdatingStatus(true);
    try {
      // TODO: Gọi API update status
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setOrderData({ ...orderData, status: pendingStatus });
      toastify.success('Cập nhật trạng thái thành công!');
      setOpenStatusDialog(false);
    } catch (error) {
      toastify.error('Cập nhật trạng thái thất bại!');
    }
    setUpdatingStatus(false);
  };

  const handleCancelOrder = async () => {
    setUpdatingStatus(true);
    try {
      // TODO: API cancel order
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toastify.success('Đơn hàng đã được hủy');
      setOpenCancelDialog(false);
    } catch (err) {
      toastify.error('Hủy đơn thất bại');
    }
    setUpdatingStatus(false);
  };

  if (loading) return <LoadingUI />;
  if (!orderData) return null;

  const { Payment, items, status, createdAt, Shop, paymentMethod } = orderData;

  const getStatusConfig = (status: string) => {
    const configs: any = {
      PENDING_PAYMENT: {
        label: 'Chờ thanh toán',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: Clock,
      },
      PROCESSING: {
        label: 'Đang xử lý',
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: Package,
      },
      SHIPPING: {
        label: 'Đang vận chuyển',
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        icon: Truck,
      },
      COMPLETED: {
        label: 'Hoàn thành',
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: CheckCircle2,
      },
      CANCELLED: {
        label: 'Đã hủy',
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: XCircle,
      },
    };
    return configs[status] || configs.PENDING_PAYMENT;
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2 mb-2">
              <ArrowLeft size={16} /> Quay lại
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Đơn hàng #{orderId}
            </h1>
            <p className="text-sm text-gray-500">
              Tạo lúc {new Date(createdAt).toLocaleString('vi-VN')}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${statusConfig.color}`}
          >
            <StatusIcon size={20} />
            <span className="font-semibold">{statusConfig.label}</span>
          </div>
        </div>

        {/* Status Management Card */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Package size={22} className="text-blue-600" />
              Quản lý đơn hàng
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Select
                onValueChange={handleStatusChange}
                value={status}
                disabled={updatingStatus}
              >
                <SelectTrigger className="w-64 h-11 border-2 hover:border-blue-400 transition-colors">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING_PAYMENT">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-yellow-600" />
                      Chờ thanh toán
                    </div>
                  </SelectItem>
                  <SelectItem value="PROCESSING">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-blue-600" />
                      Đang xử lý
                    </div>
                  </SelectItem>
                  <SelectItem value="SHIPPING">
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-purple-600" />
                      Đang vận chuyển
                    </div>
                  </SelectItem>
                  <SelectItem value="COMPLETED">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" />
                      Hoàn thành
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="destructive"
                className="gap-2 h-11 shadow-md hover:shadow-lg transition-all"
                onClick={() => setOpenCancelDialog(true)}
                disabled={status === 'CANCELLED' || status === 'COMPLETED'}
              >
                <XCircle size={18} />
                Hủy đơn hàng
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <Clock size={16} />
              <span>
                Cập nhật lần cuối:{' '}
                {new Date(orderData.updatedAt).toLocaleString('vi-VN')}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Info */}
          <Card className="border-2 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <DollarSign size={22} className="text-green-600" />
                Thông tin thanh toán
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <InfoRow
                icon={<CreditCard size={18} className="text-blue-600" />}
                label="Phương thức"
                value={paymentMethod}
              />
              <InfoRow
                icon={<DollarSign size={18} className="text-green-600" />}
                label="Tổng tiền"
                value={`${Payment.amount.toLocaleString()}₫`}
                highlight
              />
              <InfoRow
                icon={<Calendar size={18} className="text-purple-600" />}
                label="Ngày tạo"
                value={new Date(createdAt).toLocaleString('vi-VN')}
              />
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card className="border-2 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <User size={22} className="text-orange-600" />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <InfoRow
                icon={<User size={18} className="text-orange-600" />}
                label="Tên khách hàng"
                value={orderData.shippingAddress?.name || 'N/A'}
              />
              <InfoRow
                icon={<Phone size={18} className="text-blue-600" />}
                label="Số điện thoại"
                value={orderData.shippingAddress?.phone || 'N/A'}
              />
              <InfoRow
                icon={<MapPin size={18} className="text-red-600" />}
                label="Địa chỉ"
                value={
                  orderData.shippingAddress
                    ? `${orderData.shippingAddress.street}, ${orderData.shippingAddress.district}, ${orderData.shippingAddress.city}`
                    : 'N/A'
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <Card className="border-2 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Truck size={22} className="text-purple-600" />
              Sản phẩm ({items.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {items.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 pb-4 ${
                    index !== items.length - 1 ? 'border-b' : ''
                  } hover:bg-gray-50 p-3 rounded-lg transition-colors`}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner flex items-center justify-center">
                    <Package size={32} className="text-gray-400" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-gray-900 text-lg">
                      {item.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {Object.entries(item.skuAttributes)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' • ')}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="secondary" className="text-xs">
                        x{item.quantity}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="font-bold text-lg text-green-600">
                      {item.skuPrice.toLocaleString()}₫
                    </p>
                    <p className="text-sm text-gray-500">
                      Tổng: {(item.skuPrice * item.quantity).toLocaleString()}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t-2 flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <span className="text-lg font-semibold text-gray-900">
                Tổng cộng
              </span>
              <span className="text-2xl font-bold text-green-600">
                {Payment.amount.toLocaleString()}₫
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Status Change Dialog */}
        <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Package className="text-blue-600" />
                Xác nhận thay đổi trạng thái
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-2 pt-2">
                <p>Bạn có chắc muốn thay đổi trạng thái đơn hàng?</p>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">
                    {getStatusConfig(status).label}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="font-semibold text-blue-600">
                    {getStatusConfig(pendingStatus).label}
                  </span>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={updatingStatus}>
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmStatusChange}
                disabled={updatingStatus}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updatingStatus ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  'Xác nhận'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Cancel Dialog */}
        <AlertDialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <XCircle />
                Xác nhận hủy đơn hàng
              </AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể
                hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={updatingStatus}>
                Thoát
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleCancelOrder}
                disabled={updatingStatus}
                className="bg-red-600 hover:bg-red-700"
              >
                {updatingStatus ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  'Xác nhận hủy'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
  highlight?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span
      className={`text-sm text-right ${
        highlight ? 'font-bold text-green-600 text-lg' : 'font-medium text-gray-900'
      }`}
    >
      {value}
    </span>
  </div>
);

const LoadingUI = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
    <div className="max-w-5xl mx-auto space-y-6">
      <Skeleton className="h-12 w-80" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  </div>
);

export default OrderDetailPage;