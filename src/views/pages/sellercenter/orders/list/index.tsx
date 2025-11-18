'use client';

import { useState, useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getOrdersByShop } from '@/services/order';
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { getAddressShipIsDefaultUser } from '@/services/address-ship';
import { toastify } from '@/components/ToastNotification';
import { OrderStatus } from '@/types/order';
import Link from 'next/link';
import { statusToColor, statusToLabel } from '@/configs/order';
import { formatCurrency } from '@/helpers/currency';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Order = {
  id: number;
  createdAt: string;
  updatedAt?: string;
  status: OrderStatus;
  paymentMethod: string;
  Payment: {
    id: number;
    transactionId?: number;
    amount: number;
    status: string;
    paidAt: string | null;
  };
  Shop: {
    name: string;
    slug: string;
  };
  userId: number;
  items: {
    id: number;
    productName: string;
    skuPrice: number;
    image: string;
    skuAttributes?: Record<string, string>;
    quantity?: number;
  }[];
  deliveryId?: number;
  addressShipId?: number;
  addressShip?: any;
  voucherId?: number | null;
};

const TAB_OPTIONS = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'PENDING_CONFIRMATION', label: 'Chờ xác nhận' },
  { value: 'PROCESSING', label: 'Đang xử lý' },
  { value: 'PENDING_PAYMENT', label: 'Chờ thanh toán' },
  { value: 'PENDING_PICKUP', label: 'Chờ lấy hàng' },
  { value: 'PENDING_DELIVERY', label: 'Đang giao hàng' },
  { value: 'DELIVERED', label: 'Đã giao' },
  { value: 'RETURNED', label: 'Đã trả hàng' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

const PAYMENT_METHODS = [
  { value: 'ALL', label: 'Tất cả phương thức' },
  { value: 'COD', label: 'COD' },
  { value: 'BANK_TRANSFER', label: 'Chuyển khoản' },
  { value: 'CREDIT_CARD', label: 'Thẻ tín dụng' },
];

const icons = {
  search: 'mdi:magnify',
  eye: 'mdi:eye-outline',
  clipboardList: 'mdi:clipboard-list-outline',
  chevronLeft: 'mdi:chevron-left',
  chevronRight: 'mdi:chevron-right',
  package: 'mdi:package-variant-closed',
  payment: 'mdi:credit-card-outline',
  localShipping: 'mdi:truck-outline',
};

export default function OrderListPage() {
  const [selectedTab, setSelectedTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [, setTick] = useState(0);

  const pageSize = 10;

  const filteredOrders = useMemo(() => {
    let filtered = [...(ordersData.length ? ordersData : [])];

    if (selectedTab !== 'ALL') {
      filtered = filtered.filter((order) => order.status === selectedTab);
    }

    if (paymentMethodFilter !== 'ALL') {
      filtered = filtered.filter(
        (order) => order.paymentMethod === paymentMethodFilter,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(query) ||
          order.Shop.name.toLowerCase().includes(query) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(query),
          ),
      );
    }

    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return filtered;
  }, [selectedTab, searchQuery, paymentMethodFilter, ordersData]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleActionClick = (action: string) => {
    alert(`Thực hiện hành động: ${action} cho đơn hàng #${selectedOrder?.id}`);
  };

  const getActionButtons = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING_CONFIRMATION':
        return (
          <>
            <Button
              onClick={() => handleActionClick('Xác nhận đơn hàng')}
              size="sm"
            >
              Xác nhận đơn hàng
            </Button>
            <Button
              onClick={() => handleActionClick('Hủy đơn')}
              variant="outline"
              size="sm"
            >
              Hủy đơn
            </Button>
          </>
        );
      case 'PENDING_PAYMENT':
        return (
          <Button
            onClick={() => handleActionClick('Gửi nhắc thanh toán')}
            size="sm"
          >
            Gửi nhắc thanh toán
          </Button>
        );
      case 'PROCESSING':
        return (
          <Button
            onClick={() => handleActionClick('Chuẩn bị giao hàng')}
            size="sm"
          >
            Chuẩn bị giao hàng
          </Button>
        );
      case 'PENDING_PICKUP':
        return (
          <Button
            onClick={() => handleActionClick('Xác nhận đã lấy hàng')}
            size="sm"
          >
            Xác nhận đã lấy hàng
          </Button>
        );
      case 'PENDING_DELIVERY':
        return (
          <Button
            onClick={() => handleActionClick('Xem vận đơn')}
            variant="outline"
            size="sm"
          >
            Xem vận đơn
          </Button>
        );
      case 'DELIVERED':
        return (
          <Button
            onClick={() => handleActionClick('In hóa đơn')}
            variant="outline"
            size="sm"
          >
            In hóa đơn
          </Button>
        );
      default:
        return null;
    }
  };

  const fetchDataOrder = async () => {
    const res = await getOrdersByShop();
    if (res.status === 'error') {
      toastify.error('error', res.message);
    }
    setOrdersData(res.data.data);
  };

  const fetchAddresswhipDefault = async (id: number) => {
    const res = await getAddressShipIsDefaultUser(id);
    if (res.status === 'success') {
      if (selectedOrder) {
        selectedOrder.addressShip = res.data;
        setTick((tick) => tick + 1); // Force re-render
      }
    } else {
      toastify.error('error', res.message);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      fetchAddresswhipDefault(selectedOrder.addressShipId as number);
    }
  }, [selectedOrder]);

  console.log('paginatedOrders', paginatedOrders, selectedOrder);

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Icon icon={icons.clipboardList} className="text-3xl text-gray-700" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Quản lý đơn hàng
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Icon
            icon={icons.search}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
          />
          <Input
            placeholder="Tìm theo mã đơn hàng, tên sản phẩm, shop..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Select
          value={paymentMethodFilter}
          onValueChange={(value) => {
            setPaymentMethodFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[220px]">
            <SelectValue placeholder="Lọc theo thanh toán" />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_METHODS.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full flex-wrap h-auto justify-start gap-2 bg-white py-2 ">
          {TAB_OPTIONS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="hidden md:block rounded-lg border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Mã đơn</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Shop</TableHead>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      Không tìm thấy đơn hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell className="text-sm">
                        {dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.Shop.name}
                      </TableCell>
                      <TableCell className="text-sm">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              // tabIndex={0}
                              className="outline-none border-none bg-transparent hover:bg-transparent shadow-none cursor-pointer pl-0"
                              variant={'outline'}
                            >
                              {order.items.length} sản phẩm
                            </Button>
                          </TooltipTrigger>

                          <TooltipContent side="top" align="center">
                            {order.items.map((item) => (
                              <div key={item.id}>
                                {item.productName} x {item.quantity || 1}
                              </div>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>

                      <TableCell className="font-medium">
                        {formatCurrency(order.Payment.amount)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.paymentMethod}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusToColor(order.status)}
                        >
                          {statusToLabel(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleViewDetails(order)}
                          variant="ghost"
                          size="sm"
                        >
                          <Icon icon={icons.eye} className="mr-1" />
                          Xem
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={'outline'}>
                              <Icon
                                icon="weui:more-filled"
                                width="18"
                                height="18"
                              />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link
                              href={`/sellercenter/orders/${order.id}`}
                              className='p-0 m-0'
                            >
                              <DropdownMenuItem className="flex items-center gap-x-2">
                                <Icon icon={'bx:detail'} />
                                Chi tiết
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-4">
            {paginatedOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icon
                    icon={icons.package}
                    className="text-5xl text-gray-300 mb-3"
                  />
                  <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
                </CardContent>
              </Card>
            ) : (
              paginatedOrders.map((order) => (
                <Card key={order.id} className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base font-semibold">
                          Đơn hàng #{order.id}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1">
                          {dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={statusToColor(order.status)}
                      >
                        {statusToLabel(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon={icons.package} className="text-gray-400" />
                      <span className="text-gray-600">{order.Shop.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.length} sản phẩm
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon={icons.payment} className="text-gray-400" />
                      <span className="text-gray-600">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tổng tiền:</span>
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(order.Payment.amount)}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleViewDetails(order)}
                      className="w-full"
                      variant="outline"
                    >
                      <Icon icon={icons.eye} className="mr-2" />
                      Xem chi tiết
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Hiển thị{' '}
            {Math.min((currentPage - 1) * pageSize + 1, filteredOrders.length)}{' '}
            - {Math.min(currentPage * pageSize, filteredOrders.length)} trong
            tổng số {filteredOrders.length} đơn hàng
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <Icon icon={icons.chevronLeft} className="mr-1" />
              Trước
            </Button>
            <span className="text-sm font-medium">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Sau
              <Icon icon={icons.chevronRight} className="ml-1" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Chi tiết đơn hàng #{selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Thông tin đơn hàng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <Badge
                        variant="outline"
                        className={statusToColor(selectedOrder.status)}
                      >
                        {statusToLabel(selectedOrder.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày tạo:</span>
                      <span className="font-medium">
                        {dayjs(selectedOrder.createdAt).format(
                          'DD/MM/YYYY HH:mm',
                        )}
                      </span>
                    </div>
                    {selectedOrder.updatedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cập nhật:</span>
                        <span className="font-medium">
                          {dayjs(selectedOrder.updatedAt).format(
                            'DD/MM/YYYY HH:mm',
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Thông tin thanh toán
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phương thức:</span>
                      <span className="font-medium">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <span className="font-medium">
                        {selectedOrder.Payment.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="font-bold text-primary">
                        {formatCurrency(selectedOrder.Payment.amount)}
                      </span>
                    </div>
                    {selectedOrder.Payment.paidAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Đã thanh toán:</span>
                        <span className="font-medium">
                          {dayjs(selectedOrder.Payment.paidAt).format(
                            'DD/MM/YYYY HH:mm',
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Sản phẩm
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Image
                        width={100}
                        height={100}
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {item.productName}
                        </h4>
                        {item.skuAttributes &&
                          Object.keys(item.skuAttributes).length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {Object.entries(item.skuAttributes)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(', ')}
                            </p>
                          )}
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">
                            x{item.quantity || 1}
                          </span>
                          <span className="font-medium text-primary">
                            {formatCurrency(item.skuPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Địa chỉ giao hàng
                </h3>
                <div className="flex items-start gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                  <Icon
                    icon={icons.localShipping}
                    className="text-xl text-gray-400 mt-0.5"
                  />
                  <div>
                    <p className="font-medium">
                      {selectedOrder.addressShip?.name || 'or'}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder.addressShip?.phone || '0123456789'}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder.addressShip?.address},{' '}
                      {selectedOrder.addressShip?.divisionPath['WARD']},{' '}
                      {selectedOrder.addressShip?.divisionPath['DISTRICT']},{' '}
                      {selectedOrder.addressShip?.divisionPath['PROVINCE']}
                      123 Đường ABC, Phường XYZ, Quận 1, TP.HCM
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Đơn hàng được tạo</p>
                      <p className="text-xs text-gray-500">
                        {dayjs(selectedOrder.createdAt).format(
                          'DD/MM/YYYY HH:mm',
                        )}
                      </p>
                    </div>
                  </div>
                  {selectedOrder.updatedAt && (
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Cập nhật trạng thái
                        </p>
                        <p className="text-xs text-gray-500">
                          {dayjs(selectedOrder.updatedAt).format(
                            'DD/MM/YYYY HH:mm',
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {selectedOrder && getActionButtons(selectedOrder.status)}
            <Button onClick={handleCloseModal} variant="outline">
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
