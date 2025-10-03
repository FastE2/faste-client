import { Widget, WidgetType } from '@/types/widget';

export const templateWidgets: Record<
  WidgetType,
  Omit<Widget, 'widgetIndex'>
> = {
  [WidgetType.TITLE]: {
    id: '1',
    type: WidgetType.TITLE,
    label: 'Tiêu đề',
    icon: 'material-symbols:title',
    isVisible: true,
  },
  [WidgetType.DISCOUNT]: {
    id: '2',
    type: WidgetType.DISCOUNT,
    label: 'Mã giảm giá',
    icon: 'streamline:discount-percent-coupon',
    isVisible: true,
  },
  [WidgetType.BANNER_CAROUSEL]: {
    id: '3',
    type: WidgetType.BANNER_CAROUSEL,
    label: 'Banner',
    icon: 'ph:slideshow',
    isVisible: true,
  },
  [WidgetType.CATEGORIES_CAROUSEL]: {
    id: '4',
    type: WidgetType.CATEGORIES_CAROUSEL,
    label: 'Danh mục',
    icon: 'material-symbols:category',
    isVisible: true,
  },
  [WidgetType.PRODUCTS_ALL]: {
    id: '5',
    type: WidgetType.PRODUCTS_ALL,
    label: 'Widget sản phẩm',
    icon: 'streamline-cyber:shopping-product',
    isVisible: true,
  },
  [WidgetType.STORIES_CAROUSEL]: {
    id: '6',
    type: WidgetType.STORIES_CAROUSEL,
    label: 'Bảng tin',
    icon: 'streamline-sharp:story-post',
    isVisible: true,
  },
  [WidgetType.FLASH_SALE]: {
    id: '7',
    type: WidgetType.FLASH_SALE,
    label: 'Flash Sale',
    icon: 'typcn:flash-outline',
    isVisible: false,
  },
  [WidgetType.COLLECTIONS_VERTICAL]: {
    id: '8',
    type: WidgetType.COLLECTIONS_VERTICAL,
    label: 'Bộ sưu tập',
    icon: 'material-symbols:collections-bookmark',
    isVisible: false,
  },
  [WidgetType.BANNER_GRID4]: {
    id: '9',
    type: WidgetType.BANNER_GRID4,
    label: 'Banner Grid 4',
    icon: 'mdi:grid-large',
    isVisible: false,
  },
  [WidgetType.CATEGORIES_GRID]: {
    id: '10',
    type: WidgetType.CATEGORIES_GRID,
    label: 'Danh mục lưới',
    icon: 'material-symbols:grid-view',
    isVisible: false,
  },
  [WidgetType.PRODUCTS_RATING]: {
    id: '11',
    type: WidgetType.PRODUCTS_RATING,
    label: 'Sản phẩm đánh giá',
    icon: 'material-symbols:star-rate',
    isVisible: false,
  },
  [WidgetType.PRODUCTS_GRID]: {
    id: '12',
    type: WidgetType.PRODUCTS_GRID,
    label: 'Sản phẩm lưới',
    icon: 'material-symbols:grid-on',
    isVisible: false,
  },
  [WidgetType.COLLECTIONS_CAROUSEL]: {
    id: '13',
    type: WidgetType.COLLECTIONS_CAROUSEL,
    label: 'Bộ sưu tập Carousel',
    icon: 'pixelarticons:more-horizontal',
    isVisible: false,
  },
};

export const availableWidgets = [
  {
    title: 'Title',
    items: [
      {
        title: 'Tiêu đề đơn',
        type: WidgetType.TITLE,
        icon: 'mdi:format-title',
      },
    ],
  },
  {
    title: 'Banner',
    items: [
      {
        title: 'Băng truyền < 4 ảnh',
        type: WidgetType.BANNER_CAROUSEL,
        icon: 'pixelarticons:more-horizontal',
      },
      {
        title: '4 hình dạng lắp ghép',
        type: WidgetType.BANNER_GRID4,
        icon: 'fluent:glance-horizontal-24-regular',
      },
    ],
  },
  {
    title: 'Categories',
    items: [
      {
        title: 'Danh mục dạng lưới',
        type: WidgetType.CATEGORIES_GRID,
        icon: 'mingcute:grid-line',
      },
      {
        title: 'Danh mục dạng băng truyền',
        type: WidgetType.CATEGORIES_CAROUSEL,
        icon: 'pixelarticons:more-horizontal',
      },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        title: 'Tất cả sản phẩm',
        type: WidgetType.PRODUCTS_ALL,
        icon: 'rivet-icons:grid-horizontal',
      },
      {
        title: 'Xếp hạng sản phẩm',
        type: WidgetType.PRODUCTS_RATING,
        icon: 'tabler:chart-bar-popular',
      },
      {
        title: 'Sản phẩm dạng lưới',
        type: WidgetType.PRODUCTS_GRID,
        icon: 'mingcute:grid-line',
      },
    ],
  },
  {
    title: 'Stories',
    items: [
      {
        title: 'Tin dạng băng truyền',
        type: WidgetType.STORIES_CAROUSEL,
        icon: 'pixelarticons:more-horizontal',
      },
    ],
  },
  {
    title: 'Khuyến mãi',
    items: [
      {
        title: 'Flash Sale',
        type: WidgetType.FLASH_SALE,
        icon: 'mdi:flash',
      },
      {
        title: 'Discount',
        type: WidgetType.DISCOUNT,
        icon: 'mdi:tag',
      },
    ],
  },
  {
    title: 'Collections',
    items: [
      {
        title: 'Bộ sưu tập dạng bằng truyền',
        type: WidgetType.COLLECTIONS_CAROUSEL,
        icon: 'pixelarticons:more-horizontal',
      },
      {
        title: 'Bộ sưu tập dạng cột dọc',
        type: WidgetType.COLLECTIONS_VERTICAL,
        icon: 'fluent:align-stretch-horizontal-16-regular',
      },
    ],
  },
];
