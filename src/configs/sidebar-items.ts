// src/config/sidebarItems.ts
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  SquareTerminal,
} from 'lucide-react';
import { ROUTE_CONFIG } from './router';

export interface IMenuItem {
  title: string;
  url?: string;
  icon?: string;
  isActive?: boolean;
  items?: IMenuItem[];
}

export const USER_MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Tài Khoản của tôi',
    icon: 'uil:user',
    isActive: true,
    items: [
      {
        title: 'Tài khoản',
        url: ROUTE_CONFIG.USER.INFO.ACCOUNT,
      },
      {
        title: 'Địa chỉ',
        url: ROUTE_CONFIG.USER.INFO.ADDRESS,
      },
      {
        title: 'Đổi mật khẩu',
        url: ROUTE_CONFIG.USER.INFO.CHANGE_PASSWORD,
      },
      {
        title: 'Cài đặt cá nhân',
        url: ROUTE_CONFIG.USER.INFO.SETTINGS,
      },
    ],
  },
  {
    title: 'Thông báo',
    url: ROUTE_CONFIG.USER.NOTIFICATION,
    icon: 'tdesign:notification',
  },
  {
    title: 'Đơn mua',
    url: ROUTE_CONFIG.USER.ORDER.ORDER_LIST,
    icon: 'lets-icons:order',
  },
  {
    title: 'Sản phẩm',
    icon: 'gridicons:product',
    items: [
      {
        title: 'Sản phẩm yêu thích',
        url: ROUTE_CONFIG.USER.PRODUCT.FAVORITE,
      },
      {
        title: 'Sản phẩm đã xem',
        url: ROUTE_CONFIG.USER.PRODUCT.RECENTLY_VIEWED,
      },
    ],
  },
  {
    title: 'Kho voucher',
    url: ROUTE_CONFIG.USER.VOUCHER_WALLET,
    icon: 'mdi:voucher-outline',
  },
  {
    title: 'Siêu sale tháng 11',
    url: ROUTE_CONFIG.USER.MARKETING.replace(':id', '11-11'),
    icon: 'mdi:sale-outline',
  },
];
