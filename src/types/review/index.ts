export type ReasonType =
  | 'DAMAGED_PRODUCT'
  | 'FAKE_PRODUCT'
  | 'NOT_AS_DESCRIBED'
  | 'POOR_QUALITY';

export type ReviewType = {
  id: number;
  orderItemId: number;
  userId: number;
  productId: number;
  skuId: number | null;
  sellerId: number;
  rating: number;
  message: string | null;
  reason: ReasonType | null;
  serviceSeller: number;
  serviceShip: number;
  images: string[];
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateReviewBodyType = {
  orderItemId: number;
  productId: number;
  skuId: number | null;
  sellerId: number;
  rating: number;
  message: string | null;
  reason: ReasonType | null;
  serviceSeller: number;
  serviceShip: number;
  images: string[];
  isAnonymous: boolean;
};

export type UpdateReviewBodyType = {
  rating: number;
  message: string | null;
  reason: ReasonType | null;
  serviceSeller: number;
  serviceShip: number;
  images: string[];
  isAnonymous: boolean;
};

export type ReviewQueryType = {
  page?: number;
  limit?: number;
  sortBy?: 'rating' | 'createdAt';
  order?: 'asc' | 'desc';
  orderItemId?: number | undefined;
  productId?: number | undefined;
  skuId?: number | undefined;
  userId?: number | undefined;
  rating?: number | undefined;
};
