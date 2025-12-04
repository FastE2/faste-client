import { OrderStatus } from '@/types/order';
import { JSX } from 'react';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING_CONFIRMATION: 'Chờ xác nhận',
  PROCESSING: 'Đang xử lý',
  PENDING_PAYMENT: 'Chờ thanh toán',
  PENDING_PICKUP: 'Chờ lấy hàng',
  PENDING_DELIVERY: 'Đang giao hàng',
  DELIVERED: 'Đã giao',
  RETURNED: 'Đã trả hàng',
  CANCELLED: 'Đã hủy',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING_CONFIRMATION: 'bg-amber-100 text-amber-800 border-amber-200',
  PROCESSING: 'bg-blue-100 text-blue-800 border-blue-200',
  PENDING_PAYMENT: 'bg-amber-100 text-amber-800 border-amber-200',
  PENDING_PICKUP: 'bg-orange-100 text-orange-800 border-orange-200',
  PENDING_DELIVERY: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  DELIVERED: 'bg-green-100 text-green-800 border-green-200',
  RETURNED: 'bg-gray-100 text-gray-800 border-gray-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
};

const STATUS_ICONS: Record<OrderStatus, string> = {
  PENDING_CONFIRMATION: 'mdi:clock-outline',
  PROCESSING: 'mdi:progress-clock',
  PENDING_PAYMENT: 'mdi:cash-clock',
  PENDING_PICKUP: 'mdi:package-variant-closed',
  PENDING_DELIVERY: 'mdi:truck-delivery-outline',
  DELIVERED: 'mdi:check-circle-outline',
  RETURNED: 'mdi:arrow-u-left-top',
  CANCELLED: 'mdi:cancel',
};

// Map ra SelectItem
export const STATUS_OPTIONS: { value: OrderStatus; icon: string }[] = (
  Object.keys(STATUS_ICONS) as OrderStatus[]
).map((status) => ({
  value: status,
  icon: STATUS_ICONS[status],
}));

export function statusToLabel(status: OrderStatus): string {
  return STATUS_LABELS[status] || status;
}

export function statusToColor(status: OrderStatus): string {
  return STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}

export const iconsStatusOrder = {
  search: 'mdi:magnify',
  eye: 'mdi:eye-outline',
  clipboardList: 'mdi:clipboard-list-outline',
  chevronLeft: 'mdi:chevron-left',
  chevronRight: 'mdi:chevron-right',
  package: 'mdi:package-variant-closed',
  payment: 'mdi:credit-card-outline',
  localShipping: 'mdi:truck-outline',
};
