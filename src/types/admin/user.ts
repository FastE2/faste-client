export type TAdminUser = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  dateOfBirth: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
    name: string;
  };
};

export type TAdminSeller = TAdminUser & {
  shop: {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    totalProducts: number;
    totalOrders: number;
    rating: number;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    createdAt: string;
  } | null;
};

export type TAdminUserListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
};

export type TShopRequest = {
  id: number;
  userId: number;
  user: {
    name: string;
    email: string;
    avatar: string | null;
  };
  shopName: string;
  shopDescription: string;
  shopAddress: string;
  businessLicense: string | null;
  identityCardFront: string | null;
  identityCardBack: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
};

export type TAdminUserListResponse = {
  data: TAdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TAdminSellerListResponse = {
  data: TAdminSeller[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
