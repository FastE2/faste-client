export const ROUTE_CONFIG = {
  USER: {
    INFO: {
      ACCOUNT: '/user/account',
      CHANGE_PASSWORD: '/user/change-password',
      ADDRESS: '/user/address',
      SETTINGS: '/user/settings',
    },
    NOTIFICATION: '/user/notification',
    PRODUCT: {
      FAVORITE: '/user/favorite',
      RECENTLY_VIEWED: '/user/recently-viewed',
    },
    REVIEW_HUB: '/user/review-hub',
    ORDER: {
      ORDER_LIST: '/user/order',
    },
    WALLET: '/user/ewallet',
    VOUCHER_WALLET: '/user/voucher-wallet',
    MARKETING: '/m/:id',
  },

  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  HOME: '/',
  PRODUCT: {
    INDEX: '/products',
    DETAIL: '/p/:slug.:id',
    CATEGORY: '/c/:slug.:id',
    SEARCH: '/search',
    BRAND: '/b/:slug.:id',
    FLASH_SALE: '/flash-sale',
  },
  CART: '/cart',
  CHECKOUT: '/checkout',
};
