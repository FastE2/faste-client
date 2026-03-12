export type TAdminProduct = {
  id: number;
  name: string;
  slugId: string;
  basePrice: number;
  status: 'PUBLISHED' | 'DRAFT' | 'BANNED' | 'PENDING';
  images: string[];
  createdAt: string;
  updatedAt: string;
  shop: {
    id: number;
    name: string;
    slug: string;
  };
  brand: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  totalSales: number;
  stock: number;
};

export type TAdminProductListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  shopId?: number;
  brandId?: number;
  categoryId?: number;
};

export type TAdminProductListResponse = {
  data: TAdminProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
