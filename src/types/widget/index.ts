export enum WidgetType {
  TITLE = 'TITLE',
  BANNER_CAROUSEL = 'BANNER_CAROUSEL',
  BANNER_GRID4 = 'BANNER_GRID4',

  CATEGORIES_GRID = 'CATEGORIES_GRID',
  CATEGORIES_CAROUSEL = 'CATEGORIES_CAROUSEL',

  PRODUCTS_ALL = 'PRODUCTS_ALL',
  PRODUCTS_RATING = 'PRODUCTS_RATING',
  PRODUCTS_GRID = 'PRODUCTS_GRID',

  STORIES_CAROUSEL = 'STORIES_CAROUSEL',

  FLASH_SALE = 'FLASH_SALE',
  DISCOUNT = 'DISCOUNT',

  COLLECTIONS_CAROUSEL = 'COLLECTIONS_CAROUSEL',
  COLLECTIONS_VERTICAL = 'COLLECTIONS_VERTICAL',
}

export interface Widget {
  id: string;
  type: WidgetType;
  label: string;
  icon: string;
  isVisible: boolean;
  widgetIndex: number;
  viewConfig?: Record<string, any>;
}

export interface StoreConfig {
  storeName: string;
  storeAvatar: string;
  followers: number;
  widgets: Widget[];
}

export type AddWidgetBodyType = {
  templateId: number;
  refViewId: number;
  type:
    | 'TITLE'
    | 'BANNER_CAROUSEL'
    | 'BANNER_GRID4'
    | 'CATEGORIES_GRID'
    | 'CATEGORIES_CAROUSEL'
    | 'PRODUCTS_ALL'
    | 'PRODUCTS_RATING'
    | 'PRODUCTS_GRID'
    | 'STORIES_CAROUSEL'
    | 'FLASH_SALE'
    | 'DISCOUNT'
    | 'COLLECTIONS_CAROUSEL'
    | 'COLLECTIONS_VERTICAL';
  isVisible: boolean;
  widgetIndex: number;
  name?: string | null | undefined;
  viewConfig?: any;
};
